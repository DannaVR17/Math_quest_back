const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const {
    findRandomUser,
    updateUserStatus,
    getLoggedInUsers,
} = require("../controllers/userController");

// Buscar un usuario aleatorio
router.get("/random", findRandomUser);

// Actualizar estado del usuario (online/offline)
router.post("/status", authMiddleware, updateUserStatus);

// Obtener usuarios logueados
router.get("/logged-in", getLoggedInUsers);

module.exports = router;