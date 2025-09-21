import Movie from "../models/Movie.js";
import Vote from "../models/Vote.js";
import Comment from "../models/Comment.js";

export const listMovies = async (req, res) => {
  try {
    const movies = await Movie.aggregate([
      {
        $lookup: {
          from: "votes",
          localField: "_id",
          foreignField: "movie_id",
          as: "votes",
        },
      },
      {
        $addFields: {
          score: { $sum: "$votes.vote_type" },
          upvotes: {
            $size: {
              $filter: {
                input: "$votes",
                as: "v",
                cond: { $eq: ["$$v.vote_type", 1] },
              },
            },
          },
          downvotes: {
            $size: {
              $filter: {
                input: "$votes",
                as: "v",
                cond: { $eq: ["$$v.vote_type", -1] },
              },
            },
          },
        },
      },
      { $sort: { score: -1, created_at: -1 } },
    ]);
    res.json(movies);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const addMovie = async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) return res.status(400).json({ message: "Title required" });
    const m = await Movie.create({ title, description, added_by: req.user.id });
    res.json(m);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const deleteMovie = async (req, res) => {
  try {
    await Movie.findByIdAndDelete(req.params.id);
    await Vote.deleteMany({ movie_id: req.params.id });
    await Comment.deleteMany({ movie_id: req.params.id });
    res.json({ message: "Deleted" });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};

export const getMovie = async (req, res) => {
  try {
    const movieId = req.params.id;
    const movie = await Movie.findById(movieId).lean();
    if (!movie) return res.status(404).json({ message: "Not found" });

    const votes = await Vote.find({ movie_id: movieId });
    const score = votes.reduce((s, v) => s + v.vote_type, 0);
    const comments = await Comment.find({ movie_id: movieId })
      .populate("user_id", "name")
      .sort({ created_at: -1 });

    res.json({ ...movie, score, votes_count: votes.length, comments });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error" });
  }
};
