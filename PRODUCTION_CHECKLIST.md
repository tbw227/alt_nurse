# Production Deployment Checklist

## ✅ Pre-Deployment Checklist

### Environment Configuration
- [ ] Create `.env` file from `.env.example`
- [ ] Set `NODE_ENV=production`
- [ ] Configure `FRONTEND_URL` with production domain
- [ ] Set `TRUST_PROXY=true` if behind reverse proxy
- [ ] Configure `ALLOWED_ORIGINS` with production domains
- [ ] Set secure `JWT_SECRET` (use strong random string)
- [ ] Configure database connection (if using database)
- [ ] Set up Redis connection (if using caching)

### Security
- [ ] Review and update CSP headers in production
- [ ] Ensure rate limiting is configured appropriately
- [ ] Verify CORS settings for production domains only
- [ ] Check that sensitive data is not in code (use env vars)
- [ ] Enable HTTPS/SSL certificates
- [ ] Review security headers (Helmet.js configured)

### Build & Dependencies
- [ ] Run `npm install --production` (exclude dev dependencies)
- [ ] Build frontend: `npm run build`
- [ ] Verify `front-end/dist` directory exists and contains built files
- [ ] Test production build locally: `npm start`
- [ ] Check that all environment variables are set

### Database
- [ ] Set up production database (MongoDB/PostgreSQL)
- [ ] Configure database connection string
- [ ] Run database migrations (if applicable)
- [ ] Test database connectivity
- [ ] Set up database backups

### Logging & Monitoring
- [ ] Configure logging level (`LOG_LEVEL=info` for production)
- [ ] Set up log aggregation service (optional)
- [ ] Configure error tracking (Sentry, LogRocket, etc.)
- [ ] Set up health check monitoring
- [ ] Configure uptime monitoring

### Performance
- [ ] Enable compression (already configured)
- [ ] Configure CDN for static assets (optional)
- [ ] Set up caching strategy (Redis recommended)
- [ ] Optimize images (run `npm run optimize:images`)
- [ ] Review and optimize database queries

### Testing
- [ ] Test all API endpoints
- [ ] Test frontend routes and navigation
- [ ] Test contact form submission
- [ ] Test image loading and gallery
- [ ] Test on multiple browsers
- [ ] Test mobile responsiveness
- [ ] Load testing (optional)

## 🚀 Deployment Steps

### 1. Server Setup
```bash
# Install Node.js (v18+)
# Install PM2 for process management
npm install -g pm2

# Clone repository
git clone <repository-url>
cd atl-nurse

# Install dependencies
npm install --production

# Create .env file
cp .env.example .env
# Edit .env with production values
```

### 2. Build Application
```bash
# Build CSS
npm run build:css

# Build frontend
npm run build

# Verify build
ls -la front-end/dist/
```

### 3. Start with PM2
```bash
# Start application
pm2 start backend/src/server.js --name atl-nurse

# Save PM2 configuration
pm2 save

# Set up PM2 to start on system boot
pm2 startup
```

### 4. Reverse Proxy (Nginx Example)
```nginx
server {
    listen 80;
    server_name yourdomain.com;

    # Redirect to HTTPS
    return 301 https://$server_name$request_uri;
}

server {
    listen 443 ssl http2;
    server_name yourdomain.com;

    ssl_certificate /path/to/cert.pem;
    ssl_certificate_key /path/to/key.pem;

    # Proxy to Node.js
    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
        proxy_set_header X-Forwarded-Proto $scheme;
        proxy_cache_bypass $http_upgrade;
    }
}
```

### 5. SSL Certificate
```bash
# Using Let's Encrypt (Certbot)
sudo certbot --nginx -d yourdomain.com -d www.yourdomain.com
```

## 📊 Post-Deployment

### Verification
- [ ] Test homepage loads
- [ ] Test all routes work
- [ ] Test API endpoints
- [ ] Check `/health` endpoint
- [ ] Verify HTTPS is working
- [ ] Test contact form
- [ ] Check error pages (404, 500)
- [ ] Verify logging is working
- [ ] Check server logs for errors

### Monitoring
- [ ] Set up uptime monitoring
- [ ] Configure error alerts
- [ ] Monitor server resources (CPU, memory)
- [ ] Set up database monitoring
- [ ] Monitor API response times

## 🔧 Maintenance

### Regular Tasks
- [ ] Update dependencies regularly
- [ ] Review and rotate secrets
- [ ] Monitor logs for errors
- [ ] Backup database regularly
- [ ] Review security updates
- [ ] Monitor performance metrics

### Updates
```bash
# Pull latest changes
git pull origin main

# Install new dependencies
npm install --production

# Rebuild
npm run build

# Restart application
pm2 restart atl-nurse
```

## ⚠️ Important Notes

1. **Database**: Currently using in-memory storage. For production, you MUST:
   - Set up a persistent database (MongoDB/PostgreSQL)
   - Update `back-end/server/config/database.js`
   - Configure `DATABASE_URI` in `.env`

2. **Caching**: Currently using in-memory cache. For multi-instance deployments:
   - Set up Redis
   - Update `backend/src/services/cache.js`
   - Configure Redis connection in `.env`

3. **Environment Variables**: Never commit `.env` file to version control

4. **Process Management**: Use PM2 or similar for production process management

5. **Reverse Proxy**: Always use a reverse proxy (Nginx, Apache) in front of Node.js

6. **HTTPS**: Always use HTTPS in production

## 🆘 Troubleshooting

### Application won't start
- Check `.env` file exists and has correct values
- Check port is not already in use
- Review server logs: `pm2 logs atl-nurse`
- Check Node.js version: `node --version` (should be v18+)

### 404 errors on routes
- Verify `front-end/dist` directory exists
- Check that build completed successfully
- Verify static file serving is configured

### API errors
- Check CORS configuration
- Verify `FRONTEND_URL` matches your domain
- Check rate limiting settings
- Review API logs

### Database connection errors
- Verify `DATABASE_URI` is correct
- Check database server is running
- Verify network connectivity
- Check database credentials

