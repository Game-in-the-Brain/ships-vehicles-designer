# Mneme Vehicle Component System
## 3-Level Hierarchy Specification
*Under Heaven / Cepheus Engine Compatible — MSDS v0.2 Extension*

---

## 1. Design Goal: Three Levels, No Deeper

The human working memory holds **3–4 chunks** comfortably. MSDS keeps vehicle design to **exactly three levels of nesting** so a player or GM can hold the entire stack in their head without notes.

> **Rule:** If a design wants a 4th level, that level gets promoted to a 3rd-level component type, or the hierarchy is re-factored.

### The Three Levels

```
LEVEL 1 — STAGE
├── Payload (PLD)
└── Propulsion System (PRP)
    ├── LEVEL 2 — ENGINE
    │   ├── LEVEL 3 — POWER PLANT
    │   └── LEVEL 3 — DRIVE
    └── LEVEL 2 — FUEL
```

A **multi-stage vehicle** is a stack of Level-1 Stages. Each Stage has its own Propulsion System. A Propulsion System may contain **one or more Engines** (Level 2) sharing a common Fuel source.

---

## 2. Level 1: Stage (Payload + Propulsion)

A Stage is the atomic unit of vehicle design. It is what gets thrown away (or recovered) during flight.

| Field | Symbol | Description |
|-------|--------|-------------|
| **Payload** | Mpld | Everything this stage carries: cargo, crew, upper stages, fairings |
| **Propulsion System** | PRP | Everything that pushes: engines + fuel + tanks + plumbing |
| **Stage Wet Mass** | Mwet | Mpld + Ms(structure) + Mp(propellant) + Mr(residuals) |
| **Stage Dry Mass** | Mdry | Mpld + Ms(structure) + Mr(residuals) (no propellant) |

### Stage Abstraction for Players

For non-engineers, a Stage is described as:

> **"This stage carries [Payload] and pushes with [Engine count] × [Engine name] burning [Fuel type] for [Burn time]."**

Example — Saturn V First Stage:
> "Stage 1 carries the entire upper rocket (Stage 2 + 3 + spacecraft) and pushes with 5 × F-1 engines burning kerolox for 150 seconds."

---

## 3. Level 2: Propulsion = Engine + Fuel

### Engine (Level 2)

The Engine is the **thrust-producing machine**. It is a black box at Level 2. Its internals (Power Plant + Drive) are only opened when repairing, modifying, or researching.

| Field | Symbol | Unit | Description |
|-------|--------|------|-------------|
| Thrust (Sea Level) | Fsl | kN | Thrust at sea level |
| Thrust (Vacuum) | Fvac | kN | Thrust in vacuum |
| Specific Impulse (SL) | Ispsl | s | Efficiency at sea level |
| Specific Impulse (Vac) | Ispvac | s | Efficiency in vacuum |
| Engine Dry Mass | Meng | kg | Mass of engine hardware only |
| Engine Count | Neng | — | Number of identical engines in this stage |
| **Total Engine Mass** | Ms_eng | kg | Neng × Meng |

### Fuel (Level 2)

Fuel is the **combined propellant mass** (fuel + oxidizer + pressurant) stored in the stage's tanks. The Fuel block also carries the tank mass.

| Field | Symbol | Unit | Description |
|-------|--------|------|-------------|
| Fuel Type | — | — | Chemical family: kerolox, hydrolox, hypergolic, methalox, solid |
| Propellant Mass | Mp | kg | Usable propellant |
| Tank + Structure Mass | Ms_tank | kg | Tank walls, insulation, frames |
| O/F Ratio | OF | — | Oxidizer-to-fuel mass ratio |
| Residuals | Mr | kg | Unusable propellant, ullage, reserves |

---

## 4. Level 3: Engine Internals (Power Plant + Drive)

This level is only opened when **designing, modifying, or tech-advancing** an engine. In normal play, the Engine (Level 2) is treated as a single component.

### Power Plant

The **Power Plant** is the energy-generation core. It determines the thermodynamic cycle and propellant chemistry.

