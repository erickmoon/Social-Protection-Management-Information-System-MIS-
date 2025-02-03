const errorHandler = (err, req, res, next) => {
  console.error(err.stack);

  // Handle specific error types
  if (err.name === "ValidationError") {
    return res.status(400).json({
      error: "Validation Error",
      message: err.message
    });
  }

  if (err.name === "UnauthorizedError") {
    return res.status(401).json({
      error: "Unauthorized",
      message: err.message
    });
  }

  // Default error
  res.status(500).json({
    error: "Something went wrong!",
    message: err.message
  });
};

module.exports = errorHandler;
