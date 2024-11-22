const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../config/jwt");

exports.register = async (req, res) => {
    const { username, password, email } = req.body;

    try {
        const user = new User({ username, password, email });
        await user.save();

        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        console.error("Error al registrar usuario:", error);
        res.status(500).json({ message: "Error registering user", error });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;

    try {
        const user = await User.findOne({ username });
        if (!user) {
            console.error("Usuario no encontrado:", username);
            return res.status(404).json({ message: "User not found" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: "Invalid credentials" });
        }

        user.isLoggedIn = true;
        await user.save();

        const token = generateToken(user);
        res.status(200).json({ token, user });
    } catch (error) {
        console.error("Error durante el login:", error);
        res.status(500).json({ message: "Error logging in", error });
    }
};

exports.logout = async (req, res) => {
    try {
        const { id } = req.user; // Suponiendo que el ID del usuario está en el token JWT
        const user = await User.findById(id);
        if (!user) return res.status(404).json({ message: "User not found" });

        // Marcar al usuario como no logueado
        user.isLoggedIn = false;
        await user.save();

        res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
        console.error("Error logging out:", error);
        res.status(500).json({ message: "Error logging out", error });
    }
};

// Obtener usuarios logueados
exports.getLoggedInUsers = async (req, res) => {
    try {
        const users = await User.find({ isLoggedIn: true });
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching logged-in users", error });
    }
};