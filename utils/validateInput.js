const { validationResult, formatWith } = require("express-validator");

const errorFormatter = ({ msg, param, location }) => {
  return {
    message: msg,
    field: param,
    location,
  };
};

const validateInput = (req, res, next) => {
  const errors = validationResult(req).formatWith(errorFormatter);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      success: false,
      errors: errors.array(),
    });
  }

  next();
};

module.exports = {
  validateInput,
};
