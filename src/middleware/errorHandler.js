const errorHandler = (err, req, res, next) => {
  // Log the full error stack in development
  if (process.env.NODE_ENV === "development") {
    console.error(err.stack);
  }

  // Handle Validation Errors
  if (
    err.name === "ValidationError" ||
    err.name === "BadRequestError" ||
    err.code === "23502" || // Not null violation
    err.code === "23503" || // Foreign key constraint violation
    err.code === "23505"
  ) {
    // Unique constraint violation
    return res.status(400).json({
      error: "Validation Error",
      message: err.message || "Invalid data provided",
      details: err.details || null
    });
  }

  // Handle Authentication and Authorization Errors
  if (err.name === "UnauthorizedError" || err.name === "AuthenticationError") {
    return res.status(401).json({
      error: "Unauthorized",
      message: err.message || "Authentication failed"
    });
  }

  // Handle Forbidden Errors
  if (err.name === "ForbiddenError") {
    return res.status(403).json({
      error: "Forbidden",
      message:
        err.message || "You do not have permission to access this resource"
    });
  }

  // Handle Not Found Errors
  if (err.name === "NotFoundError" || err.code === "22P02") {
    return res.status(404).json({
      error: "Not Found",
      message: err.message || "The requested resource could not be found"
    });
  }

  // Handle Database-specific Errors
  if (err.code) {
    switch (err.code) {
      case "23505": // Unique violation
        return res.status(409).json({
          error: "Conflict",
          message: "A record with this unique identifier already exists"
        });
      case "23503": // Foreign key violation
        return res.status(400).json({
          error: "Constraint Violation",
          message: "Related record does not exist"
        });
      case "22P02": // Invalid text representation
        return res.status(400).json({
          error: "Invalid Input",
          message: "Invalid data format"
        });
    }
  }

  // Default error handler
  const statusCode = err.status || 500;
  res.status(statusCode).json({
    error: "Internal Server Error",
    message:
      process.env.NODE_ENV === "development"
        ? err.message
        : "An unexpected error occurred",
    ...(process.env.NODE_ENV === "development" && { stack: err.stack })
  });
};

module.exports = errorHandler;
