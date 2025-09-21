import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-6 py-4 flex justify-between items-center">
        <Link to="/" className="text-2xl font-bold text-primary">
          MovieHub
        </Link>
        <div className="flex gap-4 items-center">
          {user?.user.role === "admin" && (
            <Link to="/admin" className="text-sm hover:text-primary">
              Dashboard
            </Link>
          )}
          {user ? (
            <>
              <span className="text-sm text-gray-700">
                Hi, {user.user.name}
              </span>
              <button
                onClick={logout}
                className="text-sm text-red-500 hover:underline"
              >
                Logout
              </button>
            </>
          ) : (
            <>
              <Link to="/login" className="text-sm hover:text-primary">
                Login
              </Link>
              <Link to="/signup" className="text-sm hover:text-primary">
                Sign up
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
