const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const User = require("../models/User");

const register = (req, res) => {
  try {
    const { name, email, password } = req.body;

    const existingUser = User.findByEmail(email);

    if (existingUser) {
      return res.status(409).json({
        message: "Email is already registered"
      });
    }

    const hashedPassword = bcrypt.hashSync(password, 10);

    const user = User.create(
      name,
      email,
      hashedPassword
    );

    res.status(201).json({
      message: "User registered successfully",
      user
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal server error"
    });
  }
};

const login = (req, res) => {
  try {
    const { email, password } = req.body;

    const user = User.findByEmail(email);

    if (!user) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    const passwordMatches = bcrypt.compareSync(
      password,
      user.password
    );

    if (!passwordMatches) {
      return res.status(401).json({
        message: "Invalid email or password"
      });
    }

    const token = jwt.sign(
      {
        userId: user.id,
        role: user.role
      },
      process.env.JWT_SECRET,
      {
        expiresIn: "1h"
      }
    );

    res.status(200).json({
      message: "Login successful",
      token
    });
  } catch (error) {
    console.error(error);

    res.status(500).json({
      message: "Internal server error"
    });
  }
};

module.exports = {
  register,
  login
};