# Mneme Ship Design System
## Version 0.1 — Foundational Mechanics
*Under Heaven / Cepheus Engine Compatible*

---

## 1. Design Philosophy

The Mneme Ship Design System (MSDS) is a **mass-based, delta-V-centric** vehicle construction framework. It replaces the displacement-ton abstraction of Cepheus Engine/Traveller with physically grounded engineering ratios, enabling players and GMs to build historically-inspired or speculative spacecraft whose performance emerges from their component choices rather than table lookups.

The system is simultaneously:
- A **reference tool** — model historical rockets (Saturn V, N1, Energia-Buran, Falcon 9, SLS, Starship)
- A **design tool** — build new vehicles within realistic engineering envelopes
- A **mini-game substrate** — simulate the political, financial, and human-capital tradeoffs of a national or commercial space program
- A **procedural generator** — seed-based creation of companies, engineers, and programs with Features and Bugs

**Core philosophy: the physics is non-negotiable; the politics is everything.**

---

## 2. Technology Level (TL) Framework

MSDS uses **decimal TLs** to represent decades of engineering maturity within a broad CE TL band.

| MSDS TL | CE TL | Mneme MTL | Era | Representative Program |
|---------|-------|-----------|-----|------------------------|
| TL 7.0  | 7     | MTL 7     | ~1950–57 | V-2 derivatives, Sputnik R-7 |
| TL 7.2  | 7     | MTL 7     | ~1958–62 | Mercury-Redstone, Vostok |
| TL 7.4  | 7     | MTL 8–9   | ~1963–69 | Apollo/Saturn V, N1 |
| TL 7.6  | 7     | MTL 9     | ~1970–79 | Skylab, Salyut, Viking landers |
| TL 7.8  | 7     | MTL 9     | ~1980–92 | Space Shuttle, Energia-Buran |
| TL 7.9  | 7–8   | MTL 9     | ~1993–03 | ISS assembly, Delta IV, Ariane 5 |
| TL 8.0  | 8     | MTL 9     | ~2004–14 | Falcon 1/9 early, Commercial Crew beginnings |
| TL 8.2  | 8     | MTL 9     | ~2015–22 | Falcon 9 reuse, New Shepard, SLS Block 1 |
| TL 8.4  | 8     | MTL 9     | ~2023–30 | Starship operational, Artemis Moon base |
| TL 8.6  | 8     | MTL 9     | ~2031–40 | Reliable reuse, orbital propellant depots |
| TL 8.8  | 8     | MTL 9     | ~2041–50 | Near-mature chemical propulsion ceiling |
| TL 9.0  | 8–9   | MTL 9–10  | ~2050+  | New Space Race era, early fusion/NTR |

**TL decimal also tracks engineering maturity**: a TL 7.4 design from a first-program nation performs worse than the same TL 7.4 design from an established space power. This is captured by the **Program Maturity Rating (PMR)**, described in Section 7.

---

## 3. Vehicle Taxonomy

MSDS uses the Atomic Rockets Payload/Propulsion (PLD/PRP) structural model, extended with specific functional roles.

### 3.1 Vehicle Function Codes

| Code | Name | Description |
|------|------|-------------|
| **LV** | Launch Vehicle | Ground-to-orbit; expendable or reusable booster stack |
| **Bst** | Booster | Strap-on or stage-zero augmentation |
| **Orb** | Orbiter | On-orbit operational vehicle; may be crewed |
| **TLI** | Trans-Lunar Injection Stage | Upper stage for lunar/deep-space departure burns |
| **LEV** | Lunar Excursion Vehicle | Descent/ascent from planetary/lunar surface |
| **OTV** | Orbital Transfer Vehicle | Orbit-to-orbit; low-thrust or high-thrust options |
| **SSt** | Space Station | Habitat; station-keeping delta-V and resupply logistics |
| **CSh** | Colony Ship | Long-duration crewed interplanetary; TL 9+ |
| **CNT** | CNT Tether Vessel | Skyhook/Inertia Bank; TL 9–10 |

### 3.2 Mission Leg Structure

Every mission is decomposed into **legs**. Each leg has its own delta-V budget, propellant load, and payload definition. What is **payload** on one leg may become **dead mass** on another.

