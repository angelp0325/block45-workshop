import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import authRoutes from "./routes/authRoutes.js";
import pool from "./config/db.js";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Test DB connection
pool.connect().then(() => console.log("🔗 PostgreSQL Ready"));

// Routes
app.use("/api", authRoutes);

app.get("/", (req, res) =>
  res.send("Secure Auth System with PostgreSQL Running...")
);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`🚀 Server running on port ${PORT}`));
