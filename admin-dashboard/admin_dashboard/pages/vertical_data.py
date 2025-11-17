"""Vertical Data (Grocery) page for the admin dashboard Streamlit app."""

from datetime import datetime, timedelta
from typing import Dict

import pandas as pd
import streamlit as st
from supabase import Client

from ..supabase_utils import format_datetime, safe_query


def render_vertical_data_page(supabase: Client) -> None:
    """Render vertical-specific data management page."""
    st.title("🛒 Vertical Data")

    st.info(
        "💡 This section manages vertical-specific data. Currently supporting Grocery "
        "module. Future verticals (clinic, salon, etc.) will be added here using the "
        "same pattern."
    )

    # Business selector
    businesses_result = safe_query(
        lambda: supabase.table("businesses").select("id, name").execute()
    )
    businesses = businesses_result.data if businesses_result else []
    business_options: Dict[str, str] = {b["name"]: b["id"] for b in businesses}

    selected_business_name = st.selectbox(
        "Select Business",
        options=list(business_options.keys()),
        key="vertical_business",
    )

    if not selected_business_name:
        st.warning("Please select a business")
        return

    selected_business_id = business_options[selected_business_name]

    st.markdown("---")

    # Tabs for different vertical data
    tabs = st.tabs(["Products", "Suppliers", "Low Stock Events", "Credit Ledger"])

    with tabs[0]:
        render_products_tab(supabase, selected_business_id)

    with tabs[1]:
        render_suppliers_tab(supabase, selected_business_id)

    with tabs[2]:
        render_low_stock_events_tab(supabase, selected_business_id)

    with tabs[3]:
        render_credit_ledger_tab(supabase, selected_business_id)


def render_products_tab(supabase: Client, business_id: str) -> None:
    """Render products management for grocery vertical."""
    st.subheader("Products")

    # Fetch products
    result = safe_query(
        lambda: supabase.table("products")
        .select("*")
        .eq("business_id", business_id)
        .execute()
    )

    products = result.data if result else []

    if products:
        # Get supplier names
        supplier_ids = [p.get("supplier_id") for p in products if p.get("supplier_id")]
        suppliers_result = (
            safe_query(
                lambda: supabase.table("suppliers")
                .select("id, name")
                .in_("id", supplier_ids)
                .execute()
            )
            if supplier_ids
            else None
        )

        supplier_map = (
            {s["id"]: s["name"] for s in suppliers_result.data}
            if suppliers_result
            else {}
        )

        df = pd.DataFrame(products)
        if "supplier_id" in df.columns:
            df["supplier_name"] = df["supplier_id"].map(supplier_map)

        display_columns = [
            "name",
            "sku",
            "supplier_name",
            "is_perishable",
            "default_pack_size",
            "min_stock_level",
            "is_active",
        ]
        available_columns = [col for col in display_columns if col in df.columns]

        if available_columns:
            st.dataframe(
                df[available_columns], use_container_width=True, hide_index=True
            )

        # Edit product
        st.markdown("---")
        product_options: Dict[str, str] = {
            f"{p['name']} ({p.get('sku', 'no-sku')})": p["id"] for p in products
        }
        selected_product = st.selectbox(
            "Edit Product",
            options=[""] + list(product_options.keys()),
            key="edit_product",
        )

        if selected_product:
            product_id = product_options[selected_product]
            product = next(p for p in products if p["id"] == product_id)

            with st.form(f"edit_product_{product_id}"):
                col1, col2 = st.columns(2)

                with col1:
                    name = st.text_input("Name", value=product.get("name", ""))
                    sku = st.text_input("SKU", value=product.get("sku", ""))
                    is_perishable = st.checkbox(
                        "Perishable", value=product.get("is_perishable", False)
                    )

                with col2:
                    default_pack_size = st.number_input(
                        "Default Pack Size",
                        value=float(product.get("default_pack_size", 1.0)),
                    )
                    min_stock_level = st.number_input(
                        "Min Stock Level",
                        value=float(product.get("min_stock_level", 0.0)),
                    )
                    is_active = st.checkbox(
                        "Active", value=product.get("is_active", True)
                    )

                submit = st.form_submit_button("💾 Update Product")

                if submit:
                    update_data = {
                        "name": name,
                        "sku": sku,
                        "is_perishable": is_perishable,
                        "default_pack_size": default_pack_size,
                        "min_stock_level": min_stock_level,
                        "is_active": is_active,
                    }

                    result = safe_query(
                        lambda: supabase.table("products")
                        .update(update_data)
                        .eq("id", product_id)
                        .execute(),
                        "Failed to update product",
                    )

                    if result:
                        st.success("✅ Product updated")
                        st.rerun()
    else:
        st.info("No products found for this business")

    # Create new product
    st.markdown("---")
    st.subheader("Create New Product")

    # Get suppliers for dropdown
    suppliers_result = safe_query(
        lambda: supabase.table("suppliers")
        .select("id, name")
        .eq("business_id", business_id)
        .execute()
    )
    suppliers = suppliers_result.data if suppliers_result else []
    supplier_options: Dict[str, str] = {s["name"]: s["id"] for s in suppliers}

    with st.form("new_product"):
        col1, col2 = st.columns(2)

        with col1:
            new_name = st.text_input("Name*")
            new_sku = st.text_input("SKU")
            new_supplier = st.selectbox(
                "Supplier", options=[""] + list(supplier_options.keys())
            )
            new_is_perishable = st.checkbox("Perishable")

        with col2:
            new_default_pack_size = st.number_input("Default Pack Size", value=1.0)
            new_min_stock_level = st.number_input("Min Stock Level", value=0.0)
            new_is_active = st.checkbox("Active", value=True)

        submit = st.form_submit_button("➕ Create Product")

        if submit:
            if not new_name:
                st.error("Name is required")
            else:
                new_product = {
                    "business_id": business_id,
                    "name": new_name,
                    "sku": new_sku,
                    "supplier_id": supplier_options.get(new_supplier),
                    "is_perishable": new_is_perishable,
                    "default_pack_size": new_default_pack_size,
                    "min_stock_level": new_min_stock_level,
                    "is_active": new_is_active,
                }

                result = safe_query(
                    lambda: supabase.table("products")
                    .insert(new_product)
                    .execute(),
                    "Failed to create product",
                )

                if result:
                    st.success("✅ Product created")
                    st.rerun()


