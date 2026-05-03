# 08 — Procedural Design of Ships

**Version:** 0.1  
**Scope:** Algorithmic generation of vehicle layouts: vertical thrust-vector ships, fuselage-constrained designs, and spin habitats.

---

## Design Philosophy

Procedural design in MVDS follows three principles:

1. **Physics first** — layout is determined by thrust vectors, load paths, and thermal environments
2. **Function determines form** — a crew ferry looks different from a cargo tug because it does different things
3. **Constraint propagation** — each design decision constrains subsequent decisions

> "People need only know a similar ship and express the need in constraints and function to build ships and vehicles."

---

## Vertical / Thrust-Vector Oriented Ships

### Principle

Most launch vehicles and landers are **vertically oriented** because:
- Thrust acts along the longitudinal axis
- Gravity loads stack compressively
- Aerodynamic drag is minimized by slender bodies
- Tanks are naturally cylindrical

### Layout Algorithm

```
Inputs: mission profile, propellant masses, engine count, payload dimensions

1. Determine minimum diameter from:
   a. Engine nozzle diameter (if bottom-mounted)
   b. Payload envelope (if top-mounted)
   c. Aerodynamic stability (L/D ratio 6:1 to 15:1)

2. Stack propellant tanks vertically:
   a. Heaviest/densest propellant at bottom (lowers CG)
   b. Cryogenic tanks insulated from engines
   c. Common bulkheads where possible

3. Place engines at base:
   a. Engine circle diameter ≤ vehicle diameter
   b. Gimbal clearance accounted for
   c. Thrust frame transfers load to tank walls

4. Place payload at top:
   a. Fairing or crew module
   b. Separation system
   c. Access paths for crew/cargo

5. Add auxiliary systems:
   a. Interstages between stages
   b. Aerodynamic surfaces (fins, grid fins)
   c. Landing gear (if reusable)
   d. RCS thrusters at CG and extremities
```

### Vertical Ship Types

| Type | Aspect Ratio | Engine Layout | Example |
|------|-------------|---------------|---------|
| **Slim booster** | 12:1 to 18:1 | Single central or ring | Falcon 9, Atlas V |
| **Wide core** | 6:1 to 10:1 | Multiple engines in grid | Starship, Saturn V |
| **Compact lander** | 2:1 to 4:1 | Bottom cluster | Apollo LM, HLS |
| **Sounding rocket** | 20:1+ | Single engine | Black Brant, VS-30 |

---

## Fuselage Constrained Designs

### Principle

Some vehicles must fit within a **fuselage envelope** — either aerodynamic or structural constraints:
- Spaceplanes (must fit within aerodynamic shape)
- Payload bay constraints (Shuttle, Starship cargo)
- Launch vehicle fairing limits

### Fuselage Types

#### 1. Cylindrical Fuselage (Standard)

```
   ┌─────────────┐
   │   Payload   │  ← Nose cone / fairing
   ├─────────────┤
   │   Section   │  ← Avionics, equipment
   ├─────────────┤
   │   Tank 1    │  ← Fuel / oxidizer
   ├─────────────┤
   │   Tank 2    │  ← Remaining propellant
   ├─────────────┤
   │   Section   │  ← Engines, thrust structure
   └─────────────┘
```

**Constraints:**
- Diameter fixed by launch vehicle or aerodynamic requirements
- Length determined by propellant volume
- Internal layout optimized for CG control

#### 2. Blended Body (Lifting)

```
      ╱╲
     ╱  ╲
    │    │  ← Crew / payload (wide section)
    │    │
    │    │
     ╲  ╱   ← Engines (narrow section)
      ╲╱
```

**Constraints:**
- Shape optimized for lift-to-drag ratio
- Internal volume follows external aerodynamic shell
- Complex structural load paths

#### 3. Constrained Payload Bay

```
   ┌─────────────┐
   │   Fairing   │
   ├─────────────┤
   │  ╔═══════╗  │
   │  ║Payload║  │  ← Must fit within fixed dimensions
   │  ╚═══════╝  │
   ├─────────────┤
   │   Propulsion │
   └─────────────┘
```

**Constraints:**
- Payload dimensions fixed by customer or mission
- Remaining volume for propulsion and systems
- Often drives minimum vehicle size

### Pressure Vessel Constraint

For crewed vehicles, the **pressure vessel** is the dominant structural element:

```
Minimum wall thickness = (pressure × radius) / (material_stress × safety_factor)
```

| Environment | Pressure Differential | Typical Wall Thickness |
|-------------|----------------------|------------------------|
| LEO habitat | 0.5 bar | 2–5 mm (aluminum) |
| Deep space | 1.0 bar | 3–8 mm |
| Venus surface | 90 bar | 100+ mm (titanium) |
| Mars habitat | 0.5 bar | 2–5 mm |

