# WARP.md

This file provides guidance to WARP (warp.dev) when working with code in this repository.

---

## Commands & Development Workflow

### Setup

Dependencies are managed with `pip`:

```bash
pip install -r requirements.txt
```

Configuration can be provided via (in order of precedence):

1. `st.secrets["SUPABASE_URL" | "SUPABASE_SERVICE_KEY" | "ADMIN_PASSWORD"]`
2. Process environment variables: `SUPABASE_URL`, `SUPABASE_SERVICE_KEY`, `ADMIN_PASSWORD`
3. A local `.env` file in the project root (loaded via `python-dotenv`) — recommended for local development only.

At least `SUPABASE_URL`, `SUPABASE_SERVICE_KEY` (service role key), and `ADMIN_PASSWORD` must resolve via one of these mechanisms before running the app.

### Running the app

The admin dashboard is a single Streamlit app defined in `app.py`.

Run it locally:

```bash
streamlit run app.py
```

This will start the Streamlit server (default: `http://localhost:8501`).

### Tests, linting, and build

As of the current state of this repo:

- There is **no test suite or test configuration** (no `tests/` directory or test-related config files are present).
- There is **no linting or formatting configuration** (no `flake8`, `black`, `ruff`, etc. config files are present).
- There is **no packaging/build configuration** (no `setup.py`, `pyproject.toml`, or similar).

If you introduce tests or linting tools, prefer adding explicit config and documenting the commands here.

---

## High-Level Architecture

### Overview

- This repo contains a single, production-oriented Streamlit application (`app.py`) that serves as an admin control panel for a **multi-tenant automation platform** backed by Supabase.
- The app provides CRUD and analytics views over Supabase tables representing:
  - Tenants (businesses) and their channels
  - Subscription plans and module types
  - Workflow runs and step logs
  - Vertical-specific data (currently grocery: products, suppliers, low stock events, credit ledger)

The Streamlit entrypoint is `app.py`, and the implementation is organized into a small internal package:

- `admin_dashboard.auth`: login form and `require_login()`.
- `admin_dashboard.supabase_utils`: Supabase client factory, shared query helpers, formatting utilities, and cached lookups.
- `admin_dashboard.pages.*`: one module per top-level page (dashboard, businesses, plans/modules, workflow runs, step logs, vertical data).

### Entry point & configuration

- `main()` is the single entry point and is called under the standard `if __name__ == "__main__":` guard.
- `st.set_page_config(...)` is called at the top of `main()` to configure the Streamlit app (title, icon, layout, sidebar behavior).
- A `st.sidebar.radio(...)` defines the primary navigation across pages; the selected label determines which page-rendering function is invoked.
- The Supabase client is created once per request/interaction and passed into page functions.

### Authentication & session management

- `render_login_page()` renders a simple password-based login form.
  - It compares the provided password against the `ADMIN_PASSWORD` environment variable.
  - On success, `st.session_state.logged_in = True` and the app reruns.
- `require_login()` enforces authentication:
  - Initializes `st.session_state.logged_in` to `False` if missing.
  - If not logged in, it calls `render_login_page()` and then `st.stop()` to prevent any further page rendering.
- `main()` calls `require_login()` before initializing the Supabase client or rendering any pages.
- A sidebar "Logout" button clears `st.session_state.logged_in` and reruns the app.

### Supabase access & utilities

Centralized utility functions provide a consistent pattern for data access and display:

- `get_supabase_client()`
  - Resolves `SUPABASE_URL` and `SUPABASE_SERVICE_KEY` via `_get_config_value(...)`, which checks `st.secrets` first, then `os.environ` (which may have been populated by `.env`).
  - Initializes the Supabase client via `create_client(url, key)`.
  - On missing configuration or initialization failure, shows a Streamlit error and stops execution.

- `safe_query(func, error_msg=...)`
  - Wraps Supabase calls to handle exceptions uniformly.
  - On error, renders a Streamlit error message and returns `None` instead of raising.

- Formatting helpers:
  - `format_datetime(dt_str)` normalizes ISO timestamps (handling trailing `Z`) and formats them as `YYYY-MM-DD HH:MM`.
  - `format_duration(ms)` renders millisecond durations as `ms`, `s`, or `min` as appropriate.

- Cached lookups:
  - `get_module_types(supabase)` and `get_subscription_plans(supabase)` are decorated with `@st.cache_data(ttl=300)` and used extensively across pages.
  - `clear_cache()` calls `st.cache_data.clear()` and is exposed via a sidebar button to force-refresh cached data.

### Page structure (navigation-level)

Each top-level page has a dedicated `render_*_page(supabase)` function and is responsible for its own UI, filtering, and Supabase access. The navigation labels are emoji-prefixed strings; routing is done via direct string comparison in `main()`.

**1. Dashboard (`render_dashboard_page`)**

Focus:
- High-level KPIs and charts over recent workflow activity.

Key patterns:
- Uses Supabase `workflow_runs`, `workflow_step_logs`, and `businesses` tables.
- Computes:
  - Total businesses (exact count from `businesses`).
  - Active subscriptions per plan (`business_subscriptions` filtered on `status='active'`).
  - Runs and failures in the last 7 days (`workflow_runs` filtered by `start_time`).
- Renders:
  - KPIs with `st.metric`.
  - Time-series and distribution charts using Plotly (`px.line`, `px.bar`, `px.pie`).
  - A table of the latest 20 workflow runs, including joined business names and formatted durations.

**2. Businesses (`render_businesses_page` and subfunctions)**

Focus:
- Tenant (business) management: listing, filtering, editing basic info, channels, subscriptions, and modules.

