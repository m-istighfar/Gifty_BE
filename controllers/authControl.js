const authModel = require("../models/authModel");
const { validationResult } = require("express-validator");
const { successResponse, errorResponse } = require("../utils/response");
const bcrypt = require("bcrypt");
exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await authModel.findUserByEmail(email);
    if (existingUser) {
      return errorResponse(res, "Email is already in use", 400);
    }

    const user = await authModel.createUser(name, email, password);

    return successResponse(res, "User registered successfully", {
      userId: user.id,
    });
  } catch (error) {
    return errorResponse(res, "Server error during registration", null, 500);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await authModel.findUserByEmail(email);

    if (!user) {
      return errorResponse(res, "Invalid credentials", 401);
    }

    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return errorResponse(res, "Invalid credentials", 401);
    }

    const token = authModel.generateToken(user.id);

    return successResponse(res, "Login successful", {
      token,
      hasSetUsername: user.hasSetUsername,
      hasSetPayment: user.hasSetPayment,
      userId: user.id,
      name: user.name,
      email: user.email,
    });
  } catch (error) {
    return errorResponse(res, "Server error during login", 500);
  }
};
