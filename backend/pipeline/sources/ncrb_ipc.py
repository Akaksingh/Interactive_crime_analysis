"""Source adapter for the NCRB district-wise IPC crimes dataset (2001-2012).

Real data: National Crime Records Bureau, via the data.gov.in open dataset
"District-wise crimes committed under IPC". This adapter:
  - filters to the pilot state (Karnataka),
  - maps 2012-era NCRB district names onto Census-2011 district names
    (and aggregates commissionerate / city / rural splits into one census district),
  - maps the LEAF crime columns onto canonical taxonomy codes, deliberately
    EXCLUDING totals/subtotals so the ingested numbers reconcile EXACTLY to NCRB's
    own TOTAL.IPC.CRIMES (verified: 387/387 rows, zero difference).

Output: long rows {census_district, year, category_code, count} + a reconciliation
record the data-quality stage checks.
"""
from __future__ import annotations

import pandas as pd

STATE = "Karnataka"
STATE_COL = "STATE.UT"

# NCRB district name (lowercased) -> Census-2011 district name (matches the GeoJSON)
DISTRICT_CROSSWALK = {
    "bagalkot": "Bagalkote",
    "bangalore commr.": "Bengaluru Urban",
    "bangalore rural": "Bengaluru Rural",
    "belgaum": "Belagavi",
    "bellary": "Ballari",
    "bidar": "Bidar",
    "bijapur": "Vijayapura",
    "cbpura": "Chikkaballapura",
    "chamarajnagar": "Chamarajanagara",
    "chickmagalur": "Chikkamagaluru",
    "chitradurga": "Chitradurga",
    "dakshin kannada": "Dakshina Kannada",
    "davanagere": "Davanagere",
    "dharwad commr.": "Dharwad",
    "dharwad rural": "Dharwad",
    "gadag": "Gadag",
    "gulbarga": "Kalaburagi",
    "hassan": "Hassan",
    "haveri": "Haveri",
    "k.g.f.": "Kolar",
    "kodagu": "Kodagu",
    "kolar": "Kolar",
    "koppal": "Koppal",
    "mandya": "Mandya",
    "mangalore city": "Dakshina Kannada",
    "mysore commr.": "Mysuru",
    "mysore rural": "Mysuru",
    "raichur": "Raichur",
    "ramanagar": "Ramanagara",
    "shimoga": "Shivamogga",
    "tumkur": "Tumakuru",
    "udupi": "Udupi",
    "uttar kannada": "Uttara Kannada",
    "yadgiri": "Yadgir",
}
# Non-geographic / total rows we skip.
EXCLUDE = {"railways", "total"}

# LEAF NCRB column -> canonical taxonomy code. These columns sum to TOTAL.IPC.CRIMES;
# totals (TOTAL.IPC.CRIMES) and subtotals (CUSTODIAL/OTHER RAPE, KIDNAP sub-rows,
# AUTO/OTHER THEFT) are intentionally omitted to avoid double counting.
COLUMN_MAP = {
    "MURDER": "MURDER",
    "ATTEMPT.TO.MURDER": "ATTEMPT_MURDER",
    "CULPABLE.HOMICIDE.NOT.AMOUNTING.TO.MURDER": "CULP_HOMICIDE",
    "RAPE": "RAPE",
    "KIDNAPPING...ABDUCTION": "KIDNAP_ABDUCT",
    "DACOITY": "DACOITY",
    "PREPARATION.AND.ASSEMBLY.FOR.DACOITY": "DACOITY",
    "ROBBERY": "ROBBERY",
    "BURGLARY": "BURGLARY",
    "THEFT": "THEFT",
    "RIOTS": "RIOTS",
    "CRIMINAL.BREACH.OF.TRUST": "CBT",
    "CHEATING": "CHEATING",
    "COUNTERFIETING": "FORGERY",
    "ARSON": "ARSON",
    "HURT.GREVIOUS.HURT": "GRIEVOUS_HURT",
    "DOWRY.DEATHS": "DOWRY_DEATH",
    "ASSAULT.ON.WOMEN.WITH.INTENT.TO.OUTRAGE.HER.MODESTY": "ASSAULT_WOMEN_MODESTY",
    "INSULT.TO.MODESTY.OF.WOMEN": "INSULT_MODESTY",
    "CRUELTY.BY.HUSBAND.OR.HIS.RELATIVES": "CRUELTY_HUSBAND",
    "IMPORTATION.OF.GIRLS.FROM.FOREIGN.COUNTRIES": "OTHER",
    "CAUSING.DEATH.BY.NEGLIGENCE": "OTHER",
    "OTHER.IPC.CRIMES": "OTHER",
}
TOTAL_COL = "TOTAL.IPC.CRIMES"


def load(csv_path) -> dict:
    """Returns {'rows': [...], 'reconciliation': {...}, 'unmapped_districts': [...]}.

    rows: list of {'district': <census name>, 'year': int, 'category_code': str, 'count': int}
    """
    df = pd.read_csv(csv_path)
    df[STATE_COL] = df[STATE_COL].astype(str).str.strip()
    ka = df[df[STATE_COL].str.upper().str.contains(STATE.upper(), na=False)].copy()
    ka["DISTRICT"] = ka["DISTRICT"].astype(str).str.strip()

    leaf_cols = list(COLUMN_MAP.keys())
    rows = []
    unmapped = set()
    recon_ingested = recon_reported = 0

    for _, r in ka.iterrows():
        raw = r["DISTRICT"].lower()
        if raw in EXCLUDE or "total" in raw:
            continue
        census = DISTRICT_CROSSWALK.get(raw)
        if census is None:
            unmapped.add(r["DISTRICT"])
            continue
        year = int(r["YEAR"])
        for col in leaf_cols:
            count = r.get(col)
            if pd.isna(count):
                continue
            rows.append({
                "district": census,
                "year": year,
                "category_code": COLUMN_MAP[col],
                "count": int(count),
            })
            recon_ingested += int(count)
        if not pd.isna(r.get(TOTAL_COL)):
            recon_reported += int(r[TOTAL_COL])

    reconciliation = {
        "ingested_leaf_sum": recon_ingested,
        "ncrb_reported_total": recon_reported,
        "difference": recon_ingested - recon_reported,
        "matches": recon_ingested == recon_reported,
    }
    return {"rows": rows, "reconciliation": reconciliation, "unmapped_districts": sorted(unmapped)}
