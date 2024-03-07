const pollModel = require("../models/pollModel");
const { successResponse, errorResponse } = require("../utils/response");

exports.getAllPolls = async (req, res) => {
  try {
    const polls = await pollModel.getAllPolls();
    return successResponse(res, "All polls fetched successfully", polls, 200);
  } catch (error) {
    console.error("Error fetching polls:", error);
    return errorResponse(res, "Server error fetching polls", 500);
  }
};

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

exports.getPollById = async (req, res) => {
  const { pollId } = req.params;

  try {
    const poll = await pollModel.getPollById(pollId);

    if (!poll) {
      return errorResponse(res, "Poll not found", 404);
    }

    return successResponse(res, "Poll fetched successfully", poll, 200);
  } catch (error) {
    console.error("Error fetching poll:", error);
    return errorResponse(res, "Server error fetching poll", 500);
  }
};
