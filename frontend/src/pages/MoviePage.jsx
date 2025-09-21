import { useEffect, useState, useContext } from "react";
import { useParams, useNavigate } from "react-router-dom";
import API from "../api/api";
import { AuthContext } from "../context/AuthContext";
import { ChevronDown } from "lucide-react";
import Input from "../components/Input";
import Button from "../components/Button";
import Comment from "../components/Comment";

export default function MoviePage() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [movie, setMovie] = useState(null);
  const { user } = useContext(AuthContext);
  const [comment, setComment] = useState("");

  const load = async () => {
    const res = await API.get(`/movies/${id}`);
    setMovie(res.data);
  };
  console.log(movie);

  useEffect(() => {
    load();
  }, [id]);

  const postComment = async () => {
    if (!user) return alert("Login to comment");
    await API.post("/comments", { movie_id: id, body: comment });
    setComment("");
    load();
  };

  const deleteMovie = async () => {
    if (!window.confirm("Delete this movie?")) return;
    try {
      await API.delete(`/movies/${id}`);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Delete failed");
    }
  };

  if (!movie) return <div>Loading...</div>;

  return (
    <div className="space-y-6">
      <div className="bg-gray-200 p-8 rounded-xl">
        <div className="flex justify-between items-start">
          <div>
            <h1 className="text-2xl font-bold">{movie.title}</h1>
            <p className="text-gray-700 mt-2">{movie.description}</p>
            <p className="mt-3 text-sm font-bold text-gray-800">
              Score: {movie.score}
            </p>
            <p className="mt-3 text-sm font-bold text-gray-800">
              Total Votes: {movie.votes_count ?? 0}
            </p>
          </div>
          {user?.user.role === "admin" && (
            <button
              onClick={deleteMovie}
              className="text-base text-white px-3 py-2 bg-red-500 rounded-lg hover:bg-red-600 cursor-pointer"
            >
              Delete Movie
            </button>
          )}
        </div>
      </div>

      <div>
        <h2 className="font-semibold mb-3 flex items-center gap-1 ">
          Comments{" "}
          <span>
            <ChevronDown />
          </span>
        </h2>
        {user && (
          <div className="mt-2 mb-1 space-y-2 flex flex-row gap-2">
            <input
              className="border-b border-gray-400 outline-none px-2"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              placeholder="Write a comment"
            />
            <button
              onClick={postComment}
              className="px-5 py-2 bg-black text-center text-white text-base rounded-lg"
            >
              Post
            </button>
          </div>
        )}
        <div className="space-y-2 bg-gray-100 rounded-lg p-8">
          {movie.comments.length === 0 && (
            <p className="text-sm text-gray-500">No comments yet.</p>
          )}
          {movie.comments.map((c) => (
            <Comment key={c._id} comment={c} refresh={load} />
          ))}
        </div>
      </div>
    </div>
  );
}
