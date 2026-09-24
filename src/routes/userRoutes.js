const express = require("express");

const {
  getMyProfile,
  getAllUsers,
  deleteUser
} = require("../controllers/userController");

const authenticateToken = require("../middleware/authMiddleware");
const requireAdmin = require("../middleware/roleMiddleware");

const router = express.Router();


router.get(
  "/me",
  authenticateToken,
  getMyProfile
);


router.get(
  "/",
  authenticateToken,
  requireAdmin,
  getAllUsers
);


router.delete(
  "/:id",
  authenticateToken,
  requireAdmin,
  deleteUser
);

module.exports = router;