# ATL Nurse - Production-Ready Web Application

A modern, production-ready web application demonstrating **Authentication**, **Authorization**, **Secure API Routes**, **Data Persistence**, and **Vercel Deployment**.

## 🎯 Key Features Demonstrated

### ✅ Authentication & Authorization
- **API Key Authentication** for admin routes
- **Role-based Authorization** middleware
- **Protected Routes** - Admin endpoints require authentication
- **Public Routes** - Validated but accessible without auth

### ✅ Secure API Routes
- **Input Validation** - Comprehensive validation on all endpoints
- **XSS Protection** - Input sanitization and script tag removal
- **NoSQL Injection Prevention** - MongoDB operator filtering
- **Path Traversal Prevention** - File path validation
- **Rate Limiting** - Request throttling
- **CORS** - Configured for allowed origins
- **Security Headers** - Helmet.js configured

### ✅ Data Persistence
- **File-based Storage** - JSON file persistence layer
- **Repository Pattern** - Consistent data access interface
- **CRUD Operations** - Create, Read, Update, Delete
- **Data Validation** - Server-side validation before persistence
- **Ready for Database** - Easy migration to MongoDB/PostgreSQL

### ✅ Vercel Deployment
- **Vercel Configuration** - `vercel.json` ready for deployment
- **Build Scripts** - Production build configuration
- **Environment Variables** - Secure configuration management

## 🚀 Tech Stack

- **Frontend**: HTML5, Tailwind CSS, Vanilla JavaScript (ES6+)
- **Backend**: Node.js, Express.js
- **Build Tool**: Vite
- **Deployment**: Vercel
- **Storage**: File-based JSON persistence (ready for database)

## 📁 Project Structure

```
├── backend/
│   ├── src/
│   │   ├── app.js                  # Express app setup
│   │   ├── server.js               # Server startup
│   │   ├── routes/                 # API routes
│   │   ├── controllers/            # Route controllers
│   │   ├── services/               # Business logic & utilities
│   │   │   ├── config.js           # Configuration management
│   │   │   ├── logger.js           # Logging service
│   │   │   ├── database.js         # Database abstraction layer
│   │   │   ├── persistence.js      # File-based data persistence ✨
│   │   │   └── cache.js            # Caching service
│   │   └── middleware/             # Express middleware
│   │      ├── auth.js              # Authentication & Authorization ✨
│   │      ├── validation.js        # Input validation ✨
│   │      ├── security.js          # Security middleware
│   │      ├── errorHandler.js      # Error handling
│   │      └── health.js            # Health check endpoints
│   ├── tests/                      # Test files
│   ├── scripts/                    # Utility scripts
│   └── package.json                # Backend dependencies
│   └── data/                       # JSON data files (created at runtime)
├── front-end/                      # Frontend codebase
├── vercel.json                     # Vercel deployment config ✨
└── package.json
```

## 🛠️ Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd alt_nurse
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env` file in the root directory:
   ```env
   PORT=5000
   NODE_ENV=development
   FRONTEND_URL=http://localhost:5173
   
   # Security - REQUIRED for production
   API_KEY=your-secure-api-key-here
   JWT_SECRET=your-jwt-secret-here
   ```

## 🔐 Authentication & Authorization

### API Key Authentication

Admin routes require an API key in the request header:

```bash
# Using X-API-Key header
curl -H "X-API-Key: your-api-key" https://your-app.vercel.app/api/contact

# Using Authorization header
curl -H "Authorization: Bearer your-api-key" https://your-app.vercel.app/api/events
```

### Protected Routes (Require API Key)

- `GET /api/contact` - Get all contacts
- `POST /api/gallery` - Add gallery image
- `DELETE /api/gallery/:id` - Delete gallery image
- `POST /api/events` - Create event
- `PUT /api/events/:id` - Update event
- `DELETE /api/events/:id` - Delete event
- `POST /api/news` - Create news article
- `PUT /api/news/:id` - Update news article
- `DELETE /api/news/:id` - Delete news article

### Public Routes (Validated, No Auth Required)

- `POST /api/contact` - Submit contact form
- `GET /api/gallery` - Get all gallery images
- `GET /api/gallery/:id` - Get single gallery image
- `GET /api/events` - Get all events
- `GET /api/events/:id` - Get single event
- `GET /api/news` - Get all news articles
- `GET /api/news/:id` - Get single news article

## 🔒 Security Features

### Input Validation
All inputs are validated using `express-validator`:
- Type checking
- Length limits
- Format validation
- Server-side validation (defense in depth)

### Input Sanitization
- XSS protection (script tag removal)
- NoSQL injection prevention
- Path traversal prevention
- Query parameter sanitization

### Error Handling
- Generic error messages in production
- No secret leakage
- Request ID tracking
- Structured logging

## 💾 Data Persistence

### File-based Storage

Data is persisted to JSON files in `backend/data/`:
- `contacts.json` - Contact form submissions
- `events.json` - Event data
- `news.json` - News articles
- `gallery.json` - Gallery images

### Repository Pattern

The application uses a repository pattern for data access:

```javascript
import { eventsStorage } from '../config/persistence.js';

