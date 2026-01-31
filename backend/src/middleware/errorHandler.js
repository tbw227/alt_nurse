// Custom error handler middleware
import logger from '../services/logger.js';

export const errorHandler = (err, req, res, next) => {
  const statusCode = err.statusCode || 500;
  const NODE_ENV = process.env.NODE_ENV || 'development';

  // Sanitize error message to prevent secret leakage
  let message = 'Internal Server Error';
  
  if (NODE_ENV === 'development') {
    message = err.message || 'Internal Server Error';
  } else {
    // In production, use generic messages for 500 errors
    if (statusCode >= 500) {
      message = 'An internal server error occurred';
    } else {
      // For client errors (4xx), it's safe to show the message
      message = err.message || 'Request failed';
    }
  }

  // Log error with request context using logger (server-side only)
  // Never log sensitive information
  logger.error('Request error', {
    message: err.message,
    statusCode,
    url: req.url,
    method: req.method,
    requestId: req.id,
    ip: req.ip,
    // Don't log full error object in production to avoid secret leakage
    ...(NODE_ENV === 'development' && { stack: err.stack, error: err })
  });

  // Never expose stack traces or error details in production
  const response = {
    success: false,
    error: {
      message
    }
  };

  // Only include stack trace in development
  if (NODE_ENV === 'development' && err.stack) {
    response.error.stack = err.stack;
  }

  res.status(statusCode).json(response);
};

// Async handler wrapper to catch errors in async routes
export const asyncHandler = (fn) => {
  return (req, res, next) => {
    Promise.resolve(fn(req, res, next)).catch(next);
  };
};
