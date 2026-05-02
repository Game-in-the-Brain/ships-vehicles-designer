# FDR-003: Historical Rocket Library

**Milestone:** M3  
**Status:** ⏳ Pending  
**Priority:** High — differentiator from generic calculators  
**Owner:** TBD  
**Created:** 2026-05-02  
**Depends On:** FDR-002 (BOM Calculator Core)

---

## 1. Goal

Provide a browsable, searchable library of historical rockets with pre-built MSDS designs. Users can load any vehicle, inspect its BOM, modify it, or use it as a template. The library must include at least 18 rockets (matching the JNO catalog scope) spanning 1957–2024, including failures (N1, Buran).

---

## 2. Scope

| Item | In Scope | Out of Scope |
|------|----------|--------------|
| Library grid view with search/filter | ✅ | ❌ |
| Pre-built JSON designs for 18+ historical rockets | ✅ | ❌ |
| Per-rocket detail modal (BOQ, stats, classification) | ✅ | ❌ |
| Load rocket into calculator for modification | ✅ | ❌ |
| Import/export individual rocket JSON | ✅ | ❌ |
| Real-world vs. MSDS comparison view | ✅ | ❌ |
| Filter by origin (USA/USSR/EUR/CHN/JPN/IND/MLT) | ✅ | ❌ |
| Filter by mission class (LEO/GTO/TLI/IP/HVM/CREW) | ✅ | ❌ |
| Filter by propulsion architecture | ✅ | ❌ |
| Program deviation / batch quirk display | ❌ | ✅ (FDR-004) |
| SimpleRockets import links | ❌ | ✅ (nice-to-have) |
| 3D model viewer | ❌ | ✅ (FDR-006) |

---

## 3. Historical Rocket Inventory (v0.1)

| # | Vehicle | Origin | TL | Classification | Status |
|---|---------|--------|----|----------------|--------|
| 1 | R-7 / Sputnik launcher | USSR | 7.0 | `K-GG/2S+S4/USSR-LEO` | ✅ |
| 2 | Juno I | USA | 7.0 | `S-SEG/3S/USA-LEO` | ✅ |
| 3 | Vostok-K | USSR | 7.0 | `K-GG/2S+S4/USSR-LEO` | ✅ |
| 4 | Atlas LV-3B | USA | 7.0 | `K-GG/1.5S/USA-CREW` | ✅ |
| 5 | Titan II GLV | USA | 7.2 | `HYG/2S/USA-CREW` | ✅ |
| 6 | Saturn IB | USA | 7.2 | `H-GG/2S/USA-LEO` | ✅ |
| 7 | Saturn V | USA | 7.4 | `H-GG/3S/USA-TLI` | ✅ (calibration anchor) |
| 8 | Soyuz (R-7 derived) | USSR | 7.2 | `K-GG/2S+S4/USSR-LEO` | ✅ |
| 9 | N1 | USSR | 7.2 | `K-SC/3S+S2/USSR-TLI` | ⚠️ Failure |
| 10 | Proton-M | USSR | 7.2 | `HYG/3S/USSR-GTO` | ✅ |
| 11 | STS (Space Shuttle) | USA | 7.4 | `H-SC/2S+S2/USA-LEO` | ✅ |
| 12 | Energia-Buran | USSR | 7.6 | `H-SC/2S+S4/USSR-LEO` | ⚠️ Canceled |
| 13 | Ariane 5 ECA | EUR | 7.4 | `H-GG/2S+S2/EUR-GTO` | ✅ |
| 14 | Delta IV Heavy | USA | 7.4 | `H-SC/2S+SL2/USA-GTO` | ✅ |
| 15 | Atlas V 551 | USA | 7.4 | `K-SC/2S+S5/USA-GTO` | ✅ |
| 16 | Falcon 9 v1.0 | USA | 7.4 | `K-GG/2S/USA-LEO` | ✅ |
| 17 | Falcon 9 Block 5 | USA | 7.6 | `K-GG/2S+R/USA-LEO` | ✅ |
| 18 | Falcon Heavy | USA | 7.6 | `K-GG/2S+SL2+R/USA-HVM` | ✅ |
| 19 | SLS Block 1 | USA | 7.6 | `H-SC/2S+S2/USA-TLI` | ✅ |
| 20 | Vulcan Centaur | USA | 7.6 | `H-SC/2S+S2/USA-GTO` | ✅ |
| 21 | Long March 5 | CHN | 7.4 | `H-GG/3S/CHN-GTO` | ✅ |
| 22 | H-IIA | JPN | 7.4 | `H-GG/2S+S2/JPN-LEO` | ✅ |
| 23 | GSLV Mk III | IND | 7.4 | `H-GG/2S+S2/IND-GTO` | ✅ |
| 24 | Ariane 6 | EUR | 7.6 | `H-GG/2S+S2/EUR-GTO` | ✅ |
| 25 | Starship (full stack) | USA | 7.8 | `M-FF/2S+R/USA-HVM` | 🔄 In dev |
| 26 | New Glenn | USA | 7.8 | `M-FF/2S+R/USA-HVM` | 🔄 In dev |

**Failure/Canceled inclusion rationale:** N1 and Buran are included to show that MSDS can model failed programs. Their designs validate the calculator against real but unsuccessful mass budgets.

