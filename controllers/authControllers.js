const bcrypt = require('bcryptjs');
const { validationResult } = require('express-validator');
const { findUserByUsername, findUserByEmail, createUser } = require('../models/userModel.js');
const { generateToken } = require('../utils/jwt.js');

const register = async (req, res, next) => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    return res.status(400).json({ errors: errors.array() });
  }

  const { username, email, password } = req.body;

  try {
    let user = await findUserByUsername(username);
    if (user) {
      return res.status(400).json({ message: 'Username already exists' });
    }

    user = await findUserByEmail(email);
    if (user) {
      return res.status(400).json({ message: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 10);
    const userId = await createUser(username, email, hashedPassword);

    const token = generateToken({ userId });

    res.status(201).json({ token });
  } catch (error) {
    next(error);
  }
};

const login = async (req, res, next) => {
  const { email, password } = req.body;

  try {
    const user = await findUserByEmail(email);

    if (!user) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ message: 'Invalid credentials' });
    }

    const token = generateToken({ userId: user.user_id });

    res.json({ token });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  register,
  login,
};
