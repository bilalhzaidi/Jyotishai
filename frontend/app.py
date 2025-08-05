"""Streamlit frontend for JyotishAI.

Run this app with `streamlit run app.py`.  It provides a simple user
interface to collect birth details, select diagnostic modules and
display results from the FastAPI backend.
"""

from __future__ import annotations

import json
import os
from typing import List

import streamlit as st
import requests


# List of available modules.  These strings must match the values in
# models.schemas.ModuleName on the backend.
MODULE_OPTIONS = [
    "Personality",
    "Career",
    "Education",
    "Marriage",
    "Sexuality",
    "Body type",
    "Karma & Soul Path",
    "Foreign Travel",
    "Spirituality",
    "Ashtakavarga",
    "Dasha/Transit",
    "Psychological Vulnerability",
]


def build_request_payload(
    name: str,
    birth_date: str,
    birth_time: str,
    location: str,
    utc_offset: float,
    selected_modules: List[str],
) -> dict:
    return {
        "name": name,
        "birth_date": birth_date,
        "birth_time": birth_time,
        "location": location,
        "utc_offset": utc_offset,
        "modules": selected_modules,
    }


def call_api(payload: dict, fmt: str) -> dict:
    base_url = os.getenv("JYOTISHAI_API_URL", "http://localhost:8000")
    try:
        resp = requests.post(f"{base_url}/analyze", params={"format": fmt}, json=payload, timeout=30)
        resp.raise_for_status()
        return resp.json()
    except Exception as exc:
        st.error(f"API request failed: {exc}")
        return {}


def main():
    st.set_page_config(page_title="JyotishAI", layout="centered")
    st.title("JyotishAI – Vedic Astrology Diagnostics")
    st.write("Enter birth details and select one or more diagnostic modules to generate an astrological report.")

    # Built‑in test chart convenience
    use_test = st.checkbox("Use built‑in test chart (Bilal Zaidi, 10 Aug 1970 00:20 AM UTC+5)")

    if use_test:
        name = "Bilal Zaidi"
        date_input = st.date_input("Birth date", value=None, disabled=True)
        time_input = st.time_input("Birth time", value=None, disabled=True)
        # We still need to supply date/time for streamlit; but will override below
    
        location = st.text_input("Location", value="Mardan, Pakistan", disabled=True)
        utc_offset = st.number_input("UTC offset", value=5.0, step=0.5, disabled=True)
        selected = st.multiselect("Modules", MODULE_OPTIONS, default=MODULE_OPTIONS)
        # Hardcode date/time for test
        birth_date = "1970-08-10"
        birth_time = "00:20"
        name_field = name
    else:
        name_field = st.text_input("Name")
        date_input = st.date_input("Birth date")
        time_input = st.time_input("Birth time")
        location = st.text_input("Location (City, Country or coordinates)")
        utc_offset = st.number_input("UTC offset (e.g. +5.0)", value=0.0, step=0.5)
        selected = st.multiselect("Modules", MODULE_OPTIONS, default=[])
        birth_date = date_input.strftime("%Y-%m-%d") if date_input else ""
        birth_time = time_input.strftime("%H:%M") if time_input else ""

    fmt = st.selectbox("Report format", options=["json", "docx", "pdf"], index=0)

    if st.button("Analyze"):
        if not name_field or not birth_date or not birth_time or not location:
            st.warning("Please complete all required fields.")
        else:
            payload = build_request_payload(
                name_field,
                birth_date,
                birth_time,
                location,
                utc_offset,
                selected,
            )
            with st.spinner("Analyzing chart..."):
                response = call_api(payload, fmt)
            if response:
                st.success("Analysis complete.")
                # Display results
                results = response.get("results", [])
                for res in results:
                    st.subheader(res.get("module"))
                    st.write(res.get("analysis"))
                # Provide download link if report path available
                report_path = response.get("report_path")
                if report_path:
                    try:
                        with open(report_path, "rb") as f:
                            data = f.read()
                        file_ext = "docx" if fmt == "docx" else "pdf"
                        st.download_button(
                            label=f"Download {file_ext.upper()} Report",
                            data=data,
                            file_name=os.path.basename(report_path),
                            mime="application/vnd.openxmlformats-officedocument.wordprocessingml.document"
                            if file_ext == "docx" else "application/pdf",
                        )
                    except FileNotFoundError:
                        st.error("Report file not found on server.")


if __name__ == "__main__":
    main()