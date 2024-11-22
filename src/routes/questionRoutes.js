const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const {
    getAllQuestions,
    createQuestion,
    updateQuestion,
    deleteQuestion,
} = require("../controllers/questionController");

// Listar todas las preguntas
router.get("/", authMiddleware, getAllQuestions);

// Crear una nueva pregunta
router.post("/", createQuestion);

// Actualizar una pregunta
router.put("/:id", authMiddleware, updateQuestion);

// Eliminar una pregunta
router.delete("/:id", authMiddleware, deleteQuestion);

module.exports = router;