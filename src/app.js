const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
require("dotenv").config();

// Importar rutas
const authRoutes = require("./routes/authRoutes");
const topicRoutes = require("./routes/topicRoutes");
const examRoutes = require("./routes/examRoutes");
const matchRoutes = require("./routes/matchRoutes");
const rankingRoutes = require("./routes/rankingRoutes");
const questionRoutes = require("./routes/questionRoutes");

connectDB();

const app = express();
app.use(express.json());

// Configurar CORS
app.use(cors({ origin: "http://localhost:8080" }));

// Rutas
app.use("/api/auth", authRoutes);
app.use("/api/topics", topicRoutes);
app.use("/api/exams", examRoutes);
app.use("/api/matches", matchRoutes);
app.use("/api/ranking", rankingRoutes);
app.use("/api/questions", questionRoutes);

module.exports = app;