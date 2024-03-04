const { body } = require('express-validator');

exports.splitbillsValidationRules = () => [
  body("price").notEmpty().isFloat().withMessage("Price must be a valid number"),
  body("tax").notEmpty().isFloat().withMessage("Tax must be a valid number"),
  body("deliveryFee").notEmpty().isFloat().withMessage("Delivery fee must be a valid number"),
  body("discount").notEmpty().isFloat().withMessage("Discount must be a valid number"),
  body("itemId").notEmpty().isInt().withMessage("Item ID must be a valid integer"),
  body("pollId").notEmpty().isInt().withMessage("Poll ID must be a valid integer"),
];
