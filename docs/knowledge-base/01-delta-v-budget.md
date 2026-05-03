# 01 — Delta-V Budget

**Version:** 0.1  
**Scope:** Mission delta-V requirements, gravity losses, and the rocket equation.

---

## The Tsiolkovsky Rocket Equation

All propulsion in MVDS is grounded in the Tsiolkovsky rocket equation:

```
ΔV = Isp × g₀ × ln(m_wet / m_dry)
```

Where:
| Symbol | Meaning | Unit |
|--------|---------|------|
| `ΔV` | Change in velocity | m/s |
| `Isp` | Specific impulse | seconds |
| `g₀` | Standard gravity | 9.80665 m/s² |
| `m_wet` | Wet mass (structural + propellant + payload) | kg |
| `m_dry` | Dry mass (structural + payload, no propellant) | kg |

### Mass Ratio

The **mass ratio** (R = m_wet / m_dry) is the central engineering tension:

| Mass Ratio | Propellant Fraction | Description |
|------------|---------------------|-------------|
| 2.0 | 50% | Easy, early rockets |
| 3.0 | 67% | Moderate, most LVs |
| 5.0 | 80% | Aggressive, upper stages |
| 10.0 | 90% | Extreme, hydrolox stages |
| 20.0 | 95% | Theoretical limit for chemical |

Every design decision is a trade between mass ratio and delivered payload.

---

## Mission Leg Decomposition

Every mission is decomposed into **legs**. Each leg has its own delta-V budget, propellant load, and payload definition. What is **payload** on one leg may become **dead mass** on another.

### Example: Apollo-Style Lunar Mission

| Leg | Segment | Vehicle | ΔV Required |
|-----|---------|---------|-------------|
| 1 | Earth Surface → LEO | Saturn V (S-IC + S-II) | ~9,400 m/s |
| 2 | LEO → TLI | S-IVB (first burn) | ~3,130 m/s |
| 3 | TLI → LOI | S-IVB (second burn) | ~900 m/s |
| 4 | LOI → LLO | CSM SPS | ~700 m/s |
| 5 | LLO → Lunar Surface | LM Descent Stage | ~1,800 m/s |
| 6 | Lunar Surface → LLO | LM Ascent Stage | ~1,800 m/s |
| 7 | LLO → TEI | CSM SPS | ~800 m/s |
| 8 | TEI → Earth Entry | Passive/aero | ~0 m/s |

**Total mission ΔV:** ~18,500 m/s across all legs

### Key Rule

> What is payload on Leg N becomes structure on Leg N+1.

The Lunar Module is payload to TLI, but becomes the primary vehicle for landing and ascent.

---

## Reference Delta-V Budgets

### Earth-Centric Missions

| Mission | ΔV Required | Notes |
|---------|-------------|-------|
| LEO (200 km, equatorial) | ~9,300–9,500 m/s | Includes gravity/drag losses ~1,500 m/s |
| LEO (28.5°, Kennedy) | ~9,400 m/s | Standard US reference |
| Polar LEO | ~9,500 m/s | Higher losses due to dogleg |
| SSO (600 km) | ~9,600 m/s | Common Earth observation orbit |
| GTO | ~12,000 m/s from ground | LV to GTO; satellite apogee kick |
| GEO | ~12,700 m/s total | GTO + 1,500 m/s apogee circularization |
| TLI (lunar) | ~3,130 m/s from LEO | C3 = 0 for minimum energy |
| LOI (lunar) | ~900–1,000 m/s | From free-return trajectory |
| Lunar Landing | ~1,800–2,100 m/s | Descent from LLO |
| Lunar Ascent | ~1,800–1,900 m/s | Surface to LLO |
| TEI (trans-Earth) | ~800–900 m/s | From LLO |

### Interplanetary Departures (from LEO)

| Destination | ΔV (approx) | Transfer Time |
|-------------|-------------|---------------|
| Mars | ~3,600–4,100 m/s | 6–9 months |
| Venus | ~3,500 m/s | 4–6 months |
| Mercury | ~5,500 m/s | 6+ months (with gravity assists) |
| Jupiter | ~5,500 m/s | 2–3 years |
| Saturn | ~6,500 m/s | 3–6 years |
| Asteroid (NEA) | ~3,000–6,000 m/s | Highly variable |

### Gravity Losses

Gravity losses are the delta-V "spent" fighting gravity during powered flight:

| Phase | Typical Loss | Mitigation |
|-------|-------------|------------|
| First stage ascent | ~1,300–1,600 m/s | High T/W ratio, low trajectory |
| Upper stage circularization | ~100–300 m/s | Optimal pitch program |
| Landing burns | ~200–500 m/s | Hover-slam, aerobraking |

**Rule of thumb:** Earth-to-LEO requires ~9,200 m/s rocket equation ΔV + ~1,500 m/s losses = **~10,700 m/s total capability** for a realistic design.

---

## Delta-V Margins

No mission flies with exactly the calculated ΔV. Margins are required for:

| Margin Type | Typical Value | Reason |
|-------------|---------------|--------|
| Navigation error | 1–3% | Orbit insertion uncertainty |
| Performance reserve | 2–5% | Engine underperformance |
| Maneuvering reserve | 1–2% | Collision avoidance, phasing |
| Contingency | 5–10% | Unknown unknowns |

**Total margin:** 10–20% above nominal mission ΔV

---

## Budget Allocation by Vehicle Type

| Vehicle Type | Primary Leg | Typical ΔV Budget |
|--------------|-------------|-------------------|
| **LV** (Launch Vehicle) | Surface → LEO | 9,200–10,500 m/s |
| **Bst** (Booster) | Parallel augmentation | 3,000–5,000 m/s |
| **TLI** (Trans-Lunar) | LEO → Lunar transfer | 3,000–3,500 m/s |
| **LEV** (Lunar Excursion) | LLO ↔ Surface | 3,600–4,000 m/s (descent + ascent) |
| **OTV** (Orbital Transfer) | LEO ↔ GEO / planetary | 3,500–6,500 m/s |
| **CSh** (Crewed Ship) | Interplanetary | 6,000–12,000 m/s |
| **Prb** (Probe) | Robotic exploration | 3,000–15,000 m/s |
| **Sail** (Solar Sail) | Deep space | 0.1–0.5 m/s (continuous) |

---

## Algorithms

### `calculateDeltaV(wetMass, dryMass, isp)`

```typescript
function calculateDeltaV(wetMassKg: number, dryMassKg: number, ispSeconds: number): number {
  const g0 = 9.80665;
  const massRatio = wetMassKg / dryMassKg;
  return ispSeconds * g0 * Math.log(massRatio);
}
```

### `calculateRequiredPropellant(dryMass, targetDeltaV, isp)`

```typescript
function calculateRequiredPropellant(
  dryMassKg: number,
  targetDeltaV: number,
  ispSeconds: number
): number {
  const g0 = 9.80665;
  const massRatio = Math.exp(targetDeltaV / (ispSeconds * g0));
  return dryMassKg * (massRatio - 1);
}
```

---

## Sources

- [Atomic Rockets: Delta-V Maps](https://projectrho.com/public_html/rocket/) — Comprehensive delta-V maps for the Solar System
- Wikipedia: [Tsiolkovsky rocket equation](https://en.wikipedia.org/wiki/Tsiolkovsky_rocket_equation)
- NASA: [Mission Design & Delta-V](https://nasa.gov)

---

*Part of the Mneme Vehicle Design Knowledge Base*
