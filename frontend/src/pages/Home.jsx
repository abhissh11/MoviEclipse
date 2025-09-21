import { useEffect, useState, useContext } from "react";
import API from "../api/api";
import { AuthContext } from "../context/AuthContext";
import MovieCard from "../components/MovieCard";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";

export default function Home() {
  const [movies, setMovies] = useState([]);
  const { user } = useContext(AuthContext);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const load = async () => {
    const res = await API.get("/movies");
    setMovies(res.data);
  };

  useEffect(() => {
    load();
  }, []);

  const addMovie = async (e) => {
    e.preventDefault();
    if (!user) return alert("Login to add");
    await API.post("/movies", { title, description: desc });
    setTitle("");
    setDesc("");
    load();
  };

  return (
    <div className="space-y-8">
      {user && (
        <div className="border border-gray-100 p-4 rounded-xl flex flex-col md:flex-row items-start md:items-center gap-4 justify-between overflow-hidden shadow-md">
          <h2 className="font-semibold mb-3 text-lg">
            Recommend/Suggest a Movie
          </h2>
          <form onSubmit={addMovie} className="space-y-3">
            <Input
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              placeholder="Movie title"
            />
            <Input
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              placeholder="Short description"
            />
            <Button type="submit">Add Movie</Button>
          </form>
        </div>
      )}

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {movies.map((m) => (
          <MovieCard key={m._id} movie={m} refresh={load} />
        ))}
      </div>
    </div>
  );
}
