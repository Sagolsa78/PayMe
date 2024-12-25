const express = require("express");


const router = express.Router();
const zod = require("zod");
const { User, Account } = require("../DB/db");
const jwt = require("jsonwebtoken");
const JWT_SECRET = require("../config");
const { authMiddleware } = require("../middleware/authmiddleware");



const signupBody = zod.object({
    username: zod.string().email(),
    firstname: zod.string(),
    lastname: zod.string(),
    password: zod.string(),

})

router.post("/signup", async (req, res) => {
    const success  = signupBody.safeParse(req.body)
    

    if (!success) {
        return res.status(411).json({
            msg: "EMAil already taken/incorrect inputs"

        })
    }

    // try {
        
        // console.log(username)
        const existingUser = await User.findOne({
            username:req.body.username

            
        })
       


        if (existingUser) {
            return res.status(411).json({
                msg: "Email aleardy taken/"
            })
        }
        const user = await User.create({
            username: req.body.username,
            password: req.body.password,
            firstname: req.body.firstname,
            lastname: req.body.lastname
        })

        const userId = user._id;

        await Account.create({
            userId,
            balance: 1 + Math.random() * 10000
        })


        const token = jwt.sign({
            userId
        }, JWT_SECRET);
        


        res.json({
            msg: "User created successfully ",
            token: token
        })
    // }
    // catch {
    //     return res.status(411).json({
    //         msg: 'error while creating user'
    //     })
    // }
})

const signinBody = zod.object({
    username: zod.string().email(),
    password: zod.string()
})


router.post("/signin", async (req, res) => {
    const { success } = signinBody.safeParse(req.body)

    if (!success) {
        return res.status(411).json({
            msg: "Email or password incorrect"
        })
    }

    const user = await User.findOne({
        username: req.body.username,
        password: req.body.password

    });

    if (user) {
        const token = jwt.sign({
            userId: user._id
        }, JWT_SECRET);

        res.json({
            token: token
        })

        return;

    }
    res.status(411).json({
        msg: "error while logging in"
    })
})


const updateBodySchema=zod.object({
    password:zod.string().optional(),
    firstname:zod.string().optional(),
    lastname:zod.string().optional()

})
// router.put("/update",authMiddleware,async function(req,res){
//     const {success}=updateBody.safeParse(req.body)

//     if(!success){
//         res.status(411).json({
//             msg:"Error while updating users data"
//         })
//     }
//     // const userId= User._id;
//    const apple= await User.updateOne(req.body,{
//     id:req.userId
// })
//     console.log(apple);


//     res.json({
//         msg:"update successfully"
//     })
// })



// PUT /update route
router.put("/update", authMiddleware, async (req, res) => {
    try {
        // Validate Request Body
        const parseResult = updateBodySchema.safeParse(req.body);
        if (!parseResult.success) {
            return res.status(400).json({
                msg: "Invalid input data",
                errors: parseResult.error.errors // Detailed error messages
            });
        }

        // Extract Validated Data
        const updateData = parseResult.data;

        // Fetch User ID from Auth Middleware
        const userId = req.userId; // Ensure `authMiddleware` sets this correctly
        if (!userId) {
            return res.status(403).json({
                msg: "Unauthorized: Missing user ID"
            });
        }

        // Update User Data
        const result = await User.updateOne({ _id: userId }, { $set: updateData });
        console.log("middleware check:",authMiddleware)
        
        // Check if the user was found and updated
        if (result.matchedCount === 0) {
            return res.status(404).json({
                msg: "User not found"
            });
        }

        // Success Response
        return res.json({
            msg: "Update successful",
            updatedFields: updateData
        });

    } catch (error) {
        // Handle Errors
        console.error("Error updating user data:", error);
        return res.status(500).json({
            msg: "Internal server error",
            error: error.message
        });
    }
});


router.get("/bulk",async (req,res)=>{
    const filter=req.query.filter|| "";

    const users=await User.find({
        $or:[{
            firstname:{
                "$regex":filter
            }

        },{
            lastname:{
                "$regex":filter
            }
        }]
    })
    res.json({
        user:users.map(user=>({
            username:user.username,
            firstname:user.firstname,
            lastname:user.lastname,
            _id:user._id
        }))
    })
})

module.exports = router;