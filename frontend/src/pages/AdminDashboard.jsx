import { useEffect, useState, useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import API from "../api/api";
import { useNavigate } from "react-router-dom";

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
    } catch (err) {
      alert("Unauthorized or server error");
      navigate("/");
    }
  };

  const getUserName = (id) => {
    const u = users.find((usr) => usr._id === id);
    return u ? u.name : "Unknown";
  };

  useEffect(() => {
    if (!user || user.user.role !== "admin") {
      navigate("/");
    } else {
      load();
    }
  }, [user]);

  return (
    <div className="space-y-12">
      {/* Movies Table */}
      <div>
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b-2 border-blue-600 inline-block pb-1">
          🎬 Movies
        </h2>
        <div className="overflow-x-auto bg-white shadow-sm rounded-xl">
          <table className="min-w-full text-sm text-left border-collapse">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-4 py-3 font-semibold">Title</th>
                <th className="px-4 py-3 font-semibold">Score</th>
                <th className="px-4 py-3 font-semibold">Added By</th>
              </tr>
            </thead>
            <tbody>
              {movies.map((m, i) => (
                <tr
                  key={m._id}
                  className={`${
                    i % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-blue-50 transition`}
                >
                  <td className="px-4 py-3 text-gray-900 font-medium">
                    {m.title}
                  </td>
                  <td className="px-4 py-3 text-gray-700">{m.score ?? 0}</td>
                  <td className="px-4 py-3 text-gray-600">
                    {getUserName(m.added_by)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Users Table */}
      <div>
        <h2 className="text-2xl font-semibold mb-6 text-gray-800 border-b-2 border-blue-600 inline-block pb-1">
          👥 Users
        </h2>
        <div className="overflow-x-auto bg-white shadow-sm rounded-xl">
          <table className="min-w-full text-sm text-left border-collapse">
            <thead className="bg-gray-100 text-gray-700 uppercase text-xs">
              <tr>
                <th className="px-4 py-3 font-semibold">Name</th>
                <th className="px-4 py-3 font-semibold">Email</th>
                <th className="px-4 py-3 font-semibold">Role</th>
              </tr>
            </thead>
            <tbody>
              {users.map((u, i) => (
                <tr
                  key={u._id}
                  className={`${
                    i % 2 === 0 ? "bg-white" : "bg-gray-50"
                  } hover:bg-blue-50 transition`}
                >
                  <td className="px-4 py-3 text-gray-900 font-medium">
                    {u.name}
                  </td>
                  <td className="px-4 py-3 text-gray-700">{u.email}</td>
                  <td
                    className={`px-4 py-3 ${
                      u.role === "admin"
                        ? "text-blue-600 font-semibold"
                        : "text-gray-600"
                    }`}
                  >
                    {u.role}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
