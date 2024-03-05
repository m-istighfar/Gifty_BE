const express = require("express");
const router = express.Router();
const wishlistController = require("../controllers/wishlistController");
const wishlistValidation = require("../validations/wishlistValidation");
const validateRequests = require("../middleware/validateRequests");

router.get("", validateRequests, wishlistController.getAllWishlists);

router.post(
  "",
  wishlistValidation.wishlistValidationRules(),
  validateRequests,
  wishlistController.createWishlist
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
