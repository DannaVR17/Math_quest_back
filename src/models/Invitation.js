const mongoose = require("mongoose");

const invitationSchema = mongoose.Schema({
    sender: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    receiver: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    status: { type: String, enum: ["Pendiente", "Aceptada", "Cancelada"], default: "Pendiente" },
    createdAt: { type: Date, default: Date.now },
});

invitationSchema.index({ sender: 1, receiver: 1 }, { unique: true });

module.exports = mongoose.model("Invitation", invitationSchema);