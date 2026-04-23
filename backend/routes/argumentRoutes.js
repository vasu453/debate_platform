const express = require("express");
const router = express.Router();

const {
  createArgument,
  getArgumentsByDebate,
} = require("../controllers/argumentController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, createArgument);
router.get("/:debateId", getArgumentsByDebate);

module.exports = router;