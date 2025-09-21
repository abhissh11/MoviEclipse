import { Link } from "react-router-dom";
import API from "../api/api";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { MoveRight, ThumbsDown, ThumbsUp } from "lucide-react";

export default function MovieCard({ movie, refresh }) {
  const { user } = useContext(AuthContext);

  const vote = async (v) => {
    if (!user) return alert("Login to vote");
    try {
      await API.post("/votes", { movie_id: movie._id, vote_type: v });
      refresh();
    } catch (err) {
      alert(err.response?.data?.message || "Vote failed");
    }
  };

  return (
    <div className="group card flex flex-col justify-between items-start hover:shadow-lg transition relative bg-gray-100 p-4 rounded-xl">
      <div>
        <div className="flex justify-between items-center">
          <Link
            to={`/movie/${movie._id}`}
            className="text-lg font-semibold text-gray-800 hover:text-primary group-hover:text-blue-500 hover:underline"
          >
            {movie.title}
          </Link>
          <p className="">
            <Link to={`/movie/${movie._id}`}>
              <MoveRight
                size={40}
                className="bg-blue-500 md:bg-gray-300 md:group-hover:bg-blue-500 p-2 rounded-full"
              />
            </Link>
          </p>
        </div>
        <p className="text-gray-600 text-sm mt-1">{movie.description}</p>
      </div>
      <div className="flex flex-row items-center justify-between  w-full gap-2">
        <p className="text-xs font-bold flex flex-row gap-1 items-center text-center text-gray-800 mt-2">
          Score: {movie.score ?? 0}
        </p>
        <div className="flex flex-row items-center gap-2">
          <button
            onClick={() => vote(1)}
            className="p-2 rounded-full bg-gray-100 hover:bg-green-200"
          >
            <ThumbsUp />
          </button>
          {movie.upvotes ?? 0} |{" "}
          <button
            onClick={() => vote(-1)}
            className="p-2 rounded-full bg-gray-100 hover:bg-red-200"
          >
            <ThumbsDown />
          </button>
          {movie.downvotes ?? 0}
        </div>
      </div>

      {/* {user?.user.role === "admin" && (
        <button
          onClick={deleteMovie}
          className="absolute top-2 right-2 text-xs text-red-500 hover:underline"
        >
          Delete
        </button>
      )} */}
    </div>
  );
}
