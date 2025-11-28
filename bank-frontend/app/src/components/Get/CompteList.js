import React, { useEffect, useState } from "react";
import "./CompteList.css";


export default function CompteList({ role }) {
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

      <table className="compte-table">
        <thead>
          <tr>
            <th>Nom</th>
            <th>Prénom</th>
            <th>Email</th>
            <th>Numéro</th>
            <th>Type</th>
            <th>Solde</th>
            <th>Devise</th>
            <th>Date création</th>
            <th>Statut</th>
            {role === "manager" && <th>Actions</th>}
          </tr>
        </thead>
        <tbody>
          {comptes.map((c) => (
            <tr key={c.id}>
              <td>{c.nom}</td>
              <td>{c.prenom}</td>
              <td>{c.email}</td>
              <td>{c.numero}</td>
              <td>{c.type}</td>
              <td>{c.solde}</td>
              <td>{c.devise}</td>
              <td>{new Date(c.dateCreation).toLocaleDateString()}</td>
              <td>{c.statut}</td>
              {role === "manager" && (
                <td>
                  <a href={`/comptes/edit/${c.id}`} className="btn-edit">Modifier</a>
                  <button className="btn-delete" onClick={() => removeCompte(c.id)}>Supprimer</button>
                </td>
              )}
            </tr>
          ))}
        </tbody>
      </table>
        
    </div>
  );
}
