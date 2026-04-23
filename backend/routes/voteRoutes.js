const express = require("express");
const router = express.Router();

const { voteArgument } = require("../controllers/voteController");
const authMiddleware = require("../middleware/authMiddleware");

// 🔧 PROTECTED ROUTE
router.post("/", authMiddleware, voteArgument);

module.exports = router;