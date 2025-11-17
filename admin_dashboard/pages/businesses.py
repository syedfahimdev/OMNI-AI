"""Businesses page for the admin dashboard Streamlit app."""

import json
from typing import Dict, List

import pandas as pd
import streamlit as st
from supabase import Client

from ..supabase_utils import (
    clear_cache,
    format_datetime,
    format_duration,
    get_module_types,
    get_subscription_plans,
    safe_query,
)


def render_businesses_page(supabase: Client) -> None:
    """Render the businesses management page."""
    st.title("🏢 Businesses")

    # Tabs for different views
    tab1, tab2 = st.tabs(["Business List", "New Business"])

    with tab1:
        render_business_list(supabase)

    with tab2:
        render_new_business_form(supabase)


def render_business_list(supabase: Client) -> None:
    """Render searchable, filterable list of businesses."""
    st.subheader("Business List")

    # Filters
    col1, col2, col3 = st.columns(3)

    with col1:
        search_name = st.text_input("Search by name/slug", key="biz_search")
    with col2:
        filter_city = st.text_input("Filter by city", key="biz_city")
    with col3:
        filter_industry = st.text_input("Filter by industry", key="biz_industry")

    filter_active = st.checkbox("Active only", value=False, key="biz_active")

    # Fetch businesses with filters
    query = supabase.table("businesses").select("*")

    if search_name:
        query = query.or_(f"name.ilike.%{search_name}%,slug.ilike.%{search_name}%")
    if filter_city:
        query = query.ilike("city", f"%{filter_city}%")
    if filter_industry:
        query = query.ilike("industry", f"%{filter_industry}%")
    if filter_active:
        query = query.eq("is_active", True)

    result = safe_query(lambda: query.order("created_at", desc=True).execute())

    if result and result.data:
        businesses = result.data

        # Display as table with selection
        df = pd.DataFrame(businesses)

        display_columns = [
            "name",
            "slug",
            "industry",
            "city",
            "whatsapp_number",
            "is_active",
            "created_at",
        ]
        available_columns = [col for col in display_columns if col in df.columns]

        display_df = df[available_columns].copy()
        display_df["created_at"] = display_df["created_at"].apply(format_datetime)

        st.dataframe(display_df, use_container_width=True, hide_index=True)

        # Business detail view
        st.markdown("---")
        st.subheader("Business Details")

        business_options = {f"{b['name']} ({b['slug']})": b["id"] for b in businesses}
        selected_business_label = st.selectbox(
            "Select business to view/edit", options=list(business_options.keys())
        )

        if selected_business_label:
            selected_business_id = business_options[selected_business_label]
            selected_business = next(
                b for b in businesses if b["id"] == selected_business_id
            )

            render_business_detail(supabase, selected_business)
    else:
        st.info("No businesses found")


def render_business_detail(supabase: Client, business: Dict) -> None:
    """Render detailed view and editor for a single business."""
    business_id = business["id"]

    # Tabs for different sections
    tabs = st.tabs(["Basic Info", "Channels", "Subscription", "Modules"])

    # TAB: Basic Info
    with tabs[0]:
        with st.form(f"business_form_{business_id}"):
            st.subheader("Edit Business Information")

            col1, col2 = st.columns(2)

            with col1:
                name = st.text_input("Name*", value=business.get("name", ""))
                legal_name = st.text_input(
                    "Legal Name", value=business.get("legal_name", "")
                )
                slug = st.text_input("Slug*", value=business.get("slug", ""))
                industry = st.text_input(
                    "Industry", value=business.get("industry", "")
                )
                country = st.text_input(
                    "Country", value=business.get("country", "")
                )
                city = st.text_input("City", value=business.get("city", ""))

            with col2:
                area = st.text_input("Area", value=business.get("area", ""))
                address = st.text_area("Address", value=business.get("address", ""))
                whatsapp_number = st.text_input(
                    "WhatsApp", value=business.get("whatsapp_number", "")
                )
                phone = st.text_input("Phone", value=business.get("phone", ""))
                email = st.text_input("Email", value=business.get("email", ""))
                website = st.text_input(
                    "Website", value=business.get("website", "")
                )

            is_active = st.checkbox("Active", value=business.get("is_active", True))

            submit = st.form_submit_button("💾 Save Changes")

            if submit:
                if not name or not slug:
                    st.error("Name and slug are required")
                else:
                    update_data = {
                        "name": name,
                        "legal_name": legal_name,
                        "slug": slug,
                        "industry": industry,
                        "country": country,
                        "city": city,
                        "area": area,
                        "address": address,
                        "whatsapp_number": whatsapp_number,
                        "phone": phone,
                        "email": email,
                        "website": website,
                        "is_active": is_active,
                    }

                    result = safe_query(
                        lambda: supabase.table("businesses")
                        .update(update_data)
                        .eq("id", business_id)
                        .execute(),
                        "Failed to update business",
                    )

                    if result:
                        st.success("✅ Business updated successfully")
                        st.rerun()

    # TAB: Channels
    with tabs[1]:
        render_business_channels(supabase, business_id)

    # TAB: Subscription
    with tabs[2]:
        render_business_subscription(supabase, business_id)

    # TAB: Modules
    with tabs[3]:
        render_business_modules(supabase, business_id)


