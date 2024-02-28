const { body } = require("express-validator");

exports.paymentInfoValidationRules = () => [
  body("paymentMethod")
    .not()
    .isEmpty()
    .withMessage("Payment method is required"),
  body("accountHolder")
    .not()
    .isEmpty()
    .withMessage("Account holder name is required"),
  body("accountNumber")
    .isLength({ min: 5 })
    .withMessage("Account number must be at least 5 characters long"),
];
