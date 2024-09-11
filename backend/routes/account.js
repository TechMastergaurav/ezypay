const express = require('express');
const authMiddleware = require('../middleware');
const { Account, User } = require('../db');
const mongoose = require('mongoose');

const router = express.Router();

router.get('/balance', authMiddleware, async (req, res) => {
    try {
        const account = await Account.findOne({
            userId: req.userId
        });
        if (!account) {
            return res.status(404).json({ message: "Account not found" });
        }
        res.json({ balance: account.balance });
    } catch (error) {
        res.status(500).json({ message: "Internal server error" });
    }
});

router.post('/transfer', authMiddleware, async (req, res) => {
    const { to, amount } = req.body;

    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const senderAccount = await Account.findOne({ userId: req.userId }).session(session);
        if (!senderAccount || senderAccount.balance < amount) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ message: "Insufficient balance" });
        }

        let recipientAccount;
        if (mongoose.isValidObjectId(to)) {
            recipientAccount = await Account.findOne({ userId: to }).session(session);
        } else {
            const recipientUser = await User.findOne({ username: to }).select('_id').session(session);
            if (recipientUser) {
                recipientAccount = await Account.findOne({ userId: recipientUser._id }).session(session);
            }
        }

        if (!recipientAccount) {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({ message: "Invalid account" });
        }

        await Account.updateOne({ userId: req.userId }, { $inc: { balance: -amount } }, { session });
        await Account.updateOne({ userId: recipientAccount.userId }, { $inc: { balance: amount } }, { session });

        await session.commitTransaction();
        session.endSession();

        res.json({ message: "Transfer successful" });
    } catch (error) {
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({ message: "Internal server error" });
    }
});

module.exports = router;


