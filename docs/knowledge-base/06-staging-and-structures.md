# 06 — Staging and Structural Methodology

**Version:** 0.1  
**Scope:** Stage separation, geometry simplification, structural margins, and the art of throwing away mass.

---

## Why Stage?

The **tyranny of the rocket equation** means every kilogram of dead mass reduces payload. Staging allows the vehicle to discard empty tanks and heavy engines as soon as they're no longer needed.

```
Total Vehicle ΔV = ΔV(Stage 1) + ΔV(Stage 2) + ... + ΔV(Stage N)
```

Without staging, a single-stage-to-orbit (SSTO) vehicle must carry all its empty tankage to orbit — a massive penalty.

### Stage Mass Ratios

| Stage | Typical Mass Ratio | Propellant Fraction |
|-------|-------------------|---------------------|
| 1st stage (booster) | 2.5–4.0 | 0.90–0.95 |
| 2nd stage | 3.0–5.0 | 0.85–0.93 |
| 3rd stage | 4.0–8.0 | 0.80–0.92 |
| Kick stage | 5.0–10.0 | 0.85–0.95 |

Mass ratios increase for upper stages because they have less structural overhead (no landing gear, no heavy engines, no aerodynamic surfaces).

---

## Stage Configuration Types

### 1. Serial Staging

Stages stack vertically. Most common.

**Examples:** Saturn V, Falcon 9, Ariane 5

```
    [Payload]
    [Stage 3]  ← Upper stage
    [Stage 2]  ← Core stage
    [Stage 1]  ← Booster
```

### 2. Parallel Staging

Boosters strap onto a central core. Discarded first.

**Examples:** Space Shuttle (SRBs), Delta IV Heavy, Falcon Heavy

```
    [Payload]
    [Core + Upper]
   [Booster][Booster]
```

### 3. Asparagus Staging (Theoretical)

All boosters feed into the core. Cross-feed propellant. Most efficient but mechanically complex.

**Examples:** None flown. Proposed for Falcon Heavy (never implemented).

### 4. Single-Stage-to-Orbit (SSTO)

No staging. Entire vehicle reaches orbit.

**Examples:** None historically successful to orbit. Concepts: Skylon, Roton.

**Why SSTO is hard:**
- Mass ratio required: ~10–15 for chemical propulsion
- Structural fraction must be <10%
- No historical vehicle has achieved this with payload

---

## Geometry Simplification

MVDS simplifies complex vehicle shapes into **basic geometric primitives** for mass estimation and visualization.

### Primary Shapes

| Shape | Use Case | Volume Formula |
|-------|----------|---------------|
| **Cylinder** | Tanks, fuselages, boosters | V = πr²h |
| **Truncated Cone** | Interstages, fairings | V = (πh/3)(r₁² + r₁r₂ + r₂²) |
| **Sphere** | Pressure vessels, propellant tanks | V = (4/3)πr³ |
| **Blunted Cone** | Reentry vehicles, capsules | Custom approximation |
| **Winged Body** | Spaceplanes, shuttles | CAD integration required |

### Simplification Rules

1. **Tanks are cylinders** with spherical end caps (unless known otherwise)
2. **Interstages are truncated cones** or short cylinders
3. **Fairings are ogive shapes** approximated as cones
4. **Complex shapes** (wings, landing gear) use CAD-derived bounding boxes

### Tank Dimension Estimation

Given propellant mass and density:

```
volume = mass / density
diameter = f(launch_vehicle_diameter)  // typically constrained by LV
length = volume / (π × (diameter/2)²)
```

| Propellant | Density (kg/m³) | Typical Tank L/D |
|------------|-----------------|------------------|
| RP-1 | 807 | 2:1 to 4:1 |
| LOX | 1,141 | 2:1 to 4:1 |
| LH2 | 70.8 | 4:1 to 8:1 |
| CH4 | 422 | 2:1 to 4:1 |
| N2O4 | 1,450 | 2:1 to 3:1 |
| UDMH | 791 | 2:1 to 3:1 |

