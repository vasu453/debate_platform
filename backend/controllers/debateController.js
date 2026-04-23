const Debate = require("../models/Debate");

// CREATE DEBATE
exports.createDebate = async (req, res) => {
  try {
    const { title, description } = req.body;

    const debate = await Debate.create({
      title,
      description,
      createdBy: req.userId, 
    });

    res.status(201).json(debate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET ALL DEBATES
exports.getDebates = async (req, res) => {
  try {
    const debates = await Debate.find().sort({ createdAt: -1 });
    res.json(debates);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// GET SINGLE DEBATE
exports.getDebateById = async (req, res) => {
  try {
    const debate = await Debate.findById(req.params.id);
    res.json(debate);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};