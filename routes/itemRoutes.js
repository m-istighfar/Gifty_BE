const express = require("express");
const router = express.Router();
const itemController = require("../controllers/itemController");
const itemValidation = require("../validations/itemValidation");
const validateRequests = require("../middleware/validateRequests");

router.get(
  "/:wishlistId",
  validateRequests,
  itemController.getAllItems
);

router.post(
  "/:wishlistId",
  itemValidation.itemValidationRules(),
  validateRequests,
  itemController.createItem
);

router.put(
  "/:wishlistId/:itemId",
  itemValidation.itemValidationRules(),
  validateRequests,
  itemController.updateItem
);

router.delete(
  "/:wishlistId/:itemId",
  validateRequests,
  itemController.deleteItem
);

module.exports = router;
