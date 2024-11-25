const Score = require("../models/score"); // Modelo de puntuaciones

// Ruta para registrar una puntuación
exports.createOrUpdateScore = async (req, res) => {
  try {
    const { userId, topicId, score } = req.body;

    // Validar los datos de entrada
    if (!userId || !topicId || typeof score !== "number") {
      return res.status(400).json({ error: "Datos inválidos" });
    }

    // Buscar y actualizar el score, o crear uno nuevo si no existe
    const updatedScore = await Score.findOneAndUpdate(
      { userId, topicId }, // Criterios de búsqueda
      { score },           // Actualización
      { new: true, upsert: true, setDefaultsOnInsert: true } // Opciones
    );

    res.status(200).json({
      message: "Puntuación registrada/actualizada correctamente",
      score: updatedScore,
    });
  } catch (error) {
    console.error("Error al registrar/actualizar puntuación:", error);
    res.status(500).json({ error: "Error al registrar/actualizar la puntuación" });
  }
};


// Ruta para obtener el ranking
exports.getRanking = async (req, res) => {
  try {
    // Obtener usuarios con sus puntuaciones, ordenados por el total
    const ranking = await Score.aggregate([
      {
        $group: {
          _id: "$userId",
          totalScore: { $sum: "$score" },
        },
      },
      {
        $lookup: {
          from: "users", // Nombre de la colección de usuarios
          localField: "_id",
          foreignField: "_id",
          as: "user",
        },
      },
      { $unwind: "$user" }, // Desenrollar el array de usuarios
      { $sort: { totalScore: -1 } }, // Ordenar por puntuación descendente
    ]);

    res.status(200).json(ranking);
  } catch (error) {
    console.error("Error al obtener el ranking:", error);
    res.status(500).json({ error: "Error al obtener el ranking" });
  }
};