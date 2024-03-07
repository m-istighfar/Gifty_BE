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
  const userId = req.user.userId;
  const wishlistId = req.params.wishlistId;
  console.log("Received wishlistId:", wishlistId);
  const { title, optionIds } = req.body;

  if (!wishlistId || isNaN(wishlistId) || parseInt(wishlistId) <= 0) {
    return errorResponse(res, "Invalid wishlist ID", 400);
  }

  try {
    const isValidWishlistAndOptions =
      await pollModel.validateWishlistAndOptions(userId, wishlistId, optionIds);
    if (!isValidWishlistAndOptions) {
      return errorResponse(res, "Invalid wishlist or options", 400);
    }

    const poll = await pollModel.createPollWithOptionIds(
      title,
      wishlistId,
      optionIds
    );
    return successResponse(res, "Poll created successfully", poll, 201);
  } catch (error) {
    console.error("Error creating poll:", error);
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
