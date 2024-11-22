const Match = require("../models/Match");
const User = require("../models/User");
const Ranking = require("../models/Ranking");
const Invitation = require("../models/Invitation");
const activeUsers = require("../sockets/socketEvents").activeUsers;


// Crear una nueva partida
exports.createMatch = async (req, res) => {
    const { players, questions } = req.body;
    try {
        const match = new Match({
            players,
            questions,
            results: [],
        });
        await match.save();
        res.status(201).json({ message: "Match created successfully", match });
    } catch (error) {
        res.status(500).json({ message: "Error creating match", error });
    }
};

exports.createMatchWithLoggedInUser = async (req, res) => {
    const { sender } = req.body;

    try {
        // Verificar que el remitente esté logueado
        const senderUser = await User.findById(sender);
        if (!senderUser || !senderUser.isLoggedIn) {
            return res.status(400).json({ message: "Sender must be logged in" });
        }

        // Buscar usuarios logueados al azar
        const loggedInUsers = await User.find({ _id: { $ne: sender }, isLoggedIn: true });
        if (loggedInUsers.length === 0) {
            return res.status(404).json({ message: "No logged-in users available for matching" });
        }

        // Seleccionar un usuario al azar
        const randomUser = loggedInUsers[Math.floor(Math.random() * loggedInUsers.length)];

        // Crear una invitación
        const invitation = new Invitation({
            sender,
            receiver: randomUser._id,
        });

        await invitation.save();

        // Obtener el socket.id del receptor
        const receiverSocketId = activeUsers[randomUser._id];
        if (receiverSocketId) {
            io.to(receiverSocketId).emit("receive-invitation", {
                sender,
                receiver: randomUser._id,
                invitationId: invitation._id,
            });
            console.log(`Invitación enviada a ${randomUser._id}`);
        } else {
            console.log(`El usuario ${randomUser._id} no está conectado al socket.`);
        }

        res.status(201).json({ message: "Match created and invitation sent", invitation });
    } catch (error) {
        res.status(500).json({ message: "Error creating match with logged-in user", error });
    }
};

// Registrar una respuesta de un jugador
exports.registerAnswer = async (req, res) => {
    const { matchId, playerId, questionId, answer, responseTime } = req.body;
    try {
        const match = await Match.findById(matchId);
        if (!match) return res.status(404).json({ message: "Match not found" });

        // Verificar si ya se registró una respuesta para esta pregunta por el jugador
        const existingAnswer = match.results.find(
            (result) => result.player.toString() === playerId && result.question.toString() === questionId
        );
        if (existingAnswer) {
            return res.status(400).json({ message: "Answer already registered for this question" });
        }

        // Registrar respuesta
        match.results.push({
            player: playerId,
            question: questionId,
            answer,
            time: responseTime,
        });
        await match.save();

        res.status(200).json({ message: "Answer registered", match });
    } catch (error) {
        res.status(500).json({ message: "Error registering answer", error });
    }
};

// Finalizar una partida
exports.finishMatch = async (req, res) => {
    const { matchId } = req.params;
    try {
        const match = await Match.findById(matchId).populate("players").populate("results");
        if (!match) return res.status(404).json({ message: "Match not found" });

        const { players, results } = match;

        // Verificar si ambos jugadores están desconectados
        const disconnectedPlayers = players.filter((player) => !player.isLoggedIn);
        if (disconnectedPlayers.length === players.length) {
            match.winner = null;
            match.status = "both-disconnected";
            await match.save();
            return res.status(200).json({ message: "Match ended in loss for both players", match });
        }

        // Verificar si un jugador está desconectado
        const disconnectedPlayer = players.find((player) => !player.isLoggedIn);
        if (disconnectedPlayer) {
            match.winner = players.find((player) => player._id.toString() !== disconnectedPlayer._id.toString());
            match.status = "win-by-disconnection";
            await match.save();
            return res.status(200).json({ message: "Match won by disconnection", match });
        }

        // Verificar respuestas y tiempos
        const playerScores = players.map((player) => {
            const playerResults = results.filter((result) => result.player.toString() === player._id.toString());
            const correctAnswers = playerResults.filter((result) => result.correct).length;
            const totalTime = playerResults.reduce((sum, result) => sum + result.time, 0);
            return { player, correctAnswers, totalTime };
        });

        // Determinar el ganador según las reglas
        const [player1, player2] = playerScores;
        if (player1.correctAnswers > player2.correctAnswers) {
            match.winner = player1.player;
        } else if (player2.correctAnswers > player1.correctAnswers) {
            match.winner = player2.player;
        } else if (player1.totalTime < player2.totalTime) {
            match.winner = player1.player;
        } else if (player2.totalTime < player1.totalTime) {
            match.winner = player2.player;
        } else {
            match.winner = null; // Empate
            match.status = "draw";
        }

        await match.save();
        res.status(200).json({ message: "Match finished", match });
    } catch (error) {
        res.status(500).json({ message: "Error finishing match", error });
    }
};

// Actualizar ranking
exports.updateRanking = async (req, res) => {
    const { playerId, score, time } = req.body; // score: puntos por respuestas correctas, time: tiempo total
    try {
        const ranking = await Ranking.findOneAndUpdate(
            { user: playerId },
            { $inc: { totalScore: score, totalTime: time }, lastUpdated: Date.now() },
            { new: true, upsert: true }
        );
        res.status(200).json(ranking);
    } catch (error) {
        res.status(500).json({ message: "Error updating ranking", error });
    }
};