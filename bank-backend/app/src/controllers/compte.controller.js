import Compte from "../models/Compte.js";
import { validateXmlAgainstXsd, parseXmlToJson } from "../services/xml.service.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// LISTE DES COMPTES
export const list = async (req, res) => {
  try {
    if (req.user.role === "manager") {
      const comptes = await Compte.find();
      return res.json(comptes);
    } else if (req.user.role === "agent") {
      const comptes = await Compte.find();
      return res.json(comptes);
    } else {
      return res.status(403).json({ message: "Forbidden" });
    }
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


export const searchComptes = async (req, res) => {
  try {
    const { q, statut } = req.query;
    const filter = {};

    const andConditions = [];

    if (q) {
      const words = q.trim().split(/\s+/);
      words.forEach(word => {
        andConditions.push({
          $or: [
            { nom: { $regex: word, $options: "i" } },
            { prenom: { $regex: word, $options: "i" } }
          ]
        });
      });
    }

    if (statut) {
      andConditions.push({ statut: statut.toLowerCase() });
    }

    if (andConditions.length > 0) filter.$and = andConditions;

    const results = await Compte.find(filter);
    res.json({ count: results.length, results });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error while searching", error: err.message });
  }
};


// GET UN COMPTE
export const get = async (req, res) => {
  try {
    const c = await Compte.findOne({ id: req.params.id });
    if (!c) return res.status(404).json({ message: "Not found" });

  if (req.user.role === "agent") {
  
  return res.json({
    id: c.id,
    nom: c.nom,
    prenom: c.prenom,
    email: c.email,
    numero: c.numero,
    type: c.type,
    solde: c.solde,
    devise: c.devise,
    dateCreation: c.dateCreation,
    statut: c.statut,
  });
}


    res.json(c);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};


// CREATE COMPTE
export const create = async (req, res) => {
  try {
    const c = new Compte(req.body);
    await c.save();
    res.status(201).json(c);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// UPDATE COMPTE
export const update = async (req, res) => {
  try {
    const c = await Compte.findOne({ id: req.params.id });
    if (!c) return res.status(404).json({ message: "Not found" });

    if (req.user.role === "agent" && c.email !== req.user.email)
      return res.status(403).json({ message: "Forbidden" });

    // Champs modifiables selon rôle
    const allowedFields = req.user.role === "manager"
      ? ["nom","prenom","email","numero","type","solde","devise","dateCreation","statut"]
      : ["email","password"]; 

    const updateData = {};
    for (const key of allowedFields) {
      if (req.body[key] !== undefined) updateData[key] = req.body[key];
    }

    const updated = await Compte.findOneAndUpdate(
      { id: req.params.id },
      updateData,
      { new: true }
    );

    res.json(updated);
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// DELETE COMPTE
export const remove = async (req, res) => {
  try {
    const c = await Compte.findOne({ id: req.params.id });
    if (!c) return res.status(404).json({ message: "Not found" });

    if (req.user.role === "agent") return res.status(403).json({ message: "Forbidden" });

    await Compte.deleteOne({ id: req.params.id });
    res.json({ message: "Deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server error", error: err.message });
  }
};

// IMPORT XML
export const importXml = async (req, res) => {
  try {
    if (!req.file) return res.status(400).json({ message: "No file provided" });

    const xsdPath = path.join(__dirname, "..", "data", "banque.xsd");
    const xsdString = fs.readFileSync(xsdPath, "utf8");

    const { valid, errors } = validateXmlAgainstXsd(req.file.buffer, xsdString);
    if (!valid) return res.status(400).json({ message: "XML invalid", errors });

    const json = await parseXmlToJson(req.file.buffer);
    const comptesRaw = json.banque.comptes[0].compte;
    const comptes = Array.isArray(comptesRaw) ? comptesRaw : [comptesRaw];

    for (const c of comptes) {
      const id = c.$.id;

      await Compte.updateOne(
        { id },
        {
          $set: {
            id,
            nom: c.nom[0],
            prenom: c.prenom[0],
            email: c.email[0],
            numero: c.numero[0],
            type: c.type[0],
            solde: parseFloat(c.solde[0]),
            devise: c.devise[0],
            dateCreation: c.dateCreation[0],
            statut: c.statut[0]
          }
        },
        { upsert: true }
      );
    }

    res.json({ message: "Import successful", count: comptes.length });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Server error", error: err.message });
  }
};
