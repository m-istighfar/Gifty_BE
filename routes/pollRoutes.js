const express = require("express");
const router = express.Router();
const pollController = require("../controllers/pollController");
const validateRequests = require("../middleware/validateRequests");
const pollValidation = require("../validations/pollValidation");

router.post(
  "/createPoll/:wishlistId",
  pollValidation.pollValidationRules(),
  validateRequests,
  pollController.createPoll
);

router.get("/get", pollController.getAllPolls);
router.get("/get/:pollId", pollController.getPollById);
router.post("/submit-vote/:pollId", pollController.submitVote);
router.get("/get-results/:pollId", pollController.getPollResults);

module.exports = router;
