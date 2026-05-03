# 04 — Mass-Based Design Methodology

**Version:** 0.1  
**Scope:** Mass fractions, propellant budgets, dry mass estimation, and the tyranny of the rocket equation.

---

## Core Principle

MVDS replaces the abstract "displacement ton" of Traveller/Cepheus Engine with **actual mass in kilograms**. Every design decision is traceable to a physical mass.

> **Mass is the currency of spaceflight.**

---

## Mass Categories

Every component falls into one of four categories:

| Category | Code | Description | Examples |
|----------|------|-------------|----------|
| **Structural Mass** | Ms | Tank walls, frames, fairings, engine bells | Tankage, interstages, thrust frames |
| **Propellant Mass** | Mp | Fuel + oxidizer | RP-1/LOX, LH2/LOX, CH4/LOX |
| **Payload Mass** | Mpld | Mission cargo | Crew, satellites, landers, instruments |
| **Residual/Reserve** | Mr | Unusable propellant, contingency | RCS reserve, trapped propellant, margin |

**Fundamental equations:**
```
Total Wet Mass = Ms + Mp + Mr + Mpld
Total Dry Mass = Ms + Mr + Mpld
Propellant Fraction (ξ) = Mp / (Ms + Mp)
```

---

## Propellant Fraction Targets

Propellant fraction is the single most important structural efficiency metric. Higher = better.

### By Chemistry and Era

| Stage Type | TL 7.2–7.4 | TL 7.6–7.8 | TL 8.0–8.2 | TL 8.4+ |
|------------|------------|------------|------------|---------|
| Large kerolox booster | 0.88–0.91 | 0.90–0.93 | 0.91–0.94 | 0.93–0.95 |
| Large hydrolox upper stage | 0.85–0.88 | 0.87–0.91 | 0.89–0.92 | 0.91–0.94 |
| Small storable upper stage | 0.84–0.87 | 0.85–0.88 | 0.86–0.89 | 0.87–0.91 |
| Reusable booster (with reserve) | — | — | 0.85–0.89 | 0.88–0.92 |

### Historical Benchmarks

| Vehicle / Stage | Propellant Fraction |
|-----------------|---------------------|
| Saturn V S-IC | 0.932 |
| Saturn V S-II | 0.778 |
| Saturn V S-IVB | 0.815 |
| Falcon 9 first stage | 0.93 |
| Falcon 9 second stage | 0.95 |
| Space Shuttle ET | 0.96 |
| Starship Super Heavy | 0.95 (projected) |

**Note:** S-II appears lower because LH2 tank mass dominates. Hydrolox stages always have lower propellant fractions than kerolox due to hydrogen's low density.

---

## Mass Fraction Derivation

### From Mission Requirements

Given:
- Target ΔV
- Engine Isp
- Payload mass

Calculate required wet mass:

```
mass_ratio = exp(ΔV / (Isp × g₀))
wet_mass = dry_mass × mass_ratio
propellant_mass = wet_mass - dry_mass
```

### From Propellant Fraction

```
dry_mass = propellant_mass × (1/ξ - 1)
structure_mass = dry_mass - payload_mass - residual_mass
```

---

## Structural Mass Estimation

### Tank Mass

Tank mass scales with propellant volume and tank pressure:

```
tank_mass = propellant_volume × tank_mass_fraction
```

| Propellant | Tank Mass Fraction | Notes |
|------------|-------------------|-------|
| RP-1/LOX | 0.008–0.012 | Dense, simple tanks |
| LH2/LOX | 0.015–0.025 | Large volume, insulation needed |
| CH4/LOX | 0.008–0.015 | Moderate density |
| N2O4/UDMH | 0.010–0.018 | Storable, moderate pressure |
| Solid | 0.015–0.030 | Case mass significant |

### Engine Mass

Engine dry mass scales with thrust:

```
engine_mass ≈ thrust / (T/W × g₀)
```

Modern engines achieve T/W of 100–200, reducing engine mass fraction significantly.

### Fairing / Payload Adapter

| Component | Mass Fraction (of payload) |
|-----------|---------------------------|
| Payload fairing | 10–20% |
| Payload adapter | 2–5% |
| Separation system | 0.5–1% |

---

## Margin Philosophy

MVDS uses **progressive margin reduction** as a program matures:

| Program Phase | Structural Margin | Mass Growth Allowance |
|---------------|-------------------|----------------------|
| Conceptual design | 30% | 30% |
| Preliminary design | 20% | 20% |
| Critical design | 15% | 15% |
| Flight proven | 10% | 10% |
| Operational (PMR 9+) | 5% | 5% |

**Conservative estimation:** Assume 20% mass growth for first-flight vehicles, 10% for mature systems.

---

## Algorithms

### `estimateDryMass(propellantMass, propellantFraction, payloadMass, marginFraction)`

```typescript
function estimateDryMass(
  propellantMassKg: number,
  propellantFraction: number,
  payloadMassKg: number,
  marginFraction: number = 0.20
): number {
  const baseDryMass = propellantMassKg * (1 / propellantFraction - 1);
  const dryMassWithPayload = baseDryMass + payloadMassKg;
  return dryMassWithPayload * (1 + marginFraction);
}
```

### `validatePropellantFraction(calculatedFraction, stageType, tl)`

Returns a validation result indicating whether the calculated fraction is realistic for the stage type and technology level.

---

## Sources

- [Atomic Rockets: Mass Ratio](https://projectrho.com/public_html/rocket/)
- NASA: [Mass Estimation Handbook](https://nasa.gov)
- Wikipedia: [Mass ratio](https://en.wikipedia.org/wiki/Mass_ratio)

---

*Part of the Mneme Vehicle Design Knowledge Base*
