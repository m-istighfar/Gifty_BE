const { body } = require("express-validator");

exports.registerValidation = [
  body("name").not().isEmpty().withMessage("Name is required"),
  body("email").isEmail().withMessage("Enter a valid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

exports.loginValidation = [
  body("email").isEmail().withMessage("Enter a valid email"),
  body("password")
    .isLength({ min: 6 })
    .withMessage("Password must be at least 6 characters long"),
];

exports.setUsernameValidation = [
  body("username")
    .isLength({ min: 3 })
    .withMessage("Username must be at least 3 characters long"),
];
