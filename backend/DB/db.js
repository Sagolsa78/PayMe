
const mongoose =require("mongoose");


mongoose.connect("mongodb+srv://sahanimohit5ed:w9oYbCgdKeUSdrpp@cluster03.ckuqs.mongodb.net/?retryWrites=true&w=majority&appName=Cluster03/AppData");

const userSchema=mongoose.Schema({
    username:{
        trim:true,
        required:true,
        type:String,
        minLength:5,
        maxLength:50,

    },

    password:{
        trim:true,
        required:true,
        type:String,
        minLength:6,


    },
    firstname:{
        trim:true,
        required:true,
        type:String,
        minLength:2,
        maxLength:50,

    },
    lastname:{
        trim:true,
        rerquired:true,
        type:String,
        maxLength:50,
        minLength:3,
    }
});


const accountSchema=new mongoose.Schema({
    userId:{
        type:mongoose.Schema.ObjectId,
        ref:"User",
        required:true
    
    },
    balance:{
        type:Number,
        required:true,
    }

})

const User=mongoose.model("User",userSchema);
const Account=mongoose.model("Account",accountSchema);


module.exports={
    User,
    Account
}




// // backend/routes/user.js
// const express = require('express');

// const router = express.Router();
// const zod = require("zod");
// const { User, Account } = require("../db");
// const jwt = require("jsonwebtoken");
// const { JWT_SECRET } = require("../config");
// const  { authMiddleware } = require("../middleware");

// const signupBody = zod.object({
//     username: zod.string().email(),
// 	firstName: zod.string(),
// 	lastName: zod.string(),
// 	password: zod.string()
// })

// router.post("/signup", async (req, res) => {
//     const { success } = signupBody.safeParse(req.body)
//     if (!success) {
//         return res.status(411).json({
//             message: "Email already taken / Incorrect inputs"
//         })
//     }

//     const existingUser = await User.findOne({
//         username: req.body.username
//     })

//     if (existingUser) {
//         return res.status(411).json({
//             message: "Email already taken/Incorrect inputs"
//         })
//     }

//     const user = await User.create({
//         username: req.body.username,
//         password: req.body.password,
//         firstName: req.body.firstName,
//         lastName: req.body.lastName,
//     })
//     const userId = user._id;

//     await Account.create({
//         userId,
//         balance: 1 + Math.random() * 10000
//     })

//     const token = jwt.sign({
//         userId
//     }, JWT_SECRET);

//     res.json({
//         message: "User created successfully",
//         token: token
//     })
// })


// const signinBody = zod.object({
//     username: zod.string().email(),
// 	password: zod.string()
// })

// router.post("/signin", async (req, res) => {
//     const { success } = signinBody.safeParse(req.body)
//     if (!success) {
//         return res.status(411).json({
//             message: "Email already taken / Incorrect inputs"
//         })
//     }

//     const user = await User.findOne({
//         username: req.body.username,
//         password: req.body.password
//     });

//     if (user) {
//         const token = jwt.sign({
//             userId: user._id
//         }, JWT_SECRET);
  
//         res.json({
//             token: token
//         })
//         return;
//     }

    
//     res.status(411).json({
//         message: "Error while logging in"
//     })
// })

// const updateBody = zod.object({
// 	password: zod.string().optional(),
//     firstName: zod.string().optional(),
//     lastName: zod.string().optional(),
// })

// router.put("/", authMiddleware, async (req, res) => {
//     const { success } = updateBody.safeParse(req.body)
//     if (!success) {
//         res.status(411).json({
//             message: "Error while updating information"
//         })
//     }

//     await User.updateOne(req.body, {
//         id: req.userId
//     })

//     res.json({
//         message: "Updated successfully"
//     })
// })

// router.get("/bulk", async (req, res) => {
//     const filter = req.query.filter || "";

//     const users = await User.find({
//         $or: [{
//             firstName: {
//                 "$regex": filter
//             }
//         }, {
//             lastName: {
//                 "$regex": filter
//             }
//         }]
//     })

//     res.json({
//         user: users.map(user => ({
//             username: user.username,
//             firstName: user.firstName,
//             lastName: user.lastName,
//             _id: user._id
//         }))
//     })
// })

// module.exports = router;