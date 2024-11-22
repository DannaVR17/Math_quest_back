const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const { protectedRoute } = require("../controllers/protectedController");

// Ruta protegida
router.get("/", authMiddleware, protectedRoute);

module.exports = router;
