const bcrypt = require("bcryptjs");
const { validationResult } = require("express-validator");
const {
  findUserByUsername,
  findUserByEmail,
  createUser,
} = require("../models/userModel");
const { generateToken } = require("../utils/jwt");

const register = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { first_name, last_name, username, email, password} = req.body;

  try {
    // Check if username or email already exists
    const [usernameExists, emailExists] = await Promise.all([
      findUserByUsername(username),
      findUserByEmail(email),
    ]);

    if (usernameExists) {
      return res.status(400).json({ message: "Username already exists" });
    }
    if (emailExists) {
      return res.status(400).json({ message: "Email already exists" });
    }

    // Hash the password and create the user
    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await createUser(
      first_name,
      last_name,
      username,
      email,
      hashedPassword
    );

    // Generate a JWT token with 1 hour expiration
    const token = generateToken({ userId }, "1h");

    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);

    if (!user || !(await bcrypt.compare(password, user.password))) {
      return res.status(400).json({ message: "Invalid credentials" });
    }

    const token = generateToken({ userId: user.user_id }, "1h");

    res.json({ token });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
};
