const Task = require("../models/Task");

const createTask = (req, res) => {
  try {
    const { title, description, status } = req.body;

    const task = Task.create(
      title,
      description || null,
      status || "pending",
      req.user.userId
    );

    res.status(201).json({
      message: "Task created successfully",
      task
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal server error"
    });
  }
};

const getTasks = (req, res) => {
  try {
    let tasks;

    if (req.user.role === "admin") {
      tasks = Task.findAll();
    } else {
      tasks = Task.findByUserId(req.user.userId);
    }

    res.status(200).json({
      tasks
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal server error"
    });
  }
};

const updateTask = (req, res) => {
  try {
    const taskId = Number(req.params.id);
    const { title, description, status } = req.body;

    const existingTask = Task.findById(taskId);

    if (!existingTask) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    if (
      req.user.role !== "admin" &&
      existingTask.user_id !== req.user.userId
    ) {
      return res.status(403).json({
        message: "You can only update your own tasks"
      });
    }

    const task = Task.update(
      taskId,
      title,
      description || null,
      status
    );

    res.status(200).json({
      message: "Task updated successfully",
      task
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal server error"
    });
  }
};

const deleteTask = (req, res) => {
  try {
    const taskId = Number(req.params.id);

    const existingTask = Task.findById(taskId);

    if (!existingTask) {
      return res.status(404).json({
        message: "Task not found"
      });
    }

    if (
      req.user.role !== "admin" &&
      existingTask.user_id !== req.user.userId
    ) {
      return res.status(403).json({
        message: "You can only delete your own tasks"
      });
    }

    Task.deleteById(taskId);

    res.status(200).json({
      message: "Task deleted successfully"
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal server error"
    });
  }
};

module.exports = {
  createTask,
  getTasks,
  updateTask,
  deleteTask
};