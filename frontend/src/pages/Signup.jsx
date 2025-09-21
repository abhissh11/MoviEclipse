import { useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";
import { AuthContext } from "../context/AuthContext";
import Card from "../components/Card";
import Input from "../components/Input";
import Button from "../components/Button";

export default function Signup() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    try {
      const res = await API.post("/auth/signup", { name, email, password });
      login({ token: res.data.token, user: res.data.user });
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Signup failed");
    }
  };

  return (
    <Card className="max-w-md mx-auto">
      <h2 className="text-xl font-bold mb-4">Sign up</h2>
      <form onSubmit={submit} className="space-y-3">
        <Input
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Name"
        />
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
        <Button
          type="submit"
          className="w-full bg-green-600 hover:bg-green-700"
        >
          Create Account
        </Button>
      </form>
    </Card>
  );
}
