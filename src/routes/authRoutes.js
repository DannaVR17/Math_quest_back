const express = require("express");
const router = express.Router();
const { register, login, logout, getLoggedInUsers } = require("../controllers/authController");

router.post("/register", register);
router.post("/login", login);
router.post("/logout", logout);
router.get("/logged-in-users", getLoggedInUsers);

module.exports = router;