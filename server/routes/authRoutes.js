import express from "express";
import protect from "../middleware/authMiddleware.js";


import {
  registerUser,
  loginUser,
  getMe,
} from "../controllers/authController.js";

const router = express.Router();


// Register
router.post("/register", registerUser);


// Login
router.post("/login", loginUser);

//middleware
router.get("/me", protect, getMe);


export default router;