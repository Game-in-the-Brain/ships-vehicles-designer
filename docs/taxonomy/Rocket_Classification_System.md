# Mneme Vehicle Taxonomy: Rocket Classification System

**Version:** 0.1  
**Date:** 2026-05-02  
**Status:** Draft  
**Scope:** All orbital launch vehicles, upper stages, and in-space propulsion systems in the MSDS framework.

---

## 1. Design Goal

Provide a compact, player-facing classification system that lets a user instantly understand a rocket's architecture, era, and capabilities. The taxonomy must fit on a 3"×5" card and be derivable from the 3-level BOM (Stage → Engine/Fuel → Power Plant/Drive).

**Constraint:** Maximum 3 classification axes. Any axis with >7 values is split into a sub-axis.

---

## 2. Primary Axis: Propulsion Architecture (PROP-ARC)

Groups rockets by their dominant propulsion chemistry and thermodynamic cycle at the **L3 Power Plant** level.

| Code | Name | Description | Example Vehicles | TL Range |
|------|------|-------------|------------------|----------|
| K-GG | Kerolox Gas-Generator | Open-cycle kerosene/LOX; simple, robust, moderate Isp | R-7, Atlas LV-3B, Falcon 9 Merlin | 7.0–7.6 |
| K-SC | Kerolox Staged Combustion | Closed-cycle kerolox; higher Isp, complex turbomachinery | NK-33, RD-180 | 7.2–7.8 |
| H-GG | Hydrolox Gas-Generator | Open-cycle hydrogen/LOX; highest Isp chemical | J-2, RL10-A | 7.2–7.8 |
| H-SC | Hydrolox Staged Combustion | Closed-cycle hydrolox; premium upper-stage performance | SSME (RS-25), RD-0120 | 7.4–8.0 |
| M-FF | Methalox Full-Flow | Full-flow staged combustion; reusable-optimized | Raptor, BE-4 | 7.6–8.2 |
| M-GG | Methalox Gas-Generator | Open-cycle methane/LOX; simpler than full-flow | Prometheus (ESA) | 7.6–8.0 |
| S-SEG | Solid Segmented | Segmented composite solid propellant | Shuttle SRB, Ariane 5 EAP | 7.0–7.6 |
| S-MONO | Solid Monolithic | Single-cast solid grain; smaller LV or strap-on | Minotaur, Pegasus | 7.0–7.4 |
| HYG | Hypergolic | Self-igniting storable propellants (N2O4/UDMH) | Proton, Long March 2/3/4 upper stages | 7.0–7.6 |
| NTR | Nuclear Thermal | Fission-heated hydrogen; doubled Isp vs chemical | NERVA (planned), RD-0410 | 7.8–8.4 |
| E-ION | Electric Ion | Solar/nuclear-powered ion grid; very high Isp, low thrust | Dawn, BepiColombo | 7.6–8.6 |
| HYB | Hybrid | Combined solid fuel + liquid oxidizer | SpaceShipOne, Virgin Galactic | 7.2–7.6 |

**Multi-Engine Rule:** If a Stage uses multiple Power Plants of different cycles, the Stage inherits the **highest-complexity** code (FF > SC > GG > S-SEG > S-MONO). A hydrolox upper stage on a kerolox booster is tagged `K-GG/H-SC` (slash notation).

---

## 3. Secondary Axis: Stage Configuration (STG-CFG)

Describes the vertical stack arrangement at the **L1 Stage** level.

| Code | Name | Description | Example |
|------|------|-------------|---------|
| 1S | Single-Stage | No staging; air-breathing or SSTO attempt | (none historically successful to orbit) |
| 2S | Two-Stage | Booster + upper stage | Atlas V, Delta IV, Ariane 6 |
| 3S | Three-Stage | Booster + upper + kick stage | Saturn V (S-IC/S-II/S-IVB), Long March 5 |
| 2S+S | Two-Stage + Strapons | Core with parallel solid/liquid boosters | Ariane 5, GSLV Mk III, H-IIA |
| 2S+SL | Two-Stage + Strapon Liquid | Core with parallel liquid boosters | Delta IV Heavy, Falcon Heavy |
| 2S+R | Two-Stage Reusable | Booster returns to landing site | Falcon 9, Starship (full reusable) |
| 3S+R | Three-Stage Reusable | Multi-stage with reusable first stage | New Glenn (planned) |

**Strapon Count Suffix:** Append count if >2: `2S+S4` = core + 4 solids.

---

## 4. Tertiary Axis: Mission Class & Origin (MIS-ORG)

Combines the vehicle's design origin with its primary mission envelope.

| Code | Origin | Visual Style Modifier |
|------|--------|----------------------|
| USA | United States | Sleek, aerodynamic, white/black with logo |
| USSR | Soviet/Russian | Blocky, utilitarian, green/gray |
| EUR | European (ESA) | Modular, clean, white/blue |
| CHN | Chinese (CNSA) | National red/white, incremental evolution |
| JPN | Japanese (JAXA) | Compact, precision-engineered |
| IND | Indian (ISRO) | Cost-optimized, PSLV/GSLV family logic |
| MLT | Middle Power / Commercial | Mixed heritage, commercial livery |