| Type | Cycle | TL | Isp(vac) | T/W | Notes |
|------|-------|-----|----------|-----|-------|
| Gas-Generator Kerolox | Open cycle | 7.0 | 304–330 s | 50–90 | RD-107, F-1, Merlin 1A |
| Gas-Generator Hydrolox | Open cycle | 7.2 | 421–452 s | 50–75 | J-2, RL-10A |
| Staged Combustion Kerolox | Closed cycle | 7.4 | 320–340 s | 70–100 | NK-33, RD-180 |
| Staged Combustion Hydrolox | Closed cycle | 7.6 | 450–465 s | 65–85 | RS-25, RD-0120 |
| Full-Flow Staged Methalox | Closed cycle | 8.2 | 356–380 s | 90–120 | Raptor |
| Full-Flow Staged Hydrolox | Closed cycle | 8.6 | 456–475 s | 75–95 | Advanced (theoretical) |
| Nuclear Thermal Rocket | Solid core | 9.0 | 800–1,000 s | 3–10 | NERVA heritage |
| Nuclear Electric | Ion / Hall | 9.0 | 1,500–3,000 s | 0.01–0.1 | Dawn, NEXT |
| Fusion Thermal | Magnetic confinement | 10.0 | 5,000–15,000 s | 0.1–1 | Research concept |

### Drive

The **Drive** is the thrust-delivery mechanism: nozzle, magnetic field, or sail.

| Type | Form | TL | Efficiency | Notes |
|------|------|-----|------------|-------|
| Fixed Bell Nozzle | Conventional | 7.0 | 95–98% | F-1, RD-107 |
| Gimbaled Bell Nozzle | TVC-capable | 7.0 | 95–98% | Merlin, J-2 |
| Extendable Nozzle | Vacuum-optimized | 7.4 | 98–99% | RL-10B, Vinci |
| Aerospike | Altitude-compensating | 7.8 | 97–99% | RS-2200 (never flown) |
| Magnetic Nozzle | Plasma containment | 9.0 | 80–90% | NTR / fusion |
| Ion Grid | Electrostatic | 9.0 | 90–95% | NSTAR, NEXT |
| Solar Sail | Photon pressure | 8.0 | — | IKAROS, LightSail |
| Light Sail (Laser) | Beamed energy | 9.5 | — | Breakthrough Starshot concept |

### Engine Assembly Rule

```
Engine (Level 2) = Power Plant (Level 3) + Drive (Level 3)
```

The Engine's **Isp** and **Thrust** are determined by the Power Plant's thermodynamics, modified by the Drive's delivery efficiency.

```
Engine Isp(vac) = Power Plant Isp(vac) × Drive Efficiency
Engine Thrust(vac) = Power Plant Thrust(vac) × Drive Efficiency
Engine Mass = Power Plant Mass + Drive Mass + 5% coupling margin
```

---

## 5. Technology Level (TL) Fractions for Components

Mneme MSDS uses **decimal TLs** (7.0, 7.2, 7.4, etc.) where each 0.2 step is roughly a decade. Component TLs use **0.1 increments** to represent 5-year technology generations within a decimal band.

### TL Fraction Meaning

| Fraction | Time Span | Description |
|----------|-----------|-------------|
| .0 | Baseline | First operational generation |
| .1 | +5 years | Minor refinement: mass reduction, reliability |
| .2 | +10 years | Major revision: new alloy, improved turbopump |
| .3 | +15 years | Significant redesign: T/W +10%, Isp +3% |
| .4 | +20 years | Near-mature: incremental gains only |

### Component TL Examples

**Power Plant: Turbopump Kerolox Family**

| Component | TL | Era | Notes |
|-----------|-----|-----|-------|
| RD-107 (R-7) | 7.0 | 1957 | First Soviet orbital engine |
| F-1 (Saturn V) | 7.0 | 1967 | Largest single-chamber engine |
| Merlin 1A (Falcon 1) | 8.0 | 2006 | Gas-generator, ablative nozzle |
| Merlin 1C | 8.1 | 2008 | Regenerative cooling |
| Merlin 1D | 8.2 | 2013 | Higher T/W, throttle capability |
| Merlin 1D+ | 8.3 | 2018 | Throttle to 39%, 190,000+ flights |

