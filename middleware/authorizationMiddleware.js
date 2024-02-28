const jwt = require("jsonwebtoken");
const { JWT_SIGN } = require("../config/jwt.js");
const { errorResponse } = require("../utils/response");

const authorizationMiddleware = (allowedRoles) => {
  return (req, res, next) => {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return errorResponse(res, "Unauthorized - No token provided", 401);
    }

    const token = authHeader.split(" ")[1];

    try {
      const decodedToken = jwt.verify(token, JWT_SIGN);

      if (allowedRoles.includes(decodedToken.role)) {
        next();
      } else {
        errorResponse(res, "Forbidden - User does not have permission", 403);
      }
    } catch (error) {
      const message =
        error.name === "TokenExpiredError"
          ? "Unauthorized - Token expired"
          : "Unauthorized - Invalid token";
      errorResponse(res, message, 401);
    }
  };
};

module.exports = authorizationMiddleware;