```
Example: Apollo-style Lunar Mission
Leg 1: Earth Surface → LEO         (LV: Saturn V S-IC + S-II)
Leg 2: LEO → TLI burn              (LV: Saturn V S-IVB — first burn)
Leg 3: TLI → LOI                   (S-IVB — second burn / passive coast)
Leg 4: LOI → LLO                   (CSM SPS engine)
Leg 5: LLO → Lunar Surface         (LEM Descent Stage)
Leg 6: Lunar Surface → LLO         (LEM Ascent Stage)
Leg 7: LLO → TEI                   (CSM SPS engine)
Leg 8: TEI → Earth Atmospheric Entry (passive + SM jettison)
```

---

## 4. Core Mechanics: Mass Budget & Delta-V

### 4.1 The Tyranny of the Rocket Equation

All delta-V calculations use the **Tsiolkovsky Rocket Equation**:

```
ΔV = Isp × g₀ × ln(m_wet / m_dry)

Where:
  Isp    = Specific impulse (seconds)
  g₀     = 9.80665 m/s² (standard gravity)
  m_wet  = Wet mass (structural + propellant + payload)
  m_dry  = Dry mass (structural + payload, no propellant)
```

The **mass ratio** (m_wet / m_dry) is the central engineering tension in MSDS. Every design decision is ultimately a trade between mass ratio and delivered payload.

### 4.2 Mass Categories

Every component in the Bill of Materials (BOM) is assigned to one of four mass categories:

| Category | Code | Description |
|----------|------|-------------|
| **Structural Mass** | Ms | Tank walls, frames, fairings, engine bells, avionics, TPS, landing gear |
| **Propellant Mass** | Mp | Fuel + oxidizer (wet mass − dry mass) |
| **Payload Mass** | Mpld | Mission cargo: crew, satellites, landers, upper stages |
| **Residual/Reserve** | Mr | Unusable propellant, RCS reserve, contingency margin |

**Total Wet Mass** = Ms + Mp + Mr + Mpld  
**Total Dry Mass** = Ms + Mr + Mpld  
**Propellant Fraction (ξ)** = Mp / (Ms + Mp) — structural efficiency metric  

### 4.3 Mass Fractions as Design Targets

These are engineering targets derived from historical data. Designs that fall outside these ranges should trigger a Feature or Bug flag (see Section 7).

**Propellant Fraction Targets by TL and Stage Type:**

| Stage Type | TL 7.2–7.4 | TL 7.6–7.8 | TL 8.0–8.2 | TL 8.4+ |
|------------|------------|------------|------------|---------|
| Large kerolox booster | 0.88–0.91 | 0.90–0.93 | 0.91–0.94 | 0.93–0.95 |
| Large hydrolox upper stage | 0.85–0.88 | 0.87–0.91 | 0.89–0.92 | 0.91–0.94 |
| Small storable upper stage | 0.84–0.87 | 0.85–0.88 | 0.86–0.89 | 0.87–0.91 |
| Reusable booster (propellant reserve) | — | — | 0.85–0.89 | 0.88–0.92 |

*Note: Reusable stages carry additional propellant for landing burns, reducing effective payload fraction.*

### 4.4 Staging

Multi-stage vehicles are modeled as a **series of single-stage calculations**, applied inward from the outermost stage. The payload of Stage N is the fully-loaded mass of Stage N+1 plus mission payload.

```
Total Vehicle ΔV = ΔV(Stage 1) + ΔV(Stage 2) + ... + ΔV(Stage N)
```

---

## 5. Bill of Materials Structure

### 5.1 BOM Categories

Each stage in the vehicle has a BOM organized as follows:

```
STAGE BOM
├── STRUCTURE
│   ├── Tankage (fuel tank, oxidizer tank — separate for cryogenic)
│   ├── Interstage / Fairing
│   ├── Frame / Skirt
│   └── Thermal Protection System (TPS) [if applicable]
├── PROPULSION SYSTEM
│   ├── Engine(s) [type, count, thrust, Isp_vac, Isp_sl, T/W ratio]
│   ├── Engine Mount / Gimbal System
│   ├── Turbopumps / Pressurization System
│   └── Thrust Vector Control (TVC)
├── PROPELLANT
│   ├── Fuel [type, mass]
│   ├── Oxidizer [type, mass, O/F ratio]
│   └── Pressurant / Residuals
├── AVIONICS & CONTROL
│   ├── Inertial Navigation
│   ├── Flight Computer
│   ├── Telemetry / Communication
│   └── Range Safety / Destruct
├── RECOVERY SYSTEM [if reusable]
│   ├── Grid Fins / Aerosurfaces
│   ├── Landing Legs
│   └── Heat Shield [if applicable]
└── PAYLOAD INTERFACE
    ├── Payload Adapter / Fairing
    └── Separation System
```

