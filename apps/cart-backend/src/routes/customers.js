import express from "express";
const router = express.Router();
import {
  createCustomer,
  getAllCustomers,
  getCustomerById,
  updateCustomer,
  deleteCustomer,
} from "../controller/customers";

// Create a customer
router.post("/", createCustomer);

// Read all customers
router.get("/", getAllCustomers);

// Read a single customer by ID
router.get("/:id", getCustomerById);

// Update a customer by ID
router.put("/:id", updateCustomer);

// Delete a customer by ID
router.delete("/:id", deleteCustomer);

module.exports = router;
