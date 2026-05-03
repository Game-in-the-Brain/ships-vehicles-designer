# 02 — Impulse and Engine Performance

**Version:** 0.1  
**Scope:** Specific impulse, thrust, engine types, thermodynamic cycles, and performance limits.

---

## Specific Impulse (Isp)

**Specific impulse** is the "fuel efficiency" of a rocket engine, measured in seconds. It tells you how many seconds one pound of propellant can produce one pound of thrust.

```
Isp = thrust / (propellant mass flow rate × g₀)
```

Higher Isp = less propellant needed for the same ΔV.

### Isp by Propellant Type

| Chemistry | Typical Isp (vac) | T/W Range | Era | Example |
|-----------|-------------------|-----------|-----|---------|
| **Solid (HTPB)** | 260–295 s | 60–140 | 1950s+ | Shuttle SRB, Vega P80 |
| **Kerolox (GG)** | 304–330 s | 50–90 | 1957+ | F-1, Merlin, RD-107 |
| **Kerolox (SC)** | 331–360 s | 60–100 | 1960s+ | NK-33, RD-180 |
| **Hypergolic** | 311–340 s | 40–65 | 1960s+ | RD-253, AJ10, Draco |
| **Hydrolox (GG)** | 421–452 s | 50–75 | 1960s+ | J-2, RL-10, RS-25 |
| **Methalox (FF)** | 356–380 s | 90–120 | 2010s+ | Raptor, BE-4 |
| **Nuclear Thermal** | 800–1,000 s | 3–10 | 1970s (tested) | NERVA, RD-0410 |
| **Electric Ion** | 1,500–3,000 s | 0.01–0.1 | 1990s+ | NEXT, BepiColombo |
| **Solar Thermal** | 600–900 s | 0.1–1 | Conceptual | — |
| **Fusion Thermal** | 5,000–15,000 s | 0.1–10 | 2050+ | Conceptual |
| **Antimatter Catalyzed** | 2,000–5,000 s | 0.1–1 | 2070+ | Conceptual |

### The Chemical Ceiling

No chemical propellant combination can exceed ~470s Isp. This is a thermodynamic limit:

```
Isp_max ∝ √(T_chamber / M_molecular)
```

Where `T_chamber` is combustion temperature and `M_molecular` is exhaust molecular weight. Hydrogen gives the lowest molecular weight but also limits chamber temperature.

| Propellant | Theoretical Max Isp | Practical Limit |
|------------|---------------------|-----------------|
| LH2/LOX | ~475 s | ~465 s (SSME-class) |
| LOX/CH4 | ~380 s | ~375 s (Raptor-class) |
| LOX/RP-1 | ~360 s | ~350 s (RD-180-class) |
| N2O4/UDMH | ~340 s | ~325 s |

---

## Thrust and Thrust-to-Weight (T/W)

### Thrust

**Thrust** is the force produced by the engine, measured in kilonewtons (kN).

```
thrust = mass_flow_rate × exhaust_velocity
       = (propellant_mass / burn_time) × (Isp × g₀)
```

### Thrust-to-Weight Ratio

**T/W ratio** compares engine thrust to engine mass:

```
T/W = thrust / (engine_mass × g₀)
```

| Engine | Thrust (kN) | Mass (kg) | T/W | Era |
|--------|-------------|-----------|-----|-----|
| F-1 | 6,770 | 8,391 | 82 | 1967 |
| J-2 | 1,033 | 1,788 | 59 | 1966 |
| RS-25 (SSME) | 2,279 | 3,526 | 66 | 1981 |
| RD-180 | 4,152 | 5,480 | 77 | 2000 |
| Merlin 1D | 845 | 470 | 183 | 2013 |
| Raptor | 2,300 | 1,700 | 138 | 2019 |

**T/W trends:** Modern engines (Merlin, Raptor) achieve T/W ratios 2–3× higher than 1960s engines due to:
- Better materials (superalloys, 3D printing)
- Higher chamber pressures
- Optimized turbomachinery

---

## Thermodynamic Cycles

The **cycle** determines how propellant is fed to the combustion chamber.

### Open Cycle (Gas Generator)

| Feature | Value |
|---------|-------|
| Efficiency | 85–95% |
| Complexity | Low |
| Cost | Low |
| Example | Merlin, F-1, RD-107 |

A small portion of propellant drives a turbine, then is dumped overboard. Simple, reliable, but some propellant is wasted.

### Closed Cycle (Staged Combustion)

| Feature | Value |
|---------|-------|
| Efficiency | 95–99% |
| Complexity | High |
| Cost | High |
| Example | RD-180, RS-25, NK-33 |

All propellant passes through the combustion chamber. The turbine exhaust is re-injected. Higher efficiency but complex turbomachinery.

### Full-Flow Staged Combustion

| Feature | Value |
|---------|-------|
| Efficiency | ~99% |
| Complexity | Very High |
| Cost | Very High |
| Example | Raptor, BE-4 |

Both fuel and oxidizer pass through separate preburners. All propellant goes to the main chamber. Highest efficiency, highest complexity.

### Pressure-Fed

| Feature | Value |
|---------|-------|
| Efficiency | ~98% |
| Complexity | Very Low |
| Cost | Very Low |
| Thrust | Low |
| Example | SuperDraco, Ariane EPS |

No turbopump. Helium pressurizes tanks. Simple but limited to small engines.

### Electric Pump Fed

| Feature | Value |
|---------|-------|
| Efficiency | ~95% |
| Complexity | Low |
| Cost | Low |
| Example | Electron Rutherford |

Electric motor drives pump. Enables small, cheap engines without turbomachinery complexity.

---

## Engine Types by Technology Level

| TL | Available Engines | Characteristics |
|----|-------------------|-----------------|
| **7.0** | Kerolox GG, Solid, Hypergolic pressure-fed | First generation, simple cycles |
| **7.2** | Hydrolox GG | Upper stage performance leap |
| **7.4** | Large kerolox GG (F-1-class), hydrolox GG (J-2-class) | Apollo-era heavy lift |
| **7.6** | Kerolox SC, improved hydrolox | Shuttle-era refinement |
| **7.8** | Hydrolox SC (SSME-class), large solids | Reusable engines |
| **8.0** | Early methalox concepts | NewSpace commercial |
| **8.2** | Full-flow methalox (Raptor-class) | Reusable-optimized |
| **8.4** | Mature methalox, advanced hydrolox | Starship-era |
| **9.0** | Nuclear Thermal Rocket (NTR) | Doubled Isp, new physics |
| **9.5** | Solar Electric high-thrust, early fusion | Very high Isp, low thrust |
| **10.0** | Mature fusion thermal | Interplanetary game-changer |

---

## Engine Selection Algorithm

```
Given: mission ΔV, payload mass, target TL

1. Determine required Isp from mass ratio constraint
2. Select chemistry that provides that Isp at target TL
3. Choose cycle based on complexity budget and reusability needs
4. Size engine count from thrust requirement (T/W at liftoff ≥ 1.15)
5. Apply PMR modifier (first-program engines underperform)
```

---

## Sources

- [Atomic Rockets: Engine List](https://projectrho.com/public_html/rocket/)
- Wikipedia: [Rocket engine](https://en.wikipedia.org/wiki/Rocket_engine)
- NASA: [NERVA Nuclear Thermal Rocket](https://www.nasa.gov)

---

*Part of the Mneme Vehicle Design Knowledge Base*
