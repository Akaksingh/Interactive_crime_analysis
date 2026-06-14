"""Phase 1 aggregate API.

Serves the district-level aggregates produced by the pipeline
(backend/data/processed/api/*.json). Read-only; if a payload is missing the
endpoint returns 503 with a hint to run the pipeline first:

    python -m pipeline.run
    uvicorn app.main:app --reload
"""
from __future__ import annotations

import json
from pathlib import Path

from fastapi import FastAPI, HTTPException
from fastapi.middleware.cors import CORSMiddleware

from pipeline import paths

app = FastAPI(
    title="AI-Driven Crime Analytics API",
    version="0.1.0",
    description="Phase 1 — district-level aggregate APIs (pilot: Karnataka).",
)

# Dev CORS: allow the Vite frontend (and others) during local development.
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_methods=["*"],
    allow_headers=["*"],
)


def _load(name: str):
    path: Path = paths.API_DIR / name
    if not path.exists():
        raise HTTPException(
            status_code=503,
            detail=f"{name} not built. Run `python -m pipeline.run` first.",
        )
    return json.loads(path.read_text(encoding="utf-8"))


@app.get("/")
def root():
    return {
        "service": "AI-Driven Crime Analytics API",
        "phase": "1",
        "endpoints": [
            "/health", "/api/meta", "/api/districts", "/api/districts/{geo_unit_id}",
            "/api/hotspots", "/api/trends", "/api/kpi-catalog", "/api/categories",
        ],
        "docs": "/docs",
    }


@app.get("/health")
def health():
    built = (paths.API_DIR / "districts.json").exists()
    return {"status": "ok", "data_built": built}


@app.get("/api/meta")
def meta():
    return _load("meta.json")


@app.get("/api/districts")
def districts():
    """District summary list (latest year), sorted by risk score desc."""
    return _load("districts.json")


@app.get("/api/districts/{geo_unit_id}")
def district_detail(geo_unit_id: str):
    """Full drilldown for one district: KPIs, yearly trend, category breakdown,
    hotspot status, and explainable risk-score components."""
    detail = _load("district_detail.json")
    rec = detail.get(geo_unit_id)
    if rec is None:
        raise HTTPException(status_code=404, detail=f"district '{geo_unit_id}' not found")
    return rec


@app.get("/api/hotspots")
def hotspots():
    return _load("hotspots.json")


@app.get("/api/trends")
def trends():
    return _load("trends.json")


@app.get("/api/kpi-catalog")
def kpi_catalog():
    return _load("kpi_catalog.json")


@app.get("/api/categories")
def categories():
    return _load("categories.json")


# ---- Phase 3: intelligence (synthetic person-level + real-data ML) ----
@app.get("/api/intelligence/repeat-offenders")
def repeat_offenders():
    """Top repeat offenders (SYNTHETIC data — see data_note)."""
    return _load("intel_repeat_offenders.json")


@app.get("/api/intelligence/network")
def network():
    """Co-offending network summary + most central offenders (SYNTHETIC)."""
    return _load("intel_network.json")


@app.get("/api/intelligence/patterns")
def patterns():
    """AI/ML pattern detection on REAL data: district clusters + anomalies."""
    return _load("intel_patterns.json")


# ---- Phase 4: socio-economic correlation (real Census 2011) ----
@app.get("/api/socioeconomic")
def socioeconomic():
    """Per-district socio-economic indicators (Census 2011)."""
    return _load("se_indicators.json")


@app.get("/api/socioeconomic/correlations")
def socioeconomic_correlations():
    """Correlation matrix: each indicator x each crime group (Pearson/Spearman,
    p-values, hypothesis verdicts) + ethical caveats."""
    return _load("se_correlations.json")


@app.get("/api/socioeconomic/schema")
def socioeconomic_schema():
    """The logically-backed indicator definitions + crime hypotheses."""
    return _load("se_schema.json")
