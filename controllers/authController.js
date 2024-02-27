const UserModel = require("../models/authModel");
const { validationResult } = require("express-validator");
const { successResponse, errorResponse } = require("../utils/response");

exports.register = async (req, res) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return errorResponse(res, "Validation failed", 400);
  }

  const { name, email, password } = req.body;
  try {
    const user = await UserModel.createUser(name, email, password);

    return successResponse(res, "User registered successfully", {
      userId: user.id,
    });
  } catch (error) {
    return errorResponse(res, "Failed to register user", 500);
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await UserModel.findUserByEmail(email);
    if (!user) {
      return errorResponse(res, "Invalid credentials", 401);
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return errorResponse(res, "Invalid credentials", 401);
    }

    const token = UserModel.generateToken(user.id);
    return successResponse(res, "Login successful", {
      token,
      hasSetUsername: user.hasSetUsername,
    });
  } catch (error) {
    return errorResponse(res, "Login failed", 500);
  }
};

exports.setUsername = async (req, res) => {
  const { username } = req.body;
  const { userId } = req.user;

  try {
    if (username) {
      const updatedUser = await UserModel.updateUserUsername(userId, username);
      return successResponse(res, "Username set successfully", {
        userId: updatedUser.id,
      });
    } else {
      return errorResponse(res, "Username is required", 400);
    }
  } catch (error) {
    return errorResponse(res, "Failed to set username", 500);
  }
};
