import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Navbar.css";

export default function Navbar({ role }) {
  const navigate = useNavigate();
  const [q, setQ] = useState("");
  const [statut, setStatut] = useState("");
  const [results, setResults] = useState([]);
  const token = localStorage.getItem("token");

  const search = async () => {
    try {
      const url = new URL("http://192.168.100.10:4000/api/comptes/search");

      if (q.trim() !== "") url.searchParams.append("q", q.trim());
      if (statut !== "") url.searchParams.append("statut", statut);

      const res = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + token,
          "Content-Type": "application/json"
        }
      });

      if (!res.ok) throw new Error("Erreur API : " + res.status);

      const data = await res.json();
      setResults(data.results || []);
    } catch (err) {
      console.error(err);
      alert("Erreur recherche : " + err.message);
    }
  };

  return (
    <nav className="navbar-container">
      <div className="navbar-left">
        <h2>MHABank</h2>
        <span>Role : {role ? role.toUpperCase() : "Invité"}</span>
      </div>

      <div className="navbar-center">
        <input
          type="text"
          placeholder="Nom / Prénom"
          value={q}
          onChange={(e) => setQ(e.target.value)}
          className="navbar-search-input"
        />
        <select
          value={statut}
          onChange={(e) => setStatut(e.target.value)}
          className="navbar-search-select"
        >
          <option value="">-- Statut --</option>
          <option value="active">Active</option>
          <option value="desactive">Désactivé</option>
        </select>
        <button onClick={search} className="navbar-search-btn">
          Rechercher
        </button>
      </div>

      <div className="navbar-right">
        <button
          className="navbar-logout"
          onClick={() => {
            localStorage.removeItem("token");
            navigate("/signin");
          }}
        >
          Logout
        </button>
      </div>

      {results.length > 0 && (
        <div className="navbar-search-results">
          {results.map((c) => (
            <div
              key={c.id}
              className="navbar-search-card"
              onClick={() => navigate(`/comptes/${c.id}`)}
              style={{ cursor: "pointer" }}
            >
              <b>{c.nom} {c.prenom}</b> — <span>{c.statut}</span>
              <br />
              Solde : {c.solde} {c.devise}
            </div>
          ))}
        </div>
      )}
    </nav>
  );
}
