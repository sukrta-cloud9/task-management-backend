const { body, param } = require("express-validator");

const taskValidator = [
  body("title")
    .trim()
    .notEmpty()
    .withMessage("Title is required"),

  body("description")
    .optional()
    .isString()
    .withMessage("Description must be a string"),

  body("status")
    .optional()
    .isIn(["pending", "completed"])
    .withMessage("Status must be pending or completed")
];

const taskIdValidator = [
  param("id")
    .isInt({ min: 1 })
    .withMessage("Task ID must be a valid number")
];

module.exports = {
  taskValidator,
  taskIdValidator
};