### 5.2 BOM Line Item Format

Each BOM entry uses this format:

```
| Component          | Qty | Unit Mass (kg) | Total Mass (kg) | TL Min | Cost Index | Notes |
```

**Cost Index** is a relative cost multiplier (not absolute currency). The base is "1.0 = mature TL 7.8 production rate." Early TL and advanced TL both have higher cost indices. Cost is also affected by Program Maturity Rating (PMR) and political modifiers.

---

## 6. Propulsion Reference Table

### 6.1 Engine Types by TL

| Engine | Propellant | Isp (SL) | Isp (Vac) | T/W | TL Min | Notes |
|--------|-----------|----------|-----------|-----|--------|-------|
| Turbopump Kerolox | LOX/RP-1 | 263–289 s | 304–330 s | 50–90 | 7.0 | RD-107, F-1, Merlin 1D |
| Turbopump Hydrolox | LOX/LH2 | 363–381 s | 421–452 s | 50–75 | 7.2 | J-2, RL-10, RS-25 |
| Hypergolic storable | N₂O₄/UDMH | 280–292 s | 311–325 s | 40–65 | 7.0 | RD-253, AJ10, R-40 |
| Solid (HTPB) | Solid | 230–250 s | 260–295 s | 60–140 | 7.0 | SRB, GEM, Castor |
| Full-flow staged combustion | LOX/CH4 | 320–330 s | 356–380 s | 90–120 | 8.2 | Raptor (Starship) |
| Full-flow staged combustion | LOX/LH2 | 425–445 s | 456–475 s | 75–95 | 8.6 | Hypothetical advanced |
| Nuclear Thermal Rocket | LH2 | — | 800–1000 s | 3–10 | 9.0 | NERVA heritage |

*T/W = Thrust-to-Weight ratio (engine only, sea level thrust vs. engine dry mass × g₀)*

### 6.2 Delta-V Budget Reference (Earth Launches)

| Mission | ΔV Required | Notes |
|---------|------------|-------|
| LEO (200 km, equatorial) | ~9,300–9,500 m/s | Includes gravity/drag losses ~1,500 m/s |
| LEO (28.5°, Kennedy) | ~9,400 m/s | Standard reference |
| GTO (geostationary transfer) | ~12,000 m/s from ground | LV brings to GTO; apogee kick by satellite |
| TLI (trans-lunar injection) | ~3,130 m/s from LEO | C3 = 0 for lunar |
| LOI (lunar orbit insertion) | ~900–1,000 m/s | From free-return trajectory |
| Lunar Landing | ~1,800–2,100 m/s | Descent from LLO to surface |
| Lunar Ascent | ~1,800–1,900 m/s | Surface to LLO |
| TEI (trans-earth injection) | ~800–900 m/s | From LLO |

---

## 7. Features, Bugs & Program Maturity

### 7.1 Engineering Variance

No design is perfectly average. The MSDS uses **Features** (above-average capabilities) and **Bugs** (below-average limitations) to characterize every vehicle design. These emerge from:

- **Program Maturity Rating (PMR)** — 1 (first attempt) to 10 (fully mature)
- **National/Organization Trait modifiers** (see Section 8)
- **Specific component dice rolls** during procedural generation

A design rolls on the Feature/Bug table for each major subsystem during initial design. The number of rolls (and ratio of Features to Bugs) is determined by PMR + TL + organizational traits.

### 7.2 Program Maturity Rating (PMR)

| PMR | Description | Feature Rolls | Bug Rolls | Cost Modifier |
|-----|------------|--------------|----------|---------------|
| 1 | First national program | 0 | 2 | ×3.5 |
| 2 | Early heritage, external help | 1 | 2 | ×2.8 |
| 3 | First independent development | 1 | 1 | ×2.2 |
| 4 | Second generation program | 2 | 2 | ×1.8 |
| 5 | Established national capability | 2 | 1 | ×1.4 |
| 6 | Mature program, lessons learned | 3 | 1 | ×1.2 |
| 7 | Multiple successful programs | 3 | 1 | ×1.0 (baseline) |
| 8 | World-class; technological edge | 4 | 0 | ×0.9 |
| 9 | Commercial optimization complete | 4 | 0 | ×0.75 |
| 10 | Dominant market position | 5 | 0 | ×0.6 |

