# SimpleRockets → Mneme Vehicle (MV) Conversion Rules

> **Version:** 0.1 Draft  
> **Date:** 2026-05-03  
> **Scope:** Convert SimpleRockets 2 craft stats into Mneme Vehicle Component System (MVCS) vehicles  

---

## 1. Overview

SimpleRockets 2 (SR2) provides aggregate craft statistics: wet mass, dry mass, total ΔV, thrust, engine count, part count, and dimensions. The Mneme Vehicle Component System (MVCS) requires a **3-level hierarchical structure**: Stage → Engine/Fuel → Power Plant/Drive.

This document defines the rules for mapping SR2 aggregate stats into MVCS structured vehicles.

---

## 2. Source Data Format (SimpleRockets)

```json
{
  "id": "cEexA4",
  "name": "R-7 Semiorka",
  "era": "1957",
  "origin": "USSR",
  "type": "LV",
  "specs": {
    "parts": "376",
    "price": "$13,439k",
    "dimensions": { "length": 34, "width": 11, "height": 11 },
    "deltaV": 4800,        // m/s (in-game vacuum ΔV)
    "thrust": 4800,        // kN (in-game total thrust)
    "engines": "20",       // engine part count
    "wetMass": 251000,     // kg (full fuel)
    "dryMass": 35049,      // kg (empty tanks)
    "gameVersion": "0.9.614.0",
    "createdOn": "Android"
  },
  "chemistry": "kerolox"   // inferred from part analysis
}
```

### Available Fields

| SR2 Field | Type | Description | Reliability |
|-----------|------|-------------|-------------|
| `name` | string | Craft name | High |
| `era` | string | Year of first flight | High |
| `origin` | string | Nation/organization | High |
| `type` | string | Vehicle category | Medium (user-assigned) |
| `specs.wetMass` | number | Total mass with fuel (kg) | High |
| `specs.dryMass` | number | Total mass without fuel (kg) | High |
| `specs.deltaV` | number | Vacuum ΔV (m/s) | High |
| `specs.thrust` | number | Total vacuum thrust (kN) | Medium (may be sea-level) |
| `specs.engines` | string | Engine part count | Medium (includes verniers) |
| `specs.parts` | string | Total part count | Low (aesthetic parts inflate) |
| `specs.price` | string | In-game cost | Low (game-balance, not real) |
| `chemistry` | string | Inferred propellant type | Medium (manual inference) |

---

## 3. Conversion Rules

### 3.1 Vehicle Identity

| MV Field | Source | Rule |
|----------|--------|------|
| `name` | SR2 `name` | Append `(SR)` to distinguish: `"R-7 Semiorka (SR)"` |
| `id` | SR2 `id` | Prefix: `sr-{id}` → `sr-cEexA4` |
| `type` | SR2 `type` | Direct map: `LV` → `LV`, `Orb` → `Orb`, etc. |
| `origin` | SR2 `origin` | Store in notes; not a typed field |

### 3.2 Technology Level (TL)

SR2 `era` (year) maps to MVCS decimal TL:

```
TL = 7.0 + ((year - 1957) / 10) × 0.2
```

| Era | TL | Example |
|-----|-----|---------|
| 1957 | 7.0 | R-7, Sputnik era |
| 1961 | 7.2 | Mercury, Vostok |
| 1967 | 7.4 | Saturn V, Soyuz |
| 1975 | 7.5 | Shuttle development |
| 1981 | 7.8 | Shuttle operational |
| 1998 | 7.9 | ISS era |
| 2010 | 8.2 | Falcon 9, commercial space |
| 2024 | 8.4 | Starship, Artemis |
| 2050 | 9.0 | Near-future concepts |

**PMR** (Performance Margin Rating) defaults to `7` for converted vehicles (standard engineering margin).

### 3.3 Mass Budget

SR2 provides **wet mass** and **dry mass**. Derive propellant:

```
Propellant Mass (kg) = wetMass - dryMass
Structure Mass (tons) = dryMass / 1000 × 0.7   // 70% of dry mass is structure
Attached Mass (tons) = dryMass / 1000 × 0.3    // 30% is engines, avionics, etc.
```

**Rationale:** SR2 "dry mass" includes engines, tanks, and structure. MVCS separates `Structure.massTons` (the frame) from `attachedMassTons` (components bolted to it). The 70/30 split is a heuristic based on Saturn V calibration.

| MV Field | Calculation |
|----------|-------------|
| `structure.massTons` | `(dryMass × 0.7) / 1000` |
| `structure.capacityTons` | `wetMass / 1000` (max mass the structure holds) |
| `fuel.propellantMassKg` | `wetMass - dryMass` |
| `fuel.tankMassKg` | `propellantMassKg × 0.008` (0.8% tank mass fraction) |

### 3.4 Propulsion System

#### 3.4.1 Chemistry → Power Plant + Drive

SR2 `chemistry` maps to MVCS Power Plant and Drive:

