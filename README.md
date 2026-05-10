# ships-vehicles-designer

**Products:** [https://blog.gi7b.org](https://blog.gi7b.org)

**Mneme Ships and Vehicles Designer**

[![License: AGPL v3](https://img.shields.io/badge/License-AGPL%20v3-blue.svg)](https://www.gnu.org/licenses/agpl-3.0)

![Mneme Ship Design System Overview](mneme_ship_design_system_overview.svg)

A mass-based, delta-V-centric spacecraft and vehicle construction framework for the [Mneme](https://github.com/Game-in-the-Brain) setting. Compatible with Cepheus Engine / Traveller-style tabletop RPGs.

---

## Overview

This repository contains the **Mneme Vehicle Design System (MVDS)** — a physically grounded engineering framework that replaces the traditional displacement-ton abstraction with realistic mass budgets, propulsion analysis, and procedural generation.

The system serves as:
- **Reference tool** — model historical rockets (Saturn V, N1, Energia-Buran, Falcon 9, SLS, Starship)
- **Design tool** — build new vehicles within realistic engineering envelopes
- **Mini-game substrate** — simulate political, financial, and human-capital tradeoffs of space programs
- **Procedural generator** — seed-based creation of companies, engineers, and programs with Features and Bugs
- **Knowledge base** — human-readable methodologies for agents and humans to follow

## Core Philosophy

> *The physics is non-negotiable; the politics is everything.*

We can predict theoretical limits with high confidence. We know chemical rockets will never exceed ~470s Isp. We know steel pressure vessels have known failure modes. We know how much energy a solar panel can collect at 1 AU. These limits are bounded by physical law.

What we *cannot* predict is which nation will fund the breakthrough, how many prototypes will fail, or whether a pandemic redirects budgets. Therefore, MVDS provides **hard physical ceilings**, **conservative engineering estimates**, and **economic modeling** to bridge the gap between what is possible and what is achieved.

> *Growing the pie is not just altruism — it is survival of the species.*

The technological participation required from our 8 billion population to achieve spacefaring and world-fixing capabilities is very high. Modeling the infrastructure and development economies need is part of our goals.

---

## Final Functional Goals

### Vehicle Design & Planning
- Design and plan 3D models for vehicles that can be expressed in the system
- Build most vehicles from TL 7 to TL 9 using constraints and function
- People need only know a similar ship and express needs in constraints to build vehicles

### Complexity Levels
The system breaks down into **3–4 levels of complexity**:
- **Level 1** — Base concepts (mass, delta-V, thrust)
- **Level 2** — Subsystems (engines, tanks, avionics)
- **Level 3** — Integration (staging, mission legs, economics)
- **Level 4** — Advanced (procedural generation, multi-ship comparison, combat integration)

### Knowledge Indexing
- All methodologies are human-readable and linked to algorithms
- Agents can use the knowledge base to help humans follow the design process
- Save / Save-As / Load / Import / Export allows anyone to update and share designs

### Future: Godot Integration
- Procedural 3D ship and vehicle builder
- AAA-game-quality visualization
- A layman can learn everything in small chunks and start playing with it

---

## Documentation

### Core Specifications
- **[Mneme Ship Design System](Mneme_Ship_Design_System.md)** — Complete v0.1 specification covering decimal TL framework, vehicle taxonomy, mass budget & delta-V mechanics, BOM structure, propulsion tables, Features/Bugs system, procedural generation, and Saturn V calibration data
- **[TL Fraction Mapping](docs/TL_Fraction_Mapping.md)** — 0.1 TL granularity with year ranges (1950–2075+), component dating, calibration anchors, and PMR interaction rules

### Knowledge Base
- **[Knowledge Base Index](docs/knowledge-base/README.md)** — Overview of all knowledge base documents
- **[01 — Delta-V Budget](docs/knowledge-base/01-delta-v-budget.md)** — Mission legs, Tsiolkovsky equation, gravity losses, reference budgets
- **[02 — Impulse and Engines](docs/knowledge-base/02-impulse-and-engines.md)** — Isp, thrust, T/W ratio, thermodynamic cycles, engine types by TL
- **[03 — Powerplants](docs/knowledge-base/03-powerplants.md)** — Solar, RTGs, batteries, nuclear, theoretical maximums
- **[04 — Mass Methodology](docs/knowledge-base/04-mass-methodology.md)** — Mass fractions, propellant fraction, dry mass budgets, margin philosophy
- **[05 — BOQ Methodology](docs/knowledge-base/05-boq-methodology.md)** — Component costing, assembly trees, learning curves, PMR cost multipliers
- **[06 — Staging and Structures](docs/knowledge-base/06-staging-and-structures.md)** — Stage separation, geometry simplification, structural margins, reusability impact
- **[07 — Material Science](docs/knowledge-base/07-material-science.md)** — Steel to carbon composites, strength-to-weight, thermal limits, cryogenic considerations
- **[08 — Procedural Design](docs/knowledge-base/08-procedural-design.md)** — Vertical layout, fuselage constraints, spin habitats, generation pipeline
- **[09 — Economic Analysis](docs/knowledge-base/09-economic-analysis.md)** — Infrastructure demand, technology participation, innovation economics, world-fixing capabilities

### Taxonomy & Archetypes
- **[Vehicle Taxonomy](docs/taxonomy/Vehicle_Taxonomy.md)** — Complete classification system (kind, size, crew suffixes)
- **[Rocket Classification](docs/taxonomy/Rocket_Classification_System.md)** — PROP-ARC / STG-CFG / MIS-ORG axes
- **[Spacecraft Archetypes](docs/archetypes/Spacecraft_Archetypes.md)** — 13 vehicles across 5 archetypes with TL assignments

### Conversion & Reference
- **[SimpleRockets Conversion Rules](SIMPLEROCKETS_TO_MV_CONVERSION_RULES.md)** — SR2 craft → MVDS vehicle conversion with 30 real-world calibrations

---

## Application Features

### Design Screen
- Build vehicles structure-by-structure
- Add components (engines, fuel tanks, avionics, crew modules, etc.)
- Real-time mass and delta-V calculations
- Component library with 7 categories

### Compare Screen
- Side-by-side comparison of up to 3 vehicles
- 3 view modes: Standard, Compact, Super Compact
- Row-aligned metric comparison with diff highlighting
- Top-line performance summary per vehicle
- Optimized for **1920×1080** displays

### Library
- 36 pre-built vehicles including historical rockets and converted SimpleRockets crafts
- Saturn V, Falcon 9, Apollo CSM/LM, Orion, Artemis HLS, and more
- Filter by type, TL, and origin

### Save / Load / Import / Export
- Save vehicles to browser localStorage
- Export designs as JSON files
- Import JSON files from other users
- Share designs via file exchange

---

## Project Status

- **Current Version:** v0.3
- **Display Target:** 1920×1080
- **Library Vehicles:** 36 (6 hand-crafted + 30 SimpleRockets conversions)
- **Build Status:** ✅ Passing

### Recent Milestones
- ✅ Multi-ship comparison with 3 view modes
- ✅ SimpleRockets conversion system (30 vehicles, 93% validation pass)
- ✅ Save/Load/Import/Export system
- ✅ Knowledge base (9 documents)
- ✅ Spacecraft archetype definitions

### Next Milestones
- Multi-structure BOM support (staging)
- Procedural vehicle generation from constraints
- 3D visualization bridge
- Godot engine integration

---

## Related Projects

- **[CE ShipGen](../../../ce-shipgen)** — Mneme combat and encounter system (RAW-compliant combat engine, tokens, deckplans)
- [Mneme World Generator](https://github.com/Game-in-the-Brain/Mneme-CE-World-Generator)
- [Name-Place-Faction Generator](https://github.com/Game-in-the-Brain/name-place-faction-generator)
- [Cepheus Engine Character Generator](https://github.com/Game-in-the-Brain/cecharactergen)

---

## License

This project is licensed under the [GNU Affero General Public License v3.0](LICENSE) (AGPL-3.0).

---

*Part of the Game in the Brain / Mneme RPG ecosystem.*
*Justin can run Mneme at 2050–2100s and see how the world was reshaped by the technologies — with humanity surviving all that happened after the pandemic and the slide to fascism and techno-corporate feudalism.*
