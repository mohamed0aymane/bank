import mongoose from "mongoose";

const CompteSchema = new mongoose.Schema(
  {
    id: { type: String, required: true, unique: true },  
    nom: String,
    prenom: String,
    email: String,
    numero: String,
    type: String,
    solde: Number,
    devise: String,
    dateCreation: Date,
    statut: String,
  },
  { timestamps: true }
);

export default mongoose.model("Compte", CompteSchema);
