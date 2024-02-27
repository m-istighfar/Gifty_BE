const UserModel = require("../models/authModel");
const { validationResult } = require("express-validator");
const { successResponse, errorResponse } = require("../utils/response");

exports.register = async (req, res) => {
  const { name, email, password } = req.body;
  try {
    const existingUser = await UserModel.findUserByEmail(email);
    if (existingUser) {
      return errorResponse(res, "Email is already in use", 400);
    }

    const user = await UserModel.createUser(name, email, password);

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
    return errorResponse(res, "Server error during login", 500);
  }
};

exports.setUsername = async (req, res) => {
  const { username } = req.body;
  const { userId } = req.user;

  try {
    const isUsernameTaken = await UserModel.isUsernameTaken(username, userId);
    if (isUsernameTaken) {
      return errorResponse(res, "Username is already taken", 400);
    }

    if (username) {
      const updatedUser = await UserModel.updateUserUsername(userId, username);
      return successResponse(res, "Username set successfully", {
        userId: updatedUser.id,
      });
    } else {
      return errorResponse(res, "Username is required", 400);
    }
  } catch (error) {
    return errorResponse(res, "Server error setting username", 500);
  }
};
