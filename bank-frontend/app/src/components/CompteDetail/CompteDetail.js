import React, { useEffect, useState, useRef } from "react";
import { useParams, useNavigate } from "react-router-dom";
import jsPDF from "jspdf";
import html2canvas from "html2canvas";
import "./CompteDetail.css";


export default function CompteDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const token = localStorage.getItem("token");
  const [compte, setCompte] = useState(null);

  const pdfRef = useRef();

  useEffect(() => {
    const fetchCompte = async () => {
      try {
        const res = await fetch(`http://192.168.100.10:4000/api/comptes/${id}`, {
          method: "GET",
          headers: { Authorization: "Bearer " + token },
        });

        if (!res.ok) {
          const errorData = await res.json();
          throw new Error(errorData.message || "Erreur chargement compte");
        }

        const data = await res.json();
        setCompte(data);
      } catch (err) {
        console.error(err);
        alert("Erreur : " + err.message);
        navigate(-1);
      }
    };

    fetchCompte();
  }, [id, token]);

  
  const downloadPDF = async () => {
    const element = pdfRef.current;

    const canvas = await html2canvas(element);
    const imgData = canvas.toDataURL("image/png");

    const pdf = new jsPDF("p", "mm", "a4");
    const imgWidth = 190; // largeur ajustée
    const pageHeight = 295;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;

    pdf.addImage(imgData, "PNG", 10, 10, imgWidth, imgHeight);
    pdf.save(`compte_${compte.id}.pdf`);
  };

  if (!compte) return <p>Chargement...</p>;

  return (
    <div className="compte-detail-container">
      <div ref={pdfRef} className="compte-detail-content">
        <h2>Détails du compte {compte.nom} {compte.prenom}</h2>
        <ul>
          <li><b>ID :</b> {compte.id}</li>
          <li><b>Nom :</b> {compte.nom}</li>
          <li><b>Prénom :</b> {compte.prenom}</li>
          <li><b>Email :</b> {compte.email}</li>
          <li><b>Numéro :</b> {compte.numero}</li>
          <li><b>Type :</b> {compte.type}</li>
          <li><b>Solde :</b> {compte.solde} {compte.devise}</li>
          <li><b>Date création :</b> {new Date(compte.dateCreation).toLocaleDateString()}</li>
          <li><b>Statut :</b> {compte.statut}</li>
        </ul>
      </div>
      <div className="detail-buttons">
        <button onClick={() => navigate(-1)}>Retour</button>
        <button onClick={downloadPDF} className="pdf-btn">
          Télécharger PDF
        </button>
      </div>
       
    </div>
  );
}
