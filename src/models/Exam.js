const mongoose = require("mongoose");

const examSchema = mongoose.Schema(
    {
        user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
        topic: { type: mongoose.Schema.Types.ObjectId, ref: "Topic", required: true },
        date: { type: Date, default: Date.now },
        score: { type: Number, required: true, min: 0 },
        timeSpent: { type: Number, required: true, min: 0 },
        answers: [
            {
                question: { type: mongoose.Schema.Types.ObjectId, ref: "Question", required: true },
                userAnswer: { type: String, required: true },
                correct: { type: Boolean, required: true },
            },
        ],
    },
    { timestamps: true }
);

module.exports = mongoose.model("Exam", examSchema);