def render_suppliers_tab(supabase: Client, business_id: str) -> None:
    """Render suppliers management for grocery vertical."""
    st.subheader("Suppliers")

    # Fetch suppliers
    result = safe_query(
        lambda: supabase.table("suppliers")
        .select("*")
        .eq("business_id", business_id)
        .execute()
    )

    suppliers = result.data if result else []

    if suppliers:
        df = pd.DataFrame(suppliers)
        display_columns = ["name", "phone", "whatsapp_number", "email", "address"]
        available_columns = [col for col in display_columns if col in df.columns]

        if available_columns:
            st.dataframe(
                df[available_columns], use_container_width=True, hide_index=True
            )

        # Edit supplier
        st.markdown("---")
        supplier_options: Dict[str, str] = {s["name"]: s["id"] for s in suppliers}
        selected_supplier = st.selectbox(
            "Edit Supplier",
            options=[""] + list(supplier_options.keys()),
            key="edit_supplier",
        )

        if selected_supplier:
            supplier_id = supplier_options[selected_supplier]
            supplier = next(s for s in suppliers if s["id"] == supplier_id)

            with st.form(f"edit_supplier_{supplier_id}"):
                col1, col2 = st.columns(2)

                with col1:
                    name = st.text_input("Name", value=supplier.get("name", ""))
                    phone = st.text_input("Phone", value=supplier.get("phone", ""))
                    whatsapp = st.text_input(
                        "WhatsApp", value=supplier.get("whatsapp_number", "")
                    )

                with col2:
                    email = st.text_input("Email", value=supplier.get("email", ""))
                    address = st.text_area(
                        "Address", value=supplier.get("address", "")
                    )

                notes = st.text_area("Notes", value=supplier.get("notes", ""))

                submit = st.form_submit_button("💾 Update Supplier")

                if submit:
                    update_data = {
                        "name": name,
                        "phone": phone,
                        "whatsapp_number": whatsapp,
                        "email": email,
                        "address": address,
                        "notes": notes,
                    }

                    result = safe_query(
                        lambda: supabase.table("suppliers")
                        .update(update_data)
                        .eq("id", supplier_id)
                        .execute(),
                        "Failed to update supplier",
                    )

                    if result:
                        st.success("✅ Supplier updated")
                        st.rerun()
    else:
        st.info("No suppliers found for this business")

    # Create new supplier
    st.markdown("---")
    st.subheader("Create New Supplier")

    with st.form("new_supplier"):
        col1, col2 = st.columns(2)

        with col1:
            new_name = st.text_input("Name*")
            new_phone = st.text_input("Phone")
            new_whatsapp = st.text_input("WhatsApp Number")

        with col2:
            new_email = st.text_input("Email")
            new_address = st.text_area("Address")

        new_notes = st.text_area("Notes")

        submit = st.form_submit_button("➕ Create Supplier")

        if submit:
            if not new_name:
                st.error("Name is required")
            else:
                new_supplier = {
                    "business_id": business_id,
                    "name": new_name,
                    "phone": new_phone,
                    "whatsapp_number": new_whatsapp,
                    "email": new_email,
                    "address": new_address,
                    "notes": new_notes,
                }

                result = safe_query(
                    lambda: supabase.table("suppliers")
                    .insert(new_supplier)
                    .execute(),
                    "Failed to create supplier",
                )

                if result:
                    st.success("✅ Supplier created")
                    st.rerun()


