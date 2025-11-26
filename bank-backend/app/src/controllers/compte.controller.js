import Compte from "../models/Compte.js";
import { validateXmlAgainstXsd, parseXmlToJson } from "../services/xml.service.js";
import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

export const list = async (req, res) => {
  res.json(await Compte.find());
};


export const create = async (req, res) => {
  const c = new Compte(req.body);
  await c.save();
  res.status(201).json(c);
};

export const get = async (req, res) => {
  const c = await Compte.findOne({ id: req.params.id });
  if (!c) return res.status(404).json({ message: "Not found" });
  res.json(c);
};

export const update = async (req, res) => {
  const c = await Compte.findOneAndUpdate(
    { id: req.params.id },
    req.body,
    { new: true }
  );
  
  if (!c) return res.status(404).json({ message: "Not found" });
  res.json(c);
};

export const remove = async (req, res) => {
  const c = await Compte.findOneAndDelete({ id: req.params.id });
  if (!c) return res.status(404).json({ message: "Not found" });
  
  res.json({ message: "Deleted" });
};


export const importXml = async (req, res) => {
  try {
    if (!req.file)
      return res.status(400).json({ message: "No file provided" });

    const xsdPath = path.join(__dirname, "..", "data", "banque.xsd");
    const xsdString = fs.readFileSync(xsdPath, "utf8");

    const { valid, errors } = validateXmlAgainstXsd(req.file.buffer, xsdString);
    if (!valid)
      return res.status(400).json({ message: "XML invalid", errors });

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
