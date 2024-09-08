import express from "express";
const router = express.Router();
import { getOrderItemsByCustomerId } from "../controller/orderItem.js";

// Get all order items by customer ID
router.get("/customer/:customerId", getOrderItemsByCustomerId);

module.exports = router;