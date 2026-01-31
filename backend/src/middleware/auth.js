/**
 * Authorization Middleware
 * Handles authentication and authorization for protected routes
 */

import config from '../services/config.js';
import logger from '../services/logger.js';

/**
 * Simple API key authentication middleware
 * In production, replace with proper JWT/OAuth authentication
 */
export const authenticate = (req, res, next) => {
  // Skip authentication in development if no API key is set
  if (config.server.env === 'development' && !config.security.apiKey) {
    logger.warn('API authentication disabled in development mode');
    return next();
  }

  const apiKey = req.headers['x-api-key'] || req.headers['authorization']?.replace('Bearer ', '');

  if (!apiKey) {
    return res.status(401).json({
      success: false,
      error: {
        message: 'Authentication required. Please provide an API key.',
        code: 'AUTH_REQUIRED'
      }
    });
  }

  // Validate API key
  const validApiKey = config.security.apiKey || process.env.API_KEY;
  
  if (!validApiKey) {
    logger.error('API key not configured in server');
    return res.status(500).json({
      success: false,
      error: {
        message: 'Server configuration error',
        code: 'CONFIG_ERROR'
      }
    });
  }

  if (apiKey !== validApiKey) {
    logger.warn('Invalid API key attempt', { ip: req.ip, requestId: req.id });
    return res.status(403).json({
      success: false,
      error: {
        message: 'Invalid API key',
        code: 'AUTH_INVALID'
      }
    });
  }

  // Attach user info to request (in production, decode from JWT)
  req.user = {
    id: 'admin',
    role: 'admin',
    authenticated: true
  };

  next();
};

/**
 * Role-based authorization middleware
 */
export const authorize = (...allowedRoles) => {
  return (req, res, next) => {
    if (!req.user) {
      return res.status(401).json({
        success: false,
        error: {
          message: 'Authentication required',
          code: 'AUTH_REQUIRED'
        }
      });
    }

    if (!allowedRoles.includes(req.user.role)) {
      logger.warn('Unauthorized access attempt', {
        user: req.user.id,
        role: req.user.role,
        required: allowedRoles,
        path: req.path,
        requestId: req.id
      });

      return res.status(403).json({
        success: false,
        error: {
          message: 'Insufficient permissions',
          code: 'FORBIDDEN'
        }
      });
    }

    next();
  };
};

/**
 * Admin-only route protection
 */
export const requireAdmin = [authenticate, authorize('admin')];
