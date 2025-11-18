# OMNI AI

A comprehensive platform for multi-tenant automation management, featuring an admin dashboard and public website.

## 🏗️ Repository Structure

This is a monorepo containing:

- **`admin-dashboard/`** - Python/Streamlit admin control panel for managing the automation platform
- **`website/`** - Next.js/TypeScript public website for OMNI AI Agency

## 📦 Projects

### Admin Dashboard

A Streamlit-based admin control panel for managing a multi-tenant automation platform via Supabase.

**Quick Start:**
```bash
cd admin-dashboard
python3.11 -m venv .venv
source .venv/bin/activate
pip install -r requirements.txt
streamlit run app.py
```

See [`admin-dashboard/README.md`](admin-dashboard/README.md) for detailed setup instructions.

### Website

Next.js-based public website for OMNI AI Agency with multi-language support, Calendly integration, and security features.

**Quick Start:**
```bash
cd website
npm install
npm run dev
```

See [`website/README.md`](website/README.md) for detailed setup instructions.

## 🚀 Getting Started

### Prerequisites

- Python 3.11+ (for admin dashboard)
- Node.js and npm/yarn (for website - coming soon)
- Supabase account and credentials

### Setup

1. Clone the repository:
```bash
git clone <repository-url>
cd omni-ai
```

2. Set up the admin dashboard:
```bash
cd admin-dashboard
# Follow setup instructions in admin-dashboard/README.md
```

3. Set up the website:
```bash
cd website
npm install
cp .env.example .env.local
# Edit .env.local with your configuration
npm run dev
```

**📖 For detailed local setup instructions, see [QUICK_START.md](./QUICK_START.md) or [LOCAL_SETUP.md](./LOCAL_SETUP.md)**

## 📝 Configuration

Each project has its own configuration requirements. See individual README files:
- [`admin-dashboard/README.md`](admin-dashboard/README.md)
- [`website/README.md`](website/README.md)

## 🔒 Security

The website includes comprehensive security features:
- Security headers (HSTS, CSP, X-Frame-Options, etc.)
- Rate limiting on API routes
- Input validation and sanitization
- JWT authentication for webhooks

See [SECURITY.md](SECURITY.md) for detailed security documentation.

## 🚀 Deployment

Both applications can be deployed **separately** to **Railway** or **Render** (both offer free tiers):

See [DEPLOYMENT_GUIDE.md](DEPLOYMENT_GUIDE.md) for detailed deployment instructions.

**Key Points:**
- Each app has its own `railway.json` and `Dockerfile`
- Deploy admin-dashboard from `admin-dashboard/` directory
- Deploy website from `website/` directory
- Each service requires different environment variables

### Railway (Recommended)
- **Free**: $5/month credit
- **Always-on**: No spin-down
- **Custom domains**: Free
- **Quick Deploy**: Connect GitHub repo → Auto-deploy

### Render
- **Free**: 750 hours/month
- **Spins down**: After 15 min inactivity
- **Quick Deploy**: Use Blueprint with `render.yaml`

Both platforms support automatic deployments from GitHub!

## 🤝 Contributing

This repository is organized as a monorepo to facilitate:
- Shared code and configurations
- Unified versioning
- Easier cross-project development

## 📄 License

**Copyright (c) 2025 Syed Fahim - All Rights Reserved**

This software and associated documentation files are the proprietary and confidential property of Syed Fahim.

**⚠️ NOTICE: DO NOT COPY, MODIFY, DISTRIBUTE, OR USE THIS CODE WITHOUT EXPRESS WRITTEN PERMISSION FROM THE COPYRIGHT OWNER.**

Unauthorized copying, modification, distribution, or use of this Software, via any medium, is strictly prohibited and may result in legal action.

For licensing inquiries, please contact: syedfahimdev@gmail.com

See [LICENSE](LICENSE) for full terms.

## 🔗 Links

- Admin Dashboard: [Add deployment URL]
- Website: [Add deployment URL]
