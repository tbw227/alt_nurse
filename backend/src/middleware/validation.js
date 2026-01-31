/**
 * Enhanced Input Validation Middleware
 * Comprehensive validation for all API endpoints
 */

import { body, param, query, validationResult } from 'express-validator';
import logger from '../services/logger.js';

/**
 * Sanitize and validate ID parameters
 */
export const validateId = [
  param('id')
    .trim()
    .notEmpty()
    .withMessage('ID is required')
    .matches(/^[a-zA-Z0-9_-]+$/)
    .withMessage('ID contains invalid characters')
    .isLength({ min: 1, max: 100 })
    .withMessage('ID must be between 1 and 100 characters'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: {
          message: 'Invalid ID parameter',
          details: errors.array()
        }
      });
    }
    next();
  }
];

/**
 * Validate query parameters
 */
export const validateQuery = [
  query('limit')
    .optional()
    .isInt({ min: 1, max: 100 })
    .withMessage('Limit must be between 1 and 100')
    .toInt(),
  
  query('status')
    .optional()
    .trim()
    .isIn(['new', 'read', 'archived', 'upcoming', 'past', 'cancelled'])
    .withMessage('Invalid status value'),
  
  query('published')
    .optional()
    .isBoolean()
    .withMessage('Published must be true or false')
    .toBoolean(),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: {
          message: 'Invalid query parameters',
          details: errors.array()
        }
      });
    }
    next();
  }
];

/**
 * Enhanced contact form validation
 */
export const validateContactForm = [
  body('name')
    .trim()
    .notEmpty()
    .withMessage('Name is required')
    .isLength({ min: 2, max: 100 })
    .withMessage('Name must be between 2 and 100 characters')
    .matches(/^[a-zA-Z\s'-]+$/)
    .withMessage('Name contains invalid characters')
    .escape(),
  
  body('email')
    .trim()
    .notEmpty()
    .withMessage('Email is required')
    .isEmail()
    .withMessage('Valid email is required')
    .normalizeEmail()
    .isLength({ max: 255 })
    .withMessage('Email must not exceed 255 characters')
    .custom((email) => {
      // Prevent email injection attempts
      if (email.includes('\n') || email.includes('\r') || email.includes('\0')) {
        throw new Error('Email contains invalid characters');
      }
      return true;
    }),
  
  body('message')
    .trim()
    .notEmpty()
    .withMessage('Message is required')
    .isLength({ min: 10, max: 5000 })
    .withMessage('Message must be between 10 and 5000 characters')
    .escape(),
  
  body('phone')
    .optional({ checkFalsy: true })
    .trim()
    .isLength({ max: 20 })
    .withMessage('Phone number must not exceed 20 characters')
    .matches(/^[\d\s\-\+\(\)]+$/)
    .withMessage('Phone number contains invalid characters'),
  
  body('subject')
    .optional()
    .trim()
    .isLength({ max: 200 })
    .withMessage('Subject must not exceed 200 characters')
    .escape(),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      const firstError = errors.array()[0];
      logger.warn('Validation failed', {
        errors: errors.array(),
        requestId: req.id,
        ip: req.ip
      });
      
      return res.status(400).json({
        success: false,
        error: {
          message: firstError.msg || 'Validation failed',
          details: errors.array().map(err => ({
            field: err.path || err.param,
            message: err.msg
          }))
        }
      });
    }
    next();
  }
];

/**
 * Validate event creation/update
 */
