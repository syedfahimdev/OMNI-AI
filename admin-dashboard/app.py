"""
Supabase Admin Dashboard - Multi-tenant Automation Platform Manager

Streamlit entrypoint that wires authentication, Supabase client initialization,
and navigation to page modules in the ``admin_dashboard`` package.
"""

import warnings

# Suppress Streamlit warnings that occur during import/bare mode
# These warnings are harmless and don't affect functionality
warnings.filterwarnings("ignore", message=".*missing ScriptRunContext.*")
warnings.filterwarnings("ignore", message=".*No runtime found.*")
warnings.filterwarnings("ignore", message=".*Session state does not function.*")

import streamlit as st

from admin_dashboard.auth import require_login
from admin_dashboard.supabase_utils import clear_cache, get_supabase_client
from admin_dashboard.pages.dashboard import render_dashboard_page
from admin_dashboard.pages.businesses import render_businesses_page
from admin_dashboard.pages.plans_modules import render_plans_modules_page
from admin_dashboard.pages.workflow_runs import render_workflow_runs_page
from admin_dashboard.pages.step_logs import render_step_logs_page
from admin_dashboard.pages.vertical_data import render_vertical_data_page


def main() -> None:
    """Main application entry point."""
    st.set_page_config(
        page_title="Supabase Admin Dashboard",
        page_icon="🎛️",
        layout="wide",
        initial_sidebar_state="expanded",
    )

    # Require login
    require_login()

    # Initialize Supabase client
    supabase = get_supabase_client()

    # Sidebar navigation
    st.sidebar.title("🎛️ Admin Dashboard")
    st.sidebar.markdown("---")

    page = st.sidebar.radio(
        "Navigation",
        options=[
            "📊 Dashboard",
            "🏢 Businesses",
            "📦 Plans & Modules",
            "🔄 Workflow Runs",
            "📝 Workflow Step Logs",
            "🛒 Vertical Data",
        ],
    )

    st.sidebar.markdown("---")

    # Logout button
    if st.sidebar.button("🚪 Logout"):
        st.session_state.logged_in = False
        st.rerun()

    # Cache management
    if st.sidebar.button("🔄 Clear Cache"):
        clear_cache()

    st.sidebar.markdown("---")
    st.sidebar.caption("Multi-tenant Automation Platform")
    st.sidebar.caption("Admin Dashboard v1.0")

    # Route to appropriate page
    if page == "📊 Dashboard":
        render_dashboard_page(supabase)
    elif page == "🏢 Businesses":
        render_businesses_page(supabase)
    elif page == "📦 Plans & Modules":
        render_plans_modules_page(supabase)
    elif page == "🔄 Workflow Runs":
        render_workflow_runs_page(supabase)
    elif page == "📝 Workflow Step Logs":
        render_step_logs_page(supabase)
    elif page == "🛒 Vertical Data":
        render_vertical_data_page(supabase)


if __name__ == "__main__":
    main()
