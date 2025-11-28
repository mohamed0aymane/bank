import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Register.css";


export default function Register() {
  const navigate = useNavigate();
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    email: "",
    password: "",
    role: "",
    telephone: "",
  });

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validateForm = () => {
    const nameRegex = /^[A-Za-z]+$/;
    const phoneRegex = /^(06|07)\d{8}$/;
    

    if (!nameRegex.test(form.nom)) {
      alert("Le nom doit contenir uniquement des lettres.");
      return false;
    }

    if (!nameRegex.test(form.prenom)) {
      alert("Le prénom doit contenir uniquement des lettres.");
      return false;
    }

    if (!phoneRegex.test(form.telephone)) {
      alert(
        "Le numéro de téléphone doit commencer par 06 ou 07 et contenir 10 chiffres."
      );
      return false;
    }

    

    if (!form.password) {
      alert("Le mot de passe est requis.");
      return false;
    }

    if (!["manager", "agent"].includes(form.role)) {
      alert("Rôle invalide.");
      return false;
    }

    return true;
  };

  const register = async (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    try {
      const res = await fetch("http://192.168.100.10:4000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Erreur lors de l'inscription");
      }

      alert("Inscription réussie !");
      navigate("/signin");
    } catch (err) {
      console.error(err);
      alert("Erreur : " + err.message);
    }
  };

  return (
    <div className="register-container">
      <h1>Inscription</h1>
      <form onSubmit={register} className="register-form">
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
          placeholder="Email (nomprenom@bankmha.com)"
          value={form.email}
          onChange={handleChange}
        />
        <input
          type="password"
          name="password"
          placeholder="Mot de passe"
          value={form.password}
          onChange={handleChange}
        />
        <input
          type="text"
          name="telephone"
          placeholder="Téléphone (ex: 0612345678)"
          value={form.telephone}
          onChange={handleChange}
        />
        <select
          name="role"
          value={form.role}
          onChange={handleChange}
        >
          <option value="">-- Sélectionner un rôle --</option>
          <option value="manager">Manager</option>
          <option value="agent">Agent</option>
        </select>
        <button type="submit" className="register-btn">
          S'inscrire
        </button>
      </form>
      
    </div>
  );
}