### 7.3 Feature & Bug Sample Tables

**Propulsion Features:**
- Engine Isp +3–8% (breakthrough combustion efficiency)
- Engine T/W ratio +10–15% (weight-optimized turbomachinery)
- Engine restartability without modification (enables mission flexibility)
- Propellant boiloff reduction (advanced insulation; +0.5% useful payload)
- Engine-out capability at no T/W penalty (redundant architecture)

**Propulsion Bugs:**
- Engine Isp −3–6% (combustion instability margin requirement)
- Engine T/W −8–12% (conservative structural margins)
- Single-engine-out causes abort (no redundancy in design)
- Propellant loading requires additional pre-launch time (+2–6 hr)
- Engine requires complex re-certification between flights

**Structural Features:**
- Propellant fraction +1.5–3% (advanced lightweight alloys)
- Fairing volume +15% with no mass penalty
- TPS reusability rating: 10+ flights nominal

**Structural Bugs:**
- Propellant fraction −2–4% (conservative structures, early design)
- Tank pressurization system anomaly history (reliability penalty)
- Vehicle requires conditioning period after launch exposure (reuse delay)

---

## 8. Procedural Design: Entities, Proponents & Organizations

### 8.1 Nation/Organization Generation

When generating a rocket program, the player or GM rolls (or seeds) the following:

**Nation Traits (roll 1d6 for each):**

| Trait | Low (1–2) | Medium (3–4) | High (5–6) |
|-------|-----------|-------------|-----------|
| Industrial Base | Dependent imports | Mixed capacity | Domestic full-stack |
| Engineering Culture | Risk-averse, low PMR growth | Balanced | Risk-tolerant, fast PMR growth |
| Political Stability | Frequent redirection (scope creep +++) | Moderate | Stable mandate (PMR grows faster) |
| Funding Reliability | Boom-bust (year-to-year variance) | Multi-year but volatile | Multi-decade commitment |
| International Openness | Isolated (no tech transfer) | Mixed | Open (faster TL catch-up) |
| Commercial Ecosystem | None | Nascent | Vibrant (cost multiplier reduction) |

### 8.2 The Proponent

Every rocket program has a **Proponent** — the individual who navigates the political and organizational landscape to make the program happen. The Proponent's archetype shapes what obstacles they face and what tools they have.

| Archetype | Base Stat Bonuses | Primary Risk |
|-----------|-----------------|-------------|
| Government Administrator | Political Capital +++, Budget Access +++ | Scope Creep, Congressional Compromise |
| Military Officer | Mandate Stability +++, Fast Procurement | Classified constraints, mission drift |
| Billionaire Founder | Risk Tolerance +++, Speed +++, Cost Discipline +++ | Regulatory friction, talent poaching |
| Scientist/Chief Designer | Technical Vision +++, PMR growth +++ | Funding vulnerability, political naivety |
| Career Politician | Coalition Building +++, Public Support +++ | Short time horizon, pork barrel pressure |

### 8.3 Program Events

During design and development, the program rolls on event tables each "season" (representing 1–2 years). Events may add Features, Bugs, cost penalties, or delay the program:

- **Scope Creep:** A political stakeholder adds a requirement. Vehicle mass goes up; PMR growth slows.
- **Technical Breakthrough:** A team solves a hard problem early. Feature roll bonus.
- **Budget Cut:** Funding reduced 20–40%. Development time extends; some subsystems are de-scoped.
- **Key Personnel Loss:** Chief designer or lead engineer leaves/dies. PMR growth penalty for 1–2 seasons.
- **Competitor Milestone:** A rival achieves orbit. Political Capital bonus but mandate pressure increases.
- **Procurement Reform:** Cost index reduced for this program for 2 seasons.
- **Safety Stand-down:** A near-miss or failure causes a review. Development pauses but Bug is corrected.

---

## 9. Saturn V Reference BOM (TL 7.4 Baseline)

This is the calibration vehicle. All MSDS mass ratios, Isp values, and cost indices for TL 7.4 are normalized against this design.

### Saturn V Overview

| Parameter | Value |
|-----------|-------|
| Total Height | 110.6 m |
| Total Launch Mass | 2,970,000 kg |
| LEO Payload | 130,000 kg |
| TLI Payload | 48,600 kg |
| Lunar Surface Payload | ~45,000 kg (CSM+LEM stack) |
| Total ΔV (first 3 stages) | ~9,200 m/s + margins |

