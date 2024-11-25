const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const {
  getAllQuestions,
  createQuestion,
  updateQuestion,
  deleteQuestion,
} = require("../controllers/questionController");
const Question = require("../models/Question");

// Listar todas las preguntas
router.get("/", authMiddleware, getAllQuestions);

// Crear una nueva pregunta
router.post("/", createQuestion);

// Actualizar una pregunta
router.put("/:id", authMiddleware, updateQuestion);

// Eliminar una pregunta
router.delete("/:id", authMiddleware, deleteQuestion);

router.get("/topic/:topicId", async (req, res) => {
  try {
    const { topicId } = req.params;
    const questions = await Question.find({ topic: topicId });
    if (questions.length === 0) {
      return res
        .status(404)
        .json({ message: "No hay preguntas para este tema." });
    }
    res.json(questions);
  } catch (error) {
    res.status(500).json({ error: "Error al obtener las preguntas." });
  }
});

module.exports = router;
