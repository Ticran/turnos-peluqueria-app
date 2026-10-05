import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

const readUser = () => {
  try {
    return JSON.parse(localStorage.getItem("lumen_user"));
  } catch {
    return null;
  }
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(readUser);
  const [token, setToken] = useState(() => localStorage.getItem("lumen_token"));

  const login = (userData, userToken) => {
    setUser(userData);
    setToken(userToken);
    localStorage.setItem("lumen_user", JSON.stringify(userData));
    localStorage.setItem("lumen_token", userToken);
  };

  const logout = () => {
    setUser(null);
    setToken(null);
    localStorage.removeItem("lumen_user");
    localStorage.removeItem("lumen_token");
  };

  // Actualiza datos del usuario logueado (ej: nueva foto) sin cerrar sesión
  const updateUser = (changes) => {
    const next = { ...user, ...changes };
    setUser(next);
    localStorage.setItem("lumen_user", JSON.stringify(next));
  };

  const isAuthenticated = !!token && !!user;
  const isAdmin = user?.role === "ADMIN";

  return (
    <AuthContext.Provider value={{ user, token, login, logout, updateUser, isAuthenticated, isAdmin }}>
      {children}
    </AuthContext.Provider>
  );
}

// eslint-disable-next-line react-refresh/only-export-components
export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth debe ser utilizado dentro de un AuthProvider");
  }
  return context;
}
