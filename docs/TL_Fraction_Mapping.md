# Mneme Technology Level (TL) Fraction Mapping

**Version:** 0.1  
**Date:** 2026-05-02  
**Scope:** Maps every 0.1 TL decimal to real-world calendar years for component dating, historical placement, and procedural generation.

---

## 1. Core Rule

In Mneme MSDS, **one TL decimal (0.1) ≈ 5 years** of engineering refinement.

This is derived from observed rocket engine development cycles:
- Merlin 1A (2006) → Merlin 1D (2013) = 7 years ≈ 0.15 TL
- RD-180 (2000) → RD-191 (2008) = 8 years ≈ 0.16 TL
- F-1 (1967) → no direct successor = mature baseline
- RL10-A (1963) → RL10-C (2014) = 51 years ≈ 1.0 TL

The 5-year rule is a **heuristic**, not a law. Some components stagnate for decades; others leapfrog in 3 years due to funding surges.

---

## 2. Complete TL-to-Year Matrix

| TL | Year Range | Era Name | Representative Events |
|----|-----------|----------|----------------------|
| **7.0** | 1950–1954 | First Space Age | V-2 derivatives, Sputnik R-7 design, X-15 |
| **7.1** | 1955–1959 | Early Orbital | Sputnik (1957), Explorer 1, Vostok design |
| **7.2** | 1960–1964 | Mercury & Vostok | Mercury-Redstone, Vostok 1 (1961), Atlas LV-3B |
| **7.3** | 1965–1969 | Apollo Push | Saturn V first flight (1967), Apollo 11 (1969), N1 attempts |
| **7.4** | 1970–1974 | Post-Apollo | Skylab, Salyut 1, Viking Mars design |
| **7.5** | 1975–1979 | Shuttle Era Begins | STS design freeze, Soyuz-Apollo, Voyager launch |
| **7.6** | 1980–1984 | Shuttle Operational | STS Columbia (1981), Ariane 1, Proton-K |
| **7.7** | 1985–1989 | Cold War Peak | Challenger (1986), Mir core, Hubble design |
| **7.8** | 1990–1994 | Post-Cold War | Delta II, Atlas II, Shuttle-Mir, ISS design begins |
| **7.9** | 1995–1999 | Commercial Dawn | ISS construction, Sea Launch, first Iridium |
| **8.0** | 2000–2004 | Dot-Com Space | Falcon 1 design, Delta IV, Atlas V, ISS crewed |
| **8.1** | 2005–2009 | NewSpace Birth | SpaceX founded (2002), Falcon 1 first flight (2006), Antares design |
| **8.2** | 2010–2014 | Reuse Proven | Falcon 9 v1.0, Falcon 9 v1.1, Grasshopper, New Shepard design |
| **8.3** | 2015–2019 | Reuse Mature | Falcon 9 landing (2015), Block 5 (2018), Falcon Heavy (2018), Starlink design |
| **8.4** | 2020–2024 | Starship Era | Crew Dragon operational, SLS Block 1, Starship test flights, Artemis I |
| **8.5** | 2025–2029 | Lunar Return | Artemis III, Starship orbital refueling, Vulcan operational, New Glenn |
| **8.6** | 2030–2034 | Orbital Economy | Propellant depots, commercial lunar landers, first Mars cargo missions |
| **8.7** | 2035–2039 | Deep Space Routine | Mars crewed missions, asteroid mining pilots, large orbital habitats |
| **8.8** | 2040–2044 | Chemical Ceiling | Near-mature chemical propulsion, nuclear thermal development |
| **8.9** | 2045–2049 | Transition Era | NTR operational tests, fusion research reactors, quantum navigation |
| **9.0** | 2050+ | New Physics Era | Operational NTR, early fusion drives, Breakthrough Starshot probes |
| **9.1** | 2055+ | Fusion Development | Demonstration fusion rockets, crewed outer-planet missions |
| **9.2** | 2060+ | Fusion Operational | Reliable fusion thermal propulsion, generation ships designed |
| **9.3** | 2065+ | Advanced Fusion | Fusion-electric hybrid, high-thrust fusion |
| **9.4** | 2070+ | Antimatter Research | Antimatter catalyzed concepts, advanced AI flight control |
| **9.5** | 2075+ | Exotic Propulsion | Antimatter thermal, beamed-energy sails at interstellar scale |

---

## 3. Calibration Anchors

These well-known vehicles fix the timeline:

| Vehicle | First Flight | TL | Notes |
|---------|-------------|----|-------|
| R-7 / Sputnik | 1957 | 7.0 | First orbital launcher |
| Mercury-Redstone | 1960 | 7.2 | Suborbital crewed |
| Vostok 1 | 1961 | 7.2 | First crewed orbital |
| Saturn V | 1967 | 7.4 | MSDS calibration anchor |
| Space Shuttle Columbia | 1981 | 7.8 | First reusable orbiter |
| Ariane 5 | 1996 | 7.9 | European heavy-lift |
| Falcon 1 | 2006 | 8.0 | First SpaceX orbital |
| Falcon 9 v1.0 | 2010 | 8.2 | First F9 flight |
| Falcon 9 Block 5 | 2018 | 8.3 | Mature reuse |
| Crew Dragon DM-2 | 2020 | 8.4 | Commercial crew operational |
| Starship IFT-1 | 2023 | 8.4 | First integrated flight test |