def render_business_channels(supabase: Client, business_id: str) -> None:
    """Render business channels management."""
    st.subheader("Channels")

    # Fetch channels
    result = safe_query(
        lambda: supabase.table("business_channels")
        .select("*")
        .eq("business_id", business_id)
        .execute()
    )

    channels = result.data if result else []

    if channels:
        df = pd.DataFrame(channels)
        display_df = df[
            [
                "channel_type",
                "identifier",
                "provider",
                "is_primary",
                "is_active",
            ]
        ]
        st.dataframe(display_df, use_container_width=True, hide_index=True)
    else:
        st.info("No channels configured")

    # Add new channel
    st.markdown("---")
    st.subheader("Add New Channel")

    with st.form(f"new_channel_{business_id}"):
        col1, col2 = st.columns(2)

        with col1:
            channel_type = st.selectbox(
                "Channel Type", ["whatsapp", "sms", "email", "voice"]
            )
            identifier = st.text_input("Identifier (phone/email)")

        with col2:
            provider = st.text_input("Provider", value="twilio")
            is_primary = st.checkbox("Primary Channel")

        submit = st.form_submit_button("Add Channel")

        if submit:
            if not identifier:
                st.error("Identifier is required")
            else:
                new_channel = {
                    "business_id": business_id,
                    "channel_type": channel_type,
                    "identifier": identifier,
                    "provider": provider,
                    "is_primary": is_primary,
                    "is_active": True,
                }

                result = safe_query(
                    lambda: supabase.table("business_channels")
                    .insert(new_channel)
                    .execute(),
                    "Failed to add channel",
                )

                if result:
                    st.success("✅ Channel added successfully")
                    st.rerun()


def render_business_subscription(supabase: Client, business_id: str) -> None:
    """Render business subscription management."""
    from datetime import datetime, timedelta

    st.subheader("Subscription")

    # Fetch current subscription
    result = safe_query(
        lambda: supabase.table("business_subscriptions")
        .select("*")
        .eq("business_id", business_id)
        .order("valid_from", desc=True)
        .limit(1)
        .execute()
    )

    current_sub = result.data[0] if result and result.data else None

    # Get available plans
    plans = get_subscription_plans(supabase)
    plan_codes = [p["code"] for p in plans]

    with st.form(f"subscription_form_{business_id}"):
        if current_sub:
            st.info(f"Current Plan: {current_sub.get('plan_code', 'None')}")

        col1, col2 = st.columns(2)

        with col1:
            plan_code = st.selectbox(
                "Plan",
                options=plan_codes,
                index=plan_codes.index(current_sub["plan_code"])
                if current_sub and current_sub.get("plan_code") in plan_codes
                else 0,
            )
            status = st.selectbox(
                "Status",
                ["active", "trial", "past_due", "cancelled"],
                index=["active", "trial", "past_due", "cancelled"].index(
                    current_sub.get("status", "active")
                )
                if current_sub
                else 0,
            )

        with col2:
            valid_from = st.date_input(
                "Valid From",
                value=datetime.fromisoformat(
                    current_sub["valid_from"].replace("Z", "+00:00")
                ).date()
                if current_sub and current_sub.get("valid_from")
                else datetime.now().date(),
            )
            valid_to = st.date_input(
                "Valid To",
                value=datetime.fromisoformat(
                    current_sub["valid_to"].replace("Z", "+00:00")
                ).date()
                if current_sub and current_sub.get("valid_to")
                else (datetime.now() + timedelta(days=365)).date(),
            )

        submit = st.form_submit_button("💾 Save Subscription")

        if submit:
            sub_data = {
                "business_id": business_id,
                "plan_code": plan_code,
                "status": status,
                "valid_from": valid_from.isoformat(),
                "valid_to": valid_to.isoformat(),
            }

            if current_sub:
                # Update existing
                result = safe_query(
                    lambda: supabase.table("business_subscriptions")
                    .update(sub_data)
                    .eq("id", current_sub["id"])
                    .execute(),
                    "Failed to update subscription",
                )
            else:
                # Create new
                result = safe_query(
                    lambda: supabase.table("business_subscriptions")
                    .insert(sub_data)
                    .execute(),
                    "Failed to create subscription",
                )

            if result:
                st.success("✅ Subscription saved successfully")
                st.rerun()


