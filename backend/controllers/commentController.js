import Comment from "../models/Comment.js";

export const addComment = async (req, res) => {
  try {
    const { movie_id, body } = req.body;
    if (!body)
      return res.status(400).json({ message: "Comment body required" });
    const c = await Comment.create({ movie_id, body, user_id: req.user.id });
    res.json(c);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteComment = async (req, res) => {
  try {
    const comment = await Comment.findById(req.params.id);
    if (!comment) return res.status(404).json({ message: "Not found" });

    if (
      comment.user_id.toString() !== req.user.id &&
      req.user.role !== "admin"
    ) {
      return res.status(403).json({ message: "Not allowed" });
    }
    await Comment.findByIdAndDelete(req.params.id);
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
