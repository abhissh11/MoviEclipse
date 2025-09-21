import { useState, useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import API from "../api/api";
import { AuthContext } from "../context/AuthContext";
import Input from "../components/Input";
import Button from "../components/Button";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/login", { email, password });
      login({ token: res.data.token, user: res.data.user });
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Login failed");
    }
  };

  return (
    <div className="max-w-md mx-auto bg-gray-200 p-4 rounded-lg">
      <h2 className="text-xl font-bold mb-4 text-start">Login</h2>
      <form onSubmit={submit} className="space-y-5">
        <div className="flex flex-col gap-2">
          <Input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
          />
          <Input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
          />
        </div>
        <Button type="submit" className="w-full">
          Login
        </Button>
        <p>
          Don't have an account?{" "}
          <Link to="/signup">
            <span className="underline hover:text-blue-500">Signup</span>
          </Link>
        </p>
      </form>
    </div>
  );
}
