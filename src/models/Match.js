const mongoose = require("mongoose");

const matchSchema = mongoose.Schema(
    {
        players: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "User",
                required: true,
            },
        ],
        questions: [
            {
                type: mongoose.Schema.Types.ObjectId,
                ref: "Question",
                required: true,
            },
        ],
        results: [
            {
                player: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
                score: { type: Number, required: true },
            },
        ],
        winner: { type: mongoose.Schema.Types.ObjectId, ref: "User", default: null },
        date: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Match", matchSchema);