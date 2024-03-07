const { body } = require("express-validator");

exports.pollValidationRules = () => [
  body("title").not().isEmpty().withMessage("Title is required"),
  body("wishlistId")
    .isInt({ min: 1 })
    .withMessage("Wishlist ID must be a positive integer")
    .notEmpty()
    .withMessage("Wishlist ID is required"),
];
