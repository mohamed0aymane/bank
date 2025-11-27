import React, { useState } from "react";
import "./CompteSearch.css";

export default function CompteSearch() {
  const [q, setQ] = useState("");
  const [statut, setStatut] = useState("");
  const [results, setResults] = useState([]);

  const token = localStorage.getItem("token");

  const search = async () => {
    try {
      const url = new URL("http://192.168.100.10:4000/api/comptes/search");

      // Ajouter q si nom/prenom
      if (q.trim() !== "") url.searchParams.append("q", q.trim());
      // Ajouter statut
      if (statut !== "") url.searchParams.append("statut", statut);

      const res = await fetch(url.toString(), {
        method: "GET",
        headers: {
          "Authorization": "Bearer " + token,
          "Content-Type": "application/json"
        }
      });

      if (!res.ok) {
        throw new Error("Erreur API : " + res.status);
      }

      const data = await res.json();
      setResults(data.results || []);
    } catch (err) {
      console.error(err);
      alert("Erreur recherche : " + err.message);
    }
  };

  return (
    <div className="search-container">
      {/* Recherche nom/prénom */}
      <input
        className="search-input"
        type="text"
        placeholder="Rechercher par nom ou prénom..."
        value={q}
        onChange={(e) => setQ(e.target.value)}
      />

      {/* Statut */}
      <select
        className="search-select"
        value={statut}
        onChange={(e) => setStatut(e.target.value)}
      >
        <option value="">-- Statut --</option>
        <option value="active">Active</option>
        <option value="desactive">Désactivé</option>
      </select>

      <button className="search-btn" onClick={search}>
        Rechercher
      </button>

      {/* Résultats */}
      <div className="search-results">
        {results.length === 0 && (
          <p style={{ color: "#888" }}>Aucun résultat pour le moment.</p>
        )}

        {results.map((c) => (
          <div key={c.id} className="search-card">
            <b>{c.nom} {c.prenom}</b> — <span>{c.statut}</span>
            <br />
            Solde : {c.solde} {c.devise}
          </div>
        ))}
      </div>
    </div>
  );
}
