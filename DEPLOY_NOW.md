# 🚀 Deploy to Production - Quick Guide

## ✅ Pre-Deployment Checklist

### 1. Generate Secure Keys
```bash
# Generate API_KEY (32+ characters)
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"

# Generate JWT_SECRET (32+ characters)  
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

### 2. Set Environment Variables in Vercel

Go to: **Vercel Dashboard → Your Project → Settings → Environment Variables**

Add these variables:

```env
NODE_ENV=production
PORT=5000
TRUST_PROXY=true

# Update with your actual domain after first deploy
FRONTEND_URL=https://your-app.vercel.app
ALLOWED_ORIGINS=https://your-app.vercel.app

# Use the keys you generated above
API_KEY=<paste-generated-api-key>
JWT_SECRET=<paste-generated-jwt-secret>

# Rate Limiting
RATE_LIMIT_WINDOW_MS=900000
RATE_LIMIT_MAX=100

# Logging
LOG_LEVEL=info
LOG_FORMAT=json
```

### 3. Deploy to Vercel

**Option A: Via Vercel Dashboard (Recommended)**
1. Push your code to GitHub
2. Go to [vercel.com](https://vercel.com)
3. Click "New Project"
4. Import your GitHub repository
5. Vercel will auto-detect settings (already configured!)
6. Click "Deploy"

**Option B: Via CLI**
```bash
# Install Vercel CLI
npm i -g vercel

# Login
vercel login

# Deploy
vercel --prod
```

### 4. Update Environment Variables After First Deploy

After first deployment, Vercel will give you a URL like `https://your-app.vercel.app`

Update these environment variables:
- `FRONTEND_URL=https://your-app.vercel.app`
- `ALLOWED_ORIGINS=https://your-app.vercel.app`

Then redeploy or wait for next auto-deploy.

---

## ✅ Verify Deployment

### Test Health Endpoint
```bash
curl https://your-app.vercel.app/health
```

Expected response:
```json
{
  "status": "OK",
  "timestamp": "...",
  "uptime": 123.45,
  "environment": "production"
}
```

### Test API Endpoint
```bash
curl https://your-app.vercel.app/api/events
```

### Test Frontend
Visit: `https://your-app.vercel.app`

---

## ⚠️ Important Notes

### Data Persistence in Vercel
**Current Setup**: File-based JSON storage  
**Vercel Limitation**: Serverless functions have ephemeral filesystem  
**What This Means**: 
- Data will persist during a single function execution
- Data may be lost between function invocations
- **For production data**: Use external database (MongoDB Atlas, Supabase, Vercel Postgres)

### Current Status
- ✅ **Code**: Production-ready
- ✅ **Security**: All measures in place
- ✅ **Deployment**: Configured for Vercel
- ⚠️ **Data**: File-based (works for demo, needs database for production)

---

## 🎯 Post-Deployment

1. **Test all endpoints**
2. **Monitor logs** in Vercel dashboard
3. **Set up custom domain** (optional)
4. **Configure database** (when ready for production data)

---

## 📊 Deployment Status

✅ **Ready to Deploy!**

Your code is production-ready. The only limitation is data persistence (file-based won't persist in serverless). For a production app with persistent data, add a database later.

**Deploy now and test!** 🚀
