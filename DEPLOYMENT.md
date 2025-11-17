# Deployment Guide

This guide covers deploying the OMNI AI monorepo to **Render** and **Railway**.

---

# 🚂 Railway Deployment

## 🚀 Streamlit Admin Dashboard

### Quick Deploy (Recommended)

1. **Go to Railway Dashboard**: https://railway.app
   - Sign up/login with GitHub

2. **Create New Project**:
   - Click "New Project"
   - Select "Deploy from GitHub repo"
   - Choose your `OMNI-AI` repository

3. **Configure Service**:
   - Railway will auto-detect Python
   - If needed, set:
     - **Root Directory**: `admin-dashboard`
     - **Start Command**: `cd admin-dashboard && streamlit run app.py --server.port=$PORT --server.address=0.0.0.0`

4. **Set Environment Variables**:
   - Click on your service → "Variables" tab
   - Add the following:
     ```
     SUPABASE_URL=your_supabase_url
     SUPABASE_SERVICE_KEY=your_service_role_key
     ADMIN_PASSWORD=your_admin_password
     ```

5. **Deploy**:
   - Railway will automatically deploy
   - Your app will be live at: `https://your-app-name.up.railway.app`

### Using Railway CLI (Alternative)

1. **Install Railway CLI**:
   ```bash
   npm i -g @railway/cli
   ```

2. **Login**:
   ```bash
   railway login
   ```

3. **Initialize Project**:
   ```bash
   railway init
   ```

4. **Link to Existing Project**:
   ```bash
   railway link
   ```

5. **Set Environment Variables**:
   ```bash
   railway variables set SUPABASE_URL=your_supabase_url
   railway variables set SUPABASE_SERVICE_KEY=your_service_role_key
   railway variables set ADMIN_PASSWORD=your_admin_password
   ```

6. **Deploy**:
   ```bash
   railway up
   ```

### Access Your App

After deployment:
- **URL**: `https://your-project-name.up.railway.app`
- **Custom Domain**: Add in Railway dashboard → Settings → Domains
- **Always On**: Railway free tier keeps services running (no spin-down)

## 🌐 Website (TypeScript) - When Ready

1. **Add New Service**:
   - In your Railway project, click "+ New"
   - Select "GitHub Repo"
   - Choose the same `OMNI-AI` repository

2. **Configure**:
   - **Root Directory**: `website`
   - Railway will auto-detect Node.js
   - Set build/start commands if needed

3. **Deploy**:
   - Railway will automatically build and deploy

## 🔧 Configuration Files

### railway.toml / railway.json
Railway configuration files in the root directory:
- `railway.toml`: TOML format (preferred)
- `railway.json`: JSON format (alternative)

Both define build and deploy commands for your services.

## 📝 Environment Variables

### Required for Admin Dashboard:
- `SUPABASE_URL`: Your Supabase project URL
- `SUPABASE_SERVICE_KEY`: Your Supabase service role key
- `ADMIN_PASSWORD`: Password for admin login

### Setting Variables:
- **Dashboard**: Service → Variables tab
- **CLI**: `railway variables set KEY=value`
- **Bulk**: Upload `.env` file in dashboard

## 💰 Free Tier

Railway offers:
- **$5 credit/month** (usually enough for small apps)
- **Always-on services** (no spin-down)
- **Custom domains** (free)
- **Automatic HTTPS**
- **Auto-deploy from GitHub**

## 🔄 Auto-Deploy

Railway automatically deploys when you:
- Push to the connected branch
- Merge pull requests

To configure:
- Go to Project Settings → Source
- Select branch and auto-deploy options

## 🐛 Troubleshooting

### Build Fails:
- Check build logs in Railway dashboard
- Verify `requirements.txt` is correct
- Ensure Python version is compatible (3.11+)

### App Won't Start:
- Verify start command includes `--server.port=$PORT`
- Check environment variables are set
- Review service logs in Railway dashboard

### Port Issues:
- Railway sets `$PORT` automatically
- Always use `$PORT` in your start command
- Don't hardcode port numbers

## 🔗 Useful Links

