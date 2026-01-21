# DigitalOcean Deployment Guide (SSH)

Complete guide to deploy your Portfolio + Admin Panel on DigitalOcean Droplet.

## 📋 Prerequisites

- DigitalOcean account (Get $200 free credit: https://digitalocean.com)
- Domain name (optional, but recommended)
- SSH client (built into Windows PowerShell/Terminal)

---

## Step 1: Create a Droplet

1. Go to https://cloud.digitalocean.com
2. Click **Create** → **Droplets**
3. Choose settings:
   - **Region**: Choose closest to your users (e.g., NYC, SFO, London)
   - **Image**: Ubuntu 24.04 LTS
   - **Size**: Basic → $6/month (1GB RAM) - sufficient for portfolio
   - **Authentication**: Choose **SSH Key** (recommended) or Password
   - **Hostname**: `my-portfolio`

4. Click **Create Droplet**
5. Copy the **IP Address** (e.g., `164.92.xxx.xxx`)

---

## Step 2: Connect via SSH

Open PowerShell/Terminal:

```powershell
ssh root@YOUR_DROPLET_IP
```

If using password, enter it when prompted.
If using SSH key, it connects automatically.

---

## Step 3: Initial Server Setup

Run these commands on your Droplet:

```bash
# Update system
apt update && apt upgrade -y

# Install Node.js 20
curl -fsSL https://deb.nodesource.com/setup_20.x | bash -
apt install -y nodejs

# Verify installation
node -v  # Should show v20.x.x
npm -v   # Should show 10.x.x

# Install PM2 (process manager)
npm install -g pm2

# Install Git
apt install -y git

# Install Nginx (reverse proxy)
apt install -y nginx

# Enable firewall
ufw allow OpenSSH
ufw allow 'Nginx Full'
ufw enable
```

---

## Step 4: Clone Your Repository

```bash
# Create app directory
mkdir -p /var/www
cd /var/www

# Clone your repository
git clone https://github.com/Samanta2087/My-Portfolio-.git portfolio
cd portfolio

# Install dependencies
npm install
```

---

## Step 5: Configure Environment Variables

```bash
# Create production environment file
nano .env
```

Add these variables (press Ctrl+X, Y, Enter to save):

```env
NODE_ENV=production
PORT=5000
SESSION_SECRET=your-super-secret-session-key-change-this-to-random-string
DATABASE_URL=postgresql://neondb_owner:YOUR_PASSWORD@YOUR_HOST.neon.tech/neondb?sslmode=require
```

**Important**: Use your actual Neon database URL from `.env.production`

---

## Step 6: Build the Application

```bash
# Build frontend and backend
npm run build

# Push database schema (if needed)
npm run db:push

# Create admin user (if not already created)
npx tsx create-admin.ts
```

---

## Step 7: Configure PM2 (Process Manager)

```bash
# Start the application with PM2
pm2 start dist/index.cjs --name "portfolio"

# Save PM2 configuration
pm2 save

# Enable PM2 to start on boot
pm2 startup
```

Test if app is running:
```bash
curl http://localhost:5000
```

---

## Step 8: Configure Nginx (Reverse Proxy)

```bash
# Create Nginx configuration
nano /etc/nginx/sites-available/portfolio
```

Add this configuration:

```nginx
server {
    listen 80;
    server_name YOUR_DOMAIN_OR_IP;

    # Gzip compression
    gzip on;
    gzip_types text/plain text/css application/json application/javascript text/xml application/xml;

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

Replace `YOUR_DOMAIN_OR_IP` with your domain or Droplet IP.

Enable the site:
```bash
# Create symlink
ln -s /etc/nginx/sites-available/portfolio /etc/nginx/sites-enabled/

# Remove default site
rm /etc/nginx/sites-enabled/default

# Test Nginx configuration
nginx -t

# Restart Nginx
systemctl restart nginx
```

---

## Step 9: Add SSL Certificate (HTTPS)

**Option A: Using a Domain**

```bash
# Install Certbot
apt install -y certbot python3-certbot-nginx

# Get SSL certificate (replace with your domain)
certbot --nginx -d yourdomain.com -d www.yourdomain.com

# Auto-renewal is set up automatically
```

**Option B: Without Domain (Self-signed)**

```bash
# Generate self-signed certificate
openssl req -x509 -nodes -days 365 -newkey rsa:2048 \
  -keyout /etc/ssl/private/nginx-selfsigned.key \
  -out /etc/ssl/certs/nginx-selfsigned.crt
```

---

## Step 10: Test Your Deployment

1. Open browser: `http://YOUR_DROPLET_IP` (or your domain)
2. Portfolio should load
3. Go to `/Jeet/login` to access admin panel
4. Login with: **JeetVK** / **SamantaVK18**

---

## 🔄 Updating Your Site

When you push changes to GitHub:

```bash
# SSH into your Droplet
ssh root@YOUR_DROPLET_IP

# Go to app directory
cd /var/www/portfolio

# Pull latest changes
git pull origin main

# Install new dependencies (if any)
npm install

# Rebuild
npm run build

# Restart PM2
pm2 restart portfolio
```

---

## 📊 Useful PM2 Commands

```bash
# View running processes
pm2 list

# View logs
pm2 logs portfolio

# Monitor resources
pm2 monit

# Restart app
pm2 restart portfolio

# Stop app
pm2 stop portfolio

# View detailed info
pm2 show portfolio
```

---

## 🔧 Troubleshooting

### App not starting?
```bash
pm2 logs portfolio --lines 50
```

### Database connection issues?
```bash
# Check environment variables
cat .env

# Test database connection
node -e "console.log(process.env.DATABASE_URL)"
```

### Nginx errors?
```bash
# Check Nginx error log
tail -f /var/log/nginx/error.log

# Check Nginx status
systemctl status nginx
```

### Port already in use?
```bash
# Find process using port 5000
lsof -i :5000

# Kill if needed
pm2 delete portfolio
pm2 start dist/index.cjs --name "portfolio"
```

---

## 💰 Cost Summary

| Resource | Cost |
|----------|------|
| DigitalOcean Droplet (1GB) | $6/month |
| Neon PostgreSQL (Free tier) | $0/month |
| Domain (optional) | ~$10-15/year |
| SSL Certificate (Let's Encrypt) | Free |

**Total: ~$6/month** (or less with DigitalOcean credits)

---

## 🚀 Quick Deploy Script

Save this as `deploy.sh` on your Droplet:

```bash
#!/bin/bash
cd /var/www/portfolio
git pull origin main
npm install
npm run build
pm2 restart portfolio
echo "✅ Deployment complete!"
```

Make it executable:
```bash
chmod +x deploy.sh
```

Run with: `./deploy.sh`

---

## Need Help?

- DigitalOcean Docs: https://docs.digitalocean.com
- PM2 Docs: https://pm2.keymetrics.io/docs
- Nginx Docs: https://nginx.org/en/docs
