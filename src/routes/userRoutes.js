const express = require("express");

const { getMyProfile } = require("../controllers/userController");
const authenticateToken = require("../middleware/authMiddleware");

const router = express.Router();

router.get(
  "/me",
  authenticateToken,
  getMyProfile
);

module.exports = router;