import express from "express";

import {
  createRental,
  getMyRentals,
} from "../controllers/rentalController.js";

import protect from "../middleware/authMiddleware.js";

const router = express.Router();


// Create Rental
router.post("/", protect, createRental);


// Get My Rentals
router.get("/my", protect, getMyRentals);

export default router;