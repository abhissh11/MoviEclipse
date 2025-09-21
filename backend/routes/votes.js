import express from "express";
import { castVote } from "../controllers/voteController.js";
import { authMiddleware } from "../middleware/auth.js";

const router = express.Router();
router.post("/", authMiddleware, castVote);

export default router;
