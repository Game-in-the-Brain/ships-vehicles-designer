# 03 — Powerplants

**Version:** 0.1  
**Scope:** Power generation systems for spacecraft: RTGs, batteries, solar, nuclear, and theoretical limits.

---

## Power Requirements by Subsystem

| Subsystem | Power Range | Duty Cycle |
|-----------|-------------|------------|
| Avionics / GNC | 50–500 W | Continuous |
| Communications | 10–2,000 W | Intermittent |
| Thermal control | 100–5,000 W | Continuous |
| Life support (per crew) | 2–5 kW | Continuous |
| Electric propulsion | 1–100 kW | Hours–months |
| In-situ resource processing | 10–1,000 kW | Hours |
| Surface outpost | 10–500 kW | Continuous |

---

## Power Source Types

### 1. Photovoltaic (Solar)

| Parameter | Value |
|-----------|-------|
| Efficiency | 15–47% (multi-junction) |
| Power density | 30–300 W/kg (at 1 AU) |
| Degradation | 1–3% per year |
| Cost | Low |
| Reliability | Very High |

**Solar constant:** ~1,361 W/m² at 1 AU

**Power by distance from Sun:**

| Location | Distance (AU) | Solar flux | Relative power |
|----------|---------------|------------|----------------|
| Mercury | 0.39 | 6,300 W/m² | 4.6× |
| Earth | 1.0 | 1,361 W/m² | 1.0× |
| Mars | 1.52 | 590 W/m² | 0.43× |
| Jupiter | 5.2 | 50 W/m² | 0.037× |
| Saturn | 9.5 | 15 W/m² | 0.011× |

**Limitations:**
- Useless beyond ~5 AU (Jupiter and beyond)
- Large area = high mass, drag, complexity
- Requires sun-pointing

### 2. Radioisotope Thermoelectric Generator (RTG)

| Parameter | Value |
|-----------|-------|
| Efficiency | 3–7% |
| Power density | 2–5 W/kg |
| Lifespan | 30–50 years |
| Fuel | Pu-238, Sr-90 |
| Cost | Very High |
| Reliability | Very High |

**Notable missions:** Voyager, Cassini, Curiosity, Perseverance, New Horizons

**Limitations:**
- Very low power density
- Pu-238 is scarce and expensive (~$8,000/g)
- Cannot be throttled or turned off
- Requires heavy radiators

### 3. Fission Reactors (Space Nuclear)

| Parameter | Value |
|-----------|-------|
| Efficiency | 15–30% (Brayton/Rankine) |
| Power density | 5–50 W/kg |
| Power range | 10 kW – 10 MW |
| Fuel | U-235, U-233 |
| Cost | Extremely High |

**Programs:**
- SNAP-10A (USA, 1965) — first nuclear reactor in space, 500 W
- TOPAZ (USSR, 1987–1988) — ~5 kW, flown on radar satellites
- Kilopower (NASA, 2018) — 1–10 kW reactor concept

**Limitations:**
- Political/regulatory barriers to launch
- Heavy shielding required for crewed missions
- Complex heat rejection (large radiators)
- Proliferation concerns

### 4. Batteries

| Type | Energy Density | Use Case |
|------|---------------|----------|
| Li-ion | 150–250 Wh/kg | Short duration, high power |
| Li-S (experimental) | 400–600 Wh/kg | 2030s technology |
| Solid-state | 300–500 Wh/kg | 2030s+ technology |

**Role:** Peak shaving, eclipse periods, emergency backup. Not primary power for long missions.

### 5. Fuel Cells

| Type | Efficiency | Use Case |
|------|------------|----------|
| H2/O2 PEM | 40–60% | Crewed missions, short duration |
| Regenerative | 30–50% | Surface power with ISRU |

**Apollo, Shuttle, and Orion ESM** all used fuel cells for primary power.

---

## Theoretical Maximums

### Solar Power Limit

The **Shockley-Queisser limit** sets the maximum efficiency of single-junction solar cells at ~33%. Multi-junction cells can reach ~47% under concentrated light. Theoretical limit for any photovoltaic device is ~86% (thermodynamic).

**Practical spacecraft limit:** ~300 W/kg at 1 AU (including support structure)

### Nuclear Power Limits

Fission reactors are limited by:
- **Materials:** Reactor vessels fail above ~1,500°C
- **Radiator mass:** Rejecting waste heat requires enormous radiators
- **Criticality:** Minimum mass for a self-sustaining reactor

**Maximum practical fission power density:** ~100 W/kg (with advanced radiators)

### Fusion Power (Future)

If controlled fusion is achieved:

| Parameter | Projected Value |
|-----------|-----------------|
| Efficiency | 20–40% (thermal to electric) |
| Power density | 1–10 kW/kg (reactor + radiators) |
| Fuel | D-T, D-He3, p-B11 |
| Availability | TL 9.5+ (2070s+) |

**Fusion propulsion ≠ fusion power:** A fusion rocket might produce 10,000s Isp but only modest thrust. Fusion reactors for electricity are a separate engineering challenge.

---

## Power Plant Selection by Mission

| Mission | Distance | Duration | Recommended Power |
|---------|----------|----------|-------------------|
| LEO satellite | 1 AU | 5–15 years | Solar |
| GEO satellite | 1 AU | 15+ years | Solar |
| Lunar surface | 1 AU | Permanent | Solar + battery |
| Mars surface | 1.5 AU | Permanent | Solar + battery, or nuclear |
| Outer planets | 5–30 AU | 10+ years | RTG or fission |
| Deep space probe | Variable | Decades | RTG |
| Crewed Mars ship | 1–1.5 AU | 2–3 years | Solar or nuclear |
| Interstellar precursor | >30 AU | Decades | RTG or beamed power |

---

## Power Budget Example: Mars Habitat

| System | Power (kW) | Notes |
|--------|-----------|-------|
| Life support (6 crew) | 24 | Air, water, waste processing |
| Communications | 2 | Earth link |
| ISRU (propellant production) | 50 | O2 + CH4 from atmosphere |
| Science instruments | 5 | Various experiments |
| Thermal control | 10 | Heaters, radiators |
| EVA support | 5 | Suit charging, airlocks |
| Contingency | 10 | 20% margin |
| **Total** | **106 kW** | |

At Mars distance (0.43× Earth solar), this requires ~250 m² of solar panels or a 150 kW nuclear reactor.

---

## Sources

- [Atomic Rockets: Power](https://projectrho.com/public_html/rocket/)
- NASA: [Radioisotope Power Systems](https://rps.nasa.gov/)
- Wikipedia: [Radioisotope thermoelectric generator](https://en.wikipedia.org/wiki/Radioisotope_thermoelectric_generator)

---

*Part of the Mneme Vehicle Design Knowledge Base*
