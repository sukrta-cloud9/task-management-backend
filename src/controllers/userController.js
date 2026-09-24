const User = require("../models/User");

const getMyProfile = (req, res) => {
  try {
    const user = User.findById(req.user.userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    res.status(200).json({
      user
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal server error"
    });
  }
};

const getAllUsers = (req, res) => {
  try {
    const users = User.findAll();

    res.status(200).json({
      users
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal server error"
    });
  }
};

const deleteUser = (req, res) => {
  try {
    const userId = Number(req.params.id);

    const user = User.findById(userId);

    if (!user) {
      return res.status(404).json({
        message: "User not found"
      });
    }

    if (userId === req.user.userId) {
      return res.status(400).json({
        message: "Admin cannot delete their own account"
      });
    }

    User.deleteById(userId);

    res.status(200).json({
      message: "User deleted successfully"
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal server error"
    });
  }
};

module.exports = {
  getMyProfile,
  getAllUsers,
  deleteUser
};