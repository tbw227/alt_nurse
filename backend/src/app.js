/**
 * Express Application Setup
 * Configures middleware, routes, and error handling
 */

import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import helmet from 'helmet';
import path from 'path';
import { fileURLToPath } from 'url';
import { existsSync } from 'fs';
import rateLimit from 'express-rate-limit';
import compression from 'compression';
import apiRoutes from './routes/api.js';
import { requestId, securityHeaders, sanitizeInput } from './middleware/security.js';
import { errorHandler } from './middleware/errorHandler.js';
import { healthCheck, healthCheckDetailed } from './middleware/health.js';
import config from './services/config.js';
import logger from './services/logger.js';

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const NODE_ENV = config.server.env;

// Trust proxy (important for rate limiting behind reverse proxy)
app.set('trust proxy', config.server.trustProxy ? 1 : 0);

// Request ID and security headers
app.use(requestId);
app.use(securityHeaders);

// Security middleware
app.use(helmet({
  contentSecurityPolicy: NODE_ENV === 'production' 
    ? undefined 
    : {
        directives: {
          defaultSrc: ["'self'", 'http://localhost:5000', 'http://localhost:5173', 'ws://localhost:5000', 'ws://localhost:5173'],
          connectSrc: ["'self'", 'http://localhost:5000', 'http://localhost:5173', 'ws://localhost:5000', 'ws://localhost:5173'],
          scriptSrc: ["'self'", "'unsafe-inline'", "'unsafe-eval'"],
          styleSrc: ["'self'", "'unsafe-inline'", 'https://fonts.googleapis.com'],
          fontSrc: ["'self'", 'https://fonts.gstatic.com'],
          imgSrc: ["'self'", 'data:', 'blob:', 'https:'],
          objectSrc: ["'none'"]
        }
      },
  crossOriginEmbedderPolicy: false,
  hsts: {
    maxAge: 31536000,
    includeSubDomains: true,
    preload: true
  }
}));

// CORS configuration
const corsOptions = {
  origin: NODE_ENV === 'production' 
    ? config.frontend.url
    : config.frontend.allowedOrigins,
  credentials: true,
  optionsSuccessStatus: 200,
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization']
};

app.use(cors(corsOptions));

// Compression middleware (gzip)
app.use(compression());

// Request timeout middleware (30 seconds)
app.use((req, res, next) => {
  req.setTimeout(30000, () => {
    if (!res.headersSent) {
      res.status(503).json({
        success: false,
        error: {
          message: 'Request timeout. Please try again.'
        }
      });
    }
  });
  next();
});

// Rate limiting
const limiter = rateLimit({
  windowMs: config.rateLimit.windowMs,
  max: config.rateLimit.max,
  message: {
    success: false,
    error: {
      message: 'Too many requests from this IP, please try again later.'
    }
  },
  standardHeaders: true,
  legacyHeaders: false,
  skip: (req) => req.path === '/health' || req.path === '/health/detailed'
});

app.use('/api', limiter);

// Data sanitization against NoSQL injection attacks
app.use((req, res, next) => {
  // Sanitize body
  if (req.body && typeof req.body === 'object') {
    const sanitizeObject = (obj) => {
      for (const key in obj) {
        if (key.startsWith('$') || key.includes('.')) {
          delete obj[key];
        } else if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
          sanitizeObject(obj[key]);
        }
      }
    };
    sanitizeObject(req.body);
  }
  
  // Sanitize params
  if (req.params && typeof req.params === 'object') {
    const sanitizeObject = (obj) => {
      for (const key in obj) {
        if (key.startsWith('$') || key.includes('.')) {
          delete obj[key];
        } else if (typeof obj[key] === 'object' && obj[key] !== null && !Array.isArray(obj[key])) {
          sanitizeObject(obj[key]);
        }
      }
    };
    sanitizeObject(req.params);
  }
  
  next();
});

// XSS protection - sanitize input
app.use(sanitizeInput);

// Body parsing middleware with size limits
app.use(express.json({ 
  limit: '10mb',
  strict: true
}));
app.use(express.urlencoded({ 
  extended: true, 
  limit: '10mb',
  parameterLimit: 100
}));

// Logging middleware
if (NODE_ENV === 'development') {
  app.use(morgan('dev'));
} else {
  app.use(morgan('combined'));
}

// API Routes
app.use('/api', apiRoutes);

// Health check endpoints
app.get('/health', healthCheck);
app.get('/health/detailed', healthCheckDetailed);

// Serve static files
const distPath = path.join(__dirname, '../../../front-end/dist');
const publicPath = path.join(__dirname, '../../../front-end/public');

// Gallery and all /images/* come from front-end/public/images only (never dist).
app.use('/images', express.static(path.join(publicPath, 'images')));
app.use('/videos', express.static(path.join(publicPath, 'videos')));

// Serve manifest file with correct MIME type
app.get('/site.webmanifest', (req, res) => {
  res.type('application/manifest+json');
  res.sendFile(path.join(publicPath, 'site.webmanifest'));
});

// Serve robots.txt and sitemap.xml
app.get('/robots.txt', (req, res) => {
  res.type('text/plain');
  res.sendFile(path.join(publicPath, 'robots.txt'));
});

app.get('/sitemap.xml', (req, res) => {
  res.type('application/xml');
  res.sendFile(path.join(publicPath, 'sitemap.xml'));
});

// Serve optimized images if they exist
const optimizedImagesPath = path.join(publicPath, 'images', 'optimized');
if (existsSync(optimizedImagesPath)) {
  app.use('/images/optimized', express.static(optimizedImagesPath));
}

// Serve built frontend if dist directory exists (production or when built)
if (existsSync(distPath)) {
  // Serve static files from dist directory
  app.use(express.static(distPath));
  
  // Serve index.html for all non-API routes (SPA routing)
  app.use((req, res, next) => {
    if (!req.path.startsWith('/api') && 
        !req.path.startsWith('/images') && 
        !req.path.startsWith('/videos') &&
        !req.path.startsWith('/assets')) {
      res.sendFile(path.join(distPath, 'index.html'));
    } else {
      next();
    }
  });
  
  if (NODE_ENV === 'production') {
    logger.info('Production mode: Serving built frontend from dist');
  } else {
    logger.info('Built frontend detected: Serving from dist directory');
  }
} else {
  // In development, Vite dev server handles frontend on port 5173
  logger.info('Development mode: Frontend served by Vite', {
    frontend: 'http://localhost:5173',
    backend: `http://localhost:${config.server.port}`,
  });
}

// 404 handler for API routes only (before error handler)
app.use((req, res, next) => {
  if (req.path.startsWith('/api') && !res.headersSent) {
    res.status(404).json({
      success: false,
      error: {
        message: 'API route not found'
      }
    });
  } else {
    next();
  }
});

// Error handling middleware (must be last)
app.use(errorHandler);

export default app;
