const Question = require("../models/Question");

exports.getAllQuestions = async (req, res) => {
    try {
        const questions = await Question.find().populate("topic");
        res.status(200).json(questions);
    } catch (error) {
        res.status(500).json({ message: "Error fetching questions", error });
    }
};

exports.createQuestion = async (req, res) => {
    const { topic, category, type, content, correctAnswer, options, timeLimit } = req.body;
    try {
        const question = new Question({ topic, category, type, content, correctAnswer, options, timeLimit });
        await question.save();
        res.status(201).json(question);
    } catch (error) {
        res.status(500).json({ message: "Error creating question", error });
    }
};

exports.updateQuestion = async (req, res) => {
    const { id } = req.params;
    const updates = req.body;
    try {
        const question = await Question.findByIdAndUpdate(id, updates, { new: true });
        res.status(200).json(question);
    } catch (error) {
        res.status(500).json({ message: "Error updating question", error });
    }
};

exports.deleteQuestion = async (req, res) => {
    const { id } = req.params;
    try {
        await Question.findByIdAndDelete(id);
        res.status(200).json({ message: "Question deleted successfully" });
    } catch (error) {
        res.status(500).json({ message: "Error deleting question", error });
    }
};