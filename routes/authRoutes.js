const express = require("express");
const router = express.Router();
const authController = require("../controllers/AuthController");
const authValidation = require("../validations/authValidation");
const validateRequests = require("../middleware/validateRequests");

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

module.exports = router;
