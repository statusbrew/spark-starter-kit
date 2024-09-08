import express from "express";
const router = express.Router();
import {
  createProduct,
  getAllProducts,
  getProductById,
  updateProduct,
  getProductFromIds,
  deleteProduct,
} from "../controller/products";

// Create a product
router.post("/", createProduct);

// Read all products
router.get("/", getAllProducts);

// Read a single product by ID
router.get("/:id", getProductById);
router.get('/order/ids', getProductFromIds);
// Update a product by ID
router.put("/:id", updateProduct);

// Delete a product by ID
router.delete("/:id", deleteProduct);

module.exports = router;
