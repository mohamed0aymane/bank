import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-left">
        <img
          src="https://cdn-icons-png.flaticon.com/512/483/483361.png"
          alt="bank"
          className="home-image"
        />
      </div>
      <div className="home-right">
        <h1 className="home-title">MHABank</h1>
        <p className="home-text">
          Gérez vos comptes, consultez vos opérations et administrez
          facilement votre espace bancaire en toute sécurité.
        </p>
        <div className="home-buttons">
          <button className="btn login" onClick={() => navigate("/signin")}>
            Se connecter
          </button>
          <button className="btn signup" onClick={() => navigate("/signup")}>
            S'inscrire
          </button>
        </div>
      </div>
    </div>
  );
}
