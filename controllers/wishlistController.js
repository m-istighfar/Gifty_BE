const wishlistModel = require("../models/wishlistModel");
const { successResponse, errorResponse } = require("../utils/response");

exports.getAllWishlists = async (req, res) => {
  const { userId } = req.user;
  try {
    const wistlists = await wishlistModel.findWishlistsByUserId(userId);
    return successResponse(
      res,
      "Get all wishlists successfully",
      wistlists,
      201
    );
  } catch (error) {
    console.error("Error during get all wishlists for user:", userId, error);
    return errorResponse(res, "Server error get all wishlists", 500);
  }
};

exports.getWishlistById = async (req, res) => {
  const { userId } = req.user;
  const { wishlistId } = req.params;

  if (!userId) {
    return errorResponse(res, "User ID is missing.", 400);
  }

  if (!wishlistId) {
    return errorResponse(res, "Wishlist ID is missing", 400);
  }

  try {
    const existingWishlist = await wishlistModel.findWishlistById(wishlistId);

    if (!existingWishlist) {
      return errorResponse(res, "Wishlist not found.", 403);
    }

    if (existingWishlist.userId !== userId) {
      return errorResponse(res, "Wishlist belongs to another user.");
    }

    return successResponse(res, "Get wishlist successfully", existingWishlist);
  } catch (error) {
    console.error("Error during wishlist get for user:", userId, error);
    return errorResponse(res, "Server error during getting wishlist", 500);
  }
};

exports.createWishlist = async (req, res) => {
  const { userId } = req.user;
  const { title, description, eventDate, type } = req.body;

  if (!userId) {
    return errorResponse(res, "User ID is missing.", 400);
  }

  try {
    const wishlist = await wishlistModel.createWishlistWithCollaborators(
      title,
      description,
      eventDate,
      type,
      userId
    );

    return successResponse(res, "Wishlist created successfully", wishlist, 201);
  } catch (error) {
    console.error("Error during wishlist creation for user:", userId, error);
    return errorResponse(res, "Server error creating wishlist", 500);
  }
};

exports.createWishlistWithCollaborators = async (req, res) => {
  const { userId } = req.user;
  const { title, description, eventDate, type, collaborators } = req.body;

  if (!userId) {
    return errorResponse(res, "User ID is missing.", 400);
  }

  if (!collaborators || !Array.isArray(collaborators)) {
    return errorResponse(res, "Invalid collaborators format.", 400);
  }

  try {
    const wishlist = await wishlistModel.createWishlistWithCollaborators(
      title,
      description,
      eventDate,
      type,
      userId,
      collaborators
    );

    return successResponse(res, "Wishlist created successfully", wishlist, 201);
  } catch (error) {
    console.error("Error during wishlist creation for user:", userId, error);
    return errorResponse(res, "Server error creating wishlist", 500);
  }
};

exports.updateWishlist = async (req, res) => {
  const { userId } = req.user;
  const { wishlistId } = req.params;
  const { title, description, eventDate } = req.body;

  if (!userId) {
    return errorResponse(res, "User ID is missing.", 400);
  }

  if (!wishlistId) {
    return errorResponse(res, "Wishlist ID is missing", 400);
  }

  try {
    const existingWishlist = await wishlistModel.findWishlistById(wishlistId);

    if (!existingWishlist) {
      return errorResponse(res, "Wishlist not found.", 403);
    }

    if (existingWishlist.userId !== userId) {
      return errorResponse(res, "Wishlist belongs to another user.");
    }

    const wishlist = await wishlistModel.updateWishlist(
      parseInt(wishlistId),
      title,
      description,
      eventDate
    );

    return successResponse(res, "Wishlist updates successfully", wishlist);
  } catch (error) {
    console.error("Error during wishlist update for user:", userId, error);
    return errorResponse(res, "Server error updating wishlist", 500);
  }
};

exports.deleteWishlist = async (req, res) => {
  const { userId } = req.user;
  const { wishlistId } = req.params;

  if (!userId) {
    return errorResponse(res, "User ID is missing", 400);
  }

  if (!wishlistId) {
    return errorResponse(res, "Wishlist ID is missing", 400);
  }

  try {
    const existingWishlist = await wishlistModel.findWishlistById(wishlistId);

    if (!existingWishlist) {
      return errorResponse(res, "Wishlist not found.", 403);
    }

    if (existingWishlist.userId !== userId) {
      return errorResponse(res, "Wishlist belongs to another user.");
    }

    const wishlist = await wishlistModel.deleteWishlist(parseInt(wishlistId));

    return successResponse(res, "Wishlist deleted successfully");
  } catch (error) {
    console.error("Error during wishlist delete for user:", userId, error);
    return errorResponse(res, "Server error deleting wishlist", 500);
  }
};
