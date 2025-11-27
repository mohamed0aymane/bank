import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import "./CompteDetail.css";

export default function CompteDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [compte, setCompte] = useState(null);

  useEffect(() => {
  const fetchCompte = async () => {
    try {
      const res = await fetch(`http://192.168.100.10:4000/api/comptes/${id}`, {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Erreur chargement compte");
      }

      const data = await res.json();
      setCompte(data);
    } catch (err) {
      console.error(err);
      alert("Erreur : " + err.message);
      navigate(-1); // retourne à la page précédente
    }
  };
  fetchCompte();
}, [id, token]);


  if (!compte) return <p>Chargement...</p>;

  return (
    <div className="compte-detail-container">
      <h2>Détails du compte {compte.nom} {compte.prenom}</h2>
      <ul>
        <li><b>ID :</b> {compte.id}</li>
        <li><b>Nom :</b> {compte.nom}</li>
        <li><b>Prénom :</b> {compte.prenom}</li>
        <li><b>Email :</b> {compte.email}</li>
        <li><b>Numéro :</b> {compte.numero}</li>
        <li><b>Type :</b> {compte.type}</li>
        <li><b>Solde :</b> {compte.solde} {compte.devise}</li>
        <li><b>Date création :</b> {new Date(compte.dateCreation).toLocaleDateString()}</li>
        <li><b>Statut :</b> {compte.statut}</li>
      </ul>
      <button onClick={() => navigate(-1)}>Retour</button>
    </div>
  );
}
