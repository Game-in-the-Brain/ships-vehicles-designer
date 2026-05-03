# 09 — Economic Analysis

**Version:** 0.1  
**Scope:** Infrastructure demand, technology participation rates, innovation economics, and the material requirements for spacefaring civilization.

---

## Core Thesis

> **Growing the pie is not just altruism — it is survival of the species.**

The amount of technological participation required from our 8 billion population to achieve spacefaring and world-fixing capabilities is very high. Modeling the development economies need so that certain technologies become possible is a core goal of MVDS.

---

## The Technology-Participation Curve

Not every technology requires the same level of global development. MVDS models a **participation threshold**: the minimum percentage of humanity that must be educated, fed, healthy, and economically active to sustain a given technology level.

| Technology | Participation Required | Global GDP/capita (2030$) |
|------------|----------------------|---------------------------|
| Orbital rockets | 0.1% | $500/day |
| Commercial space | 1% | $1,000/day |
| Lunar colonies | 5% | $3,000/day |
| Mars settlement | 10% | $5,000/day |
| Asteroid mining | 15% | $8,000/day |
| Interplanetary economy | 25% | $15,000/day |
| Post-scarcity space | 50% | $30,000/day |

**Participation** means: literate, numerate, healthy, with access to education, communication, and economic opportunity.

---

## Infrastructure Demand Modeling

### Material Requirements by Scale

| Infrastructure | Annual Material | Equivalent to |
|----------------|-----------------|---------------|
| 1 orbital launch per week | 100 t aluminum, 50 t composites | Small factory |
| 1 Starship per week | 2,000 t steel, 200 t electronics | Medium shipyard |
| 100-person lunar base | 500 t habitat modules, 100 t consumables | Town supply chain |
| 10,000-person Mars city | 50,000 t ISRU products, 10,000 t imports | Small nation |
| Cis-lunar economy | 1,000,000 t annual throughput | Major port city |

### Energy Requirements

| Activity | Power Required | Source |
|----------|---------------|--------|
| Earth launch (per launch) | 10–100 GWh | Chemical energy |
| Lunar propellant production | 1–10 MW | Solar or nuclear |
| Mars ISRU (100 people) | 100 MW | Nuclear + solar |
| Orbital manufacturing | 10–1,000 MW | Solar |
| Asteroid smelting | 1–100 GW | Solar concentrators |

**Key insight:** Space infrastructure is energy-intensive. The economics only work when energy is cheap — either from advanced solar, nuclear, or eventually fusion.

---

## Innovation Economics

### The Innovation Pipeline

```
Basic Research → Applied Research → Development → Production → Market
    (10 yr)        (5 yr)           (5 yr)       (5 yr)      (decades)
```

| Stage | Funding Source | Success Rate | Cost |
|-------|---------------|--------------|------|
| Basic research | Government, universities | 1% | Low per-project |
| Applied research | Government, corporations | 10% | Moderate |
| Development | Corporations, VCs | 30% | High |
| Production | Corporations, government | 70% | Very high |
| Market | Consumers, industry | 90% | Self-sustaining |

### Technology Readiness Levels (TRL) and Cost

| TRL | Description | Cost to Advance | Typical Actor |
|-----|-------------|-----------------|---------------|
| 1–3 | Basic principles | $1–10M | Universities |
| 4–5 | Lab validation | $10–100M | Government labs |
| 6–7 | Prototype demo | $100M–1B | Corporations |
| 8–9 | Flight proven | $1B–10B | National programs |
| 9+ | Operational | $10B+ | Commercial markets |

**The valley of death:** TRL 4–6 is where most technologies die due to lack of funding.

---

## Conservative Estimation of Progress

MVDS uses **conservative estimation** because:
1. Physics limits are known and bounded
2. Engineering timelines are predictable (S-curves)
3. Economic constraints follow demographic trends
4. Only political disruptions are truly unpredictable

### Example: Predicting Reusable Launch

