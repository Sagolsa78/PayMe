

const express = require("express");
const mongoose = require("mongoose");

const { authMiddleware } = require("../middleware/authmiddleware");
const {Account} = require("../DB/db");
const router = express.Router();



// router.get("/balance", authmiddleware, async function (req, res) {
//     const account = await Account.findOne({
//         userId: req.userId
//     });

//     res.json({
//         balance: account.balance
//     })
// });

router.get("/balance", authMiddleware, async function (req, res) {
    

    try {
        const account = await Account.findOne({
            userId: req.userId
        });

        return res.json({
            userId:req.userId,
            balance: account.balance
        })
    }
    catch (err) {
        return res.json({
            msg: "there an error while getting the users balance ",
            error:err.message
        })
    }
})

router.post("/transfer", authMiddleware, async function (req, res) {
    const session = await mongoose.startSession();

    session.startTransaction();
    const { amount, to } = req.body;

    const account = await Account.findOne({
        userId: req.userId
    }).session(session);

    if (!account || account.balance < amount) {
        await session.abortTransaction();
        return res.status(400).json({
            msg: "insufficient balance"
        });
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);

    if (!toAccount) {
        await session.abortTransaction();
        return res.status(400).json({
            msg: 'invalid account'
        })
    }

    await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);


    await session.commitTransaction();
    res.status(200).json({
        msg: 'transfer successfully',
        Amount:amount,
        

    });
});



module.exports = router;
