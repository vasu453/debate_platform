const Vote = require("../models/Vote");

// ======================
// VOTE / UPDATE VOTE
// ======================
exports.voteArgument = async (req, res) => {
  try {
    const { argumentId, value } = req.body;

    // 🔧 value must be 1 or -1
    if (![1, -1].includes(value)) {
      return res.status(400).json({ message: "Invalid vote value" });
    }

    // check existing vote
    let vote = await Vote.findOne({
      userId: req.userId,
      argumentId,
    });

    if (vote) {
      // 🔧 UPDATE EXISTING VOTE
      vote.value = value;
      await vote.save();
    } else {
      // 🔧 CREATE NEW VOTE
      vote = await Vote.create({
        userId: req.userId,
        argumentId,
        value,
      });
    }

    res.json({ message: "Vote recorded" });

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};