const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
    const authHeader = req.header("Authorization");

    // Verificar si el encabezado de autorización está presente
    if (!authHeader) {
        return res.status(401).json({ message: "Authorization header missing" });
    }

    // Extraer y validar el token
    const token = authHeader.replace("Bearer ", "");
    if (!token) {
        return res.status(401).json({ message: "No token provided" });
    }

    try {
        // Verificar el token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        req.user = decoded; // Agregar datos decodificados del usuario a la solicitud
        next();
    } catch (error) {
        // Manejo de errores de JWT
        if (error.name === "TokenExpiredError") {
            res.status(401).json({ message: "Token expired" });
        } else if (error.name === "JsonWebTokenError") {
            res.status(401).json({ message: "Invalid token" });
        } else {
            res.status(500).json({ message: "Token verification failed", error: error.message });
        }
    }
};

module.exports = authMiddleware;
