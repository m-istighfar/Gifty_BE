const userModel = require("../models/userModel");
const { successResponse, errorResponse } = require("../utils/response");

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
      accountNumber
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
      accountNumber
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