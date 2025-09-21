import { createContext, useState, useEffect } from "react";
import { setAuthToken } from "../api/api";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => {
    const saved = localStorage.getItem("moviehub_user");
    return saved ? JSON.parse(saved) : null;
  });

  useEffect(() => {
    if (user?.token) setAuthToken(user.token);
    else setAuthToken(null);
  }, [user]);

  const login = (data) => {
    localStorage.setItem("moviehub_user", JSON.stringify(data));
    setUser(data);
  };

  const logout = () => {
    localStorage.removeItem("moviehub_user");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
