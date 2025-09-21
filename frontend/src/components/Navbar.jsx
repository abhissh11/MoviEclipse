import { Link } from "react-router-dom";
import { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import Button from "./Button";

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="bg-white shadow-md sticky top-0 z-50">
      <div className="max-w-6xl mx-auto px-2 md:px-6 py-4 flex justify-between items-center overflow-hidden">
        <Link to="/" className="text-xl md:text-2xl font-bold text-primary">
          MovieEclipse
        </Link>
        <div className="flex gap-4 items-center">
          {user?.user.role === "admin" && (
            <Link to="/admin" className="text-sm hover:text-primary">
              Dashboard
            </Link>
          )}
          {user ? (
            <>
              <span className="text-xs md:text-sm text-gray-700">
                Hi, {user.user.name}
              </span>
              <button
                onClick={logout}
                className="text-sm text-red-500 hover:underline cursor-pointer"
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
                <Button>Sign up</Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
