const express = require("express");
const router = express.Router();

const {
  createDebate,
  getDebates,
  getDebateById,
} = require("../controllers/debateController");

const authMiddleware = require("../middleware/authMiddleware");

router.post("/", authMiddleware, createDebate);
router.get("/", getDebates);
router.get("/:id", getDebateById);

module.exports = router;