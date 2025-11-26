import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-card">

        <img
          src="https://cdn-icons-png.flaticon.com/512/483/483361.png"
          alt="bank"
          className="home-image"
        />

        <h1>Welcome to MHA Bank</h1>

        <p className="home-text">
          MHA Bank — votre partenaire financier moderne.  
          Gérez vos comptes, consultez vos opérations et administrez
          facilement votre espace bancaire en toute sécurité.
        </p>

        <div className="home-buttons">
          <button className="btn login" onClick={() => navigate("/signin")}>
            Sign In
          </button>

          <button className="btn signup" onClick={() => navigate("/signup")}>
            Sign Up
          </button>
        </div>
      </div>
    </div>
  );
}
