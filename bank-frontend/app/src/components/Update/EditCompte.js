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
    devise: "dh",
    dateCreation: "",
    statut: "",
  });

  const [originalDate, setOriginalDate] = useState("");
  const externalEmail = /^[a-zA-Z0-9._]+@(gmail|hotmail|yahoo|outlook)\.com$/;
  const phoneRegex = /^(06|07)\d{8}$/

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

   
      if (data.dateCreation) {
        const isoDate = data.dateCreation.split("T")[0];
        data.dateCreation = isoDate;
        setOriginalDate(isoDate);
      }

      data.devise = "dh"; 
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

      
    if (!externalEmail.test(form.email)) {
      alert("Email invalide ! Seuls gmail.com, hotmail.com, yahoo.com, outlook.com sont acceptés.");
      return;
    }

    
    if (!phoneRegex.test(form.numero)) {
      alert("Numéro de téléphone invalide ! Format accepté : 06XXXXXXXX ou 07XXXXXXXX");
      return;
    }

    if (form.dateCreation < originalDate) {
      alert("La date de création ne peut pas être antérieure à la date d'origine.");
      return;
    }

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

        <input type="text" name="nom" placeholder="Nom" value={form.nom} readOnly />
        <input
          type="text"
          name="prenom"
          placeholder="Prénom"
          value={form.prenom}
          readOnly
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
          value="dh"
          disabled
        />

        <label>Date de création :</label>
        <input
          type="date"
          name="dateCreation"
          value={form.dateCreation}
          min={originalDate}     
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
