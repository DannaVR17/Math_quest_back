const mongoose = require("mongoose");

const matchSchema = mongoose.Schema(
    {
        players: {
            type: [{ type: mongoose.Schema.Types.ObjectId, ref: "User", required: true }],
            validate: [v => v.length >= 2, "A match must have at least 2 players"],
        },
        questions: {
            type: [{ type: mongoose.Schema.Types.ObjectId, ref: "Question", required: true }],
            validate: [v => v.length >= 1, "A match must have at least 1 question"],
        },
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