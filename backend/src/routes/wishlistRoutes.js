import express from "express";
import {
  read,
  readById,
  create,
  update,
  deleteById,
} from "../controllers/wishlistController.js";
import { protectRoute } from "../middleware/authMiddleware.js";

const router = express.Router();

router.get("/", protectRoute, read);
router.get("/:id", protectRoute, readById);
router.post("/", protectRoute, create);
router.put("/:id", protectRoute, update);
router.delete("/:id", protectRoute, deleteById);

export default router;
