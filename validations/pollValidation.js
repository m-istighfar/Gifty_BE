const { body } = require("express-validator");

exports.pollValidationRules = () => [
  body("title").not().isEmpty().withMessage("Title is required"),
  body("optionIds").isArray().withMessage("Option IDs must be an array"),
  body("startTime")
    .isISO8601()
    .toDate()
    .withMessage("Start time must be a valid ISO 8601 date string")
    .custom((value) => {
      if (new Date(value) <= new Date()) {
        throw new Error("Start time must be in the future");
      }
      return true;
    }),
];
