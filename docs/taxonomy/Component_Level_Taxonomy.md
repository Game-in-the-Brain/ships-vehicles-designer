# Component Level Taxonomy: L2 vs L3 Abstraction

**Version:** 0.1  
**Date:** 2026-05-02  
**Scope:** Definitive rules for what lives at Level 2 (player-facing) vs Level 3 (abstracted/internal).

---

## 1. Core Principle

> **L2 = What the player touches. L3 = What the engineer opens.**

The 3-level hierarchy exists because human working memory holds 3–4 chunks. If a design wants a 4th level, that level gets promoted to L3, or the hierarchy is refactored.

**L2 components** attach to Structures. They have mass, cost, TL, and a single-line description a player can read.

**L3 components** live *inside* L2 components. They are only visible when the player opens the "Engineering View" or modifies a component's internals.

---

## 2. Level 2: Player-Facing Components

These are the components that appear in the Structure Builder's "Add Component" menu.

| L2 Component | Icon | Mass | Cost | TL | What It Does |
|--------------|------|------|------|----|--------------|
| **Engine Assembly** | 🔧 | Engine dry mass | Engine cost | Power Plant TL | Produces thrust |
| **Fuel Tank** | ⛽ | Propellant + tank mass | Tank cost | Structural TL | Stores propellant |
| **Avionics Unit** | 📡 | 3–450 kg | $0.2–2M | 7.0–9.0 | Guidance, navigation, control |
| **Crew Module** | 👨‍🚀 | 200–5000 kg | $1–50M | 7.0–9.0 | Seats, displays, atmosphere for crew |
| **Computer System** | 💻 | 5–100 kg | $0.1–5M | 7.0–9.0 | Flight computers, data processing |
| **Bridge / Cockpit** | 🎛️ | 50–500 kg | $0.5–10M | 7.0–9.0 | Command station, controls, visibility |
| **Life Support** | 🌬️ | 100–2000 kg | $0.5–20M | 7.0–9.0 | Air, water, thermal, waste |
| **Sensors** | 🔭 | 10–500 kg | $0.1–50M | 7.0–9.0 | Radar, telescope, comms, science |
| **Power System** | ⚡ | 50–5000 kg | $0.2–100M | 7.0–9.0 | Batteries, solar, RTG, nuclear |
| **Thermal Protection** | 🛡️ | 50–3000 kg | $0.1–10M | 7.0–9.0 | Heat shields, insulation, radiators |
| **Recovery System** | 🪂 | 20–1000 kg | $0.05–5M | 7.0–9.0 | Parachutes, landing legs, airbags |
| **Payload** | 📦 | Variable | Variable | Payload TL | Cargo, instruments, satellites |
| **Docking Port** | 🔌 | 50–200 kg | $0.1–1M | 7.0–9.0 | Rendezvous and docking interface |
| **RCS Thrusters** | 💨 | 5–50 kg | $0.01–0.5M | 7.0–9.0 | Attitude control, small maneuvers |

**L2 Rule:** Every L2 component must be describable in one sentence a 12-year-old can understand.

> *"This engine pushes the rocket with 7,740 kN of thrust."*
> *"This crew module has seats for 3 astronauts and keeps them alive."*

---

## 3. Level 3: Internal / Engineering Components

These components are **hidden by default**. They appear only in the Engineering View.

### Inside Engine Assembly (L2)

| L3 Component | What It Is | Example |
|--------------|------------|---------|
| **Power Plant** | Thermodynamic cycle + chemistry | Merlin 1D gas-generator kerolox |
| **Drive** | Nozzle / thrust delivery | Gimbaled bell nozzle |
| **Turbopump** | Pumps propellant to chamber | Merlin 1D turbopump (inside Power Plant) |
| **Injectors** | Atomizes propellant in chamber | Pintle injector |
| **Chamber** | Combustion chamber | Regeneratively cooled chamber |

**L3 Engine Rule:** The player picks a Power Plant and a Drive. The engine's stats are computed from these. The player never touches turbopumps, injectors, or chambers unless they are in **Engineering Mode**.

### Inside Avionics Unit (L2)

| L3 Component | What It Is | Example |
|--------------|------------|---------|
| **IMU** | Inertial measurement unit | MEMS gyro + accelerometer |
| **GPS Receiver** | Satellite navigation | Triple-frequency GNSS receiver |
| **Flight Computer Board** | Processing hardware | RAD750 processor board |
| **Software** | Flight code | Autopilot algorithm, guidance laws |
| **Antenna** | RF communication | S-band patch antenna |

**L3 Avionics Rule:** The player picks an Avionics Unit by generation (TL). The internal boards, chips, and software are abstracted. Engineering Mode reveals them for modification.

### Inside Crew Module (L2)

| L3 Component | What It Is | Example |
|--------------|------------|---------|
| **Seats** | Crew seating | Acceleration couches, restraints |
| **Displays** | Information output | MFDs, HUD, status panels |
| **Hatch** | Entry/exit | Pressure-sealed hatch |
| **Windows** | External visibility | Multipane pressure windows |

### Inside Life Support (L2)

| L3 Component | What It Is | Example |
|--------------|------------|---------|
| **CO₂ Scrubber** | Removes carbon dioxide | LiOH canisters or Sabatier |
| **Oxygen Generator** | Produces breathable O₂ | Electrolysis or stored O₂ |
| **Water Recycler** | Reclaims water | Vapor compression distillation |
| **Thermal Radiator** | Rejects waste heat | Ammonia-loop radiator |
| **Waste Management** | Handles human waste | Vacuum-drying toilet |

### Inside Computer System (L2)