| SR2 Chemistry | Power Plant | Drive | Notes |
|---------------|-------------|-------|-------|
| `kerolox` | Gas-Generator Kerolox | Gimbaled Bell | F-1, Merlin, RD-107 family |
| `hydrolox` | Gas-Generator Hydrolox | Fixed Bell or Extendable | J-2, RL-10, SSME |
| `methalox` | Full-Flow Staged Methalox | Gimbaled Bell | Raptor |
| `hypergolic` | Hypergolic Pressure-Fed | Gimbaled Bell | Ariane EPS, Dragon Draco |
| `solid` | Solid Composite | Fixed Bell | SRB, Vega P80 |
| `nuclear` | Nuclear Thermal | Magnetic Nozzle | NERVA (conceptual) |
| `electric` | Ion Electric | Ion Grid | NEXT, Dawn |

#### 3.4.2 Engine Count

SR2 `specs.engines` is the **part count** of engine components. This includes:
- Main engines
- Vernier/gimbal engines
- RCS thrusters (if engine parts)

**Rule:** Use `specs.engines` as the engine count, but cap interpretation:
- If `engines > 30`, assume it includes many small verniers; set count to `min(engines, 12)` for main engines
- If `engines <= 30`, use directly

#### 3.4.3 Thrust Derivation

SR2 `specs.thrust` is total thrust in kN. Per-engine thrust:

```
thrustPerEngine = totalThrust / engineCount
```

Map to known power plants by thrust range:

| Thrust Range (kN) | Likely Engine | Isp (vac) | Mass (kg) |
|---------------------|---------------|-----------|-----------|
| 700–900 | Kerolox GG (Merlin 1D) | 311 s | 470 |
| 900–1100 | Kerolox GG (F-1) | 304 s | 900 |
| 1000–1100 | Hydrolox GG (J-2) | 421 s | 1800 |
| 1800–2500 | Hydrolox SC (RS-25) | 452 s | 3500 |
| 2000–2500 | Methalox FF (Raptor) | 380 s | 1700 |
| 15000–17000 | Solid (SRB) | 268 s | 130000 |

#### 3.4.4 Isp Derivation

If SR2 ΔV and mass ratio are available:

```
Isp = deltaV / (g₀ × ln(wetMass / dryMass))
```

Where `g₀ = 9.80665 m/s²`.

If Isp calculation fails (e.g., impossible mass ratio), fall back to chemistry default:

| Chemistry | Default Isp (vac) |
|-----------|-------------------|
| kerolox | 304–330 s |
| hydrolox | 421–452 s |
| methalox | 356–380 s |
| hypergolic | 316–340 s |
| solid | 268–280 s |
| nuclear | 800–950 s |
| electric | 1500–3000 s |

### 3.5 Delta-V and Payload

| MV Field | Source | Rule |
|----------|--------|------|
| `totalDeltaV` | SR2 `deltaV` | Direct: `deltaV` (m/s) |
| `leoPayloadKg` | Real-world lookup | See §4.1 (Real-World Calibration) |
| `gtoPayloadKg` | Real-world lookup | See §4.1 |
| `tliPayloadKg` | Real-world lookup | See §4.1 |

**Note:** SR2 ΔV is vacuum ΔV. For realistic mission ΔV, apply a **gravity/drag loss factor**:
- First stage: multiply by 0.85 (15% losses)
- Upper stages: multiply by 0.95 (5% losses)

### 3.6 Cost

SR2 `specs.price` is in-game currency, not real dollars. **Do not use directly.**

**Rule:** Use real-world program cost or estimated unit cost:

```
// Heuristic: $10M per ton of dry mass for expendable LVs
// $50M+ per ton for reusables or crew-rated vehicles
costMusd = (dryMass / 1000) × 10
```

For known vehicles, override with real data (see §4.1).

### 3.7 Avionics

All vehicles get an avionics component derived from TL:

| TL Range | Avionics Generation | Mass (kg) | Cost (M$) |
|----------|---------------------|-----------|-----------|
| 7.0–7.1 | Analog Radio-Inertial | 450 | 2.5 |
| 7.2–7.4 | Digital Discrete-Logic | 32 | 3.5 |
| 7.5–7.9 | Redundant Digital | 70 | 4.2 |
| 8.0+ | FPGA-Based Reconfigurable | 14 | 0.8 |

### 3.8 Structures (Stages)

**Critical limitation:** SR2 provides **aggregate** stats, not per-stage stats. The converter creates a **single structure** representing the entire vehicle.

```
Structure:
  name: "{craftName} Structure"
  massTons: dryMass × 0.7 / 1000
  capacityTons: wetMass / 1000
  components: [engine, fuel_tank, avionics]
```

**For multi-stage vehicles** (if SR2 part data is parsed):
- Each decoupler-separated section becomes a separate Structure
- Mass is apportioned by part count per section
- Engines and fuel tanks are assigned to their respective sections

---

## 4. Calibration & Real-World Overrides

