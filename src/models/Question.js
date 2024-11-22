const mongoose = require("mongoose");

const questionSchema = mongoose.Schema(
    {
        topic: { type: mongoose.Schema.Types.ObjectId, ref: "Topic", required: true },
        category: { type: String, required: true },
        type: { type: String, enum: ["opción múltiple", "verdadero/falso"], required: true },
        content: { type: String, required: true },
        correctAnswer: {
            type: String,
            required: true,
            validate: {
                validator: function (v) {
                    return this.options.includes(v);
                },
                message: "Correct answer must be one of the options",
            },
        },
        options: {
            type: [String],
            validate: [v => v.length >= 2, "A question must have at least 2 options"],
        },
        timeLimit: { type: Number, default: 20 },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Question", questionSchema);