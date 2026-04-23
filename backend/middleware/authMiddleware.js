const jwt = require("jsonwebtoken");

const authMiddleware = (req, res, next) => {
  try {
  
    const authHeader = req.headers.authorization;

if (!authHeader) {
  return res.status(401).json({ message: "No token" });
}

// 🔥 HANDLE BOTH FORMATS
const token = authHeader.startsWith("Bearer ")
  ? authHeader.split(" ")[1]
  : authHeader;

try {
  const decoded = jwt.verify(token, process.env.JWT_SECRET);
  req.user = decoded;
  next();
} catch (err) {
  return res.status(401).json({ message: "Invalid token" });
}
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