---

## 4. JSON Design Format

Each historical rocket is stored as a `VehicleDesign` JSON file:

```json
{
  "id": "saturn-v",
  "name": "Saturn V",
  "type": "LV",
  "tl": 7.4,
  "pmr": 10,
  "classification": {
    "propArc": "H-GG",
    "stgCfg": "3S",
    "origin": "USA",
    "missionClass": "TLI",
    "fullString": "H-GG/3S/USA-TLI"
  },
  "stages": [
    {
      "id": "s-ic",
      "name": "S-IC",
      "role": "booster",
      "tl": 7.2,
      "engines": [
        {
          "id": "s-ic-f1",
          "name": "F-1 Cluster",
          "powerPlantId": "gg-kerolox-1",
          "driveId": "fixed-bell-1",
          "count": 5,
          "vacuumIsp": 304,
          "seaLevelIsp": 263,
          "totalThrustKn": 4225,
          "dryMassKg": 5250,
          "costMusd": 10.0
        }
      ],
      "fuelBlock": {
        "fuelType": "RP-1/LOX",
        "propellantMassKg": 2139000,
        "tankMassKg": 13500,
        "tankMassRatio": 0.0063
      },
      "structuralMassKg": 99600,
      "propellantMassKg": 2139000,
      "payloadMassKg": 0,
      "residualMassKg": 10000,
      "dryMassKg": 114850,
      "wetMassKg": 2286217,
      "vacuumDeltaV": 3550,
      "seaLevelDeltaV": 2890,
      "burnTimeSeconds": 168,
      "averageThrustKn": 4225,
      "twrSeaLevel": 1.18,
      "twrVacuum": 1.88,
      "origin": "USA",
      "notes": "First stage. 5× F-1 engines. Burns 2,130 t RP-1/LOX."
    },
    ...
  ],
  "totalWetMassKg": 2909200,
  "totalDryMassKg": 184030,
  "totalPayloadMassKg": 48600,
  "totalDeltaV": 11290,
  "leoPayloadKg": 118000,
  "gtoPayloadKg": null,
  "tliPayloadKg": 48600,
  "costMusd": 1850,
  "createdAt": "2026-05-02T00:00:00Z",
  "updatedAt": "2026-05-02T00:00:00Z",
  "notes": "Apollo-era super-heavy lift. 13 successful launches, 0 failures. Calibration anchor for TL 7.4."
}
```

---

## 5. UI: Library Screen

### Grid View
- Responsive grid: 1 col (mobile) → 2 col (tablet) → 3 col (desktop) → 4 col (wide)
- Each card shows:
  - Vehicle name + classification badge
  - Origin flag (emoji or icon)
  - TL + PMR
  - Key stats: LEO payload, total ΔV, stage count
  - Status indicator: ✅ operational / ⚠️ failure / 🔄 in-dev

### Filters (sticky sidebar on desktop, expandable drawer on mobile)
- Search by name
- Origin checkboxes
- Mission class checkboxes
- Propulsion architecture checkboxes
- TL range slider (7.0–8.0)
- Status toggle (include failures?)

### Detail Modal
- Full BOQ breakdown (like CE ShipGen's `ShipDetailModal`)
- Classification derivation explanation
- Real-world stats vs. MSDS stats comparison table
- "Load into Calculator" button
- "Export JSON" button
- SimpleRockets import link (if available)

---

## 6. Data Loading Strategy

```typescript
// src/data/loadLibrary.ts
const LIBRARY_BASE = '/data/library/';

export async function loadLibraryVehicle(id: string): Promise<VehicleDesign> {
  const res = await fetch(`${LIBRARY_BASE}${id}.json`);
  if (!res.ok) throw new Error(`Failed to load ${id}`);
  return res.json();
}

export async function loadLibraryIndex(): Promise<{ id: string; name: string; classification: string }[]> {
  const res = await fetch(`${LIBRARY_BASE}index.json`);
  return res.json();
}
```

---

## 7. Acceptance Criteria

- [ ] Library screen loads in <2s on 4G
- [ ] All 26 vehicles from inventory are loadable
- [ ] Saturn V loads and calculator matches calibration values (±2%)
- [ ] Search filters work for name, origin, mission class, propulsion
- [ ] Failure vehicles (N1, Buran) display red warning badge
- [ ] Detail modal shows real-world vs. MSDS comparison
- [ ] "Load into Calculator" copies vehicle to editable state
- [ ] Export produces valid JSON that re-imports correctly
- [ ] Mobile: grid scrolls vertically, filters in bottom sheet
- [ ] Desktop: filters in sticky sidebar, grid in main area

---

## 8. Blockers

| Blocker | Resolution |
|---------|------------|
| FDR-002 (BOM Calculator) | Need calculator to validate loaded designs |

---

## 9. Notes

- Historical data sources: NASA NTRS, Space Launch Report, Astronautix, Wikipedia (cross-referenced).
- Cost data is approximate and normalized to 2020 USD.
- Payload figures are for reference orbits (LEO = 200 km × 28.5°, GTO = 1,500 × 35,786 km × 27°).
- In-development vehicles (Starship, New Glenn) use best-available public estimates.
