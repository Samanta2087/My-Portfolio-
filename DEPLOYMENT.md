# Portfolio Deployment Guide

## Deploy to Vercel

### Prerequisites
- Install Vercel CLI: `npm i -g vercel`
- Have a Vercel account (free tier works)

### Environment Variables
Before deploying, you need to set up environment variables in Vercel:

1. `DATABASE_URL` - SQLite won't work on Vercel. You need to use:
   - **Option 1**: PostgreSQL (Neon, Supabase, Vercel Postgres)
   - **Option 2**: Turso (SQLite-compatible, serverless)
   
2. `SESSION_SECRET` - Random string for session encryption
   ```bash
   openssl rand -base64 32
   ```

### Steps to Deploy

1. **Initialize Git** (if not already)
   ```bash
   git init
   git add .
   git commit -m "Initial commit"
   ```

2. **Login to Vercel**
   ```bash
   vercel login
   ```

3. **Deploy**
   ```bash
   vercel
   ```
   
   Follow the prompts:
   - Set up and deploy? **Y**
   - Which scope? Choose your account
   - Link to existing project? **N**
   - Project name? (default or custom name)
   - In which directory is your code? **./**
   - Override settings? **N**

4. **Set Environment Variables**
   ```bash
   vercel env add DATABASE_URL
   vercel env add SESSION_SECRET
   ```

5. **Deploy to Production**
   ```bash
   vercel --prod
   ```

### Important Notes

⚠️ **Database Migration Required**
- SQLite (local.db) doesn't work on Vercel's serverless platform
- Migrate to PostgreSQL or Turso before deploying
- Update `drizzle.config.ts` and `server/storage.ts` accordingly

### Quick Start Commands

```bash
# Development
npm run dev

# Build
npm run build

# Start production locally
npm start

# Deploy to Vercel
vercel

# Deploy to production
vercel --prod
```

## Alternative: Manual Deploy via Vercel Dashboard

1. Push code to GitHub
2. Go to vercel.com
3. Import your GitHub repository
4. Configure environment variables in dashboard
5. Deploy automatically

### Post-Deployment

- Access admin panel at: `https://your-domain.vercel.app/Jeet/login`
- Username: `JeetVK`
- Password: `SamantaVK18`
- Remember to enable 2FA in Settings!
