const { body } = require("express-validator");

exports.pollValidationRules = () => [
  body("title").not().isEmpty().withMessage("Title is required"),
  body("optionIds").isArray().withMessage("Option IDs must be an array"),
];
