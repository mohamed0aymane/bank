import React, { useEffect, useState } from "react";
import "./CompteList.css";

export default function CompteList() {
  const [comptes, setComptes] = useState([]);
  const token = localStorage.getItem("token");

  const load = async () => {
    try {
      const res = await fetch("http://192.168.100.10:4000/api/comptes", {
        method: "GET",
        headers: {
          Authorization: "Bearer " + token,
        },
        credentials: "include",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Erreur lors du chargement des comptes");
      }

      const data = await res.json();
      setComptes(data);
    } catch (err) {
      console.error(err);
      alert("Erreur : " + err.message);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const removeCompte = async (id) => {
    if (!window.confirm("Supprimer ce compte ?")) return;

    try {
      const res = await fetch(`http://192.168.100.10:4000/api/comptes/${id}`, {
        method: "DELETE",
        headers: {
          Authorization: "Bearer " + token,
        },
        credentials: "include",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Erreur lors de la suppression du compte");
      }

      load();
    } catch (err) {
      console.error(err);
      alert("Erreur : " + err.message);
    }
  };

  return (
    <div className="compte-container">
      <h2>Liste des Comptes</h2>

      <a href="/comptes/add" className="add-btn">Ajouter un compte</a>

      {comptes.map((c) => (
        <div key={c.id} className="compte-card">
          <div className="compte-name">{c.nom} {c.prenom}</div>
          <div className="info-line"><span className="info-label">Solde :</span> {c.solde} {c.devise}</div>
          <div className="info-line"><span className="info-label">Email :</span> {c.email}</div>
          <div className="info-line"><span className="info-label">Numéro :</span> {c.numero}</div>
          <div className="info-line"><span className="info-label">Type :</span> {c.type}</div>
          <div className="info-line"><span className="info-label">Date création :</span> {new Date(c.dateCreation).toLocaleDateString()}</div>
          <div className="info-line"><span className="info-label">Statut :</span> {c.statut}</div>

          <div style={{ marginTop: 15 }}>
            <button className="btn-delete" onClick={() => removeCompte(c.id)}>
              Supprimer
            </button>
            <a href={`/comptes/edit/${c.id}`} className="btn-edit">
              Modifier
            </a>
             <button
                type="button"
                className="modifiercompte-back"
                onClick={() => (window.location.href = "/dashboard")}
                style={{ marginLeft: 10 }}
              >
                Retour Dashboard
              </button>
          </div>
        </div>
      ))}
    </div>
  );
}
