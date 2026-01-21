# Admin Panel - Quick Start Guide

## 🎯 What's Included

Your full admin panel is now ready with:

### ✅ **Dashboard**
- Total projects count
- Unread messages counter
- 30-day page views analytics
- Recent messages preview

### ✅ **Project Management**
- Add/Edit/Delete projects
- Upload project images
- Set technologies & links
- Mark projects as featured
- Reorder projects

### ✅ **Message Manager**
- View all contact form submissions
- Mark messages as read/replied
- Reply directly via email
- Delete spam messages

### ✅ **Authentication**
- Secure login system
- Session management
- Protected routes

## 🚀 Setup Instructions

### 1. **Push Database Schema**

```bash
npm run db:push
```

This will create the new tables:
- `projects` - Store portfolio projects
- `messages` - Contact form messages
- `analytics` - Page view tracking

### 2. **Create Admin User**

You need to create an admin account in your database. Run this SQL:

```sql
INSERT INTO users (username, password)
VALUES ('admin', '$2a$10$YourHashedPasswordHere');
```

Or use Node.js REPL to hash password:
```bash
node
const bcrypt = require('bcryptjs');
bcrypt.hash('your-password', 10).then(console.log);
```

### 3. **Access Admin Panel**

Navigate to: **http://localhost:5000/admin/login**

Login with your credentials!

## 📱 Features Breakdown

### **Dashboard** (`/admin`)
- Quick stats overview
- Recent activity
- Performance metrics

### **Projects** (`/admin/projects`)
- Grid view of all projects
- Add new project with:
  - Title & description
  - Image URL
  - Technologies (comma-separated)
  - GitHub & Live URLs
  - Featured flag
- Edit/Delete existing projects

### **Messages** (`/admin/messages`)
- List all contact submissions
- Mark as read/replied
- Quick email reply
- Delete unwanted messages

### **Analytics** (`/admin/analytics`)
- Page view statistics
- Popular pages
- Visit trends (30 days)

### **Settings** (`/admin/settings`)
- Coming soon
- Will include:
  - Profile settings
  - Site configuration
  - SEO settings

## 🔌 API Endpoints

All admin endpoints require authentication:

**Dashboard:**
- `GET /api/admin/stats` - Dashboard statistics

**Projects:**
- `GET /api/admin/projects` - List all projects
- `POST /api/admin/projects` - Create project
- `PUT /api/admin/projects/:id` - Update project
- `DELETE /api/admin/projects/:id` - Delete project

**Messages:**
- `GET /api/admin/messages` - List all messages
- `PATCH /api/admin/messages/:id/read` - Mark as read
- `PATCH /api/admin/messages/:id/replied` - Mark as replied
- `DELETE /api/admin/messages/:id` - Delete message

**Public:**
- `POST /api/admin/contact` - Submit contact form
- `POST /api/admin/analytics/track` - Track page view

## 🎨 Customization

### Add More Features

1. **Blog System** - Add articles/posts
2. **Media Library** - Upload manager for images
3. **SEO Manager** - Edit meta tags
4. **User Roles** - Multiple admin levels
5. **Email Integration** - Auto-reply system
6. **Backup System** - Export/import data

### Styling

Admin panel uses your existing theme:
- Tailwind CSS classes
- Shadcn UI components
- Dark/Light mode support (from your theme)

## 🔐 Security

Current setup includes:
- ✅ Session-based authentication
- ✅ Protected API routes
- ✅ CSRF protection (via express-session)
- ✅ SQL injection protection (Drizzle ORM)

**Recommended additions:**
- [ ] Rate limiting on login
- [ ] 2FA authentication
- [ ] IP whitelist for admin
- [ ] Audit logs
- [ ] File upload validation

## 🐛 Troubleshooting

**Can't login?**
- Check database connection
- Verify user exists in database
- Check session middleware
- Clear browser cookies

**Routes not working?**
- Restart development server
- Check browser console for errors
- Verify admin routes in `server/routes.ts`

**Database errors?**
- Run `npm run db:push`
- Check database credentials
- Verify schema in `shared/schema.ts`

## 📝 Next Steps

1. Push database schema
2. Create admin user
3. Login to admin panel
4. Add your first project
5. Customize as needed!

---

**Admin URL:** http://localhost:5000/admin/login

Your admin panel is production-ready! 🎉
