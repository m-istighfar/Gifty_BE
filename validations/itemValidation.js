const { body } = require("express-validator");

exports.itemValidationRules = () => [
  body("name").not().isEmpty().withMessage("Name is required"),
  body("details").optional(),
  body("price")
    .isInt({ min: 1 })
    .withMessage("Price must be a positive integer")
    .notEmpty()
    .withMessage("Price is required"),
  body("link").optional()
];