- [Railway Dashboard](https://railway.app)
- [Railway Documentation](https://docs.railway.app)
- [Railway CLI](https://docs.railway.app/develop/cli)

---

# 🎨 Render Deployment

This guide covers deploying the OMNI AI monorepo to Render.

## 🚀 Streamlit Admin Dashboard

### Option 1: Using Render Blueprint (Recommended)

1. **Fork or push your code to GitHub** (already done: `https://github.com/syedfahimdev/OMNI-AI`)

2. **Go to Render Dashboard**: https://dashboard.render.com

3. **Create New Blueprint**:
   - Click "New +" → "Blueprint"
   - Connect your GitHub account if not already connected
   - Select the `OMNI-AI` repository
   - Render will automatically detect `render.yaml` and create the services

4. **Configure Environment Variables**:
   - In the Render dashboard, go to your service
   - Navigate to "Environment" tab
   - Add the following variables:
     ```
     SUPABASE_URL=your_supabase_url
     SUPABASE_SERVICE_KEY=your_service_role_key
     ADMIN_PASSWORD=your_admin_password
     ```

5. **Deploy**:
   - Render will automatically deploy when you push to the main branch
   - Or click "Manual Deploy" → "Deploy latest commit"

### Option 2: Manual Service Creation

1. **Create New Web Service**:
   - Go to https://dashboard.render.com
   - Click "New +" → "Web Service"
   - Connect your GitHub repository: `syedfahimdev/OMNI-AI`

2. **Configure Service**:
   - **Name**: `omni-ai-admin-dashboard`
   - **Region**: Choose closest to you
   - **Branch**: `main`
   - **Root Directory**: `admin-dashboard`
   - **Environment**: `Python 3`
   - **Build Command**: `pip install -r requirements.txt`
   - **Start Command**: `streamlit run app.py --server.port=$PORT --server.address=0.0.0.0`

3. **Set Environment Variables**:
   - `SUPABASE_URL`: Your Supabase project URL
   - `SUPABASE_SERVICE_KEY`: Your Supabase service role key
   - `ADMIN_PASSWORD`: Your admin password

4. **Deploy**:
   - Click "Create Web Service"
   - Render will build and deploy your app

### Access Your App

After deployment, your app will be available at:
- **URL**: `https://omni-ai-admin-dashboard.onrender.com` (or your custom domain)
- **Note**: Free tier services spin down after 15 minutes of inactivity
- **First request**: May take 30-60 seconds to wake up

## 🌐 Website (TypeScript) - When Ready

### Setup for Next.js/React

1. **Create New Web Service**:
   - Go to Render dashboard
   - Click "New +" → "Web Service"
   - Connect repository: `syedfahimdev/OMNI-AI`

2. **Configure Service**:
   - **Name**: `omni-ai-website`
   - **Root Directory**: `website`
   - **Environment**: `Node`
   - **Build Command**: `npm install && npm run build`
   - **Start Command**: `npm start` (or `npm run start`)

3. **Set Environment Variables** (if needed):
   - Add any required environment variables for your website

### Alternative: Static Site

If your website is a static site:

1. **Create New Static Site**:
   - Click "New +" → "Static Site"
   - Connect repository
   - **Root Directory**: `website`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist` or `build` (depending on your build output)

## 🔧 Configuration Files

### render.yaml
The `render.yaml` file in the root directory defines all services. You can:
- Deploy multiple services at once using Blueprint
- Keep configuration in version control
- Easily replicate deployments

### Dockerfile (Optional)
The `Dockerfile` in `admin-dashboard/` provides containerized deployment:
- More control over the environment
- Consistent builds across environments
- Can be used with Render's Docker option

## 📝 Environment Variables

### Required for Admin Dashboard:
- `SUPABASE_URL`: Your Supabase project URL
- `SUPABASE_SERVICE_KEY`: Your Supabase service role key (service role, not anon key)
- `ADMIN_PASSWORD`: Password for admin login

### Optional:
- `PORT`: Automatically set by Render (don't override)
- Any other custom environment variables

## 🆓 Free Tier Limitations

- **Spins down after 15 minutes** of inactivity
- **First request** after spin-down takes 30-60 seconds
- **750 hours/month** of runtime (usually enough for development)
- **512MB RAM** per service
- **No custom domains** on free tier (can upgrade for $7/month)

## 🔄 Auto-Deploy

Render automatically deploys when you:
- Push to the connected branch (usually `main`)
- Merge a pull request

To disable auto-deploy:
- Go to service settings
- Toggle "Auto-Deploy" off

## 🐛 Troubleshooting

### App won't start:
- Check build logs in Render dashboard
- Verify all environment variables are set
- Ensure `requirements.txt` is correct

### Slow first load:
- Normal on free tier (service spins down after inactivity)
- Consider upgrading to paid plan for always-on service

### Port issues:
- Render sets `$PORT` automatically
- Use `--server.port=$PORT` in Streamlit start command
- Don't hardcode port numbers

## 🔗 Useful Links

- [Render Dashboard](https://dashboard.render.com)
- [Render Documentation](https://render.com/docs)
- [Streamlit Deployment Guide](https://docs.streamlit.io/streamlit-community-cloud/deploy-your-app)

## 📧 Support

For Render-specific issues, check:
- Render Status: https://status.render.com
- Render Community: https://community.render.com

---

# 📊 Platform Comparison

| Feature | Railway | Render |
|---------|---------|--------|
| **Free Tier** | $5/month credit | 750 hours/month |
| **Spin Down** | ❌ Always on | ✅ After 15 min inactivity |
| **Custom Domains** | ✅ Free | ⚠️ Paid ($7/month) |
| **Auto-Deploy** | ✅ Yes | ✅ Yes |
| **CLI Tool** | ✅ Yes | ❌ No |
| **Ease of Use** | ⭐⭐⭐⭐⭐ | ⭐⭐⭐⭐ |
| **Best For** | Production apps | Development/testing |

## 🎯 Recommendation

- **Railway**: Better for production (always-on, custom domains, more reliable)
- **Render**: Good for development/testing (generous free tier, easy setup)

