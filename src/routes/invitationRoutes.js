const express = require("express");
const router = express.Router();
const { createInvitation, getUserInvitations, acceptInvitation } = require("../controllers/invitationController");

// Crear invitación
router.post("/", createInvitation);

// Obtener invitaciones de un usuario
router.get("/:userId", getUserInvitations);

// Aceptar una invitación
router.post("/:invitationId/accept", acceptInvitation);

module.exports = router;