"""Workflow Step Logs page for the admin dashboard Streamlit app."""

from typing import Dict, List

import pandas as pd
import plotly.express as px
import streamlit as st
from supabase import Client

from ..supabase_utils import format_datetime, format_duration, safe_query


def render_step_logs_page(supabase: Client) -> None:
    """Render workflow step logs page with detailed filtering and analytics."""
    st.title("📝 Workflow Step Logs")

    # Filters
    st.subheader("Filters")

    col1, col2, col3 = st.columns(3)

    with col1:
        run_id_filter = st.text_input("Run ID", key="steps_run_id")
        module_phase_filter = st.multiselect(
            "Module Phase",
            options=["setup", "processing", "notification", "cleanup"],
            key="steps_phase",
        )

    with col2:
        status_filter = st.multiselect(
            "Status",
            options=["Succeeded", "Failed", "Running", "Skipped"],
            key="steps_status",
        )
        channel_type_filter = st.selectbox(
            "Channel Type",
            options=["All", "whatsapp", "sms", "email"],
            key="steps_channel",
        )

    with col3:
        businesses_result = safe_query(
            lambda: supabase.table("businesses").select("id, name").execute()
        )
        businesses = businesses_result.data if businesses_result else []
        business_options: Dict[str, str] = {b["name"]: b["id"] for b in businesses}
        business_filter = st.selectbox(
            "Business",
            options=["All"] + list(business_options.keys()),
            key="steps_business",
        )

    # Build query
    query = supabase.table("workflow_step_logs").select("*")

    if run_id_filter:
        query = query.eq("run_id", run_id_filter)

    if module_phase_filter:
        query = query.in_("module_phase", module_phase_filter)

    if status_filter:
        query = query.in_("status", status_filter)

    if channel_type_filter != "All":
        query = query.eq("channel_type", channel_type_filter)

    if business_filter != "All":
        business_id = business_options[business_filter]
        query = query.eq("business_id", business_id)

    # Execute query
    result = safe_query(
        lambda: query.order("started_at", desc=True).limit(200).execute()
    )

    if result and result.data:
        steps = result.data

        # Analytics section
        st.subheader("📊 Analytics")

        df = pd.DataFrame(steps)

        col1, col2, col3 = st.columns(3)

        with col1:
            # Average duration by phase
            if "module_phase" in df.columns and "duration_ms" in df.columns:
                phase_avg = df.groupby("module_phase")["duration_ms"].mean()
                st.metric("Avg Duration by Phase", "See chart below")

        with col2:
            # Status distribution
            status_counts = df["status"].value_counts()
            succeeded = status_counts.get("Succeeded", 0)
            failed = status_counts.get("Failed", 0)
            st.metric(
                "Success Rate",
                f"{succeeded}/{succeeded + failed}"
                if (succeeded + failed) > 0
                else "N/A",
            )

        with col3:
            # Total steps
            st.metric("Total Steps", len(steps))

        # Charts
        tab1, tab2 = st.tabs(["Duration by Phase", "Status Distribution"])

        with tab1:
            if "module_phase" in df.columns and "duration_ms" in df.columns:
                phase_avg = (
                    df.groupby("module_phase")["duration_ms"].mean().reset_index()
                )
                phase_avg.columns = ["Phase", "Avg Duration (ms)"]

                fig = px.bar(
                    phase_avg,
                    x="Phase",
                    y="Avg Duration (ms)",
                    title="Average Duration by Module Phase",
                )
                st.plotly_chart(fig, use_container_width=True)

        with tab2:
            status_counts = df["status"].value_counts().reset_index()
            status_counts.columns = ["Status", "Count"]

            fig = px.pie(
                status_counts,
                names="Status",
                values="Count",
                title="Step Status Distribution",
            )
            st.plotly_chart(fig, use_container_width=True)

        st.markdown("---")

        # Step logs table
        st.subheader(f"Step Logs ({len(steps)} steps)")

        df["started_at_fmt"] = df["started_at"].apply(format_datetime)
        df["duration_fmt"] = df["duration_ms"].apply(format_duration)

        display_df = df[
            [
                "run_id",
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
            "Run ID",
            "Step",
            "Node",
            "Phase",
            "Action",
            "Status",
            "Started",
            "Duration",
        ]

        # Truncate run_id for display
        display_df["Run ID"] = display_df["Run ID"].apply(lambda x: x[:8] if x else "")

        st.dataframe(display_df, use_container_width=True, hide_index=True)

        # Step detail view
        st.markdown("---")
        st.subheader("Step Details")

        step_options: Dict[str, str] = {
            f"{s['node_name']} - Step {s['step_order']} ({s['id'][:8]})": s["id"]
            for s in steps
        }
        selected_step_label = st.selectbox(
            "Select step to view details",
            options=list(step_options.keys()),
            key="selected_step",
        )

        if selected_step_label:
            selected_step_id = step_options[selected_step_label]
            selected_step = next(s for s in steps if s["id"] == selected_step_id)

            render_step_detail(selected_step)
    else:
        st.info("No step logs found matching the filters")


def render_step_detail(step: Dict) -> None:
    """Render detailed view of a single step log."""
    col1, col2 = st.columns(2)

    with col1:
        st.write("**Step ID:**", step["id"])
        st.write("**Run ID:**", step["run_id"])
        st.write("**Node Name:**", step["node_name"])
        st.write("**Step Order:**", step["step_order"])
        st.write("**Module Phase:**", step.get("module_phase", "N/A"))

    with col2:
        st.write("**Status:**", step["status"])
        st.write("**Started At:**", format_datetime(step.get("started_at")))
        st.write("**Duration:**", format_duration(step.get("duration_ms")))
        st.write("**Intent Action:**", step.get("intent_action", "N/A"))
        st.write("**Channel Type:**", step.get("channel_type", "N/A"))

    if step.get("error_message"):
        st.error(f"**Error Message:** {step['error_message']}")

    # Summaries
    col1, col2 = st.columns(2)

    with col1:
        if step.get("input_summary"):
            with st.expander("Input Summary"):
                st.text(step["input_summary"])

    with col2:
        if step.get("output_summary"):
            with st.expander("Output Summary"):
                st.text(step["output_summary"])

    # Raw JSON data
    if step.get("raw_input_json"):
        with st.expander("Raw Input JSON"):
            try:
                st.json(step["raw_input_json"])
            except Exception:
                import json as _json

                st.code(_json.dumps(step["raw_input_json"], indent=2))

    if step.get("raw_output_json"):
        with st.expander("Raw Output JSON"):
            try:
                st.json(step["raw_output_json"])
            except Exception:
                import json as _json

                st.code(_json.dumps(step["raw_output_json"], indent=2))
