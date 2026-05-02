# Engineering Details: Crew, Computers, Bridge, and Life Support

**Version:** 0.1  
**Date:** 2026-05-02  
**Sources:** SimpleRockets community crafts, NASA NTRS, Apollo/Skylab/Shuttle documentation, CE ShipGen crew model.

---

## 1. Design Goal

Provide realistic engineering data for crewed systems derived from actual spacecraft. Every number must trace to a real vehicle or program. The goal is "engineered realism" — enough detail to be educational, abstracted enough to be playable.

---

## 2. Crew Systems

### 2.1 Crew Module Configurations

| Configuration | Seats | Mass (kg) | Volume (m³) | TL | Example |
|---------------|-------|-----------|-------------|----|---------|
| **Single Seat (Capsule)** | 1 | 350 | 2.5 | 7.2 | Mercury capsule |
| **Dual Seat (Capsule)** | 2 | 550 | 4.0 | 7.2 | Gemini, Voskhod |
| **Triple Seat (Capsule)** | 3 | 850 | 6.5 | 7.4 | Apollo CM, Soyuz |
| **Seven Seat (Capsule)** | 7 | 4,200 | 9.3 | 8.4 | Crew Dragon |
| **Crew Cabin (Shuttle)** | 7 | 8,500 | 71.5 | 7.8 | Space Shuttle flight deck + middeck |
| **Small Hab Module** | 4 | 12,000 | 40 | 8.0 | ISS Zvezda (derived) |
| **Large Hab Module** | 6 | 18,000 | 75 | 8.2 | ISS Destiny |
| **Commercial Cabin** | 50 | 45,000 | 300 | 8.6 | Starship (conceptual crew) |

### 2.2 Crew Mass Budget (per person)

| Item | Mass (kg) | Notes |
|------|-----------|-------|
| Crew member (average) | 80 | Includes flight suit |
| Consumables (per day) | 5 | Food, water, O₂ (closed loop: 2 kg/day) |
| Personal equipment | 15 | Tools, experiments, hygiene |
| Emergency gear | 10 | Fire extinguisher, medical, escape equipment |
| **Total per person (short mission)** | 105 | < 14 days |
| **Total per person (long mission)** | 160 | Includes extra consumables |

### 2.3 Crew Positions (from CE ShipGen, adapted)

| Position | Min | Full | Salary (MCr/month) | Shift | Required For |
|----------|-----|------|---------------------|-------|--------------|
| Commander | 1 | 1 | 0.006 | 1 | Any crewed vehicle |
| Pilot | 1 | 2 | 0.005 | 2 | Atmospheric entry/landing |
| Flight Engineer | 1 | 2 | 0.004 | 2 | Vehicles with >2 engines |
| Payload Specialist | 0 | 4 | 0.003 | 1 | Scientific missions |
| Mission Specialist | 0 | 2 | 0.003 | 1 | EVA, experiments |
| Medical Officer | 0 | 1 | 0.005 | 1 | Missions > 30 days |
| Passenger | 0 | 50 | varies | — | Commercial flights |

**MSDS adaptation:** Crew positions are abstracted into the **Crew Module** L2 component. The Engineering View shows individual positions. The player sets "Crew Count" and "Mission Duration" on the L2 component; the system auto-computes consumables mass.

---

## 3. Computer Systems

### 3.1 Flight Computer Generations

