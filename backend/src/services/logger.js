/**
 * Structured Logging System
 * Provides scalable logging with different levels and formats
 * Ready for integration with logging services (Winston, Pino, etc.)
 */

const LOG_LEVELS = {
  error: 0,
  warn: 1,
  info: 2,
  debug: 3,
};

const currentLevel = LOG_LEVELS[process.env.LOG_LEVEL || (process.env.NODE_ENV === 'production' ? 'info' : 'debug')] || LOG_LEVELS.info;

/**
 * Format log message
 * @param {string} level - Log level
 * @param {string} message - Log message
 * @param {Object} meta - Additional metadata
 * @returns {Object}
 */
function formatLog(level, message, meta = {}) {
  const timestamp = new Date().toISOString();
  const logEntry = {
    timestamp,
    level: level.toUpperCase(),
    message,
    ...meta,
  };

  // Add request ID if available
  if (meta.requestId) {
    logEntry.requestId = meta.requestId;
  }

  // Add environment
  logEntry.env = process.env.NODE_ENV || 'development';

  return logEntry;
}

/**
 * Output log based on format
 * @param {Object} logEntry - Formatted log entry
 */
function outputLog(logEntry) {
  const format = process.env.LOG_FORMAT || 'text';
  
  if (format === 'json') {
    console.log(JSON.stringify(logEntry));
  } else {
    const { timestamp, level, message, ...meta } = logEntry;
    const metaStr = Object.keys(meta).length > 0 ? ` ${JSON.stringify(meta)}` : '';
    console.log(`[${level}] ${timestamp} - ${message}${metaStr}`);
  }
}

const logger = {
  /**
   * Log error message
   * @param {string} message - Error message
   * @param {Error|Object} error - Error object or metadata
   * @param {Object} meta - Additional metadata
   */
  error: (message, error = {}, meta = {}) => {
    if (LOG_LEVELS.error <= currentLevel) {
      const errorMeta = {
        ...meta,
        error: error instanceof Error 
          ? {
              name: error.name,
              message: error.message,
              stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
            }
          : error,
      };
      
      const logEntry = formatLog('error', message, errorMeta);
      outputLog(logEntry);
      
      // TODO: Send to error tracking service (Sentry, Rollbar, etc.)
      // if (process.env.ERROR_TRACKING_SERVICE) {
      //   sendToErrorTracking(logEntry);
      // }
    }
  },

  /**
   * Log warning message
   * @param {string} message - Warning message
   * @param {Object} meta - Additional metadata
   */
  warn: (message, meta = {}) => {
    if (LOG_LEVELS.warn <= currentLevel) {
      const logEntry = formatLog('warn', message, meta);
      outputLog(logEntry);
    }
  },

  /**
   * Log info message
   * @param {string} message - Info message
   * @param {Object} meta - Additional metadata
   */
  info: (message, meta = {}) => {
    if (LOG_LEVELS.info <= currentLevel) {
      const logEntry = formatLog('info', message, meta);
      outputLog(logEntry);
    }
  },

  /**
   * Log debug message
   * @param {string} message - Debug message
   * @param {Object} meta - Additional metadata
   */
  debug: (message, meta = {}) => {
    if (LOG_LEVELS.debug <= currentLevel) {
      const logEntry = formatLog('debug', message, meta);
      outputLog(logEntry);
    }
  },

  /**
   * Log HTTP request
   * @param {Object} req - Express request object
   * @param {Object} res - Express response object
   * @param {number} responseTime - Response time in ms
   */
  http: (req, res, responseTime) => {
    if (LOG_LEVELS.info <= currentLevel) {
      const logEntry = formatLog('info', 'HTTP Request', {
        method: req.method,
        url: req.url,
        statusCode: res.statusCode,
        responseTime: `${responseTime}ms`,
        ip: req.ip,
        userAgent: req.get('user-agent'),
        requestId: req.id,
      });
      outputLog(logEntry);
    }
  },
};

export default logger;
