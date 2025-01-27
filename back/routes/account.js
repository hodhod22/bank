// routes/account.js
const express = require("express");
const router = express.Router();
const User = require("../models/User");
const authMiddleware = require("../middleware/authenticate");

router.get("/balance/:userId", async (req, res) => {
  try {
    const { userId } = req.params;
    const user = await User.findById(userId);

    if (!user) return res.status(404).json({ message: "User not found" });

    res.status(200).json({ balance: user.balance });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

// Transfer Money Route
router.post("/transfer", async (req, res) => {
  const { senderId, receiverAccountNumber, amount, currency } = req.body;

  try {
    // Validate input
    if (!amount || amount <= 0 || !currency) {
      return res.status(400).json({ message: "Invalid transfer details." });
    }

    // Find sender and receiver
    const sender = await User.findById(senderId);
    const receiver = await User.findOne({
      accountNumber: receiverAccountNumber,
    });

    if (!sender) return res.status(404).json({ message: "Sender not found." });
    if (!receiver)
      return res.status(404).json({ message: "Receiver not found." });

    // Check if sender has enough balance
    if (sender.balance[currency] < amount) {
      return res.status(400).json({ message: "Insufficient balance." });
    }

    // Deduct amount from sender and add to receiver
    sender.balance[currency] -= amount;
    receiver.balance[currency] += amount;

    // Save updates
    await sender.save();
    await receiver.save();

    res.status(200).json({
      message: `Successfully transferred ${amount} ${currency}.`,
      sender: {
        id: sender._id,
        balance: sender.balance,
      },
      receiver: {
        id: receiver._id,
        balance: receiver.balance,
      },
    });
  } catch (error) {
    console.error("Transfer error: ", error);
    res
      .status(500)
      .json({ message: "Something went wrong. Please try again." });
  }
});

// Admin: Get all users (alternative route under /accounts for separation)
router.get("/all-users", async (req, res) => {
  try {
    const users = await User.find();
    res.status(200).json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

module.exports = router;
