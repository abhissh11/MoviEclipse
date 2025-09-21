import Vote from "../models/Vote.js";

export const castVote = async (req, res) => {
  try {
    const { movie_id, vote_type } = req.body;
    if (![1, -1].includes(vote_type))
      return res.status(400).json({ message: "vote_type must be 1 or -1" });

    const existing = await Vote.findOne({ user_id: req.user.id, movie_id });
    if (existing) {
      if (existing.vote_type === vote_type) {
        return res.json({ message: "Vote unchanged" });
      } else {
        existing.vote_type = vote_type;
        await existing.save();
        return res.json({ message: "Vote updated" });
      }
    } else {
      const v = await Vote.create({
        user_id: req.user.id,
        movie_id,
        vote_type,
      });
      return res.json({ message: "Voted", vote: v });
    }
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
