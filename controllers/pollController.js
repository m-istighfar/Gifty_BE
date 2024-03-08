const pollModel = require("../models/pollModel");
const { successResponse, errorResponse } = require("../utils/response");
const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

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
  const { title, optionIds } = req.body;

  if (!wishlistId || isNaN(wishlistId) || parseInt(wishlistId) <= 0) {
    return errorResponse(res, "Invalid wishlist ID", 400);
  }

  const startTimeProvided = req.body.startTime;
  const startTime = startTimeProvided
    ? new Date(startTimeProvided)
    : new Date();
  const endTime = new Date(startTime.getTime() + 60 * 60 * 1000);
  try {
    const isValidWishlistAndOptions =
      await pollModel.validateWishlistAndOptions(userId, wishlistId, optionIds);
    if (!isValidWishlistAndOptions) {
      return errorResponse(res, "Invalid wishlist or options", 400);
    }

    const poll = await pollModel.createPollWithOptionIds(
      title,
      wishlistId,
      optionIds,
      startTime,
      endTime
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

exports.submitVote = async (req, res) => {
  const { userId } = req.user;
  const { itemId } = req.body;
  const pollId = parseInt(req.params.pollId);

  if (isNaN(pollId) || isNaN(itemId)) {
    return errorResponse(res, "Invalid pollId or itemId", 400);
  }

  try {
    const poll = await pollModel.getPollById(pollId);
    const currentTime = new Date();

    if (!poll || currentTime < poll.startTime || currentTime > poll.endTime) {
      return errorResponse(res, "Poll is not active", 400);
    }

    const itemInPoll = poll.items.some((item) => item.id === Number(itemId));
    if (!itemInPoll) {
      return errorResponse(res, "Item is not part of the poll", 400);
    }

    const existingVote = await prisma.vote.findFirst({
      where: {
        AND: [{ userId: userId }, { pollId: parseInt(pollId, 10) }],
      },
    });

    if (existingVote) {
      return errorResponse(res, "User has already voted", 400);
    }

    const vote = await prisma.vote.create({
      data: {
        userId,
        pollId,
        itemId: parseInt(itemId),
      },
    });

    return successResponse(res, "Vote submitted successfully", vote, 201);
  } catch (error) {
    console.error("Error submitting vote:", error);
    return errorResponse(res, "Server error submitting vote", 500);
  }
};

exports.getPollResults = async (req, res) => {
  const { pollId } = req.params;

  try {
    const results = await pollModel.getPollResults(pollId);
    return successResponse(
      res,
      "Poll results fetched successfully",
      results,
      200
    );
  } catch (error) {
    console.error("Error fetching poll results:", error);
    return errorResponse(res, "Server error fetching poll results", 500);
  }
};
