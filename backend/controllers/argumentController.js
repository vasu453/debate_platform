const Argument = require("../models/Argument");
const Vote = require("../models/Vote"); // 🔧 REQUIRED for scoring

// ======================
// CREATE ARGUMENT
// ======================
exports.createArgument = async (req, res) => {
  try {
    const { debateId, parentId, type, content } = req.body;

    const argument = await Argument.create({
      debateId,
      parentId: parentId || null,
      type,
      content,
      createdBy: req.userId || null, // 🔧 EDIT LATER: auth already works
    });

    res.status(201).json(argument);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ======================
// GET ARGUMENT TREE WITH SCORING
// ======================
exports.getArgumentsByDebate = async (req, res) => {
  try {
    // 🔧 STEP 1: get arguments
    const argumentsList = await Argument.find({
      debateId: req.params.debateId,
    }).sort({ createdAt: 1 });

    // 🔧 STEP 2: get votes
    const votes = await Vote.find();

    // 🔧 STEP 3: build vote map
    const voteMap = {};

    votes.forEach(vote => {
      const argId = vote.argumentId.toString();

      if (!voteMap[argId]) {
        voteMap[argId] = {
          upvotes: 0,
          downvotes: 0,
          score: 0,
        };
      }

      if (vote.value === 1) {
        voteMap[argId].upvotes++;
        voteMap[argId].score++;
      } else {
        voteMap[argId].downvotes++;
        voteMap[argId].score--;
      }
    });

    // 🔧 STEP 4: attach votes + prepare tree nodes
    const map = {};
    const roots = [];

    argumentsList.forEach(arg => {
      const voteData = voteMap[arg._id] || {
        upvotes: 0,
        downvotes: 0,
        score: 0,
      };

      map[arg._id] = {
        ...arg._doc,
        ...voteData,
        children: [], // ❌ DO NOT TOUCH
      };
    });

    // 🔧 STEP 5: build tree
    argumentsList.forEach(arg => {
      if (arg.parentId) {
        map[arg.parentId]?.children.push(map[arg._id]);
      } else {
        roots.push(map[arg._id]);
      }
    });

const sortedTree = sortTreeByScore(roots); // 🔧 ADD THIS
res.json(sortedTree);

  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// ======================
// SORT TREE BY SCORE
// ======================
const sortTreeByScore = (nodes) => {
  nodes.sort((a, b) => b.score - a.score);

  nodes.forEach(node => {
    if (node.children.length > 0) {
      sortTreeByScore(node.children);
    }
  });

  return nodes;
};