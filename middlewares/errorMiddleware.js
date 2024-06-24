const errorHandler = (err, req, res, next) => {
  // Log detailed error information
  console.error({
    message: err.message,
    stack: err.stack,
    name: err.name,
    status: err.status,
  });

  // Determine the status code
  const statusCode = err.status || 500;

  // Send a different response based on the environment
  if (process.env.NODE_ENV === "development") {
    res.status(statusCode).json({
      success: false,
      error: {
        message: err.message,
        stack: err.stack,
        name: err.name,
      },
    });
  } else {
    res.status(statusCode).json({
      success: false,
      error: "Server Error",
    });
  }
};

module.exports = {
  errorHandler,
};
