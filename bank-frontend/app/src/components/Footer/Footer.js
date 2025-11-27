import React from "react";
import "./Footer.css";

export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="footer-content">
        <div className="footer-item">
          <h4>Contact</h4>
          <p>Email: mhabanklik@mhabank.com</p>
          <p>Fixe: 05-35-02-04-03</p>
          <p>Portable: 06-61-02-05-09</p>
        </div>
        <div className="footer-item">
          <h4>Localisation</h4>
          <p>Maroc, Fès</p>
        </div>
        <div className="footer-item">
          <h4>MHABank</h4>
          <p>Votre partenaire financier moderne et sécurisé.</p>
        </div>
      </div>
      <div className="footer-bottom">
        © {new Date().getFullYear()} MHABank. Tous droits réservés.
      </div>
    </footer>
  );
}
