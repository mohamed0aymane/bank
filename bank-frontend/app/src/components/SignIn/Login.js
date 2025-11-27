import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./Login.css";

export default function Login() {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e) => {
    e.preventDefault();

    if (!email || !password) {
      alert("Veuillez entrer votre email et mot de passe.");
      return;
    }

    try {
      const res = await fetch("http://192.168.100.10:4000/api/auth/signin", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Identifiants invalides");
      }

      const data = await res.json();
      localStorage.setItem("token", data.token);

      navigate("/dashboard");
    } catch (err) {
      console.error(err);
      alert("Erreur : " + err.message);
    }
  };

  return (
    <div className="login-container">
      <div className="login-box">
        <h1>Se connecter</h1>
        <form onSubmit={login} className="login-form">
          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type="password"
            placeholder="Mot de passe"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit" className="login-btn">
            Se connecter
          </button>
          <button
            type="button"
            className="signup-btn"
            onClick={() => navigate("/signup")}
          >
            S'inscrire
          </button>
        </form>
      </div>
    </div>
  );
}
