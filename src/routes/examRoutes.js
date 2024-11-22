const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const { createExam, getExamsByUser } = require("../controllers/examController");

// Crear un nuevo examen
router.post("/", authMiddleware, createExam);

// Obtener exámenes de un usuario
router.get("/user/:userId", authMiddleware, getExamsByUser);

module.exports = router;