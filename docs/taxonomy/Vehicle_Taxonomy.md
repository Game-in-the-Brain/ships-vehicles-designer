# Mneme Vehicle Taxonomy: Kinds of Spacecraft

**Version:** 0.2  
**Date:** 2026-05-02  
**Scope:** Complete taxonomy of all vehicle kinds in the MSDS framework, from launchers to interstellar probes.

---

## 1. Design Goal

Provide a player-facing classification system that answers: *"What is this vehicle FOR?"* The taxonomy must be derivable from the vehicle's mission legs, delta-V budget, and crew requirements — not from arbitrary labels.

**Rule:** A vehicle's kind is determined by its **highest-energy mission leg**, not its shape or origin.

---

## 2. Primary Axis: Vehicle Kind (Function)

| Code | Name | Mission | ΔV Budget | Crew | Typical Structures |
|------|------|---------|-----------|------|-------------------|
| **LV** | Launch Vehicle | Ground → LEO | 9.2–10.5 km/s | 0–7 | 1–3 stages, booster + core + upper |
| **Bst** | Booster | Strap-on augmentation | 3–6 km/s | 0 | 1 stage, parallel to core |
| **Orb** | Orbiter | LEO operations | 0.3–1.5 km/s | 0–7 | 1 structure, engines + payload bay |
| **TLI** | Trans-Lunar Injection Stage | LEO → Lunar transfer | 3.2 km/s | 0 | 1 stage, restartable engine |
| **LEV** | Lunar Excursion Vehicle | Lunar orbit ↔ Surface | 1.8–3.0 km/s | 2–4 | Descent + ascent modules (2 structures) |
| **OTV** | Orbital Transfer Vehicle | LEO ↔ GEO / planetary | 3.5–6.5 km/s | 0–2 | 1 structure, high-Isp engine |
| **SSt** | Space Station | Permanent habitation | 0.1–0.5 km/s | 3–6 | 1+ modules, docking ports, solar |
| **CSh** | Crewed Ship | Interplanetary crewed | 6–12 km/s | 4–12 | 3+ structures, artificial gravity |
| **CNT** | CNT Tether Vessel | Skyhook operations | 3–8 km/s | 0–2 | 1 structure, capture mechanism |
| **Prb** | Probe | Robotic exploration | 3–15 km/s | 0 | 1 structure, instrument suite |
| **Sail** | Solar/Light Sail | Deep space, low thrust | 0.1–0.5 km/s (continuous) | 0 | 1 structure, large sail area |
| **Dep** | Propellant Depot | Orbital storage | 0.1 km/s | 0 | 1 structure, tanks + docking |

### Kind Derivation Rules

1. **Highest ΔV leg wins.** A vehicle that does LEO → TLI → Lunar landing is a **LEV**, not an LV.
2. **Crew presence elevates.** A crewed OTV is still an OTV, but gets the `-CREW` suffix.
3. **Multi-kind vehicles.** Some vehicles have multiple kinds (e.g., Apollo = LV + TLI + LEV). The **primary kind** is the most complex one.

---

## 3. Secondary Axis: Size Class

Determined by the vehicle's **maximum single-leg payload mass** to its primary destination.

| Class | Code | Payload Range | Example |
|-------|------|--------------|---------|
| **Micro** | M | < 100 kg | Sounding rocket, CubeSat deployer |
| **Small** | S | 100 kg – 2 t | Falcon 1, Electron, Pegasus |
| **Medium** | Me | 2–10 t | Soyuz, Atlas V, H-IIA |
| **Heavy** | H | 10–30 t | Falcon 9, Delta IV Heavy, Ariane 5 |
| **Super-Heavy** | SH | 30–100 t | Falcon Heavy, SLS Block 1, Starship (initial) |
| **Ultra-Heavy** | UH | > 100 t | Saturn V, Sea Dragon (conceptual), Starship (mature) |

### Size Derivation

```
SizeClass = f(max_payload_to_primary_destination)
```

- For LVs: use LEO payload
- For TLI stages: use TLI payload
- For LEVs: use lunar surface payload
- For OTVs: use payload to target orbit

---

## 4. Tertiary Axis: Crew & Control

| Suffix | Meaning | Control Type | Crew Count |
|--------|---------|--------------|------------|
| `-UC` | Uncrewed | Autonomous / remote | 0 |
| `-CP` | Crew-Piloted | Human pilot + automation | 1–2 |
| `-CC` | Crew-Commanded | Commander + crew | 3–7 |
| `-PC` | Passenger-Carrier | Passengers + crew | 8–50 |
| `-MC` | Mass-Carrier | Colonists / troops | 50–500 |

---

## 5. Full Classification String

```
[Kind]-[Size]-[CrewSuffix]/[PROP-ARC]/[Origin]-[Mission]
```

### Examples