### Stage S-IC (First Stage)

| Component | Qty | Unit Mass (kg) | Total Mass (kg) | Category |
|-----------|-----|---------------|----------------|----------|
| Propellant — LOX | — | — | 1,311,100 | Mp |
| Propellant — RP-1 | — | — | 646,700 | Mp |
| Tanks + structure | — | — | 86,000 | Ms |
| F-1 Engine | 5 | 8,391 | 41,955 | Ms |
| Engine mount / thrust frame | — | — | 4,200 | Ms |
| Interstage | — | — | 4,000 | Ms |
| Fins | 4 | 900 | 3,600 | Ms |
| Avionics / EDS | — | — | 1,200 | Ms |
| Residuals / reserves | — | — | 6,000 | Mr |
| **Stage Wet Mass** | | | **~2,100,000** | |
| **Stage Dry Mass** | | | **~143,000** | |
| **Propellant Fraction ξ** | | | **~0.932** | |
| **Isp (average SL/Vac blend)** | | | **~297 s** | |
| **Stage ΔV** | | | **~3,750 m/s** | |

### Stage S-II (Second Stage)

| Component | Qty | Unit Mass (kg) | Total Mass (kg) | Category |
|-----------|-----|---------------|----------------|----------|
| Propellant — LOX | — | — | 299,000 | Mp |
| Propellant — LH2 | — | — | 72,700 | Mp |
| Tanks + structure | — | — | 24,800 | Ms |
| J-2 Engine | 5 | 1,567 | 7,835 | Ms |
| Engine mount / thrust frame | — | — | 900 | Ms |
| Interstage (lower) | — | — | 4,100 | Ms |
| Ullage + pressurization | — | — | 1,100 | Ms |
| Avionics | — | — | 600 | Ms |
| Residuals | — | — | 2,500 | Mr |
| **Stage Wet Mass** | | | **~481,000** | |
| **Stage Dry Mass** | | | **~107,000** | |
| **Propellant Fraction ξ** | | | **~0.778** | |
| **Isp (vacuum)** | | | **~421 s** | |
| **Stage ΔV** | | | **~4,800 m/s** | |

*Note: S-II propellant fraction appears lower due to the mass of the common bulkhead and LH2 tank geometry.*

### Stage S-IVB (Third Stage — dual-burn TLI)

| Component | Qty | Unit Mass (kg) | Total Mass (kg) | Category |
|-----------|-----|---------------|----------------|----------|
| Propellant — LOX | — | — | 78,000 | Mp |
| Propellant — LH2 | — | — | 19,200 | Mp |
| Tanks + structure | — | — | 7,000 | Ms |
| J-2 Engine | 1 | 1,567 | 1,567 | Ms |
| Auxiliary Propulsion System | — | — | 400 | Ms |
| Instrument Unit (IU) | — | — | 2,041 | Ms |
| Residuals | — | — | 900 | Mr |
| **Stage Wet Mass** | | | **~119,000** | |
| **Stage Dry Mass** | | | **~22,000** | |
| **Propellant Fraction ξ** | | | **~0.815** | |
| **Isp (vacuum)** | | | **~421 s** | |
| **Stage ΔV (combined LEO injection + TLI)** | | | **~3,100+3,200 m/s** | |

### Apollo CSM + LEM Stack (Payload to TLI)

| Component | Mass (kg) |
|-----------|----------|
| Command Module (CM) | 5,800 |
| Service Module (SM) propellant | 18,410 |
| SM structure/engine | 6,100 |
| Lunar Module (LEM) — descent | 10,334 |
| LEM ascent stage | 4,670 |
| Spacecraft-LM Adapter | 1,800 |
| **Total Payload (TLI-bound)** | **~47,100 kg** |

---

## 10. Calibration Criteria & Variance Envelope

Before any new vehicle design is considered "validated" in MSDS, it must pass the following checks:

### 10.1 Propellant Fraction Check
Each stage's ξ must fall within ±3% of the TL-appropriate target range (Section 4.3). Values outside this range require a Feature (if better) or Bug (if worse) assignment.

### 10.2 Delta-V Stack Check
Total vehicle ΔV must meet the mission's required ΔV plus a contingency:
- Earth-to-LEO: Required ΔV ≥ 9,200 m/s
- Lunar mission (full stack): Required ΔV ≥ 16,000 m/s total (all legs)

