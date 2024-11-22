const Exam = require("../models/Exam");

exports.createExam = async (req, res) => {
    const { user, topic, score, timeSpent, answers } = req.body;
    try {
        const exam = new Exam({ user, topic, score, timeSpent, answers });
        await exam.save();
        res.status(201).json(exam);
    } catch (error) {
        res.status(500).json({ message: "Error creating exam", error });
    }
};

exports.getExamsByUser = async (req, res) => {
    const { userId } = req.params;
    try {
        const exams = await Exam.find({ user: userId }).populate("topic");
        res.status(200).json(exams);
    } catch (error) {
        res.status(500).json({ message: "Error fetching exams", error });
    }
};