import express from "express";
const router = express.Router();
import { createCategory, getAllCategories, getCategoryById, updateCategory, deleteCategory } from "../controller/categories";

router.post("/", createCategory);

// Read all categories
router.get("/", getAllCategories);

// Read a single category
router.get("/:id", getCategoryById);

// Update a category
router.put("/:id", updateCategory);

// Delete a category
router.delete("/:id", deleteCategory);

module.exports = router;
