const express = require("express");
const router = express.Router();
const { getAllTopics, createTopic, getTopicById } = require("../controllers/topicController");

// Obtener todos los temas
router.get("/", getAllTopics);

// Crear un nuevo tema
router.post("/", createTopic);

// Obtener un tema por _id
router.get("/:_id", getTopicById);

module.exports = router;