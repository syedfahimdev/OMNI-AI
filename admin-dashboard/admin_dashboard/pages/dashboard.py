"""Dashboard page for the admin dashboard Streamlit app."""

from datetime import datetime, timedelta
from typing import Dict, List

import pandas as pd
import plotly.express as px
import streamlit as st
from supabase import Client

from ..supabase_utils import safe_query, format_datetime, format_duration


def render_dashboard_page(supabase: Client) -> None:
    """Render the main dashboard with KPIs and charts."""
    st.title("📊 Dashboard")

    # Refresh button
    col1, col2 = st.columns([6, 1])
    with col2:
        if st.button("🔄 Refresh"):
            st.rerun()

    st.markdown("---")

    # KPIs
    col1, col2, col3, col4 = st.columns(4)

    # Total businesses
    businesses_result = safe_query(
        lambda: supabase.table("businesses").select("id", count="exact").execute()
    )
    total_businesses = businesses_result.count if businesses_result else 0

    with col1:
        st.metric("Total Businesses", total_businesses)

    # Active subscriptions by plan
    subscriptions_result = safe_query(
        lambda: supabase.table("business_subscriptions")
        .select("plan_code")
        .eq("status", "active")
        .execute()
    )
    subs_data = subscriptions_result.data if subscriptions_result else []
    plan_counts = (
        pd.DataFrame(subs_data)["plan_code"].value_counts().to_dict() if subs_data else {}
    )

    with col2:
        st.metric("Basic Plan", plan_counts.get("basic", 0))
    with col3:
        st.metric("Standard Plan", plan_counts.get("standard", 0))
    with col4:
        st.metric("Pro Plan", plan_counts.get("pro", 0))

    st.markdown("---")

    # Workflow runs KPIs
    col1, col2 = st.columns(2)

    seven_days_ago = (datetime.now() - timedelta(days=7)).isoformat()

    # Runs in last 7 days
    recent_runs_result = safe_query(
        lambda: supabase.table("workflow_runs")
        .select("id, status", count="exact")
        .gte("start_time", seven_days_ago)
        .execute()
    )
    recent_runs_count = recent_runs_result.count if recent_runs_result else 0
    recent_runs_data = recent_runs_result.data if recent_runs_result else []

    failed_runs_count = len([r for r in recent_runs_data if r.get("status") == "Failed"])

    with col1:
        st.metric("Workflow Runs (7 days)", recent_runs_count)
    with col2:
        st.metric("Failed Runs (7 days)", failed_runs_count, delta_color="inverse")

    st.markdown("---")

    # Charts section
    st.subheader("📈 Analytics")

    tab1, tab2, tab3 = st.tabs(["Runs per Day", "Failures by Workflow", "Step Status Distribution"])

    with tab1:
        # Line chart: runs per day
        runs_result = safe_query(
            lambda: supabase.table("workflow_runs")
            .select("start_time")
            .gte("start_time", seven_days_ago)
            .execute()
        )

        if runs_result and runs_result.data:
            df = pd.DataFrame(runs_result.data)
            df["start_time"] = pd.to_datetime(df["start_time"])
            df["date"] = df["start_time"].dt.date
            daily_counts = df.groupby("date").size().reset_index(name="count")

            fig = px.line(
                daily_counts,
                x="date",
                y="count",
                title="Workflow Runs per Day (Last 7 Days)",
                labels={"date": "Date", "count": "Number of Runs"},
            )
            st.plotly_chart(fig, use_container_width=True)
        else:
            st.info("No workflow run data available")

    with tab2:
        # Bar chart: failures by workflow
        failed_runs_result = safe_query(
            lambda: supabase.table("workflow_runs")
            .select("workflow_name")
            .eq("status", "Failed")
            .gte("start_time", seven_days_ago)
            .execute()
        )

        if failed_runs_result and failed_runs_result.data:
            df = pd.DataFrame(failed_runs_result.data)
            workflow_failures = df["workflow_name"].value_counts().reset_index()
            workflow_failures.columns = ["workflow", "failures"]

            fig = px.bar(
                workflow_failures,
                x="workflow",
                y="failures",
                title="Failed Runs by Workflow (Last 7 Days)",
                labels={"workflow": "Workflow Name", "failures": "Number of Failures"},
            )
            st.plotly_chart(fig, use_container_width=True)
        else:
            st.info("No failed workflow runs in the last 7 days")

    with tab3:
        # Step status distribution
        steps_result = safe_query(
            lambda: supabase.table("workflow_step_logs").select("status").execute()
        )

        if steps_result and steps_result.data:
            df = pd.DataFrame(steps_result.data)
            status_counts = df["status"].value_counts().reset_index()
            status_counts.columns = ["status", "count"]

            fig = px.pie(
                status_counts,
                names="status",
                values="count",
                title="Workflow Step Status Distribution",
            )
            st.plotly_chart(fig, use_container_width=True)
        else:
            st.info("No step log data available")

    st.markdown("---")

    # Recent runs table
    st.subheader("🕐 Latest 20 Workflow Runs")

    latest_runs_result = safe_query(
        lambda: supabase.table("workflow_runs")
        .select("id, workflow_name, business_id, plan_code, status, start_time, duration_ms")
        .order("start_time", desc=True)
        .limit(20)
        .execute()
    )

    if latest_runs_result and latest_runs_result.data:
        df = pd.DataFrame(latest_runs_result.data)

        # Get business names
        business_ids: List[str] = df["business_id"].unique().tolist()
        businesses_result = safe_query(
            lambda: supabase.table("businesses")
            .select("id, name")
            .in_("id", business_ids)
            .execute()
        )

        if businesses_result:
            business_map: Dict[str, str] = {
                b["id"]: b["name"] for b in businesses_result.data
            }
            df["business_name"] = df["business_id"].map(business_map)
        else:
            df["business_name"] = "Unknown"

        df["start_time"] = df["start_time"].apply(format_datetime)
        df["duration"] = df["duration_ms"].apply(format_duration)

        display_df = df[
            [
                "id",
                "workflow_name",
                "business_name",
                "plan_code",
                "status",
                "start_time",
                "duration",
            ]
        ]
        display_df.columns = [
            "Run ID",
            "Workflow",
            "Business",
            "Plan",
            "Status",
            "Start Time",
            "Duration",
        ]

        st.dataframe(display_df, use_container_width=True, hide_index=True)
    else:
        st.info("No workflow runs found")
