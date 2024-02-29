const { validationResult } = require("express-validator");
const { errorResponse } = require("../utils/response");

const validateRequests = (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const firstError = errors.array()[0].msg;

    return errorResponse(res, firstError, 400);
  }

  next();
};

module.exports = validateRequests;
