const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const { createInvitation, getUserInvitations, acceptInvitation } = require("../controllers/invitationController");

// Crear invitación
router.post("/", authMiddleware, createInvitation);

// Obtener invitaciones de un usuario
router.get("/:userId", getUserInvitations);

// Aceptar una invitación
router.post("/:invitationId/accept", authMiddleware, acceptInvitation);

module.exports = router;