# 05 — Bill of Quantities (BOQ) Methodology

**Version:** 0.1  
**Scope:** Component costing, assembly trees, cost indices, and economic modeling of vehicle production.

---

## What Is a BOQ?

A **Bill of Quantities** is the complete enumeration of every component in a vehicle, with:
- Quantity
- Unit mass
- Unit cost
- Total mass and cost
- Technology level requirements

In MVDS, the BOQ is a **hierarchical tree**:

```
Vehicle
├── Structure 1 (Stage / Module)
│   ├── Tankage
│   │   ├── Fuel tank
│   │   └── Oxidizer tank
│   ├── Propulsion
│   │   ├── Engine(s)
│   │   ├── Turbopump / pressurization
│   │   └── Thrust vector control
│   ├── Avionics & Control
│   │   ├── Navigation
│   │   ├── Flight computer
│   │   └── Telemetry
│   └── Recovery (if reusable)
│       ├── Grid fins
│       └── Landing legs
├── Structure 2 (Upper Stage)
│   └── ...
└── Payload
    ├── Crew module
    └── Mission equipment
```

---

## Cost Index System

MVDS uses **relative cost indices**, not absolute currency. This makes the system timeless and inflation-resistant.

### Base Reference

**1.0 = mature TL 7.8 production rate** (Space Shuttle era, ~1981)

### Cost Index Factors

| Factor | Effect on Cost | Description |
|--------|---------------|-------------|
| **TL deviation** | ±0.1× per 0.2 TL | Early TL = higher R&D; advanced TL = higher materials |
| **PMR** | ×0.6 to ×3.5 | See PMR table below |
| **Production rate** | ×0.5 to ×1.5 | Mass production reduces unit cost |
| **National trait** | ×0.8 to ×1.3 | Industrial base, labor costs |
| **Reusability** | ×1.2 to ×1.5 upfront | Higher initial cost, lower per-flight |

### PMR Cost Multipliers

| PMR | Description | Cost Modifier |
|-----|------------|---------------|
| 1 | First national program | ×3.5 |
| 2 | Early heritage | ×2.8 |
| 3 | First independent | ×2.2 |
| 4 | Second generation | ×1.8 |
| 5 | Established capability | ×1.4 |
| 6 | Mature program | ×1.2 |
| 7 | Multiple programs | ×1.0 (baseline) |
| 8 | World-class | ×0.9 |
| 9 | Commercial optimization | ×0.75 |
| 10 | Dominant market | ×0.6 |

---

## Component Cost Estimation

### Engines

```
engine_cost = base_cost × chemistry_multiplier × cycle_multiplier × count × pmr_multiplier
```

| Chemistry | Base Cost per Engine (M$) |
|-----------|--------------------------|
| Kerolox GG | 2.0 |
| Kerolox SC | 4.5 |
| Hydrolox GG | 15.0 |
| Hydrolox SC | 25.0 |
| Methalox FF | 1.5 |
| Hypergolic | 3.0 |
| Solid (segmented) | 40.0 |
| Nuclear Thermal | 100.0+ |

### Tanks

```
tank_cost = tank_mass_kg × 0.001 M$/kg
```

Tank cost is dominated by materials and welding. Cryogenic tanks (LH2) cost 2–3× more than storable tanks due to insulation.

### Avionics

| Generation | Mass (kg) | Cost (M$) |
|------------|-----------|-----------|
| Analog (TL 7.0) | 450 | 2.5 |
| Digital discrete (TL 7.2) | 32 | 3.5 |
| Redundant digital (TL 7.5) | 70 | 4.2 |
| FPGA-based (TL 8.0) | 14 | 0.8 |
| AI-integrated (TL 8.5) | 8 | 0.5 |

**Trend:** Modern avionics are cheaper and lighter due to COTS electronics and Moore's Law.

### Structures (Frames, Fairings, Skirts)

```
structure_cost = structure_mass_tons × cost_per_ton
```

| Material | Cost per Ton (M$) |
|----------|-------------------|
| Aluminum (2024, 7075) | 0.5 |
| Aluminum-lithium | 0.8 |
| Carbon fiber composite | 1.5 |
| Titanium | 3.0 |
| Steel (stainless) | 0.3 |

---

## Learning Curve Economics

The **learning curve** (or experience curve) describes how unit cost decreases with cumulative production:

```
cost_unit_n = cost_unit_1 × n^(-b)
```

Where:
- `n` = cumulative units produced
- `b` = learning rate coefficient (typically 0.15–0.25 for aerospace)
- A **90% learning curve** means cost drops 10% every time cumulative production doubles

### Aerospace Learning Curves

| Product | Learning Rate | Notes |
|---------|--------------|-------|
| Commercial aircraft | 80–85% | High volume, standardized |
| Fighter aircraft | 85–90% | Moderate volume, complex |
| Launch vehicles (expendable) | 90–95% | Low volume, custom |
| Launch vehicles (reusable) | 80–85% | Higher volume per core |

**Example:** If the first Falcon 9 cost $60M to build, the 10th might cost $45M, and the 100th $30M.

---

## Total Vehicle Cost Estimation

```
total_cost = sum(all_component_costs) × pmr_multiplier × production_factor × national_factor
```

### Example: Saturn V (TL 7.4, PMR 10)

| Component | Mass (t) | Cost (M$) |
|-----------|----------|-----------|
| S-IC stage | 2,100 | 185 |
| S-II stage | 481 | 40 |
| S-IVB stage | 119 | 15 |
| IU + avionics | 2 | 5 |
| Apollo CSM | 28 | 50 |
| Lunar Module | 15 | 40 |
| **Subtotal** | | **335** |
| PMR 10 (×0.6) | | 201 |
| Program overhead (×1.3) | | **~260** |

**Actual program cost:** ~$185M per launch (1969–1972 dollars), or ~$1.2B in 2024 dollars.

---

## BOQ Line Item Format

Every BOQ entry in MVDS uses this format:

```
| Component          | Qty | Unit Mass (kg) | Total Mass (kg) | TL Min | Cost Index | Notes |
```

**Example:**

| Component | Qty | Unit Mass | Total Mass | TL Min | Cost Index | Notes |
|-----------|-----|-----------|------------|--------|------------|-------|
| F-1 Engine | 5 | 8,391 kg | 41,955 kg | 7.0 | 2.0 | Kerolox GG |
| RP-1 Tank | 1 | 86,000 kg | 86,000 kg | 7.0 | 0.5 | Including structure |
| LOX Tank | 1 | — | 131,100 kg | 7.0 | 0.5 | Combined with RP-1 |
| Interstage | 1 | 4,000 kg | 4,000 kg | 7.0 | 0.5 | S-IC to S-II |
| Avionics | 1 | 1,200 kg | 1,200 kg | 7.0 | 2.5 | Analog guidance |

---

## Sources

- NASA: [Cost Estimating Handbook](https://www.nasa.gov/offices/oce/appel/knowledge-base/cost-estimating-handbook)
- Wikipedia: [Experience curve effects](https://en.wikipedia.org/wiki/Experience_curve_effects)

---

*Part of the Mneme Vehicle Design Knowledge Base*
