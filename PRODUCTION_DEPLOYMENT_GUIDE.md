# 🚀 Production Deployment Guide

## Quick Start - Deploy to Vercel

### Step 1: Environment Variables Setup

In Vercel Dashboard → Settings → Environment Variables, add:

```env
NODE_ENV=production
PORT=5000
TRUST_PROXY=true

# Frontend URL (update with your domain)
FRONTEND_URL=https://your-app.vercel.app
ALLOWED_ORIGINS=https://your-app.vercel.app

# Security - Generate secure keys
API_KEY=<generate-32-char-random-string>
JWT_SECRET=<generate-32-char-random-string>

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100

# Logging
LOG_LEVEL=info
LOG_FORMAT=json
```

**Generate Secure Keys:**
```bash
# Generate API_KEY
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Generate JWT_SECRET
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### Step 2: Deploy to Vercel

```bash
# Install Vercel CLI (if not installed)
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod
```

Or connect your GitHub repo to Vercel for automatic deployments.

### Step 3: Verify Deployment

1. Check health endpoint: `https://your-app.vercel.app/health`
2. Test API: `https://your-app.vercel.app/api/events`
3. Test frontend: `https://your-app.vercel.app`

---

## 📊 Current Status

### ✅ Ready for Vercel Deployment
- Serverless function entry point (`api/index.js`)
- Vercel configuration (`vercel.json`)
- Build scripts configured
- Environment-based configuration
- Security headers and middleware

### ⚠️ Data Persistence Note
**Current**: File-based JSON persistence  
**Vercel**: Serverless functions are stateless - file writes are ephemeral  
**Solution Options**:
1. **Use Vercel KV** (Redis) - Recommended for Vercel
2. **Use external database** (MongoDB Atlas, Supabase, etc.)
3. **Use Vercel Postgres** - Native Vercel database

---

## 🔧 Post-Deployment Checklist

- [ ] Environment variables set in Vercel
- [ ] Health check endpoint working
- [ ] API endpoints responding
- [ ] Frontend loading correctly
- [ ] CORS configured correctly
- [ ] Rate limiting working
- [ ] Error handling working
- [ ] Logs accessible in Vercel dashboard

---

## 🎯 Next Steps After Deployment

1. **Set up monitoring** - Vercel Analytics
2. **Configure domain** - Add custom domain in Vercel
3. **Set up database** - Choose persistence solution
4. **Enable error tracking** - Sentry integration
5. **Configure backups** - If using external database

---

## 📝 Notes

- Vercel serverless functions have a 10-second timeout for Hobby plan
- File system writes are ephemeral (use external storage)
- Environment variables are automatically injected
- Builds happen automatically on git push (if connected)
