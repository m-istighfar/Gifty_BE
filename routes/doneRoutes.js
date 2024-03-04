const express = require("express");
const router = express.Router();
const doneController = require("../controllers/doneController");
// const doneValidation = require("../validations/doneValidation");
const validateRequests = require("../middleware/validateRequests");

  router.put(
    "/:wishlistId",
    // wishlistValidation.wishlistValidationRules(),
    validateRequests,
    doneController.markWishlistAsDone
  );

  router.get(
    "/getallwish",
    validateRequests,
    doneController.getAllDoneWishlists
  );
  
  router.get(
    "/getallcollab",
    validateRequests,
    doneController.getCollaboratorsForWishlist
  );
  
  module.exports = router;