# Admin Dashboard

Admin control panel for managing a multi-tenant automation platform via Supabase.

## Setup

1. Navigate to the admin-dashboard directory:
```bash
cd admin-dashboard
```

2. Create and activate a virtual environment:
```bash
python3.11 -m venv .venv
source .venv/bin/activate  # On Windows: .venv\Scripts\activate
```

3. Install dependencies:
```bash
pip install --upgrade pip
pip install -r requirements.txt
```

4. Configure secrets (choose one of these approaches):

   **A. Local development (`.env` file, loaded via `python-dotenv`):**

   Create a `.env` file in either location (root folder takes precedence):
   - **Monorepo root** (`/omni-ai/.env`) - Recommended for shared config
   - **Admin dashboard directory** (`/omni-ai/admin-dashboard/.env`) - Project-specific config

   ```bash
   SUPABASE_URL=your_supabase_url
   SUPABASE_SERVICE_KEY=your_service_role_key
   ADMIN_PASSWORD=your_admin_password
   ```

   The app will check both locations, with root folder values taking precedence.

   **B. Production / hosted deployments:**

   Provide the same keys via environment variables or `st.secrets`:

   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_KEY` (service role key)
   - `ADMIN_PASSWORD`

5. Run the app:

```bash
streamlit run app.py
```

The app will be available at `http://localhost:8501` (or another port if 8501 is taken).

## Features

- 📊 Dashboard with KPIs and analytics
- 🏢 Business/tenant management
- 📦 Plans & Modules configuration
- 🔄 Workflow runs monitoring
- 📝 Workflow step logs
- 🛒 Vertical-specific data management (Grocery)

## Architecture

See [`WARP.md`](WARP.md) for detailed architecture documentation.
