# Mneme Vehicle Design Knowledge Base

**Version:** 0.1  
**Date:** 2026-05-03  
**Scope:** Comprehensive reference for spacecraft and vehicle design within the Mneme framework. Covers physics, engineering, materials, economics, and procedural generation.

---

## Design Philosophy

The Mneme Vehicle Design System (MVDS) is built on a single core insight: **the physics is non-negotiable; the politics is everything.**

We can predict theoretical limits with high confidence. We know chemical rockets will never exceed ~470s Isp. We know steel pressure vessels have known failure modes. We know how much energy a solar panel can collect at 1 AU. These limits are bounded by physical law, not engineering whim.

What we *cannot* predict is:
- Which nation or corporation will fund the breakthrough
- How many failed prototypes precede success
- Whether a war or pandemic redirects budgets
- Whether a billionaire's ego or a bureaucrat's caution shapes the design

Therefore, MVDS provides:
1. **Hard physical ceilings** — what is theoretically possible
2. **Conservative engineering estimates** — what is likely achievable given a TL
3. **Economic modeling** — what infrastructure and demand makes a technology viable
4. **Procedural templates** — how to generate realistic vehicles from constraints

---

## Knowledge Base Index

| # | Document | Topic | Key Concepts |
|---|----------|-------|--------------|
| 1 | [01-delta-v-budget.md](01-delta-v-budget.md) | Delta-V Budget | Mission legs, gravity losses, Tsiolkovsky equation, reference budgets |
| 2 | [02-impulse-and-engines.md](02-impulse-and-engines.md) | Impulse & Engines | Isp, thrust, T/W ratio, engine types by chemistry and cycle |
| 3 | [03-powerplants.md](03-powerplants.md) | Powerplants | RTGs, batteries, solar, nuclear, theoretical maximums |
| 4 | [04-mass-methodology.md](04-mass-methodology.md) | Mass-Based Design | Mass fractions, propellant fraction, dry mass budgets |
| 5 | [05-boq-methodology.md](05-boq-methodology.md) | Bill of Quantities | Component costing, assembly trees, cost indices |
| 6 | [06-staging-and-structures.md](06-staging-and-structures.md) | Staging & Structures | Stage separation, geometry simplification, structural margins |
| 7 | [07-material-science.md](07-material-science.md) | Material Science | Steel → aluminum → composites, strength-to-weight, thermal limits |
| 8 | [08-procedural-design.md](08-procedural-design.md) | Procedural Design | Vertical layout, fuselage constraints, spin habitats |
| 9 | [09-economic-analysis.md](09-economic-analysis.md) | Economic Analysis | Infrastructure demand, technology participation, growing the pie |

---

## Underlying Principles

### Predictable Physics, Unpredictable Politics

Every technology has a **theoretical maximum** set by physics and a **practical achievement** set by economics and politics. MVDS models both:

```
Theoretical Limit  →  Conservative Estimate  →  Actual Achievement
     (physics)            (engineering)           (politics + funding)
```

Example: Chemical rocket Isp
- **Theoretical max:** ~470s (LH2/LOX, infinite chamber pressure)
- **Conservative estimate at TL 7.4:** 421s (J-2 engine, 1967)
- **Actual achievement:** varies by program maturity (PMR)

### Growing the Pie Is Survival

The species needs a minimum level of technological participation across its ~8 billion population to achieve:
- **Spacefaring capability** — routine access to orbit and beyond
- **World-fixing capability** — climate engineering, asteroid deflection, pandemic response

This is not altruism. It is risk management. A civilization with all its eggs in one basket (one planet, one political system) has a finite lifespan.

MVDS includes economic models for:
- How much basic infrastructure a world needs to supply X tons of material per year
- How much demand must exist to justify Y level of production
- What innovation rate is possible given Z level of global education and R&D spending

### Human-Readable Methodologies

Every algorithm in the system links back to a human-readable explanation in this knowledge base. If a procedural generator makes a decision, you can trace it to:
1. The physical principle (why)
2. The engineering heuristic (how)
3. The economic constraint (when)

---

## Links

- [Main Project README](../../README.md)
- [Mneme Ship Design System](../Mneme_Ship_Design_System.md)
- [TL Fraction Mapping](../TL_Fraction_Mapping.md)
- [Vehicle Taxonomy](../taxonomy/Vehicle_Taxonomy.md)
- [Spacecraft Archetypes](../archetypes/Spacecraft_Archetypes.md)
- [SimpleRockets Conversion Rules](../../SIMPLEROCKETS_TO_MV_CONVERSION_RULES.md)
- [CE Ships Repository](../../../ce-shipgen) — Mneme combat and encounter improvements

---

*Part of the Mneme Vehicle Component System (MVCS) v0.3*