// Create
const event = await eventsStorage.create({ title: 'Event', ... });

// Read
const events = await eventsStorage.findAll({ status: 'upcoming' });
const event = await eventsStorage.findById('123');

// Update
const updated = await eventsStorage.update('123', { title: 'Updated' });

// Delete
await eventsStorage.delete('123');
```

### Ready for Database Migration

The persistence layer is abstracted, making it easy to migrate to MongoDB, PostgreSQL, or any database. See `back-end/server/config/database.js` for the database abstraction layer.

## 🚀 Deployment to Vercel

### 1. Prerequisites

- Vercel account
- GitHub repository (optional, can deploy from local)

### 2. Environment Variables

Set these in Vercel dashboard → Settings → Environment Variables:

```env
NODE_ENV=production
API_KEY=your-secure-api-key-here
JWT_SECRET=your-jwt-secret-here
FRONTEND_URL=https://your-app.vercel.app
ALLOWED_ORIGINS=https://your-app.vercel.app
```

### 3. Deploy

**Option A: Via Vercel CLI**
```bash
npm i -g vercel
vercel
```

**Option B: Via GitHub Integration**
1. Connect your GitHub repository to Vercel
2. Vercel will automatically detect `vercel.json` and `api/` directory
3. Deploy on every push to main branch

**Option C: Via Vercel Dashboard**
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your repository
4. Vercel will auto-detect the configuration
5. Add environment variables
6. Deploy!

### 4. Build Configuration

The `vercel.json` file configures:
- API routes → Express server
- Static files → Frontend build
- Image/video routes → Public assets

## 📡 API Examples

### Public Endpoint (No Auth)

```bash
# Submit contact form
curl -X POST https://your-app.vercel.app/api/contact \
  -H "Content-Type: application/json" \
  -d '{
    "name": "John Doe",
    "email": "john@example.com",
    "message": "Hello, this is a test message."
  }'

# Get events
curl https://your-app.vercel.app/api/events
```

### Admin Endpoint (Requires Auth)

```bash
# Create event (requires API key)
curl -X POST https://your-app.vercel.app/api/events \
  -H "Content-Type: application/json" \
  -H "X-API-Key: your-api-key" \
  -d '{
    "title": "Summer Festival",
    "date": "2024-07-15T18:00:00Z",
    "venue": "Music Hall",
    "description": "Amazing festival"
  }'

# Get all contacts (requires API key)
curl https://your-app.vercel.app/api/contact \
  -H "X-API-Key: your-api-key"
```

## 🧪 Testing

### Test Authentication

```bash
# Should fail - no API key
curl -X POST https://your-app.vercel.app/api/events \
  -H "Content-Type: application/json" \
  -d '{"title":"Test"}'
# Response: 401 Unauthorized

# Should succeed - with API key
curl -X POST https://your-app.vercel.app/api/events \
  -H "Content-Type: application/json" \
  -H "X-API-Key: your-api-key" \
  -d '{"title":"Test","date":"2024-12-31T18:00:00Z","venue":"Test"}'
# Response: 201 Created
```

### Test Input Validation

```bash
# Should fail - invalid email
curl -X POST https://your-app.vercel.app/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"invalid","message":"Test"}'
# Response: 400 Bad Request - Validation error

# Should fail - missing required field
curl -X POST https://your-app.vercel.app/api/contact \
  -H "Content-Type: application/json" \
  -d '{"name":"Test","email":"test@example.com"}'
# Response: 400 Bad Request - Message required
```

## 📝 Available Scripts

- `npm run dev` - Run both frontend and backend in development
- `npm run build` - Build for production
- `npm start` - Start production server
- `npm run vercel-build` - Build for Vercel deployment

## 📚 Documentation

- [Backend README](./backend/README.md) - Backend structure and API documentation
- [Deployment Checklist](./DEPLOYMENT_CHECKLIST.md) - Deployment guide
- [Scalability Guide](./SCALABILITY.md) - Scalability features

## 🎯 Best Practices Demonstrated

- ✅ Authentication & Authorization
- ✅ Input validation & sanitization
- ✅ Secure error handling
- ✅ Data persistence
- ✅ Environment-based configuration
- ✅ Production-ready deployment
- ✅ Clean code organization
- ✅ Comprehensive documentation

## 📄 License

ISC

---

**Built with ❤️ demonstrating production-ready authentication, authorization, security, and data persistence**
