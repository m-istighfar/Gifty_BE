const express = require("express");
const router = express.Router();
const authController = require("../controllers/AuthController");
const authValidation = require("../validations/authValidation");
const validateRequests = require("../middleware/validateRequests");
const authenticationMiddleware = require("../middleware/authenticationMiddleware");

router.post(
  "/register",
  authValidation.registerValidation,
  validateRequests,
  authController.register
);

router.post(
  "/login",
  authValidation.loginValidation,
  validateRequests,
  authController.login
);

router.put(
  "/set-username",
  authenticationMiddleware,
  authValidation.setUsernameValidation,
  validateRequests,
  authController.setUsername
);

module.exports = router;
