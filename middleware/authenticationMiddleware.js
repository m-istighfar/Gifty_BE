const jwt = require("jsonwebtoken");
const { JWT_SIGN } = require("../config/jwt.js");
const { errorResponse } = require("../utils/response");

const authenticationMiddleware = (req, res, next) => {
  const authHeader = req.headers.authorization;

  if (!authHeader || !authHeader.startsWith("Bearer ")) {
    return errorResponse(res, "Unauthorized - No token provided", 401);
  }

  const token = authHeader.split(" ")[1];

  try {
    const decodedToken = jwt.verify(token, JWT_SIGN);
    req.user = decodedToken;
    next();
  } catch (error) {
    errorResponse(res, "Unauthorized - Invalid token", 401);
  }
};

module.exports = authenticationMiddleware;
