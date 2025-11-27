import React, { useState } from "react";
import "./AddCompte.css";

export default function AddCompte() {
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    id: "",
    nom: "",
    prenom: "",
    email: "",
    numero: "",
    type: "",
    solde: "",
    devise: "dh",
    dateCreation: "",
    statut: "actif",
  });

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch("http://192.168.100.10:4000/api/comptes", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        credentials: "include", 
        body: JSON.stringify(form),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || "Erreur lors de la création du compte");
      }

      alert("Compte créé !");
      window.location.href = "/comptes";
    } catch (err) {
      console.error(err);
      alert("Erreur : " + err.message);
    }
  };

  return (
    <form className="addcompte-form" onSubmit={submit}>
      <h2 className="addcompte-title">Ajouter un Compte</h2>

      {Object.keys(form)
        .filter((key) => key !== "statut" && key !== "dateCreation")
        .map((key) => (
          <input
            key={key}
            type="text"
            name={key}
            placeholder={key}
            value={form[key]}
            onChange={handleChange}
          />
        ))}

      <label>Date de création :</label>
      <input
        type="date"
        name="dateCreation"
        value={form.dateCreation}
        onChange={handleChange}
      />

      <label>Statut :</label>
      <select name="statut" value={form.statut} onChange={handleChange}>
        <option value="actif">Actif</option>
        <option value="desactive">Désactivé</option>
      </select>

      <button className="addcompte-btn">Créer</button>

      <button
        type="button"
        className="addcompte-back"
        onClick={() => (window.location.href = "/dashboard")}
      >
        Retour Dashboard
      </button>
    </form>
  );
}
