const express = require("express");
const { register, login } = require("../controllers/authControllers");
const { check } = require("express-validator");

const router = express.Router();

const validateRegistration = [
  check("first_name", "First name is required").not().isEmpty(),
  check("last_name", "Last name is required").not().isEmpty(),
  check("username", "Username is required").not().isEmpty(),
  check("email", "Please include a valid email").isEmail(),
  check("password", "Password is required").not().isEmpty(),
];

const validateLogin = [
  check("email", "Please include a valid email").isEmail(),
  check("password", "Password is required").not().isEmpty(),
];

router.post("/register", validateRegistration, register);
router.post("/login", validateLogin, login);

module.exports = router;
