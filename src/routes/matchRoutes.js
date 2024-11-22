const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const {
    createMatch,
    registerAnswer,
    finishMatch,
    updateRanking,
    createMatchWithLoggedInUser,
    
} = require("../controllers/matchController");

// Crear partida
router.post("/", authMiddleware, createMatch);

router.post("/createWithLoggedUser", authMiddleware, createMatchWithLoggedInUser);

// Registrar respuesta
router.post("/answer", authMiddleware, registerAnswer);

// Finalizar partida
router.post("/:matchId/finish", authMiddleware, finishMatch);

// Actualizar ranking
router.post("/ranking", updateRanking);

module.exports = router;