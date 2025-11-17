"""Workflow Runs page for the admin dashboard Streamlit app."""

from datetime import datetime, timedelta
from typing import Dict, List

import pandas as pd
import streamlit as st
from supabase import Client

from ..supabase_utils import format_datetime, format_duration, get_subscription_plans, safe_query


def render_workflow_runs_page(supabase: Client) -> None:
    """Render workflow runs monitoring and filtering page."""
    st.title("🔄 Workflow Runs")

    # Filters
    st.subheader("Filters")

    col1, col2, col3 = st.columns(3)

    with col1:
        date_range = st.date_input(
            "Date Range",
            value=(datetime.now() - timedelta(days=7), datetime.now()),
            key="runs_date_range",
        )

    with col2:
        status_options = ["Running", "Succeeded", "Failed", "Cancelled"]
        status_filter = st.multiselect(
            "Status", options=status_options, default=[], key="runs_status"
        )

    with col3:
        workflow_name_filter = st.text_input("Workflow Name", key="runs_workflow")

    col4, col5 = st.columns(2)

    with col4:
        # Get businesses for dropdown
        businesses_result = safe_query(
            lambda: supabase.table("businesses").select("id, name").execute()
        )
        businesses = businesses_result.data if businesses_result else []
        business_options: Dict[str, str] = {b["name"]: b["id"] for b in businesses}
        business_filter = st.selectbox(
            "Business", options=["All"] + list(business_options.keys()), key="runs_business"
        )

    with col5:
        plans = get_subscription_plans(supabase)
        plan_codes = [p["code"] for p in plans]
        plan_filter = st.selectbox(
            "Plan", options=["All"] + plan_codes, key="runs_plan"
        )

    # Build query
    query = supabase.table("workflow_runs").select("*")

    if date_range and len(date_range) == 2:
        query = query.gte("start_time", date_range[0].isoformat())
        query = query.lte("start_time", (date_range[1] + timedelta(days=1)).isoformat())

    if status_filter:
        query = query.in_("status", status_filter)

    if workflow_name_filter:
        query = query.ilike("workflow_name", f"%{workflow_name_filter}%")

    if business_filter != "All":
        business_id = business_options[business_filter]
        query = query.eq("business_id", business_id)

    if plan_filter != "All":
        query = query.eq("plan_code", plan_filter)

    # Execute query
    result = safe_query(
        lambda: query.order("start_time", desc=True).limit(100).execute()
    )

    if result and result.data:
        runs = result.data

        st.subheader(f"Results ({len(runs)} runs)")

        # Get business names for display
        business_ids: List[str] = list({r["business_id"] for r in runs})
        businesses_result = safe_query(
            lambda: supabase.table("businesses")
            .select("id, name")
            .in_("id", business_ids)
            .execute()
        )
        business_map: Dict[str, str] = (
            {b["id"]: b["name"] for b in businesses_result.data}
            if businesses_result
            else {}
        )

        # Create display dataframe
        df = pd.DataFrame(runs)
        df["business_name"] = df["business_id"].map(business_map)
        df["start_time_fmt"] = df["start_time"].apply(format_datetime)
        df["duration_fmt"] = df["duration_ms"].apply(format_duration)

        display_df = df[
            [
                "id",
                "workflow_name",
                "business_name",
                "plan_code",
                "status",
                "trigger_type",
                "environment",
                "start_time_fmt",
                "duration_fmt",
            ]
        ]
        display_df.columns = [
            "ID",
            "Workflow",
            "Business",
            "Plan",
            "Status",
            "Trigger",
            "Env",
            "Start Time",
            "Duration",
        ]

        st.dataframe(display_df, use_container_width=True, hide_index=True)

        # Export to CSV
        if st.button("📥 Export to CSV"):
            csv = df.to_csv(index=False)
            st.download_button(
                label="Download CSV",
                data=csv,
                file_name=f"workflow_runs_{datetime.now().strftime('%Y%m%d_%H%M%S')}.csv",
                mime="text/csv",
            )

        # Run detail view
        st.markdown("---")
        st.subheader("Run Details")

        run_options: Dict[str, str] = {
            f"{r['workflow_name']} - {r['id'][:8]}": r["id"] for r in runs
        }
        selected_run_label = st.selectbox(
            "Select run to view details",
            options=list(run_options.keys()),
            key="selected_run",
        )

        if selected_run_label:
            selected_run_id = run_options[selected_run_label]
            selected_run = next(r for r in runs if r["id"] == selected_run_id)

            render_run_detail(supabase, selected_run)
    else:
        st.info("No workflow runs found matching the filters")


def render_run_detail(supabase: Client, run: Dict) -> None:
    """Render detailed view of a single workflow run."""
    col1, col2 = st.columns(2)

    with col1:
        st.write("**Run ID:**", run["id"])
        st.write("**Workflow:**", run["workflow_name"])
        st.write("**Status:**", run["status"])
        st.write("**Environment:**", run.get("environment", "N/A"))
        st.write("**Trigger Type:**", run.get("trigger_type", "N/A"))

    with col2:
        st.write("**Start Time:**", format_datetime(run.get("start_time")))
        st.write("**Duration:**", format_duration(run.get("duration_ms")))
        st.write("**Plan Code:**", run.get("plan_code", "N/A"))

        if run.get("error_summary"):
            st.error(f"**Error:** {run['error_summary']}")

    # Entry payload
    if run.get("entry_payload_summary"):
        with st.expander("Entry Payload Summary"):
            st.json(run["entry_payload_summary"])

    # Allowed modules
    if run.get("allowed_modules"):
        with st.expander("Allowed Modules"):
            st.write(run["allowed_modules"])

    # Step logs
    st.markdown("---")
    st.subheader("Step Logs")

    steps_result = safe_query(
        lambda: supabase.table("workflow_step_logs")
        .select("*")
        .eq("run_id", run["id"])
        .order("step_order")
        .execute()
    )

    if steps_result and steps_result.data:
        steps = steps_result.data

        df = pd.DataFrame(steps)
        df["started_at_fmt"] = df["started_at"].apply(format_datetime)
        df["duration_fmt"] = df["duration_ms"].apply(format_duration)

        display_df = df[
            [
                "step_order",
                "node_name",
                "module_phase",
                "intent_action",
                "status",
                "started_at_fmt",
                "duration_fmt",
            ]
        ]
        display_df.columns = [
            "Step",
            "Node",
            "Phase",
            "Action",
            "Status",
            "Started",
            "Duration",
        ]

        st.dataframe(display_df, use_container_width=True, hide_index=True)
    else:
        st.info("No step logs found for this run")
