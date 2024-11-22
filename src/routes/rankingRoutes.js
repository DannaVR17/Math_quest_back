const express = require("express");
const router = express.Router();
const { getGlobalRanking, updateRanking } = require("../controllers/rankingController");

// Obtener el ranking global
router.get("/", getGlobalRanking);

// Actualizar el ranking de un usuario
router.put("/", updateRanking);

module.exports = router;