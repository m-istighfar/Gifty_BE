const userModel = require("../models/userModel");
const { successResponse, errorResponse } = require("../utils/response");

exports.getAllUsers = async (req, res) => {
  try {
    const users = await userModel.findAllUsers({
      exclude: ["wishlists", "paymentInfos", "collaborators"],
    });
    return successResponse(res, "All users fetched successfully", users);
  } catch (error) {
    console.error("Error fetching all users:", error);
    return errorResponse(res, "Server error fetching all users", 500);
  }
};

exports.getUserById = async (req, res) => {
  const { userId } = req.params;

  try {
    const user = await userModel.findUserById(parseInt(userId, 10));
    if (!user) {
      return errorResponse(res, "User not found", 404);
    }
    return successResponse(res, "User fetched successfully", user);
  } catch (error) {
    console.error("Error fetching user by ID:", error);
    return errorResponse(res, "Server error fetching user by ID", 500);
  }
};

exports.createPaymentInfo = async (req, res) => {
  const { userId } = req.user;
  const { paymentMethod, accountHolder, accountNumber } = req.body;

  if (!userId) {
    return errorResponse(res, "User ID is missing.", 400);
  }

  try {
    const existingPaymentInfo = await userModel.findPaymentInfoByUserId(userId);
    if (existingPaymentInfo) {
      return errorResponse(
        res,
        "Payment information already exists for this user.",
        409
      );
    }

    const paymentInfo = await userModel.createPaymentInfo(
      userId,
      paymentMethod,
      accountHolder,
      accountNumber.toString()
    );

    return successResponse(
      res,
      "Payment information created successfully",
      paymentInfo,
      201
    );
  } catch (error) {
    console.error(
      "Error during payment information creation for user:",
      userId,
      error
    );
    return errorResponse(res, "Server error creating payment information", 500);
  }
};

exports.updatePaymentInfo = async (req, res) => {
  const { userId } = req.user;
  const { paymentMethod, accountHolder, accountNumber } = req.body;
  const { paymentInfoId } = req.params;

  if (!userId) {
    return errorResponse(res, "User ID is missing.", 400);
  }

  if (!paymentInfoId) {
    return errorResponse(res, "Payment information ID is missing.", 400);
  }

  try {
    const existingPaymentInfo = await userModel.findPaymentInfoById(
      paymentInfoId
    );

    if (!existingPaymentInfo || existingPaymentInfo.userId !== userId) {
      return errorResponse(
        res,
        "Payment information not found or belongs to another user.",
        403
      );
    }

    const paymentInfo = await userModel.updatePaymentInfo(
      parseInt(paymentInfoId),
      paymentMethod,
      accountHolder,
      accountNumber.toString()
    );

    return successResponse(
      res,
      "Payment information updated successfully",
      paymentInfo
    );
  } catch (error) {
    console.error(
      "Error during payment information update for user:",
      userId,
      error
    );
    return errorResponse(res, "Server error updating payment information", 500);
  }
};

exports.setUsername = async (req, res) => {
  const { username } = req.body;
  const { userId } = req.user;

  try {
    const isUsernameTaken = await userModel.isUsernameTaken(username, userId);
    if (isUsernameTaken) {
      return errorResponse(res, "Username is already taken", 400);
    }

    if (username) {
      const updatedUser = await userModel.updateUserUsername(userId, username);
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