---

## 4. Component Dating Example: Avionics

Using the 0.1 = 5yr rule, we can date avionics generations precisely:

| Avionics Generation | TL | Year Range | Key Technology |
|---------------------|----|-----------|----------------|
| Analog Guidance | 7.0 | 1950–1954 | Vacuum tubes, mechanical gyros, radio command |
| Transistor Guidance | 7.1 | 1955–1959 | Transistor computers, inertial platforms |
| Digital Core | 7.2 | 1960–1964 | Apollo Guidance Computer (AGC), discrete logic |
| Integrated Digital | 7.3 | 1965–1969 | IC-based computers, strapdown IMU |
| Microprocessor Era | 7.4 | 1970–1974 | First microprocessors in space, software guidance |
| Shuttle Avionics | 7.5 | 1975–1979 | Redundant digital systems, glass cockpit |
| Solid-State Revolution | 7.6 | 1980–1984 | VLSI, solid-state memory, GPS design |
| Commercial Integration | 7.7 | 1985–1989 | COTS processors, MIL-STD-1553 bus |
| GPS Operational | 7.8 | 1990–1994 | GPS navigation, star trackers, fiber gyros |
| Network-Centric | 7.9 | 1995–1999 | Ethernet in space, TCP/IP, distributed computing |
| FPGAs & SoCs | 8.0 | 2000–2004 | FPGA-based flight control, system-on-chip |
| NewSpace Minimal | 8.1 | 2005–2009 | Radiation-tolerant COTS, Linux in space |
| Autonomous Landing | 8.2 | 2010–2014 | Vision-based navigation, autonomous GNC |
| Reuse-Optimized | 8.3 | 2015–2019 | Rapid reuse avionics, fleet management AI |
| Crew-Rated Commercial | 8.4 | 2020–2024 | Human-rated COTS, touchscreen interfaces |
| Lunar Precision | 8.5 | 2025–2029 | Lunar terrain relative navigation, optical comms |
| Depot Operations | 8.6 | 2030–2034 | Autonomous rendezvous, propellant transfer GNC |
| Deep Space AI | 8.7 | 2035–2039 | Onboard AI mission planning, autonomous science |
| NTR Control Systems | 8.8 | 2040–2044 | Nuclear reactor control, plasma diagnostics |
| Quantum Navigation | 8.9 | 2045–2049 | Quantum IMU, interplanetary positioning |
| Fusion Drive Control | 9.0 | 2050+ | Magnetic confinement control, relativistic nav |

---

## 5. Using TL Fractions in Design

### For Historical Vehicles
Look up the vehicle's first-flight year, find the corresponding TL, and use components from that TL band.

**Example: Saturn V (1967)**
- Year 1967 → TL 7.3–7.4
- Avionics: Use TL 7.3–7.4 components (Integrated Digital → Microprocessor Era)
- Engines: Use TL 7.0–7.4 Power Plants (F-1 is TL 7.0 baseline, J-2 is TL 7.2)

### For Procedural Generation
Roll or select a year, derive TL, then pick components from that TL's catalog.

**Example: Procedural vehicle for year 2016**
- Year 2016 → TL 8.3
- Avionics: TL 8.3 (Reuse-Optimized)
- Engines: TL 8.2–8.3 (Merlin 1D+, Raptor development)

### For Tech Advancement
A program operating for 10 years can upgrade components by 0.2 TL (if funded).

**Example: Falcon 9 program (2010–2020)**
- Starts at TL 8.2 (2010)
- 10 years later → TL 8.4 (2020)
- Merlin evolves from 1C-equivalent to 1D+ equivalent (0.2 TL gain)

---

## 6. PMR Interaction with TL

Program Maturity Rating (PMR 1–10) modifies how quickly a program achieves its TL potential:

| PMR | TL Achievement | Description |
|-----|----------------|-------------|
| 1–2 | −0.2 TL | First attempt; components perform below spec |
| 3–4 | −0.1 TL | Learning curve; some components mature faster |
| 5–6 | Baseline TL | Nominal performance for the era |
| 7–8 | +0.1 TL | Mature program; components exceed baseline |
| 9–10 | +0.2 TL | World-class; pushing the TL envelope |

**Example:**
- A TL 7.4 program with PMR 3 (N1) performs at effective TL 7.2–7.3
- A TL 7.4 program with PMR 10 (Saturn V) performs at effective TL 7.5–7.6

---

## 7. Notes

- The 0.1 = 5yr rule is **asymmetric**: technology advances faster during competitive periods (Space Race, NewSpace) and stagnates during gaps (1975–2000).
- **Acceleration events** (competition, war, funding surges) can compress 0.1 TL to 2–3 years.
- **Stagnation events** (budget cuts, monopoly, lack of demand) can stretch 0.1 TL to 10+ years.
- The table above uses **calendar-year median** for each TL. Actual component dates vary by ±2 years.
