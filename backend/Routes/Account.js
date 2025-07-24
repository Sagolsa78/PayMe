

const express = require("express");
const mongoose = require("mongoose");

const { authMiddleware } = require("../middleware/authmiddleware");
const { Account, Transactions } = require("../DB/db");
const router = express.Router();




router.get("/balance", authMiddleware, async function (req, res) {
  try {
    const userId = req.user._id;
    const account = await Account.findOne({
      userId: userId
    }).populate("userId", "firstname lastname");



    return res.json({
      userId: userId,
      balance: account.balance,
      firstname: account.userId.firstname,
      lastname: account.userId.lastname


    })


  }
  catch (err) {
    return res.json({
      msg: "there an error while getting the users balance ",
      error: err.message
    })
  }
})

router.post("/transfer", authMiddleware, async function (req, res) {
  const session = await mongoose.startSession();

  session.startTransaction();
  const { amount, to } = req.body;

  try {
    const userId = req.user._id;
    const fromAccount = await Account.findOne({
      userId: userId
    }).session(session);

    if (!fromAccount || fromAccount.balance < amount) {
      await session.abortTransaction();
      return res.status(400).json({
        msg: "insufficient balance"
      });
    }

    const toAccount = await Account.findOne({ userId: to }).session(session);

    if (!toAccount) {
      await session.abortTransaction();
      return res.status(400).json({
        msg: 'invalid recipient account'
      })
    }

    await Account.updateOne({ userId: userId }, { $inc: { balance: -amount } }).session(session);
    await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);



    // Save transaction for sender
    const SenderTransactions = await Transactions.create([{
      userId,
      type: "Money Sent",
      amount: -amount,
      recipient: toAccount.userId,
      status: "completed",
      time: new Date().toLocaleString()
    }], { session });



    // Save transaction for receiver
    const ReciversTransaction = await Transactions.create([{
      userId: toAccount.userId,
      type: "Money Received",
      amount: amount,
      recipient: fromAccount.userId,
      status: "completed",
      time: new Date().toLocaleString()
    }], { session });


    await session.commitTransaction();
    res.status(200).json({
      msg: 'transfer successfully',
      Amount: amount,
      transaction: SenderTransactions[0],
      //transaction: ReciversTransaction[0],



    });
  } catch (error) {
    await session.abortTransaction();
    console.error("Transfer failed:", error);
    res.status(500).json({ msg: "transfer failed", error: error.message });
  } finally {
    session.endSession();
  }
});


router.get("/transactions", authMiddleware, async (req, res) => {
  try {
    const userId = req.user._id
   
    console.log("user",userId);



    const transactions = await Transactions.find({ $or: [{ userId: userId }, { recipient: userId }] }).populate("userId", "firstname")
      .populate("recipient", "firstname")
      .sort({ timestamp: -1 })
      .lean();

    res.json({ transactions });
  } catch (err) {
    res.status(500).json({ msg: "failed to fetch transactions", error: err.message });
  }
});



module.exports = router;
