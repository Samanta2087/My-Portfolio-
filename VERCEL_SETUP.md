# PostgreSQL Migration Complete! 🎉

## Next Steps to Complete Deployment:

### 1. Add Vercel Postgres Database
Go to: https://vercel.com/samanta2087s-projects/samanta/settings/integrations

Or use this direct link:
https://vercel.com/samanta2087s-projects/samanta/stores

**Steps:**
1. Click "Create Database"
2. Select "Postgres"
3. Choose your region (closest to your users)
4. Click "Create"
5. Vercel will automatically add these environment variables:
   - `POSTGRES_URL`
   - `POSTGRES_PRISMA_URL`
   - `POSTGRES_URL_NON_POOLING`
   - All other Postgres connection details

### 2. Add SESSION_SECRET Environment Variable

Go to: https://vercel.com/samanta2087s-projects/samanta/settings/environment-variables

Add this variable:
- **Name:** `SESSION_SECRET`
- **Value:** `L0XZ4cT7JASo1O2RIW6VtinQk5plbfdj`
- **Environment:** Production, Preview, Development (check all)

### 3. Deploy to Production

After setting up the database and environment variables, run:

```bash
cd "d:\My Port\My-Portfolio-"
vercel --prod
```

### 4. Push Database Schema

Once deployed, you need to create the tables:

**Option A: Using Drizzle Kit (Recommended)**
```bash
# Set your production database URL temporarily
$env:POSTGRES_URL="<your-vercel-postgres-url>"
npm run db:push
```

**Option B: From Vercel Dashboard**
- Go to your Postgres database in Vercel
- Use the Query tool to run migrations

### 5. Create Admin User on Production

After schema is pushed, create the admin user:

```bash
# Create a script to run on Vercel or run via Vercel Functions
npx tsx create-admin.ts
```

Or add the admin user manually via Vercel Postgres query interface:

```sql
INSERT INTO users (id, username, password, two_factor_secret, two_factor_enabled)
VALUES (
  gen_random_uuid()::text,
  'JeetVK',
  -- You'll need to hash the password first with bcrypt
  '$2a$10$<hashed-password>',
  NULL,
  false
);
```

## Quick Commands Summary:

```bash
# 1. Deploy to production
vercel --prod

# 2. Set environment variable
vercel env add SESSION_SECRET

# 3. Push database schema (after setting POSTGRES_URL)
npm run db:push

# 4. Create admin user
npx tsx create-admin.ts
```

## Your Portfolio URLs:
- **Preview:** https://samanta-2zrmqsk5t-samanta2087s-projects.vercel.app
- **Production:** Will be available after `vercel --prod`
- **Admin Panel:** `/Jeet/login`

## Admin Credentials:
- **Username:** JeetVK
- **Password:** SamantaVK18

Remember to enable 2FA in Settings after first login for maximum security! 🔐
