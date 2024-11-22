module.exports = (io) => {
    const activeUsers = {}; // Mapa de userId -> socketId
    io.on("connection", (socket) => {
        console.log(`Usuario conectado: ${socket.id}`);
        // Guardar el usuario y su socket.id cuando se conecta
        socket.on("register", (userId) => {
            activeUsers[userId] = socket.id; // Asociar userId con socket.id
            console.log(`Usuario registrado: ${userId} con socket ${socket.id}`);
        });

        // Eliminar al usuario cuando se desconecta
        socket.on("disconnect", () => {
            const userId = Object.keys(activeUsers).find((key) => activeUsers[key] === socket.id);
            if (userId) {
                delete activeUsers[userId];
                console.log(`Usuario desconectado: ${userId}`);
            }
        });

        // Evento para enviar una invitación
        socket.on("send-invitation", (data) => {
            const { sender, receiver } = data;
            console.log(`Invitación enviada de ${sender} a ${receiver}`);
            io.to(receiver).emit("receive-invitation", { sender });
        });

        // Notificar al receptor sobre la invitación
        socket.on("new-invitation", (invitation) => {
            io.to(invitation.receiver).emit("receive-invitation", invitation);
        });

        // Evento para aceptar una invitación
        socket.on("accept-invitation", (data) => {
            const { matchId, players } = data;
            console.log(`Partida iniciada con ID: ${matchId}`);
            io.emit("start-game", { matchId, players });
        });

        // Evento para registrar una respuesta
        socket.on("submit-answer", (data) => {
            const { matchId, playerId, answer, responseTime } = data;
            console.log(`Respuesta recibida en partida ${matchId}:`);
            console.log(`Jugador: ${playerId}, Respuesta: ${answer}, Tiempo: ${responseTime}s`);
            // Aquí podrías guardar la respuesta en la base de datos o procesarla
        });

        // Evento para manejar desconexión
        socket.on("disconnect", () => {
            console.log(`Usuario desconectado: ${socket.id}`);
            // Aquí podrías manejar la lógica de desconexión
        });
    });
};