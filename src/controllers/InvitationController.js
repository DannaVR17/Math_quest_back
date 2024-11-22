const Invitation = require("../models/Invitation");
const Match = require("../models/Match");

exports.createInvitation = async (req, res) => {
    const { senderId, receiverId } = req.body;
    try {
        const existingInvitation = await Invitation.findOne({ sender: senderId, receiver: receiverId, status: "pending" });
        if (existingInvitation) {
            return res.status(400).json({ message: "Invitation already exists" });
        }

        const invitation = new Invitation({ sender: senderId, receiver: receiverId });
        await invitation.save();
        res.status(201).json(invitation);
    } catch (error) {
        res.status(500).json({ message: "Error creating invitation", error });
    }
};

exports.acceptInvitation = async (req, res) => {
    const { invitationId } = req.params;
    try {
        const invitation = await Invitation.findById(invitationId).populate("sender").populate("receiver");
        if (!invitation) {
            return res.status(404).json({ message: "Invitation not found" });
        }

        // Crear una nueva partida
        const match = new Match({
            players: [invitation.sender._id, invitation.receiver._id],
            questions: [], // Aquí puedes cargar preguntas específicas
            results: [],
        });

        await match.save();

        // Actualizar la invitación como aceptada
        invitation.status = "accepted";
        await invitation.save();

        res.status(200).json({ message: "Invitation accepted", match });
    } catch (error) {
        res.status(500).json({ message: "Error accepting invitation", error });
    }
};

exports.getUserInvitations = async (req, res) => {
    const { userId } = req.params;

    try {
        // Buscar invitaciones pendientes para el usuario
        const invitations = await Invitation.find({
            receiver: userId,
            status: "pending", // Solo traer las invitaciones pendientes
        }).populate("sender", "username"); // Popula el remitente para obtener detalles como el nombre de usuario

        if (!invitations.length) {
            return res.status(404).json({ message: "No pending invitations found" });
        }

        res.status(200).json(invitations);
    } catch (error) {
        res.status(500).json({ message: "Error fetching invitations", error });
    }
};