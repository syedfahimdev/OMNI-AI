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

## 🤝 Contributing

This repository is organized as a monorepo to facilitate:
- Shared code and configurations
- Unified versioning
- Easier cross-project development

## 📄 License

[Add your license here]

## 🔗 Links

- Admin Dashboard: [Add deployment URL]
- Website: [Add deployment URL]
