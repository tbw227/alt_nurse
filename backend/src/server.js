/**
 * Server Startup
 * Handles database connection, server startup, and graceful shutdown
 */

import app from './app.js';
import config, { validateConfig } from './services/config.js';
import logger from './services/logger.js';
import db from './services/database.js';

// Validate configuration
try {
  validateConfig();
} catch (error) {
  logger.error('Configuration validation failed', error);
  process.exit(1);
}

const PORT = config.server.port;
let server;

// Graceful shutdown handling
const gracefulShutdown = async (signal) => {
  logger.info(`Received ${signal}, starting graceful shutdown...`);
  
  // Stop accepting new requests (if server is running)
  if (server) {
    server.close(async () => {
      logger.info('HTTP server closed');
      
      // Close database connections
      try {
        await db.disconnect();
        logger.info('Database disconnected');
      } catch (error) {
        logger.error('Error disconnecting database', error);
      }
      
      logger.info('Graceful shutdown complete');
      process.exit(0);
    });
    
    // Force shutdown after 10 seconds
    setTimeout(() => {
      logger.error('Forced shutdown after timeout');
      process.exit(1);
    }, 10000);
  } else {
    // Server not started yet, just close database and exit
    try {
      await db.disconnect();
      logger.info('Database disconnected');
    } catch (error) {
      logger.error('Error disconnecting database', error);
    }
    logger.info('Graceful shutdown complete');
    process.exit(0);
  }
};

// Register signal handlers BEFORE starting server
process.on('SIGTERM', () => gracefulShutdown('SIGTERM'));
process.on('SIGINT', () => gracefulShutdown('SIGINT'));

// Handle uncaught errors
process.on('uncaughtException', (error) => {
  logger.error('Uncaught exception', error);
  gracefulShutdown('uncaughtException');
});

process.on('unhandledRejection', (reason, promise) => {
  logger.error('Unhandled rejection', { reason, promise });
  gracefulShutdown('unhandledRejection');
});

async function startServer() {
  try {
    // Connect to database
    await db.connect();
    
    // Start server
    server = app.listen(PORT, () => {
      logger.info(`Server running on port ${PORT}`, {
        port: PORT,
        environment: config.server.env,
        healthCheck: `http://localhost:${PORT}/health`,
      });
      
      if (config.server.env === 'development') {
        logger.info(`API endpoint: http://localhost:${PORT}/api`);
      }
    });

  } catch (error) {
    logger.error('Failed to start server', error);
    await gracefulShutdown('startup-error');
  }
}

// Start the server (only if not in Vercel serverless environment)
if (process.env.VERCEL !== 'true') {
  startServer();
}

export default app;