| Suffix | Mission Class |
|--------|---------------|
| -LEO | Low Earth Orbit (≤2,000 km) |
| -GTO | Geostationary Transfer Orbit |
| -TLI | Trans-Lunar Injection |
| -IP | Interplanetary |
| -HVM | Heavy / Super-Heavy (>50 t to LEO) |
| -CREW | Human-rated |

**Combined Example:** `USA-LEO` = American LEO launcher. `CHN-HVM` = Chinese heavy-lift.

---

## 5. Classification String Format

A full classification is written as:

```
[PROP-ARC]/[STG-CFG]/[MIS-ORG]-[MISSION]
```

### Examples

| Vehicle | Classification | Breakdown |
|---------|---------------|-----------|
| Saturn V | `H-GG/3S/USA-TLI` | Hydrolox upper on kerolox booster (simplified), 3-stage, American lunar |
| Falcon 9 Block 5 | `K-GG/2S+R/USA-LEO` | Kerolox GG, 2-stage reusable, American LEO |
| Falcon Heavy | `K-GG/2S+SL2+R/USA-HVM` | Kerolox GG, 2-stage + 2 liquid strapons reusable, American heavy |
| Ariane 5 ECA | `H-SC/2S+S2/EUR-GTO` | Hydrolox staged combustion upper, 2-stage + 2 solids, European GTO |
| Soyuz-2.1b | `K-GG/2S+S4/USSR-LEO` | Kerolox GG, 2-stage + 4 solids, Russian LEO |
| Starship (full stack) | `M-FF/2S+R/USA-HVM` | Methalox full-flow, 2-stage reusable, American super-heavy |
| Long March 5 | `H-GG/3S/CHN-GTO` | Kerolox boosters + hydrolox upper, 3-stage, Chinese GTO |
| SLS Block 1 | `H-SC/2S+S2/USA-TLI` | SSME hydrolox + solids, 2-stage + 2 solids, American lunar |
| Vulcan Centaur | `H-SC/2S+S2/USA-GTO` | BE-4 methalox + RL10 hydrolox, 2-stage + 2 solids, American GTO |
| Proton-M | `HYG/3S/USSR-GTO` | Hypergolic all stages, 3-stage, Russian GTO |
| Delta IV Heavy | `H-SC/2S+SL2/USA-GTO` | Hydrolox staged combustion, 2-stage + 2 liquid cores, American GTO |

---

## 6. Program Deviation Tags (Optional)

Appended in brackets after the main classification when batch quirks are known.

| Tag | Meaning |
|-----|---------|
| `[+M]` | +mass variant (heavier dry mass than nominal) |
| `[-M]` | -mass variant (lighter dry mass) |
| `[+I]` | +Isp variant (improved engine performance) |
| `[-I]` | -Isp variant (reduced engine performance) |
| `[+C]` | +cost variant (expensive upgrades) |
| `[R]` | Re-certification / re-flight hardware |
| `[B]` | Block upgrade (major revision) |

**Example:** `K-GG/2S+R/USA-LEO [+I][B5]` = Falcon 9 Block 5 with improved Isp.

---

## 7. Player-Facing "Card" Format

For the PWA library view, each vehicle displays a compact badge:

```
┌─────────────────────────┐
│ FALCON 9 BLOCK 5        │
│ ─────────────────────── │
│ K-GG / 2S+R / USA-LEO   │
│ TL 7.6  |  PMR 9        │
│ LEO: 22.8 t  |  GTO: 8.3t│
│ ΔV: 9,450 m/s (stack)   │
└─────────────────────────┘
```

---

## 8. Taxonomy Derivation from 3-Level BOM

Given any MSDS design, the classification is **automatically generated**:

1. **PROP-ARC:** Scan all L3 Power Plants. Pick the highest-complexity cycle. If multiple chemistries exist, list dominant booster chemistry first, then upper stage (slash notation).
2. **STG-CFG:** Count L1 Stages. Check for parallel boosters (straps). Check reusability flags on L2 Propulsion units.
3. **MIS-ORG:** Read the `origin` and `missionClass` fields from the Vehicle header.

No manual tagging required — the taxonomy is a **derived property** of the BOM.

---

## 9. Relationship to CE ShipGen

| CE ShipGen Concept | MSDS Taxonomy Equivalent |
|--------------------|--------------------------|
| Hull Code (A–Z) | STG-CFG + payload capacity |
| Configuration (Standard/Streamlined) | Reusability flag in STG-CFG |
| Drive Code | PROP-ARC (simplified to chemistry+cycle) |
| Power Plant Type | L3 Power Plant entry |
| M-Drive / J-Drive | L3 Drive entry (nozzle type) |

CE ShipGen uses **displacement tons** and **table lookups**; MSDS uses **mass (kg)** and **rocket equation** derivation. The taxonomy bridges both by describing the *physical architecture* independent of the calculation system.

---

## 10. Version History

| Version | Date | Changes |
|---------|------|---------|
| 0.1 | 2026-05-02 | Initial taxonomy with 12 PROP-ARC codes, 7 STG-CFG codes, origin+mission axes |