def render_business_modules(supabase: Client, business_id: str) -> None:
    """Render business modules assignment interface."""
    st.subheader("Modules")

    # Get all module types
    module_types = get_module_types(supabase)

    # Get business modules
    result = safe_query(
        lambda: supabase.table("business_modules")
        .select("*")
        .eq("business_id", business_id)
        .execute()
    )

    business_modules = result.data if result else []
    business_module_map = {bm["module_code"]: bm for bm in business_modules}

    st.write("Enable/disable modules for this business:")

    for module in module_types:
        module_code = module["code"]
        is_enabled = (
            module_code in business_module_map
            and business_module_map[module_code].get("is_active", False)
        )

        col1, col2 = st.columns([3, 1])

        with col1:
            st.markdown(f"**{module['display_name']}** (`{module_code}`)")
            st.caption(module.get("description", ""))

        with col2:
            new_state = st.checkbox(
                "Enabled",
                value=is_enabled,
                key=f"module_{business_id}_{module_code}",
            )

            # Handle state change
            if new_state != is_enabled:
                if module_code in business_module_map:
                    # Update existing
                    safe_query(
                        lambda: supabase.table("business_modules")
                        .update({"is_active": new_state})
                        .eq("id", business_module_map[module_code]["id"])
                        .execute(),
                        f"Failed to update module {module_code}",
                    )
                else:
                    # Create new
                    safe_query(
                        lambda: supabase.table("business_modules")
                        .insert(
                            {
                                "business_id": business_id,
                                "module_code": module_code,
                                "is_active": new_state,
                                "config": {},
                            }
                        )
                        .execute(),
                        f"Failed to enable module {module_code}",
                    )

        # Config editor for enabled modules
        if module_code in business_module_map:
            with st.expander(f"⚙️ Configure {module['display_name']}"):
                current_config = business_module_map[module_code].get("config", {})
                config_json = json.dumps(current_config, indent=2)

                new_config_json = st.text_area(
                    "Module Config (JSON)",
                    value=config_json,
                    height=150,
                    key=f"config_{business_id}_{module_code}",
                )

                if st.button(
                    "Save Config", key=f"save_config_{business_id}_{module_code}"
                ):
                    try:
                        new_config = json.loads(new_config_json)

                        safe_query(
                            lambda: supabase.table("business_modules")
                            .update({"config": new_config})
                            .eq("id", business_module_map[module_code]["id"])
                            .execute(),
                            f"Failed to update config for {module_code}",
                        )

                        st.success("✅ Config saved")
                        st.rerun()
                    except json.JSONDecodeError:
                        st.error("Invalid JSON format")

        st.markdown("---")


def render_new_business_form(supabase: Client) -> None:
    """Render form to create a new business."""
    st.subheader("Create New Business")

    with st.form("new_business_form"):
        col1, col2 = st.columns(2)

        with col1:
            name = st.text_input("Name*")
            legal_name = st.text_input("Legal Name")
            slug = st.text_input("Slug*")
            industry = st.text_input("Industry")
            country = st.text_input("Country", value="Pakistan")
            city = st.text_input("City")

        with col2:
            area = st.text_input("Area")
            address = st.text_area("Address")
            whatsapp_number = st.text_input("WhatsApp Number")
            phone = st.text_input("Phone")
            email = st.text_input("Email")
            website = st.text_input("Website")

        is_active = st.checkbox("Active", value=True)

        submit = st.form_submit_button("➕ Create Business")

        if submit:
            if not name or not slug:
                st.error("Name and slug are required")
            else:
                new_business = {
                    "name": name,
                    "legal_name": legal_name,
                    "slug": slug,
                    "industry": industry,
                    "country": country,
                    "city": city,
                    "area": area,
                    "address": address,
                    "whatsapp_number": whatsapp_number,
                    "phone": phone,
                    "email": email,
                    "website": website,
                    "is_active": is_active,
                }

                result = safe_query(
                    lambda: supabase.table("businesses")
                    .insert(new_business)
                    .execute(),
                    "Failed to create business",
                )

                if result:
                    st.success("✅ Business created successfully")
                    clear_cache()
                    st.rerun()