export const validateEvent = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 3, max: 200 })
    .withMessage('Title must be between 3 and 200 characters')
    .escape(),
  
  body('date')
    .notEmpty()
    .withMessage('Date is required')
    .isISO8601()
    .withMessage('Valid ISO8601 date is required')
    .custom((date) => {
      const eventDate = new Date(date);
      if (isNaN(eventDate.getTime())) {
        throw new Error('Invalid date format');
      }
      return true;
    }),
  
  body('venue')
    .trim()
    .notEmpty()
    .withMessage('Venue is required')
    .isLength({ min: 2, max: 200 })
    .withMessage('Venue must be between 2 and 200 characters')
    .escape(),
  
  body('description')
    .optional()
    .trim()
    .isLength({ max: 5000 })
    .withMessage('Description must not exceed 5000 characters')
    .escape(),
  
  body('image')
    .optional()
    .trim()
    .isURL({ require_tld: false })
    .withMessage('Image must be a valid URL path')
    .custom((image) => {
      // Ensure image path doesn't contain dangerous patterns
      if (image.includes('..') || image.includes('//') || image.startsWith('/')) {
        // Allow relative paths starting with /images/
        if (!image.startsWith('/images/') && !image.startsWith('/videos/')) {
          throw new Error('Image path must start with /images/ or /videos/');
        }
      }
      return true;
    }),
  
  body('price')
    .optional()
    .isFloat({ min: 0 })
    .withMessage('Price must be a positive number')
    .toFloat(),
  
  body('status')
    .optional()
    .trim()
    .isIn(['upcoming', 'past', 'cancelled'])
    .withMessage('Status must be upcoming, past, or cancelled'),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: {
          message: 'Validation failed',
          details: errors.array()
        }
      });
    }
    next();
  }
];

/**
 * Validate news article creation/update
 */
export const validateNews = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 3, max: 200 })
    .withMessage('Title must be between 3 and 200 characters')
    .escape(),
  
  body('content')
    .trim()
    .notEmpty()
    .withMessage('Content is required')
    .isLength({ min: 10, max: 50000 })
    .withMessage('Content must be between 10 and 50000 characters'),
  
  body('author')
    .optional()
    .trim()
    .isLength({ max: 100 })
    .withMessage('Author must not exceed 100 characters')
    .escape(),
  
  body('image')
    .optional()
    .trim()
    .custom((image) => {
      if (image && !image.startsWith('/images/')) {
        throw new Error('Image path must start with /images/');
      }
      return true;
    }),
  
  body('published')
    .optional()
    .isBoolean()
    .withMessage('Published must be true or false')
    .toBoolean(),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: {
          message: 'Validation failed',
          details: errors.array()
        }
      });
    }
    next();
  }
];

/**
 * Validate gallery image creation/update
 */
export const validateGalleryImage = [
  body('title')
    .trim()
    .notEmpty()
    .withMessage('Title is required')
    .isLength({ min: 1, max: 200 })
    .withMessage('Title must be between 1 and 200 characters')
    .escape(),
  
  body('image')
    .trim()
    .notEmpty()
    .withMessage('Image path is required')
    .custom((image) => {
      if (!image.startsWith('/images/')) {
        throw new Error('Image path must start with /images/');
      }
      // Prevent path traversal
      if (image.includes('..') || image.includes('//')) {
        throw new Error('Invalid image path');
      }
      return true;
    }),
  
  body('description')
    .optional()
    .trim()
    .isLength({ max: 1000 })
    .withMessage('Description must not exceed 1000 characters')
    .escape(),
  
  body('category')
    .optional()
    .trim()
    .matches(/^[a-z0-9-]+$/)
    .withMessage('Category must contain only lowercase letters, numbers, and hyphens')
    .isLength({ max: 50 })
    .withMessage('Category must not exceed 50 characters'),
  
  body('video')
    .optional()
    .trim()
    .custom((video) => {
      if (video && !video.startsWith('/videos/')) {
        throw new Error('Video path must start with /videos/');
      }
      if (video && (video.includes('..') || video.includes('//'))) {
        throw new Error('Invalid video path');
      }
      return true;
    }),
  
  (req, res, next) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({
        success: false,
        error: {
          message: 'Validation failed',
          details: errors.array()
        }
      });
    }
    next();
  }
];

/**
 * Sanitize response data to prevent secret leakage
 */
export const sanitizeResponse = (data) => {
  if (!data || typeof data !== 'object') {
    return data;
  }

  const sensitiveFields = [
    'password',
    'apiKey',
    'secret',
    'token',
    'jwt',
    'authorization',
    'privateKey',
    'accessToken',
    'refreshToken'
  ];

  const sanitized = Array.isArray(data) ? [...data] : { ...data };

  for (const key in sanitized) {
    if (sensitiveFields.some(field => key.toLowerCase().includes(field.toLowerCase()))) {
      delete sanitized[key];
    } else if (typeof sanitized[key] === 'object' && sanitized[key] !== null) {
      sanitized[key] = sanitizeResponse(sanitized[key]);
    }
  }

  return sanitized;
};
