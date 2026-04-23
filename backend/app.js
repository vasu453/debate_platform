const express = require("express");
const cors = require("cors");

const app = express();

// middleware
app.use(cors());
app.use(express.json());

// routes
app.use("/api/auth", require("./routes/authRoutes"));

// test route
app.get("/", (req, res) => {
  res.send("API is running...");
});

module.exports = app;

// routes
app.use("/api/auth", require("./routes/authRoutes"));
app.use("/api/debates", require("./routes/debateRoutes"));
app.use("/api/arguments", require("./routes/argumentRoutes"));
app.use("/api/votes", require("./routes/voteRoutes")); 