import mongoose from "mongoose";

const MovieSchema = new mongoose.Schema({
  title: { type: String, required: true },
  description: { type: String, default: "" },
  added_by: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
  created_at: { type: Date, default: Date.now },
});

// virtual score (not stored) could be computed with aggregation
export default mongoose.model("Movie", MovieSchema);
