const { body } = require('express-validator');

exports.wishlistValidationRules = () => [
  body("title").not().isEmpty().withMessage("Title is required"),
  body("description").optional(),
  body("eventDate").isISO8601().toDate().withMessage("Invalid event date format. Expected format: YYYY-MM-DD")
];
