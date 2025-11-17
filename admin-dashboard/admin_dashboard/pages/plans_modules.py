"""Plans & Modules page for the admin dashboard Streamlit app."""

import streamlit as st
from supabase import Client

from ..supabase_utils import clear_cache, get_module_types, get_subscription_plans, safe_query


def render_plans_modules_page(supabase: Client) -> None:
    """Render plans and modules management page."""
    st.title("📦 Plans & Modules")

    col1, col2 = st.columns([6, 1])
    with col2:
        if st.button("🔄 Refresh Data"):
            clear_cache()
            st.rerun()

    tabs = st.tabs(["Module Types", "Subscription Plans"])

    with tabs[0]:
        render_module_types_management(supabase)

    with tabs[1]:
        render_subscription_plans_management(supabase)


def render_module_types_management(supabase: Client) -> None:
    """Render module types CRUD interface."""
    st.subheader("Module Types")

    module_types = get_module_types(supabase)

    # Display existing modules
    if module_types:
        st.write("Existing modules:")

        for module in module_types:
            with st.expander(
                f"**{module['display_name']}** (`{module['code']}`)", expanded=False
            ):
                with st.form(f"edit_module_{module['id']}"):
                    code = st.text_input(
                        "Code", value=module["code"], disabled=True  # noqa: F841
                    )
                    display_name = st.text_input(
                        "Display Name", value=module["display_name"]
                    )
                    description = st.text_area(
                        "Description", value=module.get("description", "")
                    )

                    col1, col2 = st.columns(2)

                    with col1:
                        update = st.form_submit_button("💾 Update")

                    with col2:
                        delete = st.form_submit_button(
                            "🗑️ Delete", type="secondary"
                        )

                    if update:
                        update_data = {
                            "display_name": display_name,
                            "description": description,
                        }

                        result = safe_query(
                            lambda: supabase.table("module_types")
                            .update(update_data)
                            .eq("id", module["id"])
                            .execute(),
                            "Failed to update module type",
                        )

                        if result:
                            st.success("✅ Module updated")
                            clear_cache()
                            st.rerun()

                    if delete:
                        # Check if in use
                        usage_check = safe_query(
                            lambda: supabase.table("business_modules")
                            .select("id", count="exact")
                            .eq("module_code", module["code"])
                            .execute()
                        )

                        if usage_check and usage_check.count > 0:
                            st.error(
                                "⚠️ Cannot delete: module is in use by "
                                f"{usage_check.count} business(es)"
                            )
                        else:
                            result = safe_query(
                                lambda: supabase.table("module_types")
                                .delete()
                                .eq("id", module["id"])
                                .execute(),
                                "Failed to delete module type",
                            )

                            if result:
                                st.success("✅ Module deleted")
                                clear_cache()
                                st.rerun()
    else:
        st.info("No module types found")

    # Create new module
    st.markdown("---")
    st.subheader("Create New Module Type")

    with st.form("new_module_type"):
        col1, col2 = st.columns(2)

        with col1:
            new_code = st.text_input("Code* (e.g., 'grocery_automation')")
            new_display_name = st.text_input(
                "Display Name* (e.g., 'Grocery Automation')"
            )

        with col2:
            new_description = st.text_area("Description")

        submit = st.form_submit_button("➕ Create Module Type")

        if submit:
            if not new_code or not new_display_name:
                st.error("Code and display name are required")
            else:
                new_module = {
                    "code": new_code,
                    "display_name": new_display_name,
                    "description": new_description,
                }

                result = safe_query(
                    lambda: supabase.table("module_types")
                    .insert(new_module)
                    .execute(),
                    "Failed to create module type",
                )

                if result:
                    st.success("✅ Module type created")
                    clear_cache()
                    st.rerun()


def render_subscription_plans_management(supabase: Client) -> None:
    """Render subscription plans CRUD interface."""
    st.subheader("Subscription Plans")

    plans = get_subscription_plans(supabase)
    module_types = get_module_types(supabase)
    module_codes = [m["code"] for m in module_types]

    # Display existing plans
    if plans:
        st.write("Existing plans:")

        for plan in plans:
            with st.expander(
                f"**{plan['name']}** (`{plan['code']}`)", expanded=False
            ):
                with st.form(f"edit_plan_{plan['id']}"):
                    code = st.text_input(  # noqa: F841
                        "Code", value=plan["code"], disabled=True
                    )
                    name = st.text_input("Name", value=plan["name"])
                    description = st.text_area(
                        "Description", value=plan.get("description", "")
                    )

                    current_modules = plan.get("allowed_modules", [])
                    allowed_modules = st.multiselect(
                        "Allowed Modules",
                        options=module_codes,
                        default=current_modules,
                    )

                    col1, col2 = st.columns(2)

                    with col1:
                        update = st.form_submit_button("💾 Update")

                    with col2:
                        delete = st.form_submit_button(
                            "🗑️ Delete", type="secondary"
                        )

                    if update:
                        update_data = {
                            "name": name,
                            "description": description,
                            "allowed_modules": allowed_modules,
                        }

                        result = safe_query(
                            lambda: supabase.table("subscription_plans")
                            .update(update_data)
                            .eq("id", plan["id"])
                            .execute(),
                            "Failed to update plan",
                        )

                        if result:
                            st.success("✅ Plan updated")
                            clear_cache()
                            st.rerun()

                    if delete:
                        # Check if in use
                        usage_check = safe_query(
                            lambda: supabase.table("business_subscriptions")
                            .select("id", count="exact")
                            .eq("plan_code", plan["code"])
                            .execute()
                        )

                        if usage_check and usage_check.count > 0:
                            st.error(
                                "⚠️ Cannot delete: plan is in use by "
                                f"{usage_check.count} subscription(s)"
                            )
                        else:
                            result = safe_query(
                                lambda: supabase.table("subscription_plans")
                                .delete()
                                .eq("id", plan["id"])
                                .execute(),
                                "Failed to delete plan",
                            )

                            if result:
                                st.success("✅ Plan deleted")
                                clear_cache()
                                st.rerun()
    else:
        st.info("No subscription plans found")

    # Create new plan
    st.markdown("---")
    st.subheader("Create New Subscription Plan")

    with st.form("new_subscription_plan"):
        col1, col2 = st.columns(2)

        with col1:
            new_code = st.text_input("Code* (e.g., 'basic', 'pro')")
            new_name = st.text_input("Name* (e.g., 'Basic Plan')")

        with col2:
            new_description = st.text_area("Description")

        new_allowed_modules = st.multiselect(
            "Allowed Modules", options=module_codes
        )

        submit = st.form_submit_button("➕ Create Plan")

        if submit:
            if not new_code or not new_name:
                st.error("Code and name are required")
            else:
                new_plan = {
                    "code": new_code,
                    "name": new_name,
                    "description": new_description,
                    "allowed_modules": new_allowed_modules,
                }

                result = safe_query(
                    lambda: supabase.table("subscription_plans")
                    .insert(new_plan)
                    .execute(),
                    "Failed to create plan",
                )

                if result:
                    st.success("✅ Plan created")
                    clear_cache()
                    st.rerun()
