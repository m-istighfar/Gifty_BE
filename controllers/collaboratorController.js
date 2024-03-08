const collabModel = require("../models/collaboratorModel");
const { successResponse, errorResponse } = require("../utils/response");
const FE_URL = process.env.FE_URL;
const wishlistMap = new Map();

exports.addCollabByUsername = async (req, res) => {
  const { userId } = req.user;
  const { wishlistId } = req.params;
  const { username } = req.body;

  if (!userId) {
    return errorResponse(res, "User ID is missing.", 400);
  }

  try {
    const existingWishlist = await collabModel.findWishlistById(wishlistId);

    if (!existingWishlist) {
      return errorResponse(res, "Wishlist not found.", 403);
    }

    if (existingWishlist.userId !== userId) {
      return errorResponse(res, "Wishlist belongs to another user.");
    }

    if (existingWishlist.type !== "COLLABORATIVE") {
      return errorResponse(res, "The wishlist type is not collaborative", 403);
    }

    const existingUsername = await collabModel.findUserByUsername(username);

    if (!existingUsername) {
      return errorResponse(res, "Username not found.", 403);
    }

    const collabId = existingUsername.id;

    const collab = await collabModel.createCollab(wishlistId, collabId);

    return successResponse(res, "Collaborator added successfully", collab, 201);
  } catch (error) {
    console.error("Error during add collaborator for user:", userId, error);
    return errorResponse(res, "Server error during adding collaborator", 500);
  }
};

exports.generateInvitationLink = async (req, res) => {
  const { userId } = req.user;
  const { wishlistId } = req.params;

  if (!userId) {
    return errorResponse(res, "User ID is missing.", 400);
  }

  try {
    const existingWishlist = await collabModel.findWishlistById(wishlistId);

    if (!existingWishlist) {
      return errorResponse(res, "Wishlist not found.", 403);
    }

    if (existingWishlist.userId !== userId) {
      return errorResponse(res, "Wishlist belongs to another user.");
    }

    if (existingWishlist.type !== "COLLABORATIVE") {
      return errorResponse(res, "The wishlist type is not collaborative", 403);
    }

    const linkData = await collabModel.generateLink(wishlistId);

    const inviteLink = `${FE_URL}/invitation?encryptedData=${linkData.encryptedData}&iv=${linkData.iv}`;

    return successResponse(res, "Link created successfully", inviteLink, 201);
  } catch (error) {
    console.error(
      "Error during create invitation link for user:",
      userId,
      error
    );
    return errorResponse(
      res,
      "Server error during creating invitation link",
      500
    );
  }
};

exports.invitationAcceptance = async (req, res) => {
  const { userId } = req.user;
  const { link } = req.body;

  if (!userId) {
    return errorResponse(res, "User ID is missing.", 400);
  }

  try {
    const queryString = link.split("?")[1];
    const queryParams = queryString.split("&");

    let encryptedData, iv;
    for (const param of queryParams) {
      const [name, value] = param.split("=");

      if (name === 'encryptedData') {
        encryptedData = value;
      } else if (name === 'iv') {
        iv = value;
      }
    }

    const wishlistId = await collabModel.decodeLink(encryptedData, iv);
    const collabId = await collabModel.findUserByUserId(userId);

    const collab = await collabModel.createCollab(wishlistId, collabId);

    return successResponse(res, "Collaborator added successfully", collab, 201);
  } catch (error) {
    console.error("Error during join wishlist for user:", userId, error);
    return errorResponse(res, "Server error during joining wishlist", 500);
  }
};
