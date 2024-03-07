const pollModel = require("../models/pollModel");
const { successResponse, errorResponse } = require("../utils/response");

exports.createPoll = async (req, res) => {
  const { userId } = req.user;
  const { title, wishlistId } = req.body;

  if (!userId) {
    return errorResponse(res, "User ID is missing.", 400);
  }

  if (!wishlistId) {
    return errorResponse(res, "Wishlist ID is missing.", 400);
  }

  try {
    const isUserWishlist = await pollModel.isUserWishlist(userId, wishlistId);

    if (!isUserWishlist) {
      return errorResponse(
        res,
        "You are not authorized to create a poll for this wishlist.",
        403
      );
    }

    const poll = await pollModel.createPoll(userId, title, wishlistId);
    return successResponse(res, "Poll created successfully", poll, 201);
  } catch (error) {
    console.error("Error during poll creation for user:", userId, error);
    return errorResponse(res, "Server error creating poll", 500);
  }
};
