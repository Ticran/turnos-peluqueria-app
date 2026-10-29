import React, { createContext, useContext, useState } from "react";

const AuthContext = createContext(null);

// Lee el vencimiento ("exp", en segundos) del JWT sin validarlo: la firma la valida el backend
const isExpired = (token) => {
  try {
    const { exp } = JSON.parse(atob(token.split(".")[1].replace(/-/g, "+").replace(/_/g, "/")));
    return !exp || exp * 1000 <= Date.now();
  } catch {
    return true;
  }
};

const readToken = () => {
  const token = localStorage.getItem("lumen_token");
  if (token && isExpired(token)) {
    localStorage.removeItem("lumen_token");
    localStorage.removeItem("lumen_user");
    return null;
  }
  return token;
};

const readUser = () => {
  try {
    return JSON.parse(localStorage.getItem("lumen_user"));
  } catch {
    return null;
  }
};

export function AuthProvider({ children }) {
  const [token, setToken] = useState(readToken);
  const [user, setUser] = useState(readUser);

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
