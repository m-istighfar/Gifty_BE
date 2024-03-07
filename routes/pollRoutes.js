const express = require("express");
const router = express.Router();
const pollController = require("../controllers/pollController");
const validateRequests = require("../middleware/validateRequests");
const pollValidation = require("../validations/pollValidation");

router.post(
  "/createPoll",
  pollValidation.pollValidationRules(),
  validateRequests,
  pollController.createPoll
);

router.get("/getAll", pollController.getAllPolls);
router.get("/getPollById/:pollId", pollController.getPollById);

module.exports = router;
