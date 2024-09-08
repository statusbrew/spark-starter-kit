const express = require("express");
const router = express.Router();
const { createOrder, verifyPayment } = require("../controllers/razorpayController");

// Route to create a Razorpay order
router.post("/create-order", createOrder);

// Route to verify Razorpay payment
router.post("/verify-payment", verifyPayment);

module.exports = router;