### 4.1 Known Vehicle Database

For historically significant vehicles, use real-world data instead of heuristics:

| SR2 ID | Name | Real Wet Mass | Real Dry Mass | Real Thrust | LEO (kg) | GTO (kg) | TLI (kg) |
|--------|------|---------------|---------------|-------------|----------|----------|----------|
| `cEexA4` | R-7 Semiorka | 280 t | 25 t | 3,904 kN | 1,300 | — | — |
| `1KW3z2` | Saturn V | 2,970 t | 130 t | 35,100 kN | 118,000 | — | 48,600 |
| `d1Vaq5` | Energia | 2,400 t | 80 t | 29,000 kN | 24,400 | — | — |
| `jt8106` | Falcon 9 v1.0 | 333 t | 23 t | 4,940 kN | 23,000 | 6,900 | — |
| `9VK79N` | Falcon Heavy | 1,420 t | 60 t | 22,819 kN | 63,800 | 26,700 | — |
| `tdjwOs` | SLS Block 1 | 2,608 t | 100 t | 39,144 kN | 95,000 | — | 27,000 |
| `LV1JV6` | Starship | 5,000 t | 150 t | 72,000 kN | 150,000 | — | — |

### 4.2 Validation Checklist

After conversion, verify:

- [ ] `totalMassTons` ≈ SR2 `wetMass / 1000` (±5%)
- [ ] `totalDeltaV` ≈ SR2 `deltaV` (±10%)
- [ ] `structure.totalMassTons` ≈ SR2 `dryMass / 1000` (±15%)
- [ ] Engine thrust × count ≈ SR2 `thrust` (±20%)
- [ ] Propellant mass = wetMass - dryMass (exact)
- [ ] Known vehicles match real-world data

---

## 5. Limitations & Known Issues

| Issue | Impact | Workaround |
|-------|--------|------------|
| **Single-structure limitation** | Multi-stage vehicles collapsed into one stage | Manual post-processing for known rockets |
| **Engine count inflation** | Verniers counted as engines | Cap at 12, or parse part tree |
| **No part tree access** | Cannot separate stages automatically | Require manual stage breakdown for accuracy |
| **SR2 thrust ambiguity** | May be sea-level or vacuum | Assume vacuum; note uncertainty |
| **Cost is game-balance** | Not real-world dollars | Use heuristic or real data |
| **ΔV includes all stages** | Cannot derive per-stage ΔV | Estimate by mass fraction |

---

## 6. Future Enhancements

### 6.1 Part Tree Parser
Parse the SR2 craft XML/part tree to extract:
- Individual stages (separated by decouplers)
- Per-stage mass, fuel, engines
- RCS and auxiliary systems

### 6.2 Automated Chemistry Detection
Infer chemistry from engine part names in the SR2 part tree instead of manual assignment.

### 6.3 Mission Profile Generator
From SR2 craft type and ΔV, auto-generate:
- Target orbits (LEO, GTO, TLI, etc.)
- Payload envelopes
- Launch windows

### 6.4 Batch Conversion
Convert entire SR2 craft libraries in one operation with progress tracking and error reporting.

---

## 7. Example: R-7 Semiorka Conversion

### Input (SR2)
```json
{
  "name": "R-7 Semiorka",
  "era": "1957",
  "type": "LV",
  "specs": {
    "wetMass": 251000,
    "dryMass": 35049,
    "deltaV": 4800,
    "thrust": 4800,
    "engines": "20"
  },
  "chemistry": "kerolox"
}
```

### Output (MVCS)
```json
{
  "id": "sr-cEexA4",
  "name": "R-7 Semiorka (SR)",
  "type": "LV",
  "tl": 7.0,
  "pmr": 7,
  "structures": [{
    "name": "R-7 Semiorka Structure",
    "massTons": 24.5,        // 35049 × 0.7 / 1000
    "capacityTons": 251.0,    // wetMass / 1000
    "components": [
      // Engine: 20 × RD-107-class
      {
        "type": "engine",
        "name": "Engine ×20",
        "engineAssembly": {
          "count": 20,
          "totalThrustKn": 3904,  // overridden from real data
          "vacuumIsp": 304
        }
      },
      // Fuel: RP-1/LOX
      {
        "type": "fuel_tank",
        "name": "RP-1/LOX Tank",
        "fuelTank": {
          "propellantMassKg": 215951,  // 251000 - 35049
          "tankMassKg": 1728           // 215951 × 0.008
        }
      },
      // Avionics: Analog (TL 7.0)
      {
        "type": "avionics",
        "name": "Analog Radio-Inertial Guidance",
        "massKg": 450,
        "costMusd": 2.5
      }
    ]
  }],
  "totalMassTons": 280.0,
  "totalDeltaV": 4800,
  "leoPayloadKg": 1300,
  "notes": "Converted from SimpleRockets craft cEexA4. USSR origin."
}
```

---

*Part of the Mneme Vehicle Component System (MVCS) v0.2*
