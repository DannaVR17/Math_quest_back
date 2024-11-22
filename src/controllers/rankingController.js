const Ranking = require("../models/Ranking");

exports.getGlobalRanking = async (req, res) => {
    try {
        const rankings = await Ranking.find()
            .populate("user", "username")
            .sort({ totalScore: -1 });
        res.status(200).json(rankings);
    } catch (error) {
        res.status(500).json({ message: "Error fetching rankings", error });
    }
};

exports.updateRanking = async (req, res) => {
    const { userId, totalScore, time } = req.body;
    try {
        const update = { lastUpdated: Date.now() };
        if (totalScore !== undefined) update.totalScore = totalScore;
        if (time !== undefined) update.totalTime = time;

        const ranking = await Ranking.findOneAndUpdate(
            { user: userId },
            { $inc: update },
            { new: true, upsert: true }
        );
        res.status(200).json(ranking);
    } catch (error) {
        res.status(500).json({ message: "Error updating ranking", error });
    }
};
exports.updateRanking = async (req, res) => {
    const { userId, time } = req.body;
    try {
        const ranking = await Ranking.findOneAndUpdate(
            { user: userId },
            { $inc: { totalScore: -time }, lastUpdated: Date.now() },
            { new: true, upsert: true }
        );
        res.status(200).json(ranking);
    } catch (error) {
        res.status(500).json({ message: "Error updating ranking", error });
    }
};