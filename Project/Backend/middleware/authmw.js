const jwt = require("jsonwebtoken");
require('dotenv').config();

const jwt_token_user = process.env.JWT_SECRET_USER;

const verifyToken = async (req, res, next) => {
  const token = req.cookies.Authtoken;
  if (!token) return res.status(401).json({ error: "Access denied" });
  try {
    const decoded = jwt.verify(token, jwt_token_user);
    req.user = { userId: decoded.userId, name: decoded.name, email: decoded.email };
    next();
  } catch (error) {
    res.status(401).json({ error: "Invalid token" });
  }
}

module.exports = verifyToken;