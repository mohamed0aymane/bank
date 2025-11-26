import express from "express";
import { loginUser,registerUser } from "../controllers/auth.controller.js";
import auth from "../middlewares/auth.middleware.js";

const router = express.Router();

//se connecter
router.post("/signin", loginUser);
//s'inscrire
router.post("/signup", registerUser);

router.get("/me", auth, (req, res) => {
    res.json(req.user);
});


export default router;
