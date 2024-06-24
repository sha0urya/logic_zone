const jwt = require("jsonwebtoken");
const { errorHandler }  = require("../middlewares/errorMiddleware");

// Generate a JWT token with expiration
const generateToken = (payload, expiresIn = "1h") => {
  return jwt.sign(payload, process.env.JWT_SECRET_KEY, { expiresIn });
};

// Verify a JWT token from the request cookies
 const verifyToken = (req, res, next) => {
  const token = req.cookies.access_token;
  if (!token) {
    return next(errorHandler(401, "Unauthorized"));
  }
  jwt.verify(token, process.env.JWT_SECRET_KEY, (err, user) => {
    if (err) {
      return next(errorHandler(401, "Unauthorized"));
    }
    req.user = user;
    next();
  });
};

module.exports = {
  verifyToken,
  generateToken,
};
