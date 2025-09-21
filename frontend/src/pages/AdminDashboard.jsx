import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../api/api";
import { useNavigate } from "react-router-dom";
import Card from "../components/Card";

export default function AdminDashboard() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const [movies, setMovies] = useState([]);
  const [users, setUsers] = useState([]);

  const load = async () => {
    try {
      const mRes = await API.get("/movies");
      const uRes = await API.get("/users");
      setMovies(mRes.data);
      setUsers(uRes.data);
      console.log(users);
    } catch (err) {
      alert("Unauthorized or server error");
      navigate("/");
    }
  };

  useEffect(() => {
    if (!user || user.user.role !== "admin") navigate("/");
    else load();
  }, [user]);

  return (
    <div className="space-y-8">
      <Card>
        <h2 className="text-xl font-semibold mb-4">Movies</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead>
              <tr className="border-b">
                <th className="p-2">Title</th>
                <th className="p-2">Score</th>
                <th className="p-2">Added By</th>
              </tr>
            </thead>
            <tbody>
              {movies.map((m) => (
                <tr key={m._id} className="border-b hover:bg-gray-50">
                  <td className="p-2">{m.title}</td>
                  <td className="p-2">{m.score ?? 0}</td>
                  <td className="p-2">{m.added_by?.name || "Unknown"}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>

      <Card>
        <h2 className="text-xl font-semibold mb-4">Users</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full text-sm text-left">
            <thead>
              <tr className="border-b">
                <th className="p-2">Name</th>
                <th className="p-2">Email</th>
                <th className="p-2">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u) => (
                <tr key={u._id} className="border-b hover:bg-gray-50">
                  <td className="p-2">{u.name}</td>
                  <td className="p-2">{u.email}</td>
                  <td className="p-2">{u.role}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </div>
  );
}
