const express = require("express");
const router = express.Router();
const splitbillsController = require("../controllers/splitbillsController");
const splitbillsValidation = require("../validations/splitbillsValidation");
const validateRequests = require("../middleware/validateRequests");

router.post(
  "/result",
  splitbillsValidation.splitbillsValidationRules(),
  validateRequests,
  splitbillsController.postResult
);

module.exports = router;