| L3 Component | What It Is | Example |
|--------------|------------|---------|
| **Processor** | Main CPU | RAD750, LEON3, COTS ARM |
| **Memory** | RAM + storage | EEPROM, SSD, magnetic core |
| **I/O Bus** | Data backbone | MIL-STD-1553, SpaceWire, Ethernet |
| **Software Suite** | Programs | Guidance, telemetry, fault management |

### Inside Sensors (L2)

| L3 Component | What It Is | Example |
|--------------|------------|---------|
| **Sensor Head** | Physical detector | CCD, radar dish, spectrometer |
| **Signal Processor** | Converts signal to data | FPGA DSP board |
| **Gimbal** | Points sensor | 2-axis motorized mount |

---

## 4. Engineering View Toggle

The UI has two modes:

### Normal Mode (default)
```
Structure
├── Engine Assembly ← L2 (click to swap)
├── Fuel Tank       ← L2 (click to resize)
├── Avionics Unit   ← L2 (click to upgrade)
└── Crew Module     ← L2 (click to configure)
```

### Engineering Mode (toggle in header)
```
Structure
├── Engine Assembly ← L2
│   ├── Power Plant ← L3 (click to modify cycle)
│   ├── Drive       ← L3 (click to swap nozzle)
│   └── Injectors   ← L3 (click to upgrade)
├── Fuel Tank       ← L2
├── Avionics Unit   ← L2
│   ├── IMU         ← L3
│   ├── GPS         ← L3
│   └── Software    ← L3
└── Crew Module     ← L2
    ├── Seats       ← L3
    └── Displays    ← L3
```

**Engineering Mode is read-only by default.** To modify L3 components, the player must enter **Design Mode** (separate toggle), which warns: *"Modifying internal components may void warranties and introduce Bugs."*

---

## 5. SimpleRockets → MSDS Level Mapping

| SimpleRockets Part | MSDS Level | Notes |
|--------------------|------------|-------|
| Command Pod | L2: Crew Module + L2: Bridge | Combined in SimpleRockets, split in MSDS |
| Probe Core | L2: Avionics Unit (uncrewed) | Smaller, no life support |
| Fuel Tank | L2: Fuel Tank | Direct mapping |
| Engine | L2: Engine Assembly | L3: Power Plant + Drive inside |
| Separator | L1: Structure junction | Not a component |
| Fairing | L2: Thermal Protection (aero) | Or payload adapter |
| Landing Leg | L2: Recovery System | Sub-type: landing gear |
| Parachute | L2: Recovery System | Sub-type: descent |
| Heat Shield | L2: Thermal Protection | Sub-type: ablative shield |
| Solar Panel | L2: Power System | Sub-type: solar |
| Battery | L2: Power System | Sub-type: battery |
| RCS Thruster | L2: RCS Thrusters | Or part of Avionics (attitude) |
| Docking Port | L2: Docking Port | Direct mapping |
| Wing | L2: Thermal Protection (aero) | Aerodynamic surface |
| Strut | L1: Structure | Structural element |

---

## 6. What Gets Abstracted into L3: Decision Criteria

A component is abstracted to L3 if it meets ANY of these criteria:

| Criterion | Example |
|-----------|---------|
| Requires engineering degree to understand | Turbopump impeller design, injector patterns |
| Has >3 variants that are minor tweaks | 5 types of LiOH canisters, 12 types of solar cells |
| Is rarely changed by players | Wiring harnesses, mounting brackets, seals |
| Is automatically determined by L2 choice | Nozzle material (determined by Drive TL), chamber pressure (determined by Power Plant) |
| Would clutter the UI | Individual screws, cables, circuit traces |

A component is promoted to L2 if it meets ANY of these criteria:

| Criterion | Example |
|-----------|---------|
| Player actively chooses it | Engine type, fuel type, crew count |
| Has significant mass/cost impact | Crew module (500 kg), engine (1600 kg) |
| Affects vehicle performance directly | Isp, thrust, delta-V, crew capacity |
| Is historically significant | Apollo Guidance Computer, Shuttle GPC |
| Is fun to read about | *"This computer has 76kB of rope memory."* |

---

## 7. L3 Discovery System (Procedural Fun)

When a player enters Engineering Mode for the first time on a vehicle, they may "discover" hidden L3 components:

| Roll | Discovery |
|------|-----------|
| 1 | Manufacturing label: *"Lot 734-A, pressed by hand during strike"* |
| 2 | Scribbled note: *"DO NOT TOUCH — Johnson knows why"* |
| 3 | Unexpected part: *"Why is there a 1978 Soviet resistor in here?"* |
| 4 | Upgrade path: *"Chamber can take +15% pressure with new alloy"* |
| 5 | Bug: *"Injector pattern asymmetric — causes 0.3% thrust oscillation"* |
| 6 | Feature: *"Turbopump bearing secretly rated for 2× design life"* |

These discoveries add flavor and may unlock modification options.

---

## 8. Summary Table: L2 vs L3

| Aspect | Level 2 | Level 3 |
|--------|---------|---------|
| **Visibility** | Always visible | Hidden by default |
| **UI** | Structure Builder | Engineering View |
| **Interaction** | Add/remove/swap | Modify internals |
| **Mass/Cost** | Directly summed | Included in L2 parent |
| **TL** | Independent | Constrained by parent L2 |
| **Count per Structure** | 1–20 | Unlimited (inside L2) |
| **Player skill** | Tabletop player | Engineer/enthusiast |
| **Documentation** | One-line description | Full specs + history |

---

*"The player builds the rocket. The engineer opens the hood."*
