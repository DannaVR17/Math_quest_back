const User = require("../models/User");
const bcrypt = require("bcryptjs");
const generateToken = require("../config/jwt");

exports.register = async (req, res) => {
    const { username, password, email } = req.body;
    try {
        const hashedPassword = await bcrypt.hash(password, 10);
        const user = new User({ username, password: hashedPassword, email });
        await user.save();
        res.status(201).json({ message: "User registered successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error registering user", error });
    }
};

exports.login = async (req, res) => {
    const { username, password } = req.body;
    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ message: "User not found" });

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) return res.status(401).json({ message: "Invalid credentials" });

        // Marcar al usuario como logueado
        user.isLoggedIn = true;
        await user.save();

        const token = generateToken(user);
        res.status(200).json({ token, user });
    } catch (error) {
        res.status(500).json({ message: "Error logging in", error });
    }
};

exports.logout = async (req, res) => {
    const { username } = req.body; // Asume que envías el nombre de usuario
    try {
        const user = await User.findOne({ username });
        if (!user) return res.status(404).json({ message: "User not found" });

        // Marcar al usuario como no logueado
        user.isLoggedIn = false;
        await user.save();

        res.status(200).json({ message: "User logged out successfully" });
    } catch (error) {
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