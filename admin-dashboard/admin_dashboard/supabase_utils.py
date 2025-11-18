"""Supabase client initialization and shared utilities for the admin dashboard."""

import os
import warnings
from datetime import datetime
from pathlib import Path
from typing import Any, Callable, Dict, List, Optional

from dotenv import load_dotenv
import streamlit as st
from supabase import Client, create_client

# Suppress Streamlit warnings during import
# These warnings are harmless and occur when Streamlit code is imported
# before the execution context is available
warnings.filterwarnings("ignore", message=".*missing ScriptRunContext.*")
warnings.filterwarnings("ignore", message=".*No runtime found.*")
warnings.filterwarnings("ignore", message=".*Session state does not function.*")

# Load environment variables from a .env file (if present).
# Checks both the admin-dashboard directory and the monorepo root directory.
# In production you should prefer real environment variables or Streamlit secrets;
# this is mainly for local development.
_current_dir = Path(__file__).parent.parent  # admin-dashboard directory
_root_dir = _current_dir.parent  # monorepo root directory

# Try loading from root first, then fall back to admin-dashboard directory
load_dotenv(dotenv_path=_root_dir / ".env", override=False)
load_dotenv(dotenv_path=_current_dir / ".env", override=False)


def _get_config_value(name: str) -> Optional[str]:
    """Return configuration value from Streamlit secrets or environment.

    Order of precedence:
    1. ``st.secrets[name]`` if available
    2. ``os.environ[name]`` (which may have been populated by ``.env``)
    """

    # 1) Streamlit secrets (e.g. for Streamlit Cloud or secret-managed envs)
    try:
        if hasattr(st, "secrets") and name in st.secrets:
            value = st.secrets[name]
            return str(value) if value is not None else None
    except (RuntimeError, AttributeError):
        # If not in Streamlit context or secrets are misconfigured, fall back to environment.
        pass
    except Exception:
        # Other exceptions, fall back to environment
        pass

    # 2) Plain environment variables (including those loaded from .env)
    return os.environ.get(name)


def get_supabase_client() -> Client:
    """Initialize and return Supabase client with service role key."""
    url = _get_config_value("SUPABASE_URL")
    key = _get_config_value("SUPABASE_SERVICE_KEY")

    if not url or not key:
        st.error("❌ Missing SUPABASE_URL or SUPABASE_SERVICE_KEY environment variables")
        st.stop()

    try:
        return create_client(url, key)
    except Exception as e:  # pragma: no cover - runtime error surface via Streamlit
        st.error(f"❌ Failed to initialize Supabase client: {e}")
        st.stop()


def safe_query(func: Callable[[], Any], error_msg: str = "Database query failed") -> Optional[Any]:
    """Wrapper for safe Supabase queries with error handling.

    Returns the result of ``func()`` on success, otherwise renders an error and
    returns ``None``.
    """

    try:
        return func()
    except Exception as e:  # pragma: no cover - runtime error surface via Streamlit
        st.error(f"{error_msg}: {str(e)}")
        return None


def format_datetime(dt_str: Optional[str]) -> str:
    """Format ISO datetime string for display."""
    if not dt_str:
        return "N/A"
    try:
        dt = datetime.fromisoformat(dt_str.replace("Z", "+00:00"))
        return dt.strftime("%Y-%m-%d %H:%M")
    except Exception:
        return dt_str


def format_duration(ms: Optional[int]) -> str:
    """Format duration in milliseconds to human-readable string."""
    if ms is None:
        return "N/A"
    if ms < 1000:
        return f"{ms}ms"
    if ms < 60000:
        return f"{ms/1000:.2f}s"
    return f"{ms/60000:.2f}min"


@st.cache_data(ttl=300)
def get_module_types(_supabase: Client) -> List[Dict]:
    """Cached fetch of all module types."""
    result = safe_query(
        lambda: _supabase.table("module_types").select("*").execute(),
        "Failed to fetch module types",
    )
    return result.data if result else []


@st.cache_data(ttl=300)
def get_subscription_plans(_supabase: Client) -> List[Dict]:
    """Cached fetch of all subscription plans."""
    result = safe_query(
        lambda: _supabase.table("subscription_plans").select("*").execute(),
        "Failed to fetch subscription plans",
    )
    return result.data if result else []


def clear_cache() -> None:
    """Clear all cached data used by this app."""
    st.cache_data.clear()
    st.success("✅ Cache cleared - data refreshed")