**Power Plant: Staged Combustion Hydrolox Family**

| Component | TL | Era | Notes |
|-----------|-----|-----|-------|
| J-2 (Saturn) | 7.2 | 1966 | Gas-generator hydrolox upper stage |
| RL-10A | 7.4 | 1963 | First hydrolox engine (Centaur) |
| RS-25 (SSME) | 7.8 | 1981 | Staged combustion, reusable |
| RL-10C-1 | 8.0 | 2014 | Improved chamber, extendable nozzle |
| Vinci | 8.2 | 2024 | Expandable nozzle, 180 kN |

**Drive: Bell Nozzle Family**

| Component | TL | Era | Notes |
|-----------|-----|-----|-------|
| Fixed Ablative Bell | 7.0 | 1950s | V-2, early rockets |
| Regenerative Gimbaled Bell | 7.0 | 1960s | F-1, RD-107 |
| Extendable Vacuum Bell | 7.4 | 1970s | RL-10B, drop skirt |
| Carbon-Carbon Throat Bell | 7.8 | 1990s | RS-68, longer life |
| 3D-Printed Channel Wall Bell | 8.2 | 2010s | Merlin 1D, reduced parts |

---

## 6. Multi-Stage Vehicle: The Stack Abstraction

A multi-stage rocket is a **stack of Level-1 Stages**. The player sees it as a vertical list, top to bottom, with each stage numbered from the top (last to burn) or bottom (first to burn).

### Stage Stack Visualization

```
┌─────────────────────────────────────────┐
│  STAGE 3: S-IVB (TL 7.2)               │ ← Payload: CSM+LEM
│  • Engine: 1 × J-2 (Gas-Gen Hydrolox)  │
│  • Fuel: 97,200 kg LOX/LH2             │
│  • Burn: ~150s + restart               │
├─────────────────────────────────────────┤
│  STAGE 2: S-II (TL 7.2)                │ ← Payload: Stage 3
│  • Engine: 5 × J-2                     │
│  • Fuel: 371,700 kg LOX/LH2            │
│  • Burn: ~360s                         │
├─────────────────────────────────────────┤
│  STAGE 1: S-IC (TL 7.0)                │ ← Payload: Stage 2 + 3
│  • Engine: 5 × F-1 (Gas-Gen Kerolox)   │
│  • Fuel: 1,957,800 kg LOX/RP-1         │
│  • Burn: ~150s                         │
└─────────────────────────────────────────┘
```

### The Player-Facing Summary

For quick reference, every vehicle gets a **one-line summary**:

> **Saturn V (TL 7.4):** 3-stage kerolox/hydrolox LV. Stage 1: 5×F-1. Stage 2: 5×J-2. Stage 3: 1×J-2. LEO: 130 t. TLI: 48 t.

---

## 7. Delta-V Flow: From Components to Mission

Delta-V is calculated **bottom-up**: Power Plant → Engine → Stage → Vehicle.

### Step 1: Engine ΔV (Level 2)

An Engine's available ΔV depends on the Fuel mass it can access and its own Isp:

```
ΔV_engine = Isp(vac) × g₀ × ln( (Meng + Mfuel) / (Meng + Mfuel_residual) )
```

In practice, engines share a Fuel pool, so we calculate at the Stage level.

### Step 2: Stage ΔV (Level 1)

```
ΔV_stage = Isp(vac) × g₀ × ln( Mwet_stage / Mdry_stage )

Where:
  Mwet_stage = Mpld + Ms + Mp + Mr
  Mdry_stage = Mpld + Ms + Mr
```

### Step 3: Vehicle ΔV (Multi-Stage)

```
ΔV_vehicle = ΔV_stage1 + ΔV_stage2 + ... + ΔV_stageN
```

Each stage's **Payload** is the wet mass of all stages above it.

### Interactive Delta-V Update

When a player changes any Level-3 component:

