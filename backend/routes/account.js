// backend/routes/account.js
const express = require('express');
const { authMiddleware } = require('../middleware');
const { Account } = require('../db');
const { default: mongoose } = require('mongoose');

const router = express.Router();

router.get("/balance", authMiddleware, async (req, res) => {
    const account = await Account.findOne({
        userId: req.userId
    });

    res.json({
       balance: account.balance
    })
});


router.post("/transfer", authMiddleware, async (req, res) => {
    const session = await mongoose.startSession();
    try {
        session.startTransaction();
        const { amount, to } = req.body;

        if (amount <= 0) {
            throw new Error("Invalid amount");
        }

        const account = await Account.findOne({ userId: req.userId }).session(session);
        if (!account || account.balance < amount) {
            throw new Error("Insufficient balance");
        }

        const toAccount = await Account.findOne({ userId: to }).session(session);
        if (!toAccount) {
            throw new Error("Invalid destination account");
        }

        await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }).session(session);
        await Account.updateOne({ userId: to }, { $inc: { balance: amount } }).session(session);

        await session.commitTransaction();
        res.json({
            message: "Transfer successful"
        });
    } catch (error) {
        await session.abortTransaction();
        res.status(400).json({
            message: error.message || "An error occurred during the transfer"
        });
    } finally {
        session.endSession();
    }
});

module.exports = router;