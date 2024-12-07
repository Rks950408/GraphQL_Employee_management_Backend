const jwt = require("jsonwebtoken");
const { JWT_SECRET } = process.env;

const generateToken = (payload) =>
  jwt.sign(payload, JWT_SECRET, { expiresIn: "1d" });

const verifyToken = (token) => {
  try {
    return jwt.verify(token, JWT_SECRET);
  } catch (error) {
    throw new Error("Invalid Token From Verify fun");
  }
};

const isAuthorized = (user, roles) => {
  if (!user || !user.role) {
    return false;
  }
  return roles.includes(user.role);
};

module.exports = { generateToken, verifyToken, isAuthorized };
