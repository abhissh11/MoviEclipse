import mongoose from "mongoose";

const VoteSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  movie_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Movie",
    required: true,
  },
  vote_type: { type: Number, enum: [1, -1], required: true }, // 1 or -1
  created_at: { type: Date, default: Date.now },
});

// ensure one vote per user per movie
VoteSchema.index({ user_id: 1, movie_id: 1 }, { unique: true });

export default mongoose.model("Vote", VoteSchema);
