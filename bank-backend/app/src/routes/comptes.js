import express from "express";
import {
  list,
  get,
  create,
  update,
  remove,
  importXml,
  searchComptes,
} from "../controllers/compte.controller.js";
import auth from "../middlewares/auth.middleware.js";
import checkRole from "../middlewares/role.middleware.js";
import upload from "../middlewares/upload.middleware.js";

const router = express.Router();

router.get("/", auth, checkRole(["manager", "agent"]), list);
router.get("/search",auth,checkRole(["manager", "agent"]),searchComptes);
router.get("/:id", auth, checkRole(["manager", "agent"]), get);

//sauf le manager permet de creer, modifier et supprimer un compte
router.post("/", auth, checkRole("manager"), create);
router.put("/:id", auth, checkRole("manager"), update);
router.delete("/:id", auth, checkRole("manager"), remove);
router.post("/import",auth,checkRole("manager"),upload.single("file"),importXml);

export default router;