| Year | Prediction | Basis |
|------|-----------|-------|
| 1950 | Possible by 1970 | Aerodynamics, jet engines |
| 1970 | Possible by 1990 | Shuttle development |
| 1990 | Possible by 2010 | Computing, materials |
| 2010 | Achieved (SpaceX) | Economics + will |
| 2020 | Mature by 2030 | Market demand proven |

The technology was physically possible since the 1960s. Economics made it happen in the 2010s.

---

## World-Fixing Capabilities

What infrastructure is needed to address existential risks?

### Climate Engineering

| Intervention | Scale Required | Technology Level |
|--------------|---------------|------------------|
| Carbon capture (direct air) | 10 Gt CO2/year | 8.0 |
| Stratospheric aerosols | 1–5 Mt SO2/year | 7.5 |
| Space sunshades | 10,000 km² at L1 | 9.0 |
| Ocean fertilization | 1,000 ships | 7.5 |

### Planetary Defense

| Threat | Detection | Deflection | Required TL |
|--------|-----------|------------|-------------|
| 10m asteroid | Ground telescopes | None needed (atmosphere) | 6.5 |
| 50m asteroid | Space surveys | Kinetic impactor | 7.5 |
| 100m asteroid | Early warning | Nuke or kinetic | 8.0 |
| 1km asteroid | Decades notice | Gravity tractor + nuke | 8.5 |
| 10km asteroid | Centuries notice | Multiple methods | 9.0 |

### Pandemic Response

| Capability | Infrastructure | TL |
|------------|---------------|-----|
| mRNA vaccine (100M doses in 6 months) | Biotech industry | 8.0 |
| Universal vaccine platform | Global lab network | 8.5 |
| Orbital quarantine facilities | Space stations | 9.0 |

---

## The 8 Billion Person Problem

To achieve spacefaring capability with a reasonable probability of species survival:

| Metric | Current | Target (2100) | Gap |
|--------|---------|---------------|-----|
| Global literacy | 86% | 99% | Education infrastructure |
| Internet access | 66% | 95% | Communications infrastructure |
| Electricity access | 90% | 99% | Energy infrastructure |
| R&D spending (% GDP) | 2.6% | 5% | Innovation culture |
| Space access ($/kg to LEO) | $2,000 | $10 | Launch infrastructure |
| Manufacturing (% automated) | 30% | 80% | Robotics, AI |

**Closing these gaps requires:**
- Continued economic growth (3%+ annually)
- Massive infrastructure investment in developing economies
- Education reform and universal access
- Stable international cooperation

This is why "growing the pie" is survival — not charity.

---

## Mneme 2050–2100: A Scenario

In the Mneme universe, humanity survived:
- The pandemic slide into authoritarianism
- Techno-corporate feudalism
- Climate disruption
- Resource wars

By 2050:
- Commercial space is routine ($100/kg to LEO)
- Lunar bases house 1,000 people
- AI assists in design and manufacturing
- Carbon capture is operational at gigaton scale

By 2100:
- Mars has 100,000 residents
- Cis-lunar economy exceeds any single Earth nation
- Fusion is approaching breakeven
- 50% of humanity lives above poverty with full education

This trajectory is **physically possible** given conservative estimates. Whether it happens depends on choices made in the next decades.

---

## Algorithms

### `estimateInfrastructureDemand(annualLaunchMass, missionType)`

Returns required manufacturing capacity, energy, and workforce.

### `technologyParticipationModel(targetTL, population, gdpPerCapita)`

Returns probability of achieving target TL given demographic and economic inputs.

---

## Sources

- [Atomic Rockets: Economics](https://projectrho.com/public_html/rocket/)
- World Bank: [Global Development Indicators](https://data.worldbank.org/)
- UNDP: [Human Development Reports](https://hdr.undp.org/)
- Wikipedia: [Technological forecasting](https://en.wikipedia.org/wiki/Technological_forecasting)

---

*Part of the Mneme Vehicle Design Knowledge Base*
