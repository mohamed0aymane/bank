import React, { useState } from "react";
import "./UploadXml.css";

export default function UploadXml() {
  const [file, setFile] = useState(null);
  const token = localStorage.getItem("token");

  const upload = async (e) => {
    e.preventDefault();

    if (!file) {
      alert("Sélectionne un fichier XML");
      return;
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch("http://192.168.100.10:4000/api/comptes/import", {
        method: "POST",
        headers: {
          Authorization: "Bearer " + token,
          
        },
        credentials: "include", 
        body: formData,
      });

      if (!res.ok) {
        const errorData = await res.json();
        throw new Error(errorData.message || "Erreur lors de l'import XML");
      }

      const data = await res.json();
      alert("XML Imported !");
      console.log(data);
    } catch (err) {
      console.error(err);
      alert("Erreur import: " + err.message);
    }
  };

  return (
    <div className="upload-container">
      <h2>Importer un fichier XML</h2>

      <form onSubmit={upload}>
        <input
          type="file"
          accept=".xml"
          onChange={(e) => setFile(e.target.files[0])}
        />

        <button type="submit">Import XML</button>
      </form>
    </div>
  );
}
