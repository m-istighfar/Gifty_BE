const UserModel = require("../models/authModel");
const { validationResult } = require("express-validator");
const { successResponse, errorResponse } = require("../utils/response");
const bcrypt = require("bcrypt");
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
    console.log("Attempting to find user by email:", email);
    const user = await UserModel.findUserByEmail(email);

    if (!user) {
      console.log("User not found for email:", email);
      return errorResponse(res, "Invalid credentials", 401);
    }

    console.log("User found, comparing password...");
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      console.log("Password does not match for user:", email);
      return errorResponse(res, "Invalid credentials", 401);
    }

    console.log("Password matched, generating token...");
    const token = UserModel.generateToken(user.id);

    console.log("Login successful for user:", email);
    return successResponse(res, "Login successful", {
      token,
      hasSetUsername: user.hasSetUsername,
    });
  } catch (error) {
    console.error("Error during login process for user:", email, error);
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
