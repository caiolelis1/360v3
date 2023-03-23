import axios from "axios";
import { createContext, useEffect, useState } from "react";
import Cookies from "js-cookie";

export const AuthContext = createContext();

export const AuthContextProvider = ({ children }) => {
  const [accessToken, setAccessToken] = useState(
    Cookies.get("accessToken") || null
  );

  const login = async (inputs) => {
    const res = await axios.post(
      "http://localhost:8800/api/auth/login",
      inputs,
      {
        withCredentials: true,
      }
    );
    setAccessToken(res.data);
  };

  const logout = () => {
    Cookies.remove("accessToken");
  };

  return (
    <AuthContext.Provider value={{ accessToken, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
