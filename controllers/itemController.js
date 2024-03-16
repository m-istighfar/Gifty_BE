const itemModel = require("../models/itemModel");
const { successResponse, errorResponse } = require("../utils/response");

exports.getAllItems = async (req, res) => {
  const { userId } = req.user;
  const { wishlistId } = req.params;

  if (!userId) {
    return errorResponse(res, "User ID is missing.", 400);
  }

  try {
    const existingWishlist = await itemModel.findWishlistById(wishlistId);

    if (!existingWishlist) {
        return errorResponse(res, "Wishlist not found.", 403);
    }

    if (existingWishlist.userId !== userId) {
      return errorResponse(res, "Wishlist belongs to another user.");
    }

    const items = await itemModel.findItemsByWishlistId(wishlistId);

    return successResponse(res, "Get all items successfully", items, 201);
  } catch (error) {
    console.error("Error during item get for user:", userId, error);
    return errorResponse(res, "Server error during getting all items", 500);
  }
};

exports.createItem = async (req, res) => {
  const { userId } = req.user;
  const { wishlistId } = req.params;
  const { name, details, price, link } = req.body;

  if (!userId) {
    return errorResponse(res, "User ID is missing.", 400);
  }

  try {
    const existingWishlist = await itemModel.findWishlistById(wishlistId);

    if (!existingWishlist) {
        return errorResponse(res, "Wishlist not found.", 403);
    }

    if (existingWishlist.userId !== userId) {
      return errorResponse(res, "Wishlist belongs to another user.");
    }

    const item = await itemModel.createItem(
      name,
      details,
      price,
      link,
      wishlistId
    );

    return successResponse(res, "Item created successfully", item, 201);
  } catch (error) {
    console.error("Error during item creation for user:", userId, error);
    return errorResponse(res, "Server error creating item", 500);
  }
};

exports.updateItem = async (req, res) => {
  const { userId } = req.user;
  const { wishlistId, itemId } = req.params;
  const { name, details, price, link } = req.body;

  if (!userId) {
    return errorResponse(res, "User ID is missing.", 400);
  }

  try {
    const existingWishlist = await itemModel.findWishlistById(wishlistId);

    if (!existingWishlist) {
        return errorResponse(res, "Wishlist not found.", 403);
    }

    if (existingWishlist.userId !== userId) {
      return errorResponse(res, "Wishlist belongs to another user.");
    }

    const existingItem = await itemModel.findItemById(itemId);

    if (existingItem.wishlistId !== parseInt(wishlistId) || !existingItem) {
      return errorResponse(res, "Item not found.", 403);
    }

    const item = await itemModel.updateItem(
      parseInt(itemId),
      name,
      details,
      price,
      link
    );

    return successResponse(res, "Item updated successfully", item);
  } catch (error) {
    console.error("Error during item update for user:", userId, error);
    return errorResponse(res, "Server error updating item", 500);
  }
};

exports.deleteItem = async (req, res) => {
  const { userId } = req.user;
  const { wishlistId, itemId } = req.params;

  if (!userId) {
    return errorResponse(res, "User ID is missing", 400);
  }

  try {
    const existingWishlist = await itemModel.findWishlistById(wishlistId);

    if (!existingWishlist) {
        return errorResponse(res, "Wishlist not found.", 403);
    }

    if (existingWishlist.userId !== userId) {
      return errorResponse(res, "Wishlist belongs to another user.");
    }

    const existingItem = await itemModel.findItemById(itemId);

    if (existingItem.wishlistId !== parseInt(wishlistId) || !existingItem) {
      return errorResponse(res, "Item not found.", 403);
    }

    const item = await itemModel.deleteItem(parseInt(itemId));

    return successResponse(res, "Item deleted successfully");
  } catch (error) {
    console.error("Error during item delete for user:", userId, error);
    return errorResponse(res, "Server error deleting item", 500);
  }
};
