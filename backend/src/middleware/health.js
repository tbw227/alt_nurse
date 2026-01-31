/**
 * Health Check Middleware
 * Provides comprehensive health checks for monitoring
 */

import db from '../services/database.js';
import cache from '../services/cache.js';
import logger from '../services/logger.js';

/**
 * Basic health check
 * @param {Object} req - Express request
 * @param {Object} res - Express response
 */
export const healthCheck = async (req, res) => {
  try {
    const health = {
      status: 'OK',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      version: process.env.npm_package_version || '1.0.0',
    };

    res.status(200).json(health);
  } catch (error) {
    logger.error('Health check failed', error);
    res.status(503).json({
      status: 'ERROR',
      timestamp: new Date().toISOString(),
      error: 'Health check failed',
    });
  }
};

/**
 * Detailed health check with dependencies
 * @param {Object} req - Express request
 * @param {Object} res - Express response
 */
export const healthCheckDetailed = async (req, res) => {
  try {
    const checks = {
      status: 'OK',
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      environment: process.env.NODE_ENV || 'development',
      version: process.env.npm_package_version || '1.0.0',
      checks: {
        database: {
          status: 'unknown',
          responseTime: null,
        },
        cache: {
          status: 'unknown',
          responseTime: null,
        },
        memory: {
          status: 'OK',
          used: Math.round(process.memoryUsage().heapUsed / 1024 / 1024),
          total: Math.round(process.memoryUsage().heapTotal / 1024 / 1024),
          unit: 'MB',
        },
      },
    };

    // Check database
    try {
      const dbStart = Date.now();
      const dbHealthy = await db.healthCheck();
      checks.checks.database = {
        status: dbHealthy ? 'OK' : 'ERROR',
        responseTime: `${Date.now() - dbStart}ms`,
      };
    } catch (error) {
      checks.checks.database = {
        status: 'ERROR',
        error: error.message,
      };
      checks.status = 'DEGRADED';
    }

    // Check cache
    try {
      const cacheStart = Date.now();
      await cache.get('health-check');
      checks.checks.cache = {
        status: 'OK',
        responseTime: `${Date.now() - cacheStart}ms`,
      };
    } catch (error) {
      checks.checks.cache = {
        status: 'ERROR',
        error: error.message,
      };
      checks.status = 'DEGRADED';
    }

    const statusCode = checks.status === 'OK' ? 200 : 503;
    res.status(statusCode).json(checks);
  } catch (error) {
    logger.error('Detailed health check failed', error);
    res.status(503).json({
      status: 'ERROR',
      timestamp: new Date().toISOString(),
      error: 'Health check failed',
    });
  }
};