| Generation | TL | Year | Processor | Memory | Mass (kg) | Power (W) | Example |
|------------|----|------|-----------|--------|-----------|-----------|---------|
| **Analog Computer** | 7.0 | 1957 | Op-amps, tubes | — | 45 | 800 | V-2 Leitstrahl |
| **Discrete Transistor** | 7.1 | 1960 | Discrete logic | ~1 kB | 32 | 600 | Atlas LV-3B |
| **IC Logic (AGC)** | 7.2 | 1966 | 2.048 MHz IC | 76 kB rope | 32 | 55 | Apollo Guidance Computer |
| **Microprocessor (Early)** | 7.4 | 1972 | 8-bit, ~1 MHz | 64 kB | 8 | 25 | Viking lander |
| **16-bit Space CPU** | 7.6 | 1981 | 1.7 MHz | 1 MB | 25 | 40 | Shuttle GPC (AP-101B) |
| **32-bit RISC** | 7.8 | 1992 | 20 MHz | 128 MB | 5 | 15 | Mars Pathfinder |
| **Radiation-Hardened RISC** | 8.0 | 2004 | 110 MHz | 256 MB | 3 | 10 | RAD750 (Curiosity) |
| **Multi-Core COTS** | 8.2 | 2013 | 1.2 GHz dual-core | 16 GB | 1.5 | 8 | SpaceX Dragon (x86) |
| **AI-Accelerated** | 8.4 | 2022 | 2.5 GHz + NPU | 64 GB | 1.2 | 15 | Crew Dragon v2 |
| **Quantum-Enhanced** | 8.9 | 2045 | Quantum co-processor | 1 TB | 2 | 30 | Conceptual |

### 3.2 Computer Specifications (for data table)

```json
[
  {
    "id": "comp-agc",
    "name": "Apollo Guidance Computer",
    "tl": 7.2,
    "year": 1966,
    "processor": "2.048 MHz IC logic",
    "memory": "76 kB core rope + 1 kB RAM",
    "massKg": 32,
    "powerWatts": 55,
    "reliability": 0.9999,
    "software": ["COLOSSUS", "LUMINARY"],
    "notes": "First digital computer in crewed spacecraft. Rope memory was woven by hand."
  },
  {
    "id": "comp-gpc",
    "name": "Shuttle General Purpose Computer",
    "tl": 7.6,
    "year": 1981,
    "processor": "IBM AP-101B, 1.7 MHz",
    "memory": "1 MB magnetic core",
    "massKg": 25,
    "powerWatts": 40,
    "reliability": 0.99999,
    "software": ["PASS", "BFS"],
    "notes": "Five GPCs in quad-redundant config. Core memory immune to radiation."
  },
  {
    "id": "comp-rad750",
    "name": "BAE RAD750",
    "tl": 8.0,
    "year": 2004,
    "processor": "PowerPC 750, 110–200 MHz",
    "memory": "256 MB RAM",
    "massKg": 3,
    "powerWatts": 10,
    "reliability": 0.9999,
    "software": ["VxWorks", "custom RTOS"],
    "notes": "Industry standard for deep space. Used on Curiosity, Juno, MAVEN."
  },
  {
    "id": "comp-dragon",
    "name": "SpaceX Dragon Flight Computer",
    "tl": 8.2,
    "year": 2013,
    "processor": "x86 dual-core, 1.2 GHz",
    "memory": "16 GB RAM + SSD",
    "massKg": 1.5,
    "powerWatts": 8,
    "reliability": 0.999,
    "software": ["Linux (custom)", "autopilot stack"],
    "notes": "Triple redundant with 2-out-of-3 voting. COTS processors with radiation monitoring."
  }
]
```

### 3.3 Software Suites

| Software | TL | Function | Computer Required |
|----------|----|----------|-------------------|
| **Autopilot** | 7.0+ | Attitude hold, basic guidance | Any |
| **Launch Guidance** | 7.2+ | Ascent trajectory optimization | 7.2+ computer |
| **Entry Guidance** | 7.4+ | Atmospheric entry trajectory | 7.4+ computer |
| **Landing Guidance** | 8.2+ | Precision landing (vision/LiDAR) | 8.2+ computer |
| **Rendezvous** | 7.6+ | Autonomous docking | 7.6+ computer |
| **Fault Management** | 7.8+ | Self-diagnosis and recovery | 7.8+ computer |
| **AI Copilot** | 8.4+ | Anomaly detection, decision support | 8.4+ computer |

---

## 4. Bridge / Cockpit Systems

### 4.1 Bridge Types

