import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    nom: String,
    prenom: String,
    role: { type: String, enum: ["manager", "client"], required: true },
    email: { type: String, unique: true, required: true },
    telephone: String,
    password: { type: String, required: true }
  },
  { timestamps: true }
);

export default mongoose.model("User", UserSchema);
