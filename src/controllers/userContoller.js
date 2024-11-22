const User = require("../models/User");

// Buscar un usuario logueado aleatorio
exports.findRandomUser = async (req, res) => {
    try {
        // Buscar usuarios que estén logueados
        const loggedInUsers = await User.find({ isLoggedIn: true });
        if (loggedInUsers.length === 0) {
            return res.status(404).json({ message: "No users logged in" });
        }

        // Seleccionar un usuario aleatoriamente
        const randomUser = loggedInUsers[Math.floor(Math.random() * loggedInUsers.length)];
        res.status(200).json(randomUser);
    } catch (error) {
        res.status(500).json({ message: "Error fetching random user", error });
    }
};

// Actualizar el estado del usuario (online/offline)
exports.updateUserStatus = async (req, res) => {
    const { userId, status } = req.body; // status puede ser "online" o "offline"
    try {
        const user = await User.findById(userId);
        if (!user) {
            return res.status(404).json({ message: "User not found" });
        }

        // Actualizar el estado
        user.isLoggedIn = status === "online";
        await user.save();

        res.status(200).json({message: `User status updated to ${status}`, user });
    } catch (error) {
        res.status(500).json({ message: "Error updating user status", error });
    }
};

// Obtener la lista de usuarios actualmente logueados
exports.getLoggedInUsers = async (req, res) => {
    try {
        // Buscar usuarios con isLoggedIn igual a true
        const users = await User.find({ isLoggedIn: true }, { password: 0 }); // Excluir la contraseña
        res.status(200).json(users);
    } catch (error) {
        res.status(500).json({ message: "Error fetching logged-in users", error });
    }
};