def render_low_stock_events_tab(supabase: Client, business_id: str) -> None:
    """Render low stock events (read-only) for grocery vertical."""
    st.subheader("Low Stock Events")

    # Filters
    col1, col2 = st.columns(2)

    with col1:
        date_range = st.date_input(
            "Date Range",
            value=(datetime.now() - timedelta(days=30), datetime.now()),
            key="low_stock_date",
        )

    # Fetch events
    query = (
        supabase.table("low_stock_events")
        .select("*")
        .eq("business_id", business_id)
    )

    if date_range and len(date_range) == 2:
        query = query.gte("created_at", date_range[0].isoformat())
        query = query.lte(
            "created_at", (date_range[1] + timedelta(days=1)).isoformat()
        )

    result = safe_query(lambda: query.order("created_at", desc=True).limit(100).execute())

    if result and result.data:
        events = result.data

        # Get product names
        product_ids = [e.get("product_id") for e in events if e.get("product_id")]
        products_result = (
            safe_query(
                lambda: supabase.table("products")
                .select("id, name")
                .in_("id", product_ids)
                .execute()
            )
            if product_ids
            else None
        )

        product_map = (
            {p["id"]: p["name"] for p in products_result.data}
            if products_result
            else {}
        )

        df = pd.DataFrame(events)
        df["product_name"] = df["product_id"].map(product_map)
        df["created_at_fmt"] = df["created_at"].apply(format_datetime)

        display_columns = [
            "product_name",
            "current_stock",
            "min_stock_level",
            "contact_phone",
            "created_at_fmt",
        ]
        available_columns = [col for col in display_columns if col in df.columns]

        if available_columns:
            display_df = df[available_columns].copy()

            # Rename only the columns that are actually present to avoid length mismatches.
            friendly_names = {
                "product_name": "Product",
                "current_stock": "Current Stock",
                "min_stock_level": "Min Level",
                "contact_phone": "Contact",
                "created_at_fmt": "Created At",
            }
            display_df = display_df.rename(
                columns={c: friendly_names.get(c, c) for c in available_columns}
            )

            st.dataframe(display_df, use_container_width=True, hide_index=True)
    else:
        st.info("No low stock events found")


def render_credit_ledger_tab(supabase: Client, business_id: str) -> None:
    """Render credit ledger for grocery vertical."""
    st.subheader("Credit Ledger (Udhaar)")

    # Fetch ledger entries (do not assume presence of a specific date column)
    result = safe_query(
        lambda: supabase.table("credit_ledger")
        .select("*")
        .eq("business_id", business_id)
        .execute()
    )

    if result and result.data:
        entries = result.data

        # Calculate totals by contact
        df = pd.DataFrame(entries)

        if "contact_id" in df.columns and "amount" in df.columns:
            contact_totals = df.groupby("contact_id")["amount"].sum().reset_index()
            contact_totals.columns = ["contact_id", "total_udhaar"]

            # Get contact names
            contact_ids = contact_totals["contact_id"].unique().tolist()
            contacts_result = safe_query(
                lambda: supabase.table("contacts")
                .select("id, name, phone")
                .in_("id", contact_ids)
                .execute()
            )

            if contacts_result:
                contact_map = {
                    c["id"]: f"{c.get('name', 'Unknown')} ({c.get('phone', '')})"
                    for c in contacts_result.data
                }
                contact_totals["contact_name"] = contact_totals["contact_id"].map(
                    contact_map
                )

                st.subheader("Total Udhaar by Contact")
                display_df = contact_totals[["contact_name", "total_udhaar"]].copy()
                display_df = display_df.rename(
                    columns={"contact_name": "Contact", "total_udhaar": "Total Udhaar"}
                )
                st.dataframe(display_df, use_container_width=True, hide_index=True)

        st.markdown("---")

        # All entries
        st.subheader("All Ledger Entries")

        # Try to compute a human-friendly date column if a raw date exists.
        date_source_col = None
        for candidate in ("transaction_date", "created_at"):
            if candidate in df.columns:
                date_source_col = candidate
                break

        if date_source_col is not None:
            df["transaction_date_fmt"] = df[date_source_col].apply(format_datetime)

        display_columns = [
            "contact_id",
            "amount",
            "transaction_type",
            "transaction_date_fmt",
            "notes",
        ]
        available_columns = [col for col in display_columns if col in df.columns]

        if available_columns:
            display_df = df[available_columns].copy()
            st.dataframe(display_df, use_container_width=True, hide_index=True)
    else:
        st.info("No credit ledger entries found")
