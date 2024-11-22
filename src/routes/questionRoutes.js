const express = require("express");
const router = express.Router();
const {
    getAllQuestions,
    createQuestion,
    updateQuestion,
    deleteQuestion,
} = require("../controllers/questionController");

// Listar todas las preguntas
router.get("/", getAllQuestions);

// Crear una nueva pregunta
router.post("/", createQuestion);

// Actualizar una pregunta
router.put("/:id", updateQuestion);

// Eliminar una pregunta
router.delete("/:id", deleteQuestion);

module.exports = router;