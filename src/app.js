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
const protectedRoutes = require("./routes/protectedRoutes");
const invitationRoutes = require("./routes/invitationRoutes");
const scoreRoutes = require("./routes/scoreRoutes");
const score = require("./models/score");

connectDB();

const app = express();
app.use(express.json());

// Configurar CORS
app.use(cors({ origin: "http://localhost:8080" }));

// Rutas
app.use("/api/protected", protectedRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/topics", topicRoutes);
app.use("/api/exams", examRoutes);
app.use("/api/matches", matchRoutes);
app.use("/api/ranking", rankingRoutes);
app.use("/api/invitation", invitationRoutes);
app.use("/api/questions", questionRoutes);
app.use("/api/score",scoreRoutes);

module.exports = app;