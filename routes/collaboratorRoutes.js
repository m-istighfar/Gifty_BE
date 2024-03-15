const express = require("express");
const router = express.Router();
const collaboratorController = require("../controllers/collaboratorController");
const validateRequests = require("../middleware/validateRequests");

router.post(
  "/add-collaborator/:wishlistId",
  validateRequests,
  collaboratorController.addCollabByUsername
);

router.get(
  "/generate-link/:wishlistId",
  validateRequests,
  collaboratorController.generateInvitationLink
);

router.post(
  "/invitation",
  validateRequests,
  collaboratorController.invitationAcceptance
);

module.exports = router;
