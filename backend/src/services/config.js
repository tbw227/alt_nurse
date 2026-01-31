/**
 * Configuration Management
 * Centralized configuration with environment variable support
 */

import dotenv from 'dotenv';

// Load environment variables
dotenv.config();

const config = {
  // Server Configuration
  server: {
    port: parseInt(process.env.PORT || '5000', 10),
    env: process.env.NODE_ENV || 'development',
    trustProxy: process.env.TRUST_PROXY === 'true' || false,
  },

  // Frontend Configuration
  frontend: {
    url: process.env.FRONTEND_URL || 'http://localhost:5173',
    allowedOrigins: process.env.ALLOWED_ORIGINS 
      ? process.env.ALLOWED_ORIGINS.split(',')
      : ['http://localhost:5173', 'http://localhost:3000', 'http://localhost:4173'],
  },

  // Database Configuration (ready for future integration)
  database: {
    type: process.env.DB_TYPE || 'memory', // 'memory', 'mongodb', 'postgresql'
    uri: process.env.DATABASE_URI || '',
    options: {
      poolSize: parseInt(process.env.DB_POOL_SIZE || '10', 10),
      connectTimeout: parseInt(process.env.DB_CONNECT_TIMEOUT || '30000', 10),
    },
  },

  // Rate Limiting Configuration
  rateLimit: {
    windowMs: parseInt(process.env.RATE_LIMIT_WINDOW_MS || '900000', 10), // 15 minutes
    max: process.env.NODE_ENV === 'production' 
      ? parseInt(process.env.RATE_LIMIT_MAX || '100', 10)
      : parseInt(process.env.RATE_LIMIT_MAX_DEV || '1000', 10),
  },

  // Security Configuration
  security: {
    jwtSecret: process.env.JWT_SECRET || '',
    jwtExpiry: process.env.JWT_EXPIRY || '24h',
    bcryptRounds: parseInt(process.env.BCRYPT_ROUNDS || '10', 10),
    apiKey: process.env.API_KEY || '', // API key for admin routes
  },

  // Caching Configuration (ready for Redis integration)
  cache: {
    enabled: process.env.CACHE_ENABLED === 'true' || false,
    type: process.env.CACHE_TYPE || 'memory', // 'memory', 'redis'
    ttl: parseInt(process.env.CACHE_TTL || '3600', 10), // 1 hour
    redis: {
      host: process.env.REDIS_HOST || 'localhost',
      port: parseInt(process.env.REDIS_PORT || '6379', 10),
      password: process.env.REDIS_PASSWORD || '',
    },
  },

  // Logging Configuration
  logging: {
    level: process.env.LOG_LEVEL || (process.env.NODE_ENV === 'production' ? 'info' : 'debug'),
    format: process.env.LOG_FORMAT || 'json', // 'json', 'text'
    destination: process.env.LOG_DESTINATION || 'console', // 'console', 'file', 'service'
  },

  // File Upload Configuration
  upload: {
    maxSize: parseInt(process.env.UPLOAD_MAX_SIZE || '10485760', 10), // 10MB
    allowedTypes: process.env.UPLOAD_ALLOWED_TYPES 
      ? process.env.UPLOAD_ALLOWED_TYPES.split(',')
      : ['image/jpeg', 'image/png', 'image/webp', 'image/gif'],
    destination: process.env.UPLOAD_DESTINATION || './uploads',
  },

  // Email Configuration (ready for email service integration)
  email: {
    enabled: process.env.EMAIL_ENABLED === 'true' || false,
    service: process.env.EMAIL_SERVICE || 'smtp',
    host: process.env.EMAIL_HOST || '',
    port: parseInt(process.env.EMAIL_PORT || '587', 10),
    user: process.env.EMAIL_USER || '',
    password: process.env.EMAIL_PASSWORD || '',
    from: process.env.EMAIL_FROM || 'noreply@kcmusicevents.com',
  },
};

/**
 * Validate required configuration
 */
export function validateConfig() {
  const required = [];
  
  // Add required environment variables here as needed
  // if (!config.database.uri && config.database.type !== 'memory') {
  //   required.push('DATABASE_URI');
  // }
  
  if (required.length > 0) {
    throw new Error(`Missing required environment variables: ${required.join(', ')}`);
  }
  
  return true;
}

/**
 * Get configuration value
 * @param {string} path - Dot-notation path (e.g., 'server.port')
 * @returns {any}
 */
export function getConfig(path) {
  const keys = path.split('.');
  let value = config;
  
  for (const key of keys) {
    if (value && typeof value === 'object' && key in value) {
      value = value[key];
    } else {
      return undefined;
    }
  }
  
  return value;
}

export default config;
