const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");
const userValidation = require("../validations/userValidation");
const authenticationMiddleware = require("../middleware/authenticationMiddleware");
const validateRequests = require("../middleware/validateRequests");

router.put(
  "/set-username",
  userValidation.setUsernameValidation,
  validateRequests,
  userController.setUsername
);

router.post(
  "/payment-info",
  userValidation.paymentInfoValidationRules(),
  validateRequests,
  userController.createPaymentInfo
);

router.put(
  "/payment-info/:paymentInfoId",
  userValidation.paymentInfoValidationRules(),
  validateRequests,
  userController.updatePaymentInfo
);

module.exports = router;
