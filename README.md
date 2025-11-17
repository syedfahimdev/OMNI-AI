# Supabase Admin Dashboard

Admin control panel for managing a multi-tenant automation platform via Supabase.

## Setup

1. Create and activate a virtual environment (optional).
2. Install dependencies:

```bash
pip install -r requirements.txt
```

3. Configure secrets (choose one of these approaches):

   **A. Local development (`.env` file, loaded via `python-dotenv`):**

   Create a `.env` file in the project root:

   ```bash
   SUPABASE_URL=your_supabase_url
   SUPABASE_SERVICE_KEY=your_service_role_key
   ADMIN_PASSWORD=your_admin_password
   ```

   **B. Production / hosted deployments:**

   Provide the same keys via environment variables or `st.secrets`:

   - `SUPABASE_URL`
   - `SUPABASE_SERVICE_KEY` (service role key)
   - `ADMIN_PASSWORD`

4. Run the app:

```bash
streamlit run app.py
```
