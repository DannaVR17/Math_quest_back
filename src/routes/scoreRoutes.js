const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const { createOrUpdateScore, getRanking } = require("../controllers/scoreController");

// Obtener todos los temas
router.get("/", getRanking);

// Crear un nuevo tema
router.post("/", authMiddleware, createOrUpdateScore);

module.exports = router;