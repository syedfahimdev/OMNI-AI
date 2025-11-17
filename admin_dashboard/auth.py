"""Authentication helpers for the admin dashboard."""

import streamlit as st

from .supabase_utils import _get_config_value


def render_login_page() -> None:
    """Render the admin login page."""
    st.title("🔐 Admin Login")
    st.markdown("---")

    with st.form("login_form"):
        password = st.text_input("Admin Password", type="password")
        submit = st.form_submit_button("Login")

        if submit:
            admin_password = _get_config_value("ADMIN_PASSWORD")
            if not admin_password:
                st.error("❌ ADMIN_PASSWORD not configured on server")
            elif password == admin_password:
                st.session_state.logged_in = True
                st.rerun()
            else:
                st.error("❌ Invalid password")


def require_login() -> None:
    """Enforce authentication - show login page if not authenticated."""
    if "logged_in" not in st.session_state:
        st.session_state.logged_in = False

    if not st.session_state.logged_in:
        render_login_page()
        st.stop()
