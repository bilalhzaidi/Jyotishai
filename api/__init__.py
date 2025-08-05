"""API package for JyotishAI.

This package exposes all FastAPI routers defined in the
`api.endpoints` submodules.  The routers are imported in
`main.py` and included into the main application.
"""

from fastapi import APIRouter

from .endpoints.module_personality import router as personality_router
from .endpoints.module_career import router as career_router
from .endpoints.module_education import router as education_router
from .endpoints.module_marriage import router as marriage_router
from .endpoints.module_sexuality import router as sexuality_router
from .endpoints.module_body_type import router as body_type_router
from .endpoints.module_karma_soul_path import router as karma_router
from .endpoints.module_foreign_travel import router as foreign_travel_router
from .endpoints.module_spirituality import router as spirituality_router
from .endpoints.module_ashtakavarga import router as ashtakavarga_router
from .endpoints.module_dasha_transit import router as dasha_router
from .endpoints.module_psychological_vulnerability import (
    router as psychological_router,
)
from .endpoints.module_health import router as health_router
from .endpoints.module_chronic_disease import router as chronic_router
from .endpoints.module_compatibility import router as compatibility_router

api_router = APIRouter()
api_router.include_router(personality_router, prefix="/personality", tags=["modules"])
api_router.include_router(career_router, prefix="/career", tags=["modules"])
api_router.include_router(education_router, prefix="/education", tags=["modules"])
api_router.include_router(marriage_router, prefix="/marriage", tags=["modules"])
api_router.include_router(sexuality_router, prefix="/sexuality", tags=["modules"])
api_router.include_router(body_type_router, prefix="/body_type", tags=["modules"])
api_router.include_router(karma_router, prefix="/karma", tags=["modules"])
api_router.include_router(foreign_travel_router, prefix="/foreign_travel", tags=["modules"])
api_router.include_router(spirituality_router, prefix="/spirituality", tags=["modules"])
api_router.include_router(ashtakavarga_router, prefix="/ashtakavarga", tags=["modules"])
api_router.include_router(dasha_router, prefix="/dasha_transit", tags=["modules"])
api_router.include_router(
    psychological_router, prefix="/psychological", tags=["modules"]
)
api_router.include_router(health_router, prefix="/health", tags=["modules"])
api_router.include_router(chronic_router, prefix="/chronic", tags=["modules"])
api_router.include_router(compatibility_router, prefix="/compatibility", tags=["modules"])