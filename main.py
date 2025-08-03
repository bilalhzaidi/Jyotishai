from __future__ import annotations

"""FastAPI application for JyotishAI."""

import os
import uvicorn
import importlib
from typing import Callable, Dict, List

from fastapi import FastAPI, HTTPException, Query
from fastapi.middleware.cors import CORSMiddleware

from models.schemas import (
    AnalysisResponse,
    ChartRequest,
    ModuleName,
    ModuleResult,
)
from services.chart_engine import VedicAstrologyEngine
from services import report_generator
from api import api_router
from api.chat import router as chat_router
from api.seduction import router as seduction_router

# Module analyzers
from api.endpoints.module_personality import analyze_personality
from api.endpoints.module_career import analyze_career
from api.endpoints.module_education import analyze_education
from api.endpoints.module_marriage import analyze_marriage
from api.endpoints.module_sexuality import analyze_sexuality
from api.endpoints.module_body_type import analyze_body_type
from api.endpoints.module_karma_soul_path import analyze_karma
from api.endpoints.module_foreign_travel import analyze_foreign_travel
from api.endpoints.module_spirituality import analyze_spirituality
from api.endpoints.module_ashtakavarga import analyze_ashtakavarga
from api.endpoints.module_dasha_transit import analyze_dasha_transit
from api.endpoints.module_psychological_vulnerability import analyze_psychological
from api.endpoints.module_health import analyze_health
from api.endpoints.module_chronic_disease import analyze_chronic_disease
from api.endpoints.module_compatibility import analyze_compatibility

app = FastAPI(title="JyotishAI", description="Vedic astrology diagnostic API")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(api_router, prefix="/modules")
app.include_router(chat_router, prefix="/api", tags=["chat"])
app.include_router(seduction_router, prefix="/api", tags=["seduction"])

ANALYSIS_FUNCTIONS: Dict[ModuleName, Callable] = {
    ModuleName.PERSONALITY: analyze_personality,
    ModuleName.CAREER: analyze_career,
    ModuleName.EDUCATION: analyze_education,
    ModuleName.MARRIAGE: analyze_marriage,
    ModuleName.SEXUALITY: analyze_sexuality,
    ModuleName.BODY_TYPE: analyze_body_type,
    ModuleName.KARMA_SOUL_PATH: analyze_karma,
    ModuleName.FOREIGN_TRAVEL: analyze_foreign_travel,
    ModuleName.SPIRITUALITY: analyze_spirituality,
    ModuleName.ASHTAKAVARGA: analyze_ashtakavarga,
    ModuleName.DASHA_TRANSIT: analyze_dasha_transit,
    ModuleName.PSYCHOLOGICAL: analyze_psychological,
    ModuleName.HEALTH: analyze_health,
    ModuleName.CHRONIC: analyze_chronic_disease,
}

@app.post("/analyze", response_model=AnalysisResponse)
def analyze_chart(
    request: ChartRequest,
    format: str = Query("json", description="Output format: json, docx or pdf", regex="^(json|docx|pdf)$"),
) -> AnalysisResponse:
    chart = VedicAstrologyEngine.from_request(request)

    if request.modules:
        modules = request.modules
    else:
        modules = [m for m in ModuleName if m != ModuleName.COMPATIBILITY]

    results: List[ModuleResult] = []
    for module in modules:
        if module == ModuleName.COMPATIBILITY:
            if not all([
                request.second_name,
                request.second_birth_date,
                request.second_birth_time,
                request.second_location,
                request.second_utc_offset is not None,
            ]):
                raise HTTPException(status_code=400, detail="Second person details are required for compatibility analysis.")
            second_req = ChartRequest(
                name=request.second_name,
                birth_date=request.second_birth_date,
                birth_time=request.second_birth_time,
                location=request.second_location,
                utc_offset=request.second_utc_offset,
                modules=[],
            )
            chart2 = VedicAstrologyEngine.from_request(second_req)
            analysis_text = analyze_compatibility(chart, chart2)
            results.append(ModuleResult(module=module, analysis=analysis_text))
            continue

        func = ANALYSIS_FUNCTIONS.get(module)
        if not func:
            raise HTTPException(status_code=400, detail=f"Unknown module: {module}")
        analysis_text = func(chart)
        results.append(ModuleResult(module=module, analysis=analysis_text))

    response = AnalysisResponse(name=request.name, results=results)

    if format in ("docx", "pdf"):
        path = report_generator.generate_docx(chart, results) if format == "docx" else report_generator.generate_pdf(chart, results)
        response.report_path = path

    return response
