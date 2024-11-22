const mongoose = require("mongoose");

const rankingSchema = mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true, unique: true },
        totalScore: { type: Number, default: 0 },
        lastUpdated: { type: Date, default: Date.now },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Ranking", rankingSchema);