| Vehicle | Classification | Breakdown |
|---------|---------------|-----------|
| Saturn V + Apollo | `LEV-UH-CC/H-GG/USA-TLI` | Lunar excursion, ultra-heavy, crew-commanded, hydrolox/kerolox, American lunar |
| Falcon 9 (cargo) | `LV-H-UC/K-GG/USA-LEO` | Launch vehicle, heavy, uncrewed, kerolox gas-generator, American LEO |
| Crew Dragon | `Orb-Me-CP/K-GG/USA-LEO` | Orbiter, medium, crew-piloted, kerolox, American LEO |
| Starship (crew) | `CSh-SH-PC/M-FF/USA-MARS` | Crewed ship, super-heavy, passenger-carrier, methalox full-flow, American Mars |
| James Webb (as vehicle) | `Prb-Me-UC/E-ION/NASA-L2` | Probe, medium, uncrewed, electric ion, NASA Sun-Earth L2 |
| ISS (as vehicle) | `SSt-UH-CC/SOLAR/INTL-LEO` | Space station, ultra-heavy, crew-commanded, solar-powered, international LEO |
| HLS (Artemis) | `LEV-Me-CC/H-GG/USA-TLI` | Lunar excursion vehicle, medium, crew-commanded, hydrolox, American lunar |
| Voyager | `Prb-S-UC/RTG/NASA-IP` | Probe, small, uncrewed, RTG-powered, NASA interplanetary |

---

## 6. SimpleRockets Mapping

SimpleRockets parts map to MSDS vehicle kinds:

| SimpleRockets Part | MSDS Vehicle Kind | Notes |
|--------------------|--------------------|-------|
| Command Pod | `Orb-CP` or `LEV-CP` | Always crewed, 1–3 seats |
| Probe | `Prb-UC` | Uncrewed, instruments only |
| Fuel Tank | — | L2 component, not a vehicle kind |
| Engine | — | L2/L3 component |
| Landing Leg | — | L2 component (recovery) |
| Solar Panel | — | L2 component (power) |
| Fairing | — | L2 component (aerodynamics) |
| RCS Thruster | — | L2 component (attitude control) |
| Docking Port | — | L2 component (docking) |
| Heat Shield | — | L2 component (thermal protection) |
| Parachute | — | L2 component (recovery) |
| Separator | — | L1 structure junction |

### SimpleRockets Craft → MSDS Classification

| SimpleRockets Craft | MSDS Kind | Why |
|---------------------|-----------|-----|
| Single-stage orbital rocket | `LV` | Ground to orbit |
| Multi-stage moon rocket | `LEV` | Highest leg is lunar landing |
| Space station with docking | `SSt` | Permanent habitation |
| Satellite with ion drive | `Prb` or `OTV` | Depends on primary mission |
| Crewed Mars ship | `CSh` | Interplanetary crewed |

---

## 7. Vehicle Kind Decision Tree

```
Does the vehicle carry crew?
├── NO → Is it permanent habitation?
│   ├── YES → SSt (Space Station)
│   └── NO → Does it land on a body?
│       ├── YES → Does it return to orbit?
│       │   ├── YES → LEV (Lunar Excursion Vehicle)
│       │   └── NO → Prb (Probe — lander)
│       └── NO → Does it operate in LEO only?
│           ├── YES → Orb (Orbiter) or OTV
│           └── NO → Does it go interplanetary?
│               ├── YES → Prb (Probe) or OTV
│               └── NO → Dep (Depot) or Sail
└── YES → Is it interplanetary?
    ├── YES → CSh (Crewed Ship)
    └── NO → Does it land on a body?
        ├── YES → LEV (Lunar Excursion Vehicle)
        └── NO → Does it operate in LEO?
            ├── YES → Orb (Orbiter)
            └── NO → OTV (Orbital Transfer Vehicle)
```

---

## 8. Relationship to CE ShipGen

| CE ShipGen Hull Role | MSDS Vehicle Kind | Notes |
|----------------------|--------------------|-------|
| Free Trader | `OTV-Me-CC` | Medium OTV with crew |
| Scout/Courier | `Prb-S-UC` or `OTV-S-UC` | Small uncrewed |
| Passenger Liner | `CSh-H-PC` | Heavy passenger carrier |
| Fleet Escort | `Orb-Me-CC` (armed) | Military orbiter |
| Research Vessel | `Prb-Me-UC` | Scientific probe |
| Mining Vessel | `OTV-H-UC` | Heavy OTV with mining gear |
| Colony Ship | `CSh-UH-MC` | Ultra-heavy mass carrier |

CE ShipGen uses **displacement tons** and **role labels** (Free Trader, Scout). MSDS uses **mission legs** and **delta-V budgets** to derive the kind dynamically from the design.

---

## 9. Version History

| Version | Date | Changes |
|---------|------|---------|
| 0.1 | 2026-05-02 | Initial 9 vehicle kinds |
| 0.2 | 2026-05-02 | Added Probe, Sail, Depot; size classes; crew suffixes; SimpleRockets mapping; decision tree |
