const express = require("express");
const router = express.Router();
const {
    createMatch,
    registerAnswer,
    finishMatch,
    updateRanking,
    createMatchWithLoggedInUser,
    
} = require("../controllers/matchController");

// Crear partida
router.post("/", createMatch);

router.post("/create-with-logged-user", createMatchWithLoggedInUser);

// Registrar respuesta
router.post("/answer", registerAnswer);

// Finalizar partida
router.post("/:matchId/finish", finishMatch);

// Actualizar ranking
router.post("/ranking", updateRanking);

module.exports = router;