const express = require("express");
const router = express.Router();
const wishlistController = require("../controllers/wishlistController");
const wishlistValidation = require("../validations/wishlistValidation");
const validateRequests = require("../middleware/validateRequests");

router.get("", validateRequests, wishlistController.getAllWishlists);
router.get(
  "/:wishlistId",
  validateRequests,
  wishlistController.getWishlistById
);

router.post(
  "",
  wishlistValidation.wishlistValidationRules(),
  validateRequests,
  wishlistController.createWishlist
);

router.post(
  "/create-with-collaborators",
  wishlistValidation.wishlistValidationRules(),
  validateRequests,
  wishlistController.createWishlistWithCollaborators
);

router.put(
  "/:wishlistId",
  wishlistValidation.wishlistValidationRules(),
  validateRequests,
  wishlistController.updateWishlist
);

router.delete(
  "/:wishlistId",
  validateRequests,
  wishlistController.deleteWishlist
);

module.exports = router;
