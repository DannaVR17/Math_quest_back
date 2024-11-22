const express = require("express");
const router = express.Router();
const authMiddleware = require("../middlewares/authMiddleware");
const { register, login, logout, getLoggedInUsers } = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.post("/logout", authMiddleware, logout);
router.get("/logged-in-users", authMiddleware, getLoggedInUsers);

module.exports = router;