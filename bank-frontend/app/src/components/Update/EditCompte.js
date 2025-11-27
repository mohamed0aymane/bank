import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import "./EditCompte.css";

export default function EditCompte() {
  const { id } = useParams();
  const token = localStorage.getItem("token");

  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    email: "",
    numero: "",
    type: "",
    solde: "",
    devise: "",
    dateCreation: "",
    statut: "",
  });

  const load = async () => {
    try {
      const res = await fetch(`http://192.168.100.10:4000/api/comptes/${id}`, {
        method: "GET",
        headers: { Authorization: "Bearer " + token },
        credentials: "include",
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Erreur lors du chargement du compte");
      }

      const data = await res.json();

      // convertir date pour affichage input type=date
      if (data.dateCreation) {
        data.dateCreation = data.dateCreation.split("T")[0];
      }

      setForm(data);
    } catch (err) {
      console.error(err);
      alert("Erreur : " + err.message);
    }
  };

  useEffect(() => {
    load();
  }, []);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch(`http://192.168.100.10:4000/api/comptes/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: "Bearer " + token,
        },
        credentials: "include",
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Erreur lors de la mise à jour du compte");
      }

      alert("Compte mis à jour !");
      window.location.href = "/dashboard";
    } catch (err) {
      console.error(err);
      alert("Erreur : " + err.message);
    }
  };

  return (
    <div className="edit-container">
      <form onSubmit={submit}>
        <h2>Modifier le Compte {id}</h2>

        <input
          type="text"
          name="nom"
          placeholder="Nom"
          value={form.nom}
          onChange={handleChange}
        />
        <input
          type="text"
          name="prenom"
          placeholder="Prénom"
          value={form.prenom}
          onChange={handleChange}
        />
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={form.email}
          onChange={handleChange}
        />
        <input
          type="text"
          name="numero"
          placeholder="Numéro"
          value={form.numero}
          onChange={handleChange}
        />
        <input
          type="text"
          name="type"
          placeholder="Type (ex: courant)"
          value={form.type}
          onChange={handleChange}
        />
        <input
          type="number"
          name="solde"
          placeholder="Solde"
          value={form.solde}
          onChange={handleChange}
        />
        <input
          type="text"
          name="devise"
          placeholder="Devise"
          value={form.devise}
          onChange={handleChange}
        />

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

        <button type="submit" className="modifiercompte-btn">Modifier</button>

        <button
          type="button"
          className="modifiercompte-back"
          onClick={() => (window.location.href = "/dashboard")}
          style={{ marginLeft: 10 }}
        >
          Retour Dashboard
        </button>
      </form>
    </div>
  );
}
