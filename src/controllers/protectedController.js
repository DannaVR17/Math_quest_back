// protectedController.js

// Endpoint protegido que devuelve un mensaje si el usuario está autenticado
exports.protectedRoute = (req, res) => {
    res.status(200).json({
        message: "Acceso autorizado. Bienvenido a la ruta protegida.",
        user: req.user, // Información del usuario decodificada del token JWT
    });
};
