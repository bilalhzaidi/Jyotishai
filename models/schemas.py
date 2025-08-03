"""Pydantic models for JyotishAI requests and responses."""

from __future__ import annotations

from enum import Enum
from typing import List, Optional

from pydantic import BaseModel, Field


class ModuleName(str, Enum):
    PERSONALITY = "Personality"
    CAREER = "Career"
    EDUCATION = "Education"
    MARRIAGE = "Marriage"
    SEXUALITY = "Sexuality"
    BODY_TYPE = "Body type"
    KARMA_SOUL_PATH = "Karma & Soul Path"
    FOREIGN_TRAVEL = "Foreign Travel"
    SPIRITUALITY = "Spirituality"
    ASHTAKAVARGA = "Ashtakavarga"
    DASHA_TRANSIT = "Dasha/Transit"
    PSYCHOLOGICAL = "Psychological Vulnerability"
    HEALTH = "Health"
    CHRONIC = "Chronic Disease Indicators"
    COMPATIBILITY = "Compatibility"


class ChartRequest(BaseModel):
    """Request body for chart analysis."""

    name: str = Field(..., description="Full name of the person")
    birth_date: str = Field(
        ..., description="Birth date in ISO format (YYYY-MM-DD)"
    )
    birth_time: str = Field(
        ..., description="Birth time in 24h format (HH:MM or HH:MM:SS)"
    )
    location: str = Field(
        ..., description="Place of birth (city, country or coordinates)"
    )
    utc_offset: float = Field(
        ..., description="Time zone offset from UTC in hours, e.g. +5.0"
    )
    modules: List[ModuleName] = Field(
        default_factory=list,
        description="List of modules to analyze.  Empty list means run all.",
    )

    # Optional second person details for compatibility analysis
    second_name: Optional[str] = Field(
        None, description="Full name of the second person for compatibility analysis"
    )
    second_birth_date: Optional[str] = Field(
        None, description="Birth date of the second person (YYYY-MM-DD)"
    )
    second_birth_time: Optional[str] = Field(
        None, description="Birth time of the second person (HH:MM or HH:MM:SS)"
    )
    second_location: Optional[str] = Field(
        None, description="Birth location of the second person"
    )
    second_utc_offset: Optional[float] = Field(
        None, description="UTC offset of the second person"
    )


class ModuleResult(BaseModel):
    """Result of a single diagnostic module."""

    module: ModuleName
    analysis: str


class AnalysisResponse(BaseModel):
    """Aggregated response containing results of one or more modules."""

    name: str
    results: List[ModuleResult]
    report_path: Optional[str] = None