**Key insight:** Spherical pressure vessels are most mass-efficient. Cylindrical sections with spherical end caps are the practical compromise.

---

## Spin Habitat Design

### Principle

Artificial gravity via **centrifugal force** requires rotating the habitat:

```
gravity = ω² × r
```

Where:
- `ω` = angular velocity (rad/s)
- `r` = radius from spin axis (m)

### Design Parameters

| Parameter | Target | Reason |
|-----------|--------|--------|
| Artificial gravity | 0.3–1.0 g | Mars to Earth equivalent |
| Coriolis effect | Minimize | <2 rpm preferred for comfort |
| Radius | 50–500 m | Larger = slower rotation, less Coriolis |
| Tether strength | >3× operational load | Safety margin |

### Spin Habitat Types

#### 1. Dumbbell / Tether

```
   [Habitat]═══●═══[Countermass]
              ↑
          Spin axis
```

**Characteristics:**
- Simplest design
- Habitat and countermass connected by cable
- Countermass can be spent propellant, equipment, or another habitat
- Radius = half tether length

**Example:** Mars cycler concepts, Gemini tether experiments

#### 2. Torus / Wheel

```
        ╭──────────╮
       ╱            ╲
      │   Habitat    │
      │   (inner)    │
       ╲            ╱
        ╰──────────╯
              ↑
          Spin axis
```

**Characteristics:**
- Continuous living space
- No tether deployment risks
- Complex construction
- Requires large radius for comfort

**Example:** O'Neill cylinders, Stanford Torus (conceptual)

#### 3. Cylindrical with End Caps

```
   ┌──────────────────┐
   │    End cap       │
   │  (low gravity)   │
   ├──────────────────┤
   │                  │
   │   Cylindrical    │  ← Primary habitat
   │    section       │
   │                  │
   ├──────────────────┤
   │    End cap       │
   │  (low gravity)   │
   └──────────────────┘
          ↑ Spin axis
```

**Characteristics:**
- Derived from rocket tank geometry
- Easier to construct from space infrastructure
- Variable gravity from equator (1g) to poles (0g)

### Structural Loads in Spin Habitats

| Load Type | Source | Magnitude |
|-----------|--------|-----------|
| Centrifugal | Rotation | Primary design load |
| Precession | Maneuvering | Transient, avoid if possible |
| Solar pressure | Photons | Small, continuous |
| Meteoroid | Impacts | Protected by Whipple shields |
| Docking | Visiting vehicles | Localized, dampened |

**Design rule:** Spin habitats should not maneuver while rotating. Despin before any thrusting.

---

## Procedural Generation Pipeline

```
Inputs:
  - Mission type (LV, Orb, LEV, CSh, etc.)
  - Payload mass and dimensions
  - Target ΔV
  - Crew requirements (if any)
  - Technology level
  - Reusability flag

Step 1: Determine vehicle class and size
  → Lookup size class from payload mass

Step 2: Select propulsion
  → Chemistry from TL and mission ΔV
  → Engine count from thrust requirement

Step 3: Size propellant tanks
  → Volume from propellant mass and density
  → Dimensions from vehicle diameter constraint

Step 4: Layout structures
  → Vertical stack for LVs and landers
  → Fuselage-constrained for spaceplanes
  → Radial for spin habitats

Step 5: Add subsystems
  → Avionics (TL-appropriate)
  → Power (solar, RTG, or fuel cell)
  → Thermal control
  → Life support (if crewed)

Step 6: Validate
  → Mass ratio check
  → ΔV budget check
  → T/W at liftoff check
  → Structural margin check
  → Cost estimate

Step 7: Generate Features and Bugs
  → Roll based on PMR, TL, and national traits
  → Apply performance modifiers

Output: Complete VehicleDesign with BOM
```

---

## Links to CE-Ships Repository

Procedural ship generation in MVDS will feed into the combat/encounter system in the ce-shipgen repository:

| MVDS Concept | CE-Ships Equivalent |
|--------------|---------------------|
| VehicleDesign | ShipDesign |
| Structure | Hull / Stage |
| EngineAssembly | Drive / M-Drive |
| AvionicsUnit | Sensors / Electronics |
| CrewModule | Crew / Staterooms |
| TL (decimal) | CE TL (0.0–11.0) |
| PMR | Ship Quality / Condition |

See [ce-shipgen](../../../ce-shipgen) for combat mechanics, encounter generation, and token/deckplan integration.

---

## Sources

- [Atomic Rockets: Spacecraft Design](https://projectrho.com/public_html/rocket/)
- Wikipedia: [Artificial gravity](https://en.wikipedia.org/wiki/Artificial_gravity)
- Wikipedia: [Stanford torus](https://en.wikipedia.org/wiki/Stanford_torus)

---

*Part of the Mneme Vehicle Design Knowledge Base*
