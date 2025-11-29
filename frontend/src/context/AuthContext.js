import { createContext, useState } from "react";
import api from "../api/axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(
    JSON.parse(localStorage.getItem("user")) || null
  );

  const login = async (username, password) => {
    try {
      // Get JWT tokens
      const res = await api.post("/login/", { username, password });
      localStorage.setItem("token", res.data.access); // access token
      localStorage.setItem("refresh", res.data.refresh); // refresh token

      // Fetch user info after login
      const userRes = await api.get("/me/", {
        headers: {
          Authorization: `Bearer ${res.data.access}`,
        },
      });
      localStorage.setItem("user", JSON.stringify(userRes.data));
      setUser(userRes.data);
    } catch (err) {
      throw new Error("Login failed");
    }
  };

  const logout = () => {
    localStorage.clear();
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
