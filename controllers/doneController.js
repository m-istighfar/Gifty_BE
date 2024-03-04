const doneModel = require("../models/doneModel");
const { successResponse, errorResponse } = require("../utils/response");

exports.markWishlistAsDone = async (req, res) => {
  const { wishlistId } = req.params;

  if (!wishlistId) {
    return errorResponse(res, "Wishlist ID is missing", 400);
  }

  try {
    await doneModel.markWishlistAsDone(parseInt(wishlistId));
    return successResponse(res, "Wishlist marked as done successfully");
  } catch (error) {
    console.error("Error marking wishlist as done:", error);
    return errorResponse(res, "Server error marking wishlist as done", 500);
  }
};

exports.getAllDoneWishlists = async (req, res) => {
  try {
    const doneWishlists = await doneModel.getAllDoneWishlists();
    return successResponse(res, "Get all done wishlists successfully", doneWishlists);
  } catch (error) {
    console.error("Error getting all done wishlists:", error);
    return errorResponse(res, "Server error getting all done wishlists", 500);
  }
};

exports.getCollaboratorsForWishlist = async (req, res) => {
  const { wishlistId } = req.params;

  if (!wishlistId) {
    return errorResponse(res, "Wishlist ID is missing", 400);
  }

  try {
    const collaborators = await doneModel.getCollaboratorsForWishlist(parseInt(wishlistId));
    return successResponse(res, "Get all collaborators for wishlist successfully", collaborators);
  } catch (error) {
    console.error("Error getting collaborators for wishlist:", error);
    return errorResponse(res, "Server error getting collaborators for wishlist", 500);
  }
};