---

## Structural Margins and Factors of Safety

### Aerospace Factors of Safety

| Component | Yield FOS | Ultimate FOS | Notes |
|-----------|-----------|--------------|-------|
| Primary structure (manned) | 1.25 | 1.40 | NASA-STD-5003 |
| Primary structure (unmanned) | 1.10 | 1.25 | Lower for expendable |
| Pressure vessels | 1.5 | 2.0 | Burst risk |
| Propellant tanks | 1.25 | 1.50 | Includes fatigue |
| Landing gear | 1.50 | 2.00 | High shock loads |
| Attachments / joints | 1.40 | 1.60 | Critical separation points |

### Mass Growth from Margins

Higher FOS = heavier structure. The difference between FOS 1.25 and 1.10 can be 10–20% of structural mass.

**Reusable vehicles** use higher margins due to fatigue and inspection requirements.

---

## Stage Separation

### Separation Methods

| Method | Mechanism | Typical Use |
|--------|-----------|-------------|
| **Pyrotechnic** | Explosive bolts, frangible nuts | Most LVs, reliable |
| **Collet / clamp** | Motor-driven release | SpaceX, some modern LVs |
| **Pneumatic** | Gas thrusters push stages apart | Upper stage separation |
| **Mechanical** | Spring-loaded pusher | Small satellites, fairings |

### Separation ΔV

Typical separation requires 1–5 m/s relative velocity to prevent recontact:

| Separation Type | Required ΔV |
|-----------------|-------------|
| Booster jettison (atmospheric) | 5–15 m/s |
| Stage separation (vacuum) | 1–3 m/s |
| Fairing jettison | 2–5 m/s |
| Payload separation | 0.5–2 m/s |

---

## Structural Load Paths

### Primary Loads

| Load Type | Direction | Critical Phase |
|-----------|-----------|---------------|
| **Axial thrust** | Longitudinal | Liftoff, max Q |
| **Bending** | Lateral | Max Q, wind gusts |
| **Hoop stress** | Circumferential | Tank pressurization |
| **Thermal** | Radial / axial | Reentry, engine startup |
| **Vibration** | All axes | All phases (random vibration) |

### Load Path Design

```
Engine thrust → Thrust frame → Tank walls → Interstage → Next stage / Payload
                ↑                                              ↑
           Concentrated load                          Distributed load
```

The **thrust frame** (or thrust structure) is the most critical structural element. It transfers engine thrust into the tank walls without buckling.

---

## Reusability Impact on Structure

Reusable vehicles require:

| Feature | Additional Mass | Additional Cost |
|---------|----------------|-----------------|
| Thermal Protection System (TPS) | 5–15% of dry mass | High |
| Landing gear / legs | 2–5% of dry mass | Moderate |
| Grid fins / aerodynamic surfaces | 1–3% of dry mass | Moderate |
| Propellant reserves (landing) | 10–20% of propellant | Operational |
| Structural reinforcement | 10–20% of structure | Moderate |
| Inspection access panels | 1–2% of structure | Low |

**Total reusability penalty:** 20–40% of expendable dry mass

---

## Algorithms

### `estimateTankDimensions(propellantMass, fuelDensity, oxidizerDensity, oxidizerFraction, diameter)`

Returns estimated tank length, diameter, and wall thickness.

### `calculateStructuralMargin(load, materialStrength, safetyFactor)`

Returns required wall thickness and mass.

---

## Sources

- [Atomic Rockets: Spacecraft Design](https://projectrho.com/public_html/rocket/)
- NASA: [Structural Design Criteria](https://nasa.gov)
- Wikipedia: [Multistage rocket](https://en.wikipedia.org/wiki/Multistage_rocket)

---

*Part of the Mneme Vehicle Design Knowledge Base*
