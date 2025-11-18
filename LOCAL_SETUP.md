# Local Development Setup Guide

This guide explains how to run both applications locally for testing and development.

## Prerequisites

- **Python 3.11+** (for admin dashboard)
- **Node.js 18+** and **npm** (for website)
- **Supabase account** and project credentials
- **N8N webhook JWT token** (for website contact form)

## Quick Start

### 1. Clone and Navigate

```bash
git clone https://github.com/syedfahimdev/OMNI-AI.git
cd OMNI-AI
```

### 2. Set Up Admin Dashboard

```bash
# Navigate to admin dashboard
cd admin-dashboard

# Create virtual environment
python3.11 -m venv .venv

# Activate virtual environment
# On macOS/Linux:
source .venv/bin/activate
# On Windows:
# .venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Copy environment file template
cp .env.local.example .env.local

# Edit .env.local with your credentials
# You'll need:
# - SUPABASE_URL
# - SUPABASE_SERVICE_KEY
# - ADMIN_PASSWORD

# Run the admin dashboard
streamlit run app.py
```

The admin dashboard will be available at: **http://localhost:8501**

### 3. Set Up Website

Open a **new terminal window** (keep admin dashboard running):

```bash
# Navigate to website
cd website

# Install dependencies
npm install

# Copy environment file template
cp .env.local.example .env.local

# Edit .env.local with your credentials
# You'll need:
# - N8N_WEBHOOK_JWT_TOKEN

# Run the website in development mode
npm run dev
```

The website will be available at: **http://localhost:3000**

## Environment Variables

### Admin Dashboard (`.env.local`)

Create `admin-dashboard/.env.local`:

```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_KEY=your-service-role-key-here
ADMIN_PASSWORD=your-secure-admin-password-here
```

**Where to get these values:**
- Go to [Supabase Dashboard](https://app.supabase.com)
- Select your project
- Go to Settings → API
- Copy the **Project URL** → `SUPABASE_URL`
- Copy the **service_role** key → `SUPABASE_SERVICE_KEY`
- Set your own `ADMIN_PASSWORD` (use a strong password)

### Website (`.env.local`)

Create `website/.env.local`:

```env
NODE_ENV=development
PORT=3000
N8N_WEBHOOK_JWT_TOKEN=your_jwt_token_here
```

**Where to get N8N_WEBHOOK_JWT_TOKEN:**
- Go to your N8N instance
- Navigate to your webhook workflow
- Check the webhook settings for JWT authentication token
- Or set up JWT authentication in your N8N webhook

## Running Both Applications

### Option 1: Two Terminal Windows (Recommended)

**Terminal 1 - Admin Dashboard:**
```bash
cd admin-dashboard
source .venv/bin/activate  # or .venv\Scripts\activate on Windows
streamlit run app.py
```

**Terminal 2 - Website:**
```bash
cd website
npm run dev
```

### Option 2: Background Processes

**Admin Dashboard:**
```bash
cd admin-dashboard
source .venv/bin/activate
streamlit run app.py &
```

**Website:**
```bash
cd website
npm run dev &
```

## Accessing the Applications

- **Admin Dashboard**: http://localhost:8501
- **Website**: http://localhost:3000

## Troubleshooting

### Admin Dashboard Issues

**Problem: "Missing SUPABASE_URL or SUPABASE_SERVICE_KEY"**
- Solution: Make sure `.env.local` exists in `admin-dashboard/` directory
- Verify the file has correct variable names (no typos)
- Check that values don't have extra spaces or quotes

**Problem: "Failed to initialize Supabase client"**
- Solution: Verify your Supabase credentials are correct
- Check that you're using the **service_role** key, not the anon key
- Ensure your Supabase project is active

**Problem: "ADMIN_PASSWORD not configured"**
- Solution: Add `ADMIN_PASSWORD=your-password` to `.env.local`

### Website Issues

**Problem: "N8N_WEBHOOK_JWT_TOKEN environment variable is not set"**
- Solution: Create `website/.env.local` with `N8N_WEBHOOK_JWT_TOKEN`
- Restart the dev server after adding the variable

**Problem: Port 3000 already in use**
- Solution: Change `PORT=3001` in `.env.local` or kill the process using port 3000
- To find and kill: `lsof -ti:3000 | xargs kill -9`

**Problem: Module not found errors**
- Solution: Run `npm install` again in the `website/` directory
- Delete `node_modules` and `package-lock.json`, then `npm install`

### General Issues

**Problem: Changes not reflecting**
- Solution: Restart the development server
- For Next.js: Stop (Ctrl+C) and run `npm run dev` again
- For Streamlit: It auto-reloads, but you can click "Rerun" in the UI

**Problem: Environment variables not loading**
- Solution: Make sure the file is named exactly `.env.local` (not `.env.local.txt`)
- Restart the development server after creating/modifying `.env.local`
- Check that you're in the correct directory when running commands

## Development Tips

### Hot Reload
- **Next.js**: Automatically reloads on file changes
- **Streamlit**: Automatically reloads on file changes (click "Always rerun" in settings)

### Debugging
- Check browser console for frontend errors
- Check terminal output for backend errors
- Use `console.log()` in Next.js for debugging
- Use `st.write()` in Streamlit for debugging

### Testing Contact Form
1. Make sure `N8N_WEBHOOK_JWT_TOKEN` is set correctly
2. Test the form at http://localhost:3000 (if you have a contact page)
3. Check browser Network tab for API responses
4. Check N8N workflow logs for webhook reception

## Next Steps

After setting up locally:
1. Test all features
2. Make your changes
3. Test again
4. Commit and push to GitHub
5. Deploy to Railway/Render

## Security Notes

⚠️ **Important:**
- Never commit `.env.local` files to Git
- They are already in `.gitignore`
- Use `.env.local.example` as a template
- Keep your credentials secure
- Don't share `.env.local` files