### 10.3 T/W Check at Liftoff
Vehicle liftoff T/W must be ≥ 1.15 (standard) or ≥ 1.30 (high-performance TL 8+). Below 1.15 is a Bug.

### 10.4 Payload Fraction Check
Payload fraction (payload / launch mass) should fall within the following bounds:

| Mission Class | TL 7.4 Range | TL 7.8 Range | TL 8.4 Range |
|--------------|-------------|-------------|-------------|
| LEO | 2.5–4.5% | 3.0–5.0% | 4.0–6.5% |
| GTO | 1.0–2.0% | 1.2–2.5% | 2.0–3.5% |
| TLI | 1.0–1.8% | 1.2–2.0% | 1.5–2.5% |

Saturn V LEO: 130,000 / 2,970,000 = **4.37%** ✓ (within TL 7.4 range)

---

## 11. Space Station Module (Optional Extension)

Space stations are defined by:

| Parameter | Description |
|-----------|-------------|
| Habitable Volume (m³) | Pressurized volume per crew member (min: 15 m³/person, standard: 40–80 m³) |
| Station Mass (kg) | Total mass of all modules and hardware |
| Crew Complement | Sustained crew capacity |
| Supply Requirement (kg/person/day) | Consumables: ~5.0 kg at TL 7.4–7.8, ~4.0 kg at TL 8.0+ |
| Station-Keeping ΔV/year (m/s) | Atmospheric drag compensation; ~100–200 m/s/yr at 400 km ISS altitude |
| Propellant for Station-Keeping | Derived from ΔV and station mass via rocket equation |

Resupply missions are modeled as standard cargo LV designs with a fixed payload mass equal to the periodic supply requirement.

---

## 12. Progression Roadmap

### TL 7.x Vehicle Calibration Queue

1. **Saturn V (Apollo)** — TL 7.4 ✓ (this document)
2. **N1 / Soyuz stack** — TL 7.4, Soviet architecture, PMR 4 (many Bugs; historic)
3. **Saturn IB** — TL 7.4, orbital station ferry, smaller vehicle calibration
4. **Space Shuttle System** — TL 7.8, reusable orbiter + SRB + ET, complex BOM
5. **Energia-Buran** — TL 7.8, alternative architecture; "survivable if funded" case study
6. **Ariane 5** — TL 7.9, European commercial, no crewed heritage
7. **Delta IV Heavy** — TL 8.0, transition to commercial era

### TL 8.x Vehicle Calibration Queue

1. Falcon 9 Block 5 (reuse mechanics introduction)
2. Starship (full-flow staged combustion, propellant depot logic)
3. SLS Block 1 / Block 2 (government program cost model; political modifiers)
4. New Glenn / Vulcan (competitive commercial market modeling)

### TL 9.0+ Preview

At TL 9.0, the following new propulsion categories become available:
- Nuclear Thermal Rocket (NTR): Isp 800–1,000 s
- Solar Electric Propulsion (high-thrust variant): Isp 1,500–3,000 s  
- Early Fusion drive (research prototype): Isp 5,000–15,000 s
- Skyhook / CNT Tether networks replace LVs for routine LEO access

---

## 13. PWA / App Feature Specification

The companion PWA will implement:

1. **BOM Builder** — component-by-component mass entry, auto-calculates ΔV per stage and total
2. **Historical Vehicle Library** — pre-built BOMs for all calibration vehicles
3. **Rocket Equation Calculator** — real-time Isp × ln(mass ratio) display
4. **Stage Sizing Tool** — given mission ΔV and engine Isp, back-calculates required propellant fraction
5. **Feature/Bug Generator** — seeded random roll with program maturity modifier
6. **Vehicle Modifier** — take a historical vehicle, adjust parameters, see performance delta
7. **Procedural Company Generator** — NPF-based company/engineer/program generation
8. **Mission Planner** — leg-by-leg ΔV budget with stage assignment
9. **Godot 3D Bridge** — export BOM to component placement data for Godot vehicle builder

---

*Document Status: v0.1 Draft — Saturn V calibration anchor established. Awaiting PWA BOM validation pass before declaring TL 7.4 baseline locked.*

*Next step: Build PWA BOM calculator with Saturn V as the seed vehicle, validate mass fractions within ±5% of published data, then generate N1 as the first procedural comparison.*
