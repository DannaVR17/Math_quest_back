const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const { getGlobalRanking, updateRanking } = require("../controllers/rankingController");

// Obtener el ranking global
router.get("/", getGlobalRanking);

// Actualizar el ranking de un usuario
router.put("/", authMiddleware, updateRanking);

module.exports = router;