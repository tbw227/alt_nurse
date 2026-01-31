# Backend API

This is the backend API for the ATL Nurse application, built with Express.js following industry best practices.

## 📁 Project Structure

```
backend/
├─ src/
│  ├─ app.js              # Express application setup (middleware, routes)
│  ├─ server.js           # Server startup and graceful shutdown
│  ├─ routes/              # API route definitions
│  │  ├─ api.js           # Main API router
│  │  ├─ contact.js       # Contact form routes
│  │  ├─ events.js        # Events routes
│  │  ├─ gallery.js       # Gallery routes
│  │  └─ news.js          # News routes
│  ├─ controllers/        # Route controllers (business logic)
│  │  ├─ contactController.js
│  │  ├─ eventsController.js
│  │  ├─ galleryController.js
│  │  └─ newsController.js
│  ├─ services/           # Business logic and utilities
│  │  ├─ config.js        # Configuration management
│  │  ├─ logger.js       # Logging service
│  │  ├─ database.js     # Database abstraction layer
│  │  ├─ persistence.js  # File-based data persistence
│  │  └─ cache.js        # Caching service
│  └─ middleware/         # Express middleware
│     ├─ auth.js          # Authentication & authorization
│     ├─ validation.js    # Input validation
│     ├─ security.js      # Security headers & sanitization
│     ├─ errorHandler.js  # Error handling
│     └─ health.js        # Health check endpoints
├─ tests/                 # Test files
│  ├─ auth.test.js
│  └─ health.test.js
├─ scripts/               # Utility scripts
│  ├─ optimize-images.js
│  └─ README-IMAGE-OPTIMIZATION.md
├─ data/                  # JSON data files (created at runtime)
│  ├─ contacts.json
│  ├─ events.json
│  ├─ news.json
│  └─ gallery.json
├─ SECURITY.md            # Security documentation
├─ package.json           # Backend dependencies
└─ README.md              # This file
```

## 🚀 Getting Started

### Prerequisites

- Node.js >= 18.0.0
- npm >= 9.0.0

### Installation

```bash
# From project root
npm install

# Or from backend directory
cd backend
npm install
```

### Environment Setup

Create a `.env` file in the project root (see `.env.example`):

```env
# Server Configuration
PORT=5000
NODE_ENV=development
TRUST_PROXY=false

# Frontend Configuration
FRONTEND_URL=http://localhost:5173
ALLOWED_ORIGINS=http://localhost:5173,http://localhost:3000

# Security
API_KEY=your-secure-api-key-here_for_admin_routes

# Logging
LOG_LEVEL=info
LOG_FORMAT=json
```

### Development

```bash
# From project root (runs both frontend and backend)
npm run dev

# Backend only (with auto-reload)
npm run dev:server

# Or from backend directory
cd backend
npm run dev
```

The server runs on `http://localhost:5000` by default.

### Production

```bash
# Build frontend
npm run build

# Start server
npm start

# Or from backend directory
cd backend
npm start
```

## 📡 API Endpoints

### Health Check
- `GET /health` - Basic health check
- `GET /health/detailed` - Detailed health check with dependencies

### Events
- `GET /api/events` - Get all events (supports query: `?status=upcoming&limit=10`)
- `GET /api/events/:id` - Get event by ID
- `GET /api/events/upcoming/all` - Get all upcoming events
- `POST /api/events` - Create new event (admin only)
- `PUT /api/events/:id` - Update event (admin only)
- `DELETE /api/events/:id` - Delete event (admin only)

### Contact
- `POST /api/contact` - Submit contact form (public)
- `GET /api/contact` - Get all contact submissions (admin only, supports query: `?status=unread&limit=10`)

### Gallery
- `GET /api/gallery` - Get all gallery images (supports query: `?category=band-name&limit=20`)
- `GET /api/gallery/:id` - Get gallery image by ID
- `POST /api/gallery` - Add gallery image (admin only)
- `DELETE /api/gallery/:id` - Delete gallery image (admin only)

### News
- `GET /api/news` - Get all news articles (supports query: `?published=true&limit=10`)
- `GET /api/news/:id` - Get news article by ID
- `POST /api/news` - Create news article (admin only)
- `PUT /api/news/:id` - Update news article (admin only)
- `DELETE /api/news/:id` - Delete news article (admin only)

## 🔐 Authentication

Admin routes require an API key authentication:

```bash
# Set API key in environment
export API_KEY=your-api-key-here

# Use in requests (option 1: x-api-key header)
curl -H "x-api-key: your-api-key" https://api.example.com/api/events

# Use in requests (option 2: Authorization header)
curl -H "Authorization: Bearer your-api-key" https://api.example.com/api/events
```

### Protected Routes (Require API Key)
- All `POST`, `PUT`, `DELETE` operations
- `GET /api/contact` (admin only)

### Public Routes (No Authentication Required)
- All `GET` operations (except `GET /api/contact`)
- `POST /api/contact` (contact form submission)

## 💾 Data Persistence

Data is persisted to JSON files in `backend/data/`:
- `contacts.json` - Contact form submissions
- `events.json` - Event data
- `news.json` - News articles
- `gallery.json` - Gallery images metadata

The persistence layer uses a repository pattern, making it easy to migrate to MongoDB, PostgreSQL, or any database. See `backend/src/services/persistence.js` for implementation.

## 🧪 Testing

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage
```

Test files are located in `backend/tests/`:
- `auth.test.js` - Authentication tests
- `health.test.js` - Health check tests

## 🛡️ Security Features

- ✅ **Input Validation** - Comprehensive validation on all endpoints
- ✅ **XSS Protection** - Input sanitization and script tag removal
- ✅ **NoSQL Injection Prevention** - MongoDB operator filtering
- ✅ **Path Traversal Prevention** - File path validation
- ✅ **Rate Limiting** - Request throttling (100 req/15min in production)
- ✅ **CORS** - Configured for allowed origins
- ✅ **Security Headers** - Helmet.js configured
- ✅ **API Key Authentication** - For admin routes
- ✅ **Error Handling** - Secure error messages (no stack traces in production)

See `SECURITY.md` for detailed security documentation.

## 📝 Environment Variables

See `.env.example` in the project root for all available environment variables.

### Required Variables
- `PORT` - Server port (default: 5000)
- `NODE_ENV` - Environment (development/production)

### Optional Variables
- `API_KEY` - API key for admin routes
- `FRONTEND_URL` - Frontend URL for CORS
- `ALLOWED_ORIGINS` - Comma-separated list of allowed origins
- `LOG_LEVEL` - Logging level (error/warn/info/debug)
- `LOG_FORMAT` - Log format (json/text)

## 🏗️ Architecture

### Separation of Concerns
- **app.js** - Express application configuration (middleware, routes)
- **server.js** - Server lifecycle management (startup, graceful shutdown)
- **routes/** - Route definitions (HTTP method + path)
- **controllers/** - Business logic (request handling)
- **services/** - Reusable services (config, logging, persistence)
- **middleware/** - Express middleware (auth, validation, error handling)

### Best Practices
- ✅ **Modular Structure** - Clear separation of concerns
- ✅ **Error Handling** - Centralized error handling middleware
- ✅ **Input Validation** - Validation middleware for all inputs
- ✅ **Security First** - Security headers and input sanitization
- ✅ **Logging** - Structured logging with request IDs
- ✅ **Graceful Shutdown** - Proper cleanup on shutdown signals
- ✅ **Environment-Based Config** - Different configs for dev/prod
- ✅ **Repository Pattern** - Abstraction layer for data access

## 📚 Additional Documentation

- [Security Documentation](./SECURITY.md) - Detailed security implementation
- [Deployment Checklist](../DEPLOYMENT_CHECKLIST.md) - Production deployment guide
- [Scalability Guide](../SCALABILITY.md) - Scaling to production

## 🚀 Next Steps

- [ ] Add database integration (MongoDB/PostgreSQL)
- [ ] Add file upload functionality
- [ ] Add email service integration
- [ ] Add API documentation (Swagger/OpenAPI)
- [ ] Add comprehensive test coverage
- [ ] Add CI/CD pipeline

## 📄 License

ISC
