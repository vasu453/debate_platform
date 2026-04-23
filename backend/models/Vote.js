const mongoose = require("mongoose");

const voteSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User",
    required: true,
  },
  argumentId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Argument",
    required: true,
  },
  value: {
    type: Number,
    enum: [1, -1], // 👍 = 1, 👎 = -1
    required: true,
  },
}, { timestamps: true });

// 🔧 IMPORTANT: prevent duplicate votes
voteSchema.index({ userId: 1, argumentId: 1 }, { unique: true });

module.exports = mongoose.model("Vote", voteSchema);