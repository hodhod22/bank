const express = require("express");
const router = express.Router();
const zarinpal = require("zarinpal-checkout").create(
  "0e6a5ae7-897a-47f1-8bdc-f35405bdfb7f",
  true
); // false for sandbox



router.post("///zarinpal//callback", async (req, res) => {
  const { Authority, Status, userId, currency } = req.body; // Access the request body

  if (!Authority || !Status || !userId || !currency) {
    return res.status(400).json({ message: "Missing required parameters" });
  }

  try {
    // Verify payment with Zarinpal
    const verificationResponse = await zarinpal.PaymentVerification({
      Amount: 0, // Let Zarinpal handle the amount verification
      Authority,
    });

    if (verificationResponse.status === 100) {
      const verifiedAmount = verificationResponse.amount; // Verified amount
      const refId = verificationResponse.RefID; // Reference ID

      // Update user's balance in MongoDB
      await User.findByIdAndUpdate(
        userId,
        { $inc: { [`balance.${currency}`]: parseFloat(verifiedAmount) } },
        { new: true }
      );

      return res.status(200).json({
        message: "Payment verified successfully",
        verifiedAmount,
        refId,
      });
    } else {
      return res.status(400).json({
        message: "Payment verification failed.",
        status: verificationResponse.status,
      });
    }
  } catch (error) {
    console.error("Error verifying payment:", error);
    return res
      .status(500)
      .json({ message: "Server error during payment verification." });
  }
});
module.exports = router;
