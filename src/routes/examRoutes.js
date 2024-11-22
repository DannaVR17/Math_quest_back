const express = require("express");
const router = express.Router();
const { createExam, getExamsByUser } = require("../controllers/examController");

// Crear un nuevo examen
router.post("/", createExam);

// Obtener exámenes de un usuario
router.get("/user/:userId", getExamsByUser);

module.exports = router;