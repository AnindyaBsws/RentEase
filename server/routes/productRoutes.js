import express from "express";

import {
  addProduct,
  getProducts,
  getSingleProduct,
  updateProduct,
  deleteProduct,
  getMyProducts,
} from "../controllers/productController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();



router.post("/", protect, addProduct);          // Add Product
router.get("/", getProducts);                   // Get All Products
router.get("/:id", getSingleProduct);           // Get Single Product
router.put("/:id", protect, updateProduct);     // Update Product
router.delete("/:id", protect, deleteProduct);  // Delete Product
router.get("/my/products", protect, getMyProducts); //My prodcut List

export default router;