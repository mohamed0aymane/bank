import React from "react";
import CompteList from "../Get/CompteList";
import UploadXml from "../UploadXml/UploadXml";
import "./Dashboard.css";

export default function Dashboard() {
  return (
    <div className="dashboard-container">

      <div className="dashboard-header">
        <h1 className="dashboard-title">Dashboard</h1>

        <button
          className="logout-btn"
          onClick={() => {
            localStorage.removeItem("token");
            window.location.href = "/";
          }}
        >
          Logout
        </button>
      </div>

      <div className="section-box">
        <h2 className="section-title">Importer un fichier XML</h2>
        <UploadXml />
      </div>

      <div className="section-box">
        <h2 className="section-title">Liste des Comptes</h2>
        <CompteList />
      </div>

    </div>
  );
}