| Type | TL | Stations | Mass (kg) | Cost (M$) | Notes |
|------|----|----------|-----------|-----------|-------|
| **Single Seat Cockpit** | 7.0 | 1 | 150 | 0.5 | Mercury-style, minimal instruments |
| **Dual Seat Cockpit** | 7.2 | 2 | 250 | 1.0 | Gemini-style, basic displays |
| **Command Deck (3-station)** | 7.4 | 3 | 450 | 2.5 | Apollo-style, dedicated stations |
| **Flight Deck (4-station)** | 7.8 | 4 | 800 | 5.0 | Shuttle-style, glass cockpit |
| **Modular Bridge** | 8.0 | 4–6 | 600 | 3.0 | Reconfigurable displays |
| **Touchscreen Bridge** | 8.4 | 2–4 | 400 | 4.0 | Crew Dragon, customizable screens |
| **Holographic Bridge** | 8.8 | 3–5 | 500 | 8.0 | Volumetric displays, conceptual |

### 4.2 Bridge Components (L3, visible in Engineering View)

| Component | Mass (kg) | Function |
|-----------|-----------|----------|
| **Pilot's Seat** | 45 | Acceleration couch with restraints |
| **Commander's Seat** | 50 | Same + override controls |
| **MFD (Multi-Function Display)** | 8 | Reconfigurable screen |
| **Flight Control Stick** | 3 | Manual attitude/throttle control |
| **Throttle Quadrant** | 4 | Engine throttle control |
| **Overhead Panel** | 15 | Switches for systems |
| **Pedestal** | 10 | Navigation, communication controls |
| **Window Frame** | 25 | Pressure-sealed viewport |
| **Window Glass (each)** | 12 | Multipane, anti-reflective |

---

## 5. Life Support Systems

### 5.1 Life Support by Mission Duration

| Type | TL | Duration | Mass/person (kg) | Power/person (W) | Notes |
|------|----|----------|--------------------|--------------------|-------|
| **Open Loop (stored)** | 7.0 | < 3 days | 25 | 50 | Stored O₂, LiOH scrubbers |
| **Semi-Closed (resupply)** | 7.2 | 2 weeks | 150 | 200 | Stored water, regenerative O₂ |
| **Closed Loop (basic)** | 7.6 | 3 months | 800 | 1,500 | Sabatier, electrolysis, basic recycler |
| **Closed Loop (advanced)** | 8.2 | 1 year | 1,200 | 2,500 | Full water recycling, 90% closure |
| **Closed Loop (mature)** | 8.6 | 3 years | 800 | 2,000 | 95% closure, bioregenerative |
| **Closed Loop (complete)** | 9.0 | Indefinite | 500 | 1,500 | 99% closure, ecosystem-based |

### 5.2 Life Support Components (L3)

| Component | Mass (kg) | Power (W) | Function |
|-----------|-----------|-----------|----------|
| **Oxygen Tank (stored)** | 10 | 0 | 1 day supply per person |
| **LiOH Scrubber** | 5 | 0 | 1 day CO₂ removal per canister |
| **Sabatier Reactor** | 45 | 400 | Converts CO₂ + H₂ → CH₄ + H₂O |
| **Electrolysis Unit** | 30 | 300 | Splits H₂O → H₂ + O₂ |
| **Vapor Compression Distiller** | 60 | 500 | Water recycling |
| **Thermal Radiator** | 120 | 0 | Rejects 5 kW waste heat |
| **Atmosphere Fan** | 8 | 50 | Air circulation |
| **Dehumidifier** | 15 | 100 | Moisture control |
| **Fire Detection/Suppression** | 12 | 20 | Safety |
| **Vacuum Toilet** | 25 | 50 | Waste collection |

---

## 6. Drawing from SimpleRockets

SimpleRockets community crafts provide empirical data on crewed vehicle configurations:

### 6.1 Observed SimpleRockets Crewed Designs