1. **Power Plant TL change** → Updates Isp, Thrust, Mass → Recalculate Engine stats
2. **Drive change** → Updates efficiency, mass → Recalculate Engine stats  
3. **Engine stats change** → Recalculate Stage Ms, Mdry, Mwet → Recalculate Stage ΔV
4. **Stage ΔV change** → Recalculate Vehicle total ΔV
5. **Compare to mission requirement** → Green (sufficient) / Yellow (marginal) / Red (insufficient)

---

## 8. Component Variety & Modular Design

### Engine Families

Engines are grouped into **families** sharing a Power Plant type. A family allows component swapping at Level 3 without redesigning the whole vehicle.

**Example: Merlin Family (Gas-Generator Kerolox)**

| Variant | Power Plant TL | Drive TL | Isp(vac) | Thrust(vac) | Mass | T/W |
|---------|---------------|----------|----------|-------------|------|-----|
| Merlin 1A | 8.0 | 7.0 (fixed ablative) | 304 s | 420 kN | 630 kg | 68 |
| Merlin 1C | 8.1 | 7.0 (regen gimbal) | 304 s | 480 kN | 630 kg | 78 |
| Merlin 1D | 8.2 | 8.2 (3D-printed) | 311 s | 822 kN | 470 kg | 178 |
| Merlin 1D+ | 8.3 | 8.2 (3D-printed) | 311 s | 914 kN | 470 kg | 198 |
| Merlin Vacuum | 8.2 | 7.4 (extendable) | 348 s | 981 kN | 490 kg | 204 |

A player designing a Falcon 9 can swap Merlin 1D → Merlin 1D+ at Level 3, and the Stage/Vehicle ΔV updates automatically.

### Fuel Family Swaps

Changing Fuel type usually requires changing the Power Plant, but some Power Plants accept multiple fuels:

| Power Plant | Compatible Fuels | Notes |
|-------------|-----------------|-------|
| Gas-Generator Kerolox | LOX/RP-1, LOX/CH4 (early) | Requires injector redesign |
| Full-Flow Staged Combustion | LOX/CH4, LOX/LH2 | Raptor architecture adaptable |
| Nuclear Thermal | LH2, NH3, H2O | Any low-molecular-mass propellant |

---

## 9. Program Maturity & Component Evolution

As a nation's Program Maturity Rating (PMR) increases, component TLs within a family can be **upgraded** without redesigning the whole engine.

### PMR-Driven Component Upgrades

| PMR | Component Upgrade Rate | Example |
|-----|----------------------|---------|
| 1–3 | +0.1 TL per 2 seasons | Merlin 1A (8.0) → 1C (8.1) after 4 seasons |
| 4–6 | +0.1 TL per season | Rapid iteration period |
| 7–8 | +0.1 TL per 2 seasons | Mature optimization |
| 9–10 | +0.05 TL per season | Diminishing returns |

### Feature/Bug at Component Level

When a component upgrade is attempted, roll on the Feature/Bug table (MSDS Section 7.3). A **Feature** may grant:
- Isp +2–5% (combustion efficiency breakthrough)
- Mass −5–10% (new manufacturing method)
- Restart capability added

A **Bug** may impose:
- Isp −2–4% (combustion instability)
- Mass +5–8% (conservative margins)
- Reduced throttle range

---

## 10. Worked Example: Designing a Falcon 9 Equivalent

### Target Mission
- LEO payload: 22,800 kg
- Reusable first stage (landing burn reserve)
- TL 8.2 baseline

### Stage 2 (Upper Stage)

```
Payload: 22,800 kg (satellite + fairing)
Propulsion:
  Engine: 1 × Merlin Vacuum (Power Plant TL 8.2 + Drive TL 7.4)
    • Isp(vac): 348 s
    • Thrust(vac): 981 kN
    • Mass: 490 kg
  Fuel: LOX/RP-1
    • Mp: ~92,000 kg
    • Ms_tank: ~3,500 kg
    • Mr: ~1,000 kg
Stage Wet: ~119,000 kg
Stage Dry: ~27,000 kg
ΔV_stage2: 348 × 9.80665 × ln(119000/27000) = **~5,200 m/s**
```

### Stage 1 (First Stage)

