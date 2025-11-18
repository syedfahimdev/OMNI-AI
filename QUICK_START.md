# Quick Start Guide - Local Development

## 🚀 Run Both Applications Locally

### Step 1: Setup Admin Dashboard

```bash
cd admin-dashboard

# Create virtual environment
python3.11 -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Create .env.local from example
cp .env.example .env.local

# Edit .env.local with your Supabase credentials
# SUPABASE_URL=https://your-project.supabase.co
# SUPABASE_SERVICE_KEY=your-service-role-key
# ADMIN_PASSWORD=your-password

# Run admin dashboard
streamlit run app.py
```

**Admin Dashboard will run on:** http://localhost:8501

### Step 2: Setup Website (New Terminal)

Open a **new terminal window** and run:

```bash
cd website

# Install dependencies
npm install

# Create .env.local from example
cp .env.example .env.local

# Edit .env.local with your N8N webhook token
# N8N_WEBHOOK_JWT_TOKEN=your_jwt_token_here

# Run website
npm run dev
```

**Website will run on:** http://localhost:3000

## 📝 Environment Variables

### Admin Dashboard (`admin-dashboard/.env.local`)

```env
SUPABASE_URL=https://your-project-id.supabase.co
SUPABASE_SERVICE_KEY=your-service-role-key-here
ADMIN_PASSWORD=your-secure-admin-password-here
```

### Website (`website/.env.local`)

```env
NODE_ENV=development
PORT=3000
N8N_WEBHOOK_JWT_TOKEN=your_jwt_token_here
```

## 🔍 Where to Get Credentials

### Supabase Credentials
1. Go to https://app.supabase.com
2. Select your project
3. Settings → API
4. Copy **Project URL** → `SUPABASE_URL`
5. Copy **service_role** key → `SUPABASE_SERVICE_KEY`

### N8N Webhook Token
1. Go to your N8N instance
2. Open your webhook workflow
3. Check webhook settings for JWT token
4. Copy token → `N8N_WEBHOOK_JWT_TOKEN`

## ⚡ Quick Commands

**Run Admin Dashboard:**
```bash
cd admin-dashboard && source .venv/bin/activate && streamlit run app.py
```

**Run Website:**
```bash
cd website && npm run dev
```

## 🐛 Troubleshooting

**Port already in use?**
```bash
# Kill process on port 3000
lsof -ti:3000 | xargs kill -9

# Kill process on port 8501
lsof -ti:8501 | xargs kill -9
```

**Environment variables not loading?**
- Make sure file is named exactly `.env.local`
- Restart the dev server after creating/modifying `.env.local`
- Check for typos in variable names

For detailed setup, see [LOCAL_SETUP.md](./LOCAL_SETUP.md)