| Craft Type | Typical Parts | Crew Module Mass (est.) | Notes |
|------------|--------------|------------------------|-------|
| **Single-seat orbital** | 50–100 parts | ~300 kg | Minimal capsule |
| **Apollo recreation** | 500–1,000 parts | ~900 kg | 3-seat with service module |
| **Shuttle recreation** | 2,000–4,000 parts | ~8,000 kg | Full flight deck + middeck |
| **Space Station** | 500–2,000 parts | ~15,000 kg | Multiple docking ports |
| **Starship recreation** | 3,000–6,000 parts | ~4,000 kg | 7-seat crew area |

### 6.2 SimpleRockets → MSDS Engineering Mapping

| SimpleRockets Element | MSDS Engineering Equivalent | Mass Basis |
|-----------------------|----------------------------|------------|
| Command Pod (1-seat) | Crew Module (single) + Bridge (single) | 350 kg total |
| Command Pod (3-seat) | Crew Module (triple) + Bridge (3-station) | 900 kg total |
| Probe Core | Avionics Unit + Computer System | 15 kg total |
| Service Module (fuel) | Fuel Tank + Engine Assembly | Variable |
| Service Module (crew) | Life Support + Power System | ~1,500 kg |
| Docking Port | Docking Port L2 | 100 kg |

---

## 7. Summary: Engineering Page Layout

The Engineering Page in the PWA displays:

```
┌─────────────────────────────────────────────┐
│ ENGINEERING VIEW — Apollo CSM Equivalent    │
├─────────────────────────────────────────────┤
│ CREW MODULE (L2)                            │
│   Seats: 3                                  │
│   Mass: 850 kg | Cost: $12M                 │
│   ├── Seats (L3): 3× acceleration couch     │
│   ├── Displays (L3): 3× MFD                 │
│   └── Hatch (L3): 1× pressure hatch         │
├─────────────────────────────────────────────┤
│ BRIDGE (L2)                                 │
│   Stations: 3                               │
│   Mass: 450 kg | Cost: $2.5M                │
│   ├── Commander's Seat (L3)                 │
│   ├── Pilot's Seat (L3)                     │
│   └── Systems Seat (L3)                     │
├─────────────────────────────────────────────┤
│ COMPUTER SYSTEM (L2)                        │
│   TL 7.2 | Mass: 32 kg | Cost: $0.5M       │
│   ├── AGC (L3): 2.048 MHz, 76 kB rope      │
│   ├── DSKY (L3): Display/keyboard           │
│   └── Software (L3): COLOSSUS 2C           │
├─────────────────────────────────────────────┤
│ LIFE SUPPORT (L2)                           │
│   Duration: 14 days | Closure: 0%           │
│   Mass: 350 kg | Cost: $2M                  │
│   ├── O₂ Tanks (L3): 14 days stored         │
│   ├── LiOH Scrubbers (L3): 14 canisters     │
│   └── Water Tanks (L3): 14 days stored      │
├─────────────────────────────────────────────┤
│ SENSORS (L2)                                │
│   Mass: 85 kg | Cost: $5M                   │
│   ├── Sextant (L3): Optical nav             │
│   ├── Telescope (L3): Star tracking         │
│   └── Radar (L3): Rendezvous               │
└─────────────────────────────────────────────┘
```

---

## 8. Data Files to Create

Based on this document, the following JSON catalogs are needed:

| File | Entries | Content |
|------|---------|---------|
| `data/computers.json` | 10+ | Flight computers by TL |
| `data/crew_modules.json` | 8+ | Crew module configurations |
| `data/bridge_types.json` | 7+ | Bridge/cockpit types |
| `data/life_support.json` | 6+ | Life support systems by duration |
| `data/sensors.json` | 10+ | Sensor packages |
| `data/software.json` | 8+ | Software suites |

These will be created in subsequent commits.

---

*"The engineering view is where the romance lives — hand-woven rope memory, core memory immune to radiation, a computer less powerful than a calculator that flew to the Moon."*
