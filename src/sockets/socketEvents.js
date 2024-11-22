const activeUsers = {};
module.exports = (io) => {

    io.on("connection", (socket) => {
        console.log(`[${new Date().toISOString()}] Usuario conectado: ${socket.id}`);

        // Registrar usuario
        socket.on("register", (userId) => {
            activeUsers[userId] = socket.id; // Asociar el userId con el socket.id
            console.log(`Usuario registrado: ${userId} con socket ${socket.id}`);
        });

        // Enviar invitación
        socket.on("send-invitation", (data) => {
            const { sender, receiver } = data;
            const receiverSocketId = activeUsers[receiver];

            if (receiverSocketId) {
                console.log(`[${new Date().toISOString()}] Invitación enviada de ${sender} a ${receiver}`);
                io.to(receiverSocketId).emit("receive-invitation", { sender });
            } else {
                console.warn(`[${new Date().toISOString()}] Usuario ${receiver} no está conectado.`);
            }
        });

        // Aceptar invitación
        socket.on("accept-invitation", (data) => {
            const { matchId, players } = data;
            console.log(`[${new Date().toISOString()}] Partida iniciada con ID: ${matchId}`);
            players.forEach((playerId) => {
                const playerSocketId = activeUsers[playerId];
                if (playerSocketId) {
                    io.to(playerSocketId).emit("start-game", { matchId, players });
                }
            });
        });

        // Registrar respuesta
        socket.on("submit-answer", (data) => {
            const { matchId, playerId, answer, responseTime } = data;
            console.log(`[${new Date().toISOString()}] Respuesta recibida en partida ${matchId} de jugador ${playerId}`);
            console.log(`Respuesta: ${answer}, Tiempo: ${responseTime}s`);
            // Aquí podrías guardar la respuesta en la base de datos
        });

        // Desconexión
        socket.on("disconnect", () => {
            const userId = Object.keys(activeUsers).find((key) => activeUsers[key] === socket.id);
            if (userId) {
                delete activeUsers[userId];
                console.log(`[${new Date().toISOString()}] Usuario desconectado: ${userId}`);
            }
        });
    });
};

module.exports.activeUsers = activeUsers;
