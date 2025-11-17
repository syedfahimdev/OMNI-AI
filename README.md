# OMNI AI

A comprehensive platform for multi-tenant automation management, featuring an admin dashboard and public website.

## 🏗️ Repository Structure

This is a monorepo containing:

- **`admin-dashboard/`** - Python/Streamlit admin control panel for managing the automation platform
- **`website/`** - TypeScript-based public website (coming soon)
- **`shared/`** - Shared utilities, types, and configurations

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

TypeScript-based public website for OMNI AI agency (coming soon).

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

3. Set up the website (when available):
```bash
cd website
# Follow setup instructions in website/README.md
```

## 📝 Configuration

Each project has its own configuration requirements. See individual README files:
- [`admin-dashboard/README.md`](admin-dashboard/README.md)
- [`website/README.md`](website/README.md) (coming soon)

## 🚀 Deployment

Deploy to Render (free tier available):

See [DEPLOYMENT.md](DEPLOYMENT.md) for detailed deployment instructions.

**Quick Deploy:**
1. Push your code to GitHub
2. Go to [Render Dashboard](https://dashboard.render.com)
3. Create a new Blueprint and connect your repository
4. Render will auto-detect `render.yaml` and deploy your services
5. Add environment variables in the Render dashboard

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
