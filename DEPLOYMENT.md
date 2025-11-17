# Deployment Guide - Render

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

