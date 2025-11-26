// src/server.js
import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import connectDB from "./config/db.js";

import authRoutes from "./routes/auth.js";
import comptesRoutes from "./routes/comptes.js";


dotenv.config(); // Charge .env

export default class Server {

    constructor(port = 4000) {
        this.port = port;
        this.app = express();

        this.config();
        this.routes();
    }


    config() {
        this.app.use(cors({
        origin: ['http://localhost:3000', 'http://192.168.100.135:3000'],
        credentials: true
    }));

        this.app.use(express.json());
    }

    // ------------------------------
    // ROUTES
    // ------------------------------
    routes() {
        this.app.use("/api/auth", authRoutes);
        this.app.use("/api/comptes", comptesRoutes);


        // health check
        this.app.get("/", (req, res) => {
            res.send("Bank backend running");
        });
    }

    // ------------------------------
    // START SERVER
    // ------------------------------
    async start(callback) {
        try {
            await connectDB(process.env.MONGO_URI);
            console.log("MongoDB connected");

            this.app.listen(this.port, callback ?? (() => {
                console.log(`Server listening on port ${this.port}`);
            }));
        } 
        catch (err) {
            console.error("Error starting server:", err);
        }
    }
}
