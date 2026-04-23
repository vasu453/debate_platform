const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
  
    const token = req.header("Authorization");
    console.log("TOKEN:", token);

    if (!token) {
      return res.status(401).json({ message: "No token, access denied" });
    }

    const decoded = jwt.verify(token, "secretkey");
    console.log("DECODED:", decoded);

    req.userId = decoded.id;

    next();
  } catch (error) {
    res.status(401).json({ message: "Invalid token" });
  }
};

module.exports = authMiddleware;