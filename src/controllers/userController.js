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

module.exports = {
  getMyProfile
};