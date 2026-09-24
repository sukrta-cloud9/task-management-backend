const express = require("express");

const {
  createTask,
  getTasks,
  updateTask,
  deleteTask
} = require("../controllers/taskController");

const authenticateToken = require("../middleware/authMiddleware");

const {
  taskValidator,
  taskIdValidator
} = require("../validators/taskValidator");

const validate = require("../middleware/validationMiddleware");

const router = express.Router();

router.post(
  "/",
  authenticateToken,
  taskValidator,
  validate,
  createTask
);

router.get(
  "/",
  authenticateToken,
  getTasks
);

router.put(
  "/:id",
  authenticateToken,
  taskIdValidator,
  taskValidator,
  validate,
  updateTask
);

router.delete(
  "/:id",
  authenticateToken,
  taskIdValidator,
  validate,
  deleteTask
);

module.exports = router;