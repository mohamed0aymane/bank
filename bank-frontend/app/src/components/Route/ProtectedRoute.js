import React from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

export default function ProtectedRoute({ children, roles = [] }) {
  const token = localStorage.getItem("token");

  if (!token) return <Navigate to="/signin" />;

  try {
    const decoded = jwtDecode(token);

    
    const now = Date.now() / 1000; 
    if (decoded.exp && decoded.exp < now) {
      localStorage.removeItem("token");
      return <Navigate to="/signin" />;
    }

   
    if (roles.length > 0 && !roles.includes(decoded.role)) {
      return <Navigate to="/signin" />;
    }

  } catch (err) {
   
    localStorage.removeItem("token");
    return <Navigate to="/signin" />;
  }

  return children;
}