```
Payload: 119,000 kg (entire Stage 2 + payload)
Propulsion:
  Engine: 9 × Merlin 1D (Power Plant TL 8.2 + Drive TL 8.2)
    • Isp(vac): 311 s
    • Thrust(vac): 9 × 822 = 7,398 kN
    • Mass: 9 × 470 = 4,230 kg
  Fuel: LOX/RP-1
    • Mp: ~395,000 kg
    • Ms_tank: ~25,000 kg
    • Mr: ~15,000 kg (landing reserve)
Stage Wet: ~558,000 kg
Stage Dry: ~163,000 kg
ΔV_stage1: 311 × 9.80665 × ln(558000/163000) = **~3,750 m/s**
```

### Vehicle Summary

```
Total ΔV: 3,750 + 5,200 = ~8,950 m/s
Mission Requirement (LEO): ~9,400 m/s
Shortfall: ~450 m/s → Acceptable (gravity turn efficiency + margin)
Liftoff T/W: 7,398 / (558,000 × 0.00980665) = **1.35** ✓ (>1.15)
```

---

## 11. PWA Implementation Notes

### UI Hierarchy

The BOM Builder displays the 3-level hierarchy as **expandable cards**:

```
[▶] Stage 1: S-IC          [ΔV: 3,750 m/s] [Mass: 2,100 t]
    [▶] Propulsion System
        [▶] Engine: 5 × F-1    [Isp: 304s] [Thrust: 34.5 MN]
            Power Plant: Gas-Generator Kerolox [TL 7.0]
            Drive: Regenerative Gimbaled Bell [TL 7.0]
        [▶] Fuel: LOX/RP-1     [Mp: 1,958 t] [Tank: 86 t]
    Payload: Stage 2 + 3 + CSM/LEM [Mpld: 870 t]
```

Clicking **[▶]** expands to Level 3. Clicking **Power Plant** or **Drive** opens a component picker with TL-filtered options.

### Delta-V Auto-Update

When the user swaps a component:
1. Highlight the changed component in **yellow**
2. Show the delta (ΔIsp, ΔMass, ΔThrust) in **green** (improvement) or **red** (regression)
3. Cascade the change up: Engine → Stage → Vehicle
4. Update the **Mission ΔV Bar** at the top of the screen

### Stage Visualization

A simple **side-view diagram** shows each stage as a colored block:
- Height = proportional to stage length
- Width = proportional to stage diameter
- Color = fuel type (orange = kerolox, blue = hydrolox, green = methalox, grey = solid)
- Label = Stage number + Engine count

---

## 12. Component Catalog Summary (Quick Reference)

### Power Plants by TL

| TL | Kerolox | Hydrolox | Methalox | Nuclear |
|-----|---------|----------|----------|---------|
| 7.0 | GG (RD-107, F-1) | — | — | — |
| 7.2 | — | GG (J-2) | — | — |
| 7.4 | SC (NK-33) | GG (RL-10A) | — | — |
| 7.6 | SC (RD-180) | SC (RS-25) | — | — |
| 7.8 | SC+ | SC+ | — | — |
| 8.0 | GG+ (Merlin 1A) | SC+ (RL-10C) | — | — |
| 8.2 | GG++ (Merlin 1D) | — | FFSC (Raptor) | — |
| 8.4 | — | — | FFSC+ | — |
| 8.6 | — | FFSC (adv.) | — | — |
| 9.0 | — | — | — | NTR (NERVA) |

*GG = Gas-Generator, SC = Staged Combustion, FFSC = Full-Flow Staged Combustion*

### Drives by TL

| TL | Chemical | Electric/Nuclear |
|-----|----------|-----------------|
| 7.0 | Fixed Bell, Gimbaled Bell | — |
| 7.4 | Extendable Bell | — |
| 7.8 | Aerospike | — |
| 8.0 | 3D-Printed Channel Wall | Solar Sail |
| 8.2 | Film-Cooled Bell | — |
| 9.0 | — | Magnetic Nozzle, Ion Grid |
| 9.5 | — | Laser Sail |

---

*Document Status: v0.1 Draft — Component hierarchy locked at 3 levels. Awaiting PWA UI validation pass.*
