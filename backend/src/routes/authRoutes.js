import express from "express";
import {
  register,
  login,
  logout,
  verify,
  updateProfile,
} from "../controllers/authController.js";
import { protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/verify", protectRoute, verify);

router.put("/update", protectRoute, updateProfile);

export default router;
