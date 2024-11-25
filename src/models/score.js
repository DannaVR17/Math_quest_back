const mongoose = require("mongoose");

const scoreSchema = mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  topicId: { type: mongoose.Schema.Types.ObjectId, ref: "Topic", required: true },
  score: { type: Number, required: true, min: 0 },
}, { timestamps: true });

// Crear un índice único para userId y topicId
scoreSchema.index({ userId: 1, topicId: 1 }, { unique: true });

module.exports = mongoose.model("Score", scoreSchema);
