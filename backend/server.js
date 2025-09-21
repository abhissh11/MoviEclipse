import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { connectDB } from "./config/db.js";
import authRoutes from "./routes/auth.js";
import movieRoutes from "./routes/movies.js";
import voteRoutes from "./routes/votes.js";
import commentRoutes from "./routes/comments.js";
import userRoutes from "./routes/users.js";

dotenv.config();
const PORT = process.env.PORT || 5000;
const app = express();

app.use(cors({ origin: process.env.CLIENT_URL || "*", credentials: true }));
app.use(express.json());

await connectDB(process.env.MONGO_URI);

app.use("/api/auth", authRoutes);
app.use("/api/movies", movieRoutes);
app.use("/api/votes", voteRoutes);
app.use("/api/comments", commentRoutes);
app.use("/api/users", userRoutes);

app.get("/", (req, res) => res.send("MovieHub API running"));

app.listen(PORT, () => console.log(`Server running on ${PORT}`));
