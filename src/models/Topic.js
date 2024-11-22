const mongoose = require("mongoose");

const topicSchema = mongoose.Schema(
    {
        name: { type: String, required: true },
        category: { type: String, enum: ["Estadística", "Geometría", "Álgebra"], required: true },
        description: { type: String, required: true },
        studyContent: { type: String, required: true },
    },
    { timestamps: true }
);

module.exports = mongoose.model("Topic", topicSchema);