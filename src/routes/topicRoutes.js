const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const { getAllTopics, createTopic, getTopicById } = require("../controllers/topicController");

// Obtener todos los temas
router.get("/", getAllTopics);

// Crear un nuevo tema
router.post("/", authMiddleware, createTopic);

// Obtener un tema por _id
router.get("/:_id", getTopicById);

module.exports = router;