Structure:
- Tabs:
  - "Business List":
    - `render_business_list(supabase)` draws filters (name/slug, city, industry, active flag) and builds a Supabase query against `businesses` with `or_`, `ilike`, and `eq` filters.
    - Shows a `st.dataframe` of businesses with key columns.
    - Provides a `selectbox` that drives a detail view for a single business.
  - "New Business":
    - `render_new_business_form(supabase)` implements a multi-column form that inserts a new row into `businesses` via `supabase.table("businesses").insert(...).execute()`.

Business detail view:
- `render_business_detail(supabase, business)` uses tabs to segment different concerns for a single business:
  - **Basic Info**: edit main business fields and update `businesses` table.
  - **Channels** (`render_business_channels`):
    - Lists existing `business_channels` entries.
    - Adds new channels (WhatsApp/SMS/email/voice) with typical fields (identifier, provider, primary flag).
  - **Subscription** (`render_business_subscription`):
    - Fetches the most recent `business_subscriptions` row.
    - Lets the admin choose a `plan_code` from `subscription_plans`, set status, and valid-from/valid-to dates.
    - Either updates the existing subscription or inserts a new one.
  - **Modules** (`render_business_modules`):
    - Joins `module_types` with `business_modules` to show module enablement per business.
    - Each module has an "Enabled" checkbox that creates/updates a `business_modules` row.
    - For existing modules, an expander exposes a JSON text area to edit the module-specific `config` field.

**3. Plans & Modules (`render_plans_modules_page` and subfunctions)**

Focus:
- Global configuration of module types and subscription plans.

Structure:
- Tabs:
  - **Module Types** (`render_module_types_management`):
    - Displays all `module_types` as expandable sections with an edit form (display name, description) and a delete button.
    - On delete, checks `business_modules` for usage before removing a module type.
    - Provides a "Create New Module Type" form that inserts into `module_types`.
  - **Subscription Plans** (`render_subscription_plans_management`):
    - Shows existing `subscription_plans` with editable name, description, and `allowed_modules` (multi-select of module codes).
    - Deletes plans only if not referenced in `business_subscriptions`.
    - Provides a "Create New Subscription Plan" form to insert into `subscription_plans`.

**4. Workflow Runs (`render_workflow_runs_page`)**

Focus:
- Monitoring and inspecting workflow run history.

Structure:
- Filter controls for:
  - Date range.
  - Status (`Running`, `Succeeded`, `Failed`, `Cancelled`).
  - Workflow name (substring match).
  - Business (via lookup from `businesses`).
  - Plan code (from `subscription_plans`).
- Builds a Supabase query on `workflow_runs` using combinations of `gte`, `lte`, `in_`, `ilike`, and `eq` filters, then orders by `start_time` and limits to 100 rows.
- Joins in business names and formats timestamps/durations for display.
- Provides:
  - A `st.dataframe` of runs with key metadata and status.
  - CSV export (via `to_csv` and `st.download_button`).
  - A run detail view (`render_run_detail`) that shows metadata plus an embedded table of step logs for the selected run (`workflow_step_logs`), reusing `format_datetime` and `format_duration`.

**5. Workflow Step Logs (`render_step_logs_page`)**

Focus:
- Fine-grained inspection and analytics of step-level logs across workflows.

Structure:
- Filters on run ID, module phase, status, channel type, and business.
- Queries `workflow_step_logs` with appropriate `eq`/`in_` filters and a limit (200 rows).
- Analytics:
  - Aggregates in-memory with `pandas` to compute counts and averages.
  - Shows metrics like total steps and a basic success/failure ratio.
  - Renders Plotly charts (bar for average duration per phase, pie for status distribution).
- Tabular view of step logs with truncated run IDs for readability.
- Step detail view (`render_step_detail`) that surfaces:
  - Main fields (IDs, status, timing, intent, channel).
  - Optional summaries (`input_summary`, `output_summary`).
  - Raw input/output JSON, attempting `st.json` and falling back to pretty-printed `st.code` if necessary.

**6. Vertical Data (Grocery) (`render_vertical_data_page` and subfunctions)**

Focus:
- Vertical-specific data model for a grocery automation module, scoped per business.

Structure:
- A required business selector driven by `businesses`.
- Tabs for related data slices, each built on its own Supabase table(s):
  - **Products** (`render_products_tab`):
    - Fetches `products` for the selected business and joins supplier names from `suppliers` when available.
    - Displays key inventory fields (SKU, perishable flag, default pack size, min stock level, active flag).
    - Provides editing of existing products and creation of new ones (linking to an optional `supplier_id`).
  - **Suppliers** (`render_suppliers_tab`):
    - CRUD over `suppliers` for the business (contact details + notes).
  - **Low Stock Events** (`render_low_stock_events_tab`):
    - Read-only view over `low_stock_events` with date range filtering and a join to `products` to display product names.
  - **Credit Ledger** (`render_credit_ledger_tab`):
    - Reads `credit_ledger` entries for the business and aggregates them by `contact_id` to compute total outstanding amounts.
    - Joins to `contacts` for human-readable names and phone numbers.
    - Shows both a per-contact summary and a detailed ledger table.

### Cross-cutting patterns

- **Error handling**: All Supabase interactions are wrapped in `safe_query`, so failures surface as inline Streamlit errors instead of uncaught exceptions.
- **Caching**: Frequently reused global reference data (`module_types`, `subscription_plans`) is cached for 5 minutes to reduce Supabase load; cache can be cleared via a sidebar button.
- **Multi-tenancy**: Most queries are scoped by `business_id` where appropriate (business modules, vertical data, etc.), reflecting the multi-tenant design.

This architecture uses `app.py` as a thin entrypoint and keeps most logic inside the `admin_dashboard` package, with one module per concern. The modular structure is designed to scale as new pages, verticals, or utilities are added.
