# Deploy to DigitalOcean - Step by Step Guide

## Option 1: App Platform (Recommended - Easiest)

### Step 1: Push to GitHub
```bash
git add .
git commit -m "Add Docker deployment"
git push origin main
```

### Step 2: Create DigitalOcean Account
1. Go to https://www.digitalocean.com
2. Sign up (you get $200 free credit for 60 days)

### Step 3: Create App
1. Go to **Apps** in the sidebar
2. Click **Create App**
3. Choose **GitHub** as source
4. Authorize DigitalOcean to access your GitHub
5. Select repository: `Samanta2087/My-Portfolio-`
6. Select branch: `main`

### Step 4: Configure App
1. **Type**: Web Service
2. **Name**: my-portfolio
3. **Region**: Choose closest to your users
4. **Plan**: Basic ($5/month) or Starter (Free for limited use)

### Step 5: Add Environment Variables
Click **Edit** next to Environment Variables and add:

```
DATABASE_URL=postgresql://neondb_owner:npg_S2EBZIwlCz3k@ep-weathered-dust-a5u3xdpv-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require
SESSION_SECRET=your-super-secret-session-key-change-this-in-production
NODE_ENV=production
PORT=5000
```

### Step 6: Deploy
1. Click **Next** through the review
2. Click **Create Resources**
3. Wait for deployment (5-10 minutes)

Your app will be live at: `https://my-portfolio-xxxxx.ondigitalocean.app`

---

## Option 2: Droplet (More Control)

### Step 1: Create Droplet
1. Go to **Droplets** → **Create Droplet**
2. Choose **Ubuntu 24.04 LTS**
3. Plan: Basic $6/month (1GB RAM)
4. Choose datacenter region
5. Authentication: SSH Key (recommended) or Password
6. Create Droplet

### Step 2: Connect to Droplet
```bash
ssh root@YOUR_DROPLET_IP
```

### Step 3: Install Docker
```bash
# Update system
apt update && apt upgrade -y

# Install Docker
curl -fsSL https://get.docker.com -o get-docker.sh
sh get-docker.sh

# Install Docker Compose
apt install docker-compose -y
```

### Step 4: Clone Repository
```bash
cd /opt
git clone https://github.com/Samanta2087/My-Portfolio-.git portfolio
cd portfolio
```

### Step 5: Create Environment File
```bash
nano .env
```

Add these variables:
```
DATABASE_URL=postgresql://neondb_owner:npg_S2EBZIwlCz3k@ep-weathered-dust-a5u3xdpv-pooler.us-east-2.aws.neon.tech/neondb?sslmode=require
SESSION_SECRET=your-super-secret-session-key-change-this-in-production
NODE_ENV=production
PORT=5000
```

Save: `Ctrl+X`, then `Y`, then `Enter`

### Step 6: Build and Run
```bash
# Build Docker image
docker build -t portfolio .

# Run container
docker run -d \
  --name portfolio \
  --restart unless-stopped \
  -p 80:5000 \
  --env-file .env \
  portfolio
```

### Step 7: Setup Domain (Optional)
1. Go to **Networking** → **Domains**
2. Add your domain
3. Create A record pointing to your Droplet IP

### Step 8: Setup SSL with Nginx (Optional)
```bash
# Install Nginx and Certbot
apt install nginx certbot python3-certbot-nginx -y

# Create Nginx config
nano /etc/nginx/sites-available/portfolio
```

Add:
```nginx
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        proxy_pass http://localhost:5000;
        proxy_http_version 1.1;
        proxy_set_header Upgrade $http_upgrade;
        proxy_set_header Connection 'upgrade';
        proxy_set_header Host $host;
        proxy_cache_bypass $http_upgrade;
        proxy_set_header X-Real-IP $remote_addr;
    }
}
```

```bash
# Enable site
ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/
nginx -t
systemctl restart nginx

# Get SSL certificate
certbot --nginx -d your-domain.com
```

---

## Quick Commands Reference

### Check Logs
```bash
# App Platform: Check in dashboard
# Droplet:
docker logs portfolio -f
```

### Restart App
```bash
docker restart portfolio
```

### Update App
```bash
cd /opt/portfolio
git pull
docker build -t portfolio .
docker stop portfolio
docker rm portfolio
docker run -d --name portfolio --restart unless-stopped -p 80:5000 --env-file .env portfolio
```

---

## Admin Panel Access
- URL: `https://your-domain.com/Jeet/login`
- Username: `JeetVK`
- Password: `SamantaVK18`

---

## Pricing Summary
| Option | Cost | Best For |
|--------|------|----------|
| App Platform Starter | Free (limited) | Testing |
| App Platform Basic | $5/month | Small sites |
| Droplet | $6/month | Full control |
