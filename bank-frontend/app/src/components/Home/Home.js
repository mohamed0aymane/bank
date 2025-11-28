import React from "react";
import { useNavigate } from "react-router-dom";
import "./Home.css";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="home-container">
      <div className="home-left">
        <div className="image-wrapper">
 
          <img src="/images/image.png" alt="MHABank" className="home-image" />
          <div className="reflection"></div>
        </div>
      </div>
      <div className="home-right">
        <h1 className="home-title">MHABank</h1>
        <p className="home-subtitle">
          Votre banque digitale <span>fiable</span>, <span>rapide</span> et <span>sécurisée</span>.
        </p>
        <ul className="home-features">
          <li>💳 Gérez vos comptes facilement</li>
          <li>🔒 Sécurité bancaire de pointe</li>
          
        </ul>
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
