import axios from "axios";
import { createContext, useState } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(
    localStorage.getItem("accessToken") || null
  );

  const login = async (inputs) => {
    const res = await axios.post(
      "https://360backend2023.vercel.app/api/auth/login",
      inputs,
      {
        withCredentials: true,
      }
    );
    localStorage.setItem("accessToken", res.data);
    setAccessToken(res.data);
  };

  const logout = () => {
    localStorage.removeItem("accessToken");
  };

  return (
    <AuthContext.Provider value={{ accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
