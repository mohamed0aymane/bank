import React, { useEffect, useState } from "react";
import CompteList from "../Get/CompteList";
import { jwtDecode } from "jwt-decode";
import Navbar from "../Navbar/Navbar";
import "./Dashboard.css";

export default function Dashboard() {
  const [role, setRole] = useState("");
  const token = localStorage.getItem("token");

  useEffect(() => {
    if (token) {
      try {
        const decoded = jwtDecode(token);
        setRole(decoded.role);
      } catch (err) {
        console.error(err);
      }
    }
  }, [token]);

  return (
    <div className="dashboard-container">
      <Navbar role={role} />

      <div className="dashboard-body">
        {role === "manager" && (
          <div className="dashboard-sidebar">
            <button
              className="addcompte-btn"
              onClick={() => window.location.href = "/comptes/import"}
            >
              Importer un fichier XML
            </button>

            <button
              className="addcompte-btn"
              onClick={() => window.location.href = "/comptes/add"}
            >
              Ajouter un nouveau compte
            </button>
          </div>
        )}

        <div className="dashboard-main">
          <CompteList role={role} />
        </div>
      </div>
    </div>
  );
}
