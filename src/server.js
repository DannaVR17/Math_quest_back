const app = require("./app");
const http = require("http");
const { Server } = require("socket.io");

const server = http.createServer(app);
const io = new Server(server, {
    cors: {
        origin: "http://localhost:8080", // Permitir solicitudes desde tu frontend
        methods: ["GET", "POST"],
    },
});

// Importar archivo de eventos de Socket.IO
require("./sockets/socketEvents")(io);

// Iniciar el servidor
const PORT = process.env.PORT || 5000;
server.listen(PORT, () => {
    console.log(`Servidor corriendo en el puerto ${PORT}`);
});