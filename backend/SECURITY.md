# API Security Documentation

## 🔒 Security Implementation

This document outlines the security measures implemented in the API.

## ✅ Implemented Security Features

### 1. Input Validation
- **Middleware**: `backend/src/middleware/validation.js`
- **Library**: `express-validator`
- **Features**:
  - Request body validation
  - Query parameter validation
  - Path parameter validation
  - XSS protection (`.escape()`)
  - Custom validation for image/video paths
  - Type checking and sanitization

### 2. Authentication & Authorization
- **Middleware**: `backend/src/middleware/auth.js`
- **Method**: API Key authentication
- **Implementation**:
  - API key extracted from `x-api-key` header or `Authorization` header
  - Validated against `API_KEY` environment variable
  - Role-based authorization (`admin` role)
  - Unauthorized attempts logged

### 3. Input Sanitization
- **Middleware**: `backend/src/middleware/security.js`
- **Features**:
  - XSS protection (removes script tags, JS protocols)
  - NoSQL injection prevention (strips `$` and `.` from keys)
  - Applied to request body and query parameters

### 4. Error Handling
- **Middleware**: `backend/src/middleware/errorHandler.js`
- **Features**:
  - Generic error messages in production
  - Detailed errors in development
  - No stack traces exposed in production
  - No sensitive information leaked
  - All errors logged

### 5. Security Headers
- **Middleware**: `helmet` (via `backend/src/middleware/security.js`)
- **Headers**:
  - X-Content-Type-Options: nosniff
  - X-Frame-Options: DENY
  - X-XSS-Protection: 1; mode=block
  - Strict-Transport-Security (in production)
  - Content-Security-Policy (environment-based)

### 6. Rate Limiting
- **Middleware**: `express-rate-limit`
- **Configuration**:
  - Development: 1000 requests per 15 minutes
  - Production: 100 requests per 15 minutes
  - Applied to all API routes

### 7. CORS Configuration
- **Middleware**: `cors`
- **Configuration**:
  - Environment-based allowed origins
  - Credentials support
  - Preflight handling

## 🔐 Protected Routes

### Admin Routes (Require API Key)
- `POST /api/events` - Create event
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event
- `POST /api/news` - Create news article
- `PUT /api/news/:id` - Update news article
- `DELETE /api/news/:id` - Delete news article
- `POST /api/gallery` - Add gallery image
- `DELETE /api/gallery/:id` - Delete gallery image
- `GET /api/contact` - Get all contacts (admin only)

### Public Routes (No Authentication Required)
- `GET /api/events` - Get events
- `GET /api/events/:id` - Get event by ID
- `GET /api/news` - Get news articles
- `GET /api/news/:id` - Get news article by ID
- `GET /api/gallery` - Get gallery images
- `GET /api/gallery/:id` - Get gallery image by ID
- `POST /api/contact` - Submit contact form

## 🔑 API Key Usage

### Setting API Key
Set the `API_KEY` environment variable:
```bash
API_KEY=your-secure-api-key-here
```

### Using API Key
Include in request headers:
```bash
# Option 1: x-api-key header
curl -H "x-api-key: your-api-key" https://api.example.com/api/events

# Option 2: Authorization header
curl -H "Authorization: Bearer your-api-key" https://api.example.com/api/events
```

## 🛡️ Security Best Practices

1. **Never expose API keys** in client-side code
2. **Use HTTPS** in production
3. **Rotate API keys** regularly
4. **Monitor** unauthorized access attempts
5. **Validate all inputs** on the server side
6. **Sanitize outputs** to prevent XSS
7. **Use environment variables** for secrets
8. **Keep dependencies updated** for security patches

## 📝 Notes

- All validation errors return 400 status codes
- All authentication errors return 401 status codes
- All authorization errors return 403 status codes
- All server errors return 500 status codes (generic message in production)
- Request IDs are included in error responses for tracking
