const Topic = require("../models/Topic");

exports.getAllTopics = async (req, res) => {
  try {
    const topics = await Topic.find();
    res.status(200).json(topics);
  } catch (error) {
    res.status(500).json({ message: "Error fetching topics", error });
  }
};

exports.createTopic = async (req, res) => {
  const { name, category, description, studyContent } = req.body;
  try {
    const topic = new Topic({ name, category, description, studyContent });
    await topic.save();
    res.status(201).json(topic);
  } catch (error) {
    res.status(500).json({ message: "Error creating topic", error });
  }
};

// Obtener un tema por _id
exports.getTopicById = async (req, res) => {
  const { _id } = req.params; // Obtenemos el ID de los parámetros de la solicitud
  try {
      const topic = await Topic.findById(_id); // Buscamos el tema por ID
      if (!topic) {
          return res.status(404).json({ message: "Topic not found" });
      }
      res.status(200).json(topic);
  } catch (error) {
      res.status(500).json({ message: "Error fetching topic by ID", error });
  }
};