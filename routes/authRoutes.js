const express = require("express");
const router = express.Router();
const authController = require("../controllers/authController");
const authValidation = require("../validations/authValidation");

router.post(
  "/register",
  authValidation.registerValidation,
  authController.register
);

router.post("/login", authValidation.loginValidation, authController.login);

router.put(
  "/setUsername",
  authValidation.setUsernameValidation,
  authController.setUsername
);

module.exports = router;
