import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode"; // <-- ici, c'est un export nommé

export default function ProtectedRoute({ children, roles = [] }) {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/signin" />;

  if (roles.length > 0) {
    try {
      const decoded = jwtDecode(token);
      if (!roles.includes(decoded.role)) {
        return <Navigate to="/signin" />;
      }
    } catch (err) {
      return <Navigate to="/signin" />;
    }
  }

  return children;
}
