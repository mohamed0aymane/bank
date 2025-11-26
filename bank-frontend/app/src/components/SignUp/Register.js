import React, { useState } from "react";
import "./Register.css";

export default function Register() {
  const [form, setForm] = useState({
    nom: "",
    prenom: "",
    email: "",
    password: "",
    role: "client",
  });

  const register = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch("http://192.168.100.135:4000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include", // équivalent de withCredentials: true
        body: JSON.stringify(form),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Registration error");
      }

      alert("User created !");
      window.location.href = "/signin";
    } catch (err) {
      alert("Erreur : " + err.message);
    }
  };

  return (
    <div className="register-container">
      <h1>Sign Up</h1>

      <form onSubmit={register}>
        <input
          placeholder="Nom"
          value={form.nom}
          onChange={(e) => setForm({ ...form, nom: e.target.value })}
        />
        <input
          placeholder="Prenom"
          value={form.prenom}
          onChange={(e) => setForm({ ...form, prenom: e.target.value })}
        />
        <input
          placeholder="Email"
          value={form.email}
          onChange={(e) => setForm({ ...form, email: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          value={form.password}
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <select
            value={form.role}
            onChange={(e) => {
              setForm({ ...form, role: e.target.value });
              console.log("Role choisi :", e.target.value);
            }}
          >
          <option value="manager">manager</option>
          <option value="client">client</option>
        </select>
        <button>Create Account</button>
      </form>
    </div>
  );
}
