import express from "express";
import {
  listMovies,
  addMovie,
  deleteMovie,
  getMovie,
} from "../controllers/movieController.js";
import { authMiddleware } from "../middleware/auth.js";
import { adminMiddleware } from "../middleware/admin.js";

const router = express.Router();

router.get("/", listMovies);
router.post("/", authMiddleware, addMovie);
router.delete("/:id", authMiddleware, adminMiddleware, deleteMovie);
router.get("/:id", getMovie);

export default router;
