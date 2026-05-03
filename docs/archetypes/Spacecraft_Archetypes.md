# Spacecraft Archetypes & Library Seed Data

**Version:** 0.1  
**Date:** 2026-05-03  
**Scope:** Vehicle archetype definitions and seed library entries for the ships-vehicles-designer PWA. Maps real-world and near-future spacecraft to Mneme TL fractions and MSDS taxonomy.

---

## 1. Archetype Overview

| Archetype | Description | Typical TL | MSDS Kind | Key Traits |
|-----------|-------------|------------|-----------|------------|
| **Heavy Spaceplane** | Winged orbital vehicle launched atop heavy LV; lands on runway | 7.6–8.0 | `Orb-H-CP` or `Orb-H-CC` | Reusable, cross-range, high development cost, aerodynamic TPS |
| **LEO Crew Ferry** | Small-to-medium capsule for crew transport to/from LEO stations | 7.2–8.4 | `Orb-Me-CC` or `Orb-Me-CP` | Aborts, life support, docking, conical/compact shape |
| **Deep Space Capsule** | Crew vehicle for cislunar or interplanetary missions | 7.4–8.6 | `CSh-Me-CC` or `CSh-H-CC` | Higher ΔV, radiation shielding, long-duration ECLSS |
| **Resupply Vehicle** | Uncrewed cargo delivery to orbital stations | 7.2–8.4 | `Orb-Me-UC` or `OTV-Me-UC` | Automated docking, pressurized/unpressurized cargo, disposal or return |
| **Robotic Spaceplane** | Uncrewed reusable orbital vehicle for experiments/sample return | 7.8–8.5 | `Orb-S-UC` or `Prb-S-UC` | Long on-orbit duration, autonomous landing, payload bay |

---

## 2. TL Assignment Methodology

Each vehicle is assigned a **Mneme MSDS TL** (decimal) based on:

1. **First-flight year** → lookup in TL Fraction Mapping table
2. **Program Maturity Rating (PMR)** adjustment:
   - First-generation national program: −0.1 to −0.2 TL
   - Mature operational program: baseline TL
   - Commercial/optimized program: +0.1 to +0.2 TL
3. **Component sophistication**: advanced engines, avionics, or reusability may bump TL within the same era

### Reference: TL Fraction Mapping (Space Age)

| TL | Year Range | Era | Representative Events |
|----|-----------|-----|----------------------|
| **7.0** | 1950–1954 | First Space Age | V-2 derivatives, Sputnik R-7 design, X-15 |
| **7.1** | 1955–1959 | Early Orbital | Sputnik (1957), Explorer 1, Vostok design |
| **7.2** | 1960–1964 | Mercury & Vostok | Mercury-Redstone, Vostok 1 (1961), Atlas LV-3B |
| **7.3** | 1965–1969 | Apollo Push | Saturn V first flight (1967), Apollo 11 (1969) |
| **7.4** | 1970–1974 | Post-Apollo | Skylab, Salyut 1, Viking Mars design |
| **7.5** | 1975–1979 | Shuttle Era Begins | STS design freeze, Soyuz-Apollo, Voyager launch |
| **7.6** | 1980–1984 | Shuttle Operational | STS Columbia (1981), Ariane 1, Proton-K |
| **7.7** | 1985–1989 | Cold War Peak | Challenger (1986), Mir core, Hubble design |
| **7.8** | 1990–1994 | Post-Cold War | Delta II, Atlas II, Shuttle-Mir, ISS design begins |
| **7.9** | 1995–1999 | Commercial Dawn | ISS construction, Sea Launch, first Iridium |
| **8.0** | 2000–2004 | Dot-Com Space | Falcon 1 design, Delta IV, Atlas V, ISS crewed |
| **8.1** | 2005–2009 | NewSpace Birth | SpaceX founded (2002), Falcon 1 first flight (2006) |
| **8.2** | 2010–2014 | Reuse Proven | Falcon 9 v1.0, Grasshopper, New Shepard design |
| **8.3** | 2015–2019 | Reuse Mature | Falcon 9 landing (2015), Block 5 (2018), Starlink design |
| **8.4** | 2020–2024 | Starship Era | Crew Dragon operational, SLS Block 1, Starship test flights |
| **8.5** | 2025–2029 | Lunar Return | Artemis III, Starship orbital refueling, New Glenn |
| **8.6** | 2030–2034 | Orbital Economy | Propellant depots, commercial lunar landers |
| **8.7** | 2035–2039 | Deep Space Routine | Mars crewed missions, asteroid mining pilots |
| **8.8** | 2040–2044 | Chemical Ceiling | Near-mature chemical propulsion, NTR development |
| **8.9** | 2045–2049 | Transition Era | NTR operational tests, fusion research reactors |
| **9.0** | 2050+ | New Physics Era | Operational NTR, early fusion drives |

---

## 3. Vehicle Entries

### 3.1 Heavy Spaceplanes

Winged orbital vehicles designed for horizontal runway landing after reentry. High development cost, low flight rate historically.

#### Buran (USSR, 1988)

| Attribute | Value |
|-----------|-------|
| **Name** | Buran (OK-1K1) |
| **Archetype** | Heavy Spaceplane |
| **First Flight** | 1988 (uncrewed orbital) |
| **MSDS TL** | 7.7 |
| **PMR** | 5 |
| **MSDS Kind** | `Orb-H-CP/K-GG/USSR-LEO` |
| **Classification** | `K-GG/2S+S4/USSR-LEO` (Energia-booster stack) |
| **Crew** | 2–10 (designed) |
| **Function** | LEO crew/cargo delivery; satellite deployment; autonomous landing |
| **US Counterpart** | Space Shuttle Orbiter |
| **Notes** | Flew once uncrewed, landed autonomously. Abandoned after Soviet collapse. Launched on Energia super-heavy LV. No main engines onboard (unlike Shuttle) — pure glider. |

**TL Justification:** 1988 falls in TL 7.6–7.8 band. PMR 5 (established national capability, but only one flight) → baseline 7.7.

---

#### Hermes (ESA, cancelled 1993)

| Attribute | Value |
|-----------|-------|
| **Name** | Hermes |
| **Archetype** | Heavy Spaceplane |
| **First Flight** | — (cancelled 1993) |
| **MSDS TL** | 7.9 (design baseline) |
| **PMR** | 3 (never flew) |
| **MSDS Kind** | `Orb-Me-CP/H-SC/EUR-LEO` |
| **Classification** | `H-SC/2S+R/EUR-LEO` (Ariane 5-launched) |
| **Crew** | 3 (designed) |
| **Function** | LEO crew transport to European space station Columbus (also cancelled) |
| **US Counterpart** | Space Shuttle Orbiter (smaller) |
| **Notes** | Designed to launch atop Ariane 5. Cancelled due to cost overruns and post-Challenger safety concerns. Would have been ~1/3 the mass of Shuttle. |

**TL Justification:** Design frozen ~1989–1992 (TL 7.8–7.9). Never achieved flight maturity → PMR 3, effective performance would have been ~TL 7.7.

---

### 3.2 LEO Crew Ferries

Small-to-medium capsules optimized for crew transport to LEO stations. Short mission duration (hours to days).

#### Soyuz (USSR/Russia, 1966–present)

| Attribute | Value |
|-----------|-------|
| **Name** | Soyuz (7K-OK → MS) |
| **Archetype** | LEO Crew Ferry |
| **First Flight** | 1966 (Kosmos-133) |
| **MSDS TL** | 7.3 (original) / 7.8 (MS variant, 2016) |
| **PMR** | 9 (extremely mature program) |
| **MSDS Kind** | `Orb-Me-CC/K-GG/USSR-LEO` |
| **Classification** | `K-GG/2S+S4/USSR-LEO` (Soyuz-FG / Soyuz-2.1a stack) |
| **Crew** | 1–3 |
| **Function** | LEO crew transport; ISS ferry; lifeboat |
| **US Counterpart** | Gemini → Apollo Block II → Crew Dragon |
| **Notes** | Most-flown crewed spacecraft in history (140+ missions). Evolved continuously from 1966 to present. Three-module design: orbital module, descent module, service module. |

**TL Justification:** Original 1966 design = TL 7.3. Continuous upgrades through 2016 (Soyuz MS) with GPS, digital avionics, improved TPS → TL 7.8. PMR 9 due to extraordinary flight heritage.

---

#### Shenzhou (China, 2003–present)

| Attribute | Value |
|-----------|-------|
| **Name** | Shenzhou (神舟) |
| **Archetype** | LEO Crew Ferry |
| **First Flight** | 2003 (Shenzhou 5, first Chinese crewed flight) |
| **MSDS TL** | 8.0 |
| **PMR** | 6 |
| **MSDS Kind** | `Orb-Me-CC/K-GG/CHN-LEO` |
| **Classification** | `K-GG/2S+S4/CHN-LEO` (Long March 2F stack) |
| **Crew** | 1–3 |
| **Function** | LEO crew transport; Tiangong space station ferry |
| **US Counterpart** | Soyuz (similar three-module layout) / Crew Dragon |
| **Notes** | Inspired by Soyuz but significantly larger (~20% heavier). Orbital module has independent maneuvering and can continue mission after crew returns. First independent Chinese crewed program. |

**TL Justification:** First flight 2003 = TL 8.0. PMR 6 (mature program with lessons learned; not yet at commercial optimization). Long March 2F is a kerolox GG stack with hypergolic upper stage.

---

### 3.3 Deep Space Capsules

Crew vehicles with sufficient ΔV and life support for cislunar or interplanetary missions. Higher mass, more robust ECLSS.

#### Orel / Federation (Russia, planned 2028+)

| Attribute | Value |
|-----------|-------|
| **Name** | Orel (Орёл, formerly Federation) |
| **Archetype** | Deep Space Capsule |
| **First Flight** | — (planned ~2028–2030) |
| **MSDS TL** | 8.4 (design target) |
| **PMR** | 4 (second-generation but long development, many delays) |
| **MSDS Kind** | `CSh-Me-CC/K-GG/USSR-TLI` |
| **Classification** | `K-GG/2S+S?/USSR-TLI` (Angara A5 or super-heavy stack TBD) |
| **Crew** | 4–6 |
| **Function** | Cislunar crew transport; lunar orbit; deep space |
| **US Counterpart** | Orion (NASA) |
| **Notes** | Designed to replace Soyuz for deep-space missions. Lift-body / capsule hybrid shape. Delays since 2009; Angara LV issues have pushed timeline repeatedly. |

**TL Justification:** Design targets 2025–2030 era = TL 8.4–8.6. PMR 4 reflects long development with significant delays and scope changes. If it flies by 2028, effective TL likely 8.3–8.4.

---

#### Mengzhou (梦舟) / New Generation Crew Vehicle (China, planned 2027+)

| Attribute | Value |
|-----------|-------|
| **Name** | Mengzhou (梦舟, "Dream Vessel") |
| **Archetype** | Deep Space Capsule |
| **First Flight** | — (planned ~2027–2030) |
| **MSDS TL** | 8.5 (design target) |
| **PMR** | 5 |
| **MSDS Kind** | `CSh-H-CC/K-GG/CHN-TLI` |
| **Classification** | `K-GG/3S/CHN-TLI` (Long March 10 stack) |
| **Crew** | 3–7 |
| **Function** | Cislunar crew transport; lunar landing support; deep space |
| **US Counterpart** | Orion / Artemis HLS (complementary) |
| **Notes** | Two variants: lunar (21 t, 3 crew) and LEO (14 t, 7 crew). Replaces Shenzhou for deep-space missions. Designed for Long March 10 (new crew-rated heavy LV). |

**TL Justification:** Targets late-2020s lunar return era = TL 8.5. PMR 5 (established national capability with Shenzhou heritage but new vehicle class). China's methodical program suggests steady PMR growth.

---

#### SUSIE (Smart Upper Stage for Innovative Exploration) (ESA, proposed)

| Attribute | Value |
|-----------|-------|
| **Name** | SUSIE |
| **Archetype** | Deep Space Capsule / LEO Crew Ferry (dual-role) |
| **First Flight** | — (conceptual, ~2030s if funded) |
| **MSDS TL** | 8.6 (conceptual) |
| **PMR** | 3 (paper study only) |
| **MSDS Kind** | `CSh-Me-CC/M-GG/EUR-TLI` |
| **Classification** | `M-GG/2S+R/EUR-LEO` (Ariane 6 evolution) |
| **Crew** | 3–5 |
| **Function** | LEO crew transport; potential cislunar; cargo return |
| **US Counterpart** | Crew Dragon / Dream Chaser (partial) |
| **Notes** | ArianeGroup concept for reusable crew/cargo vehicle launched on Ariane 6. Competes with commercial providers but leverages existing European infrastructure. Uncertain funding. |

**TL Justification:** Conceptual 2030s design = TL 8.6. PMR 3 (paper study; would likely underperform baseline if built). Promising architecture but no committed program.

---

### 3.4 Resupply Vehicles

Uncrewed automated cargo spacecraft for space station logistics.

#### Progress (USSR/Russia, 1978–present)

| Attribute | Value |
|-----------|-------|
| **Name** | Progress (7K-TG → MS) |
| **Archetype** | Resupply Vehicle |
| **First Flight** | 1978 |
| **MSDS TL** | 7.5 (original) / 7.8 (MS variant) |
| **PMR** | 9 |
| **MSDS Kind** | `Orb-Me-UC/K-GG/USSR-LEO` |
| **Classification** | `K-GG/2S+S4/USSR-LEO` (Soyuz-derived stack) |
| **Crew** | 0 |
| **Function** | ISS cargo resupply; orbit-raising; trash disposal (destructive reentry) |
| **US Counterpart** | Cygnus / Cargo Dragon (partial) |
| **Notes** | Derived from Soyuz (identical service module, no descent module). ~2.3 t cargo capacity. Cannot return cargo to Earth (burns up). Essential for ISS propellant and water delivery. |

**TL Justification:** 1978 first flight = TL 7.5. Continuous evolution with Soyuz family. PMR 9 (hundreds of flights). Progress MS (2015+) has digital avionics → TL 7.8.

---

#### Tianzhou (天舟) (China, 2017–present)

| Attribute | Value |
|-----------|-------|
| **Name** | Tianzhou (天舟, "Heavenly Vessel") |
| **Archetype** | Resupply Vehicle |
| **First Flight** | 2017 (Tianzhou-1) |
| **MSDS TL** | 8.3 |
| **PMR** | 6 |
| **MSDS Kind** | `Orb-H-UC/K-GG/CHN-LEO` |
| **Classification** | `K-GG/2S+S?/CHN-LEO` (Long March 7 stack) |
| **Crew** | 0 |
| **Function** | Tiangong space station cargo resupply; propellant transfer; trash disposal |
| **US Counterpart** | Cargo Dragon / Cygnus (larger than both) |
| **Notes** | Largest resupply vehicle currently flying (~6.5 t pressurized + ~2.0 t unpressurized cargo). Derived from Tiangong-1 module technology, not Shenzhou. Propellant transfer capability for station-keeping. |

**TL Justification:** 2017 first flight = TL 8.3. PMR 6 (mature program; second-generation after Tiangong-1 heritage). Larger and more capable than Progress but less flight heritage.

---

#### ATV (Automated Transfer Vehicle) (ESA, 2008–2015)

| Attribute | Value |
|-----------|-------|
| **Name** | ATV (Jules Verne, Johannes Kepler, Edoardo Amaldi, Albert Einstein, Georges Lemaître) |
| **Archetype** | Resupply Vehicle |
| **First Flight** | 2008 (ATV-1) |
| **MSDS TL** | 8.1 |
| **PMR** | 7 |
| **MSDS Kind** | `Orb-H-UC/H-GG/EUR-LEO` |
| **Classification** | `H-GG/2S+S2/EUR-LEO` (Ariane 5 ES stack) |
| **Crew** | 0 |
| **Function** | ISS cargo resupply; orbit-raising; trash disposal; crew quarters occasionally |
| **US Counterpart** | Cygnus (larger) / Cargo Dragon |
| **Notes** | 5 flights total. Largest ISS resupply vehicle until Tianzhou (~7.7 t cargo). European cooperation showcase. Precision docking (GPS + laser). Used for orbit-raising after Shuttle retirement. |

**TL Justification:** 2008 first flight = TL 8.1. PMR 7 (multiple successful flights, international cooperation). Hydrolox upper stage on Ariane 5 (unusual for resupply LV). Program ended 2015; ESA focused on service module for Orion instead.

---

### 3.5 Robotic Spaceplanes

Uncrewed reusable orbital vehicles for technology demonstration, experiments, and sample return.

#### Kliper (Clipper) (Russia, cancelled 2006)

| Attribute | Value |
|-----------|-------|
| **Name** | Kliper (Клипер, "Clipper") |
| **Archetype** | Robotic Spaceplane / LEO Crew Ferry (dual-role design) |
| **First Flight** | — (cancelled 2006) |
| **MSDS TL** | 8.0 (design baseline) |
| **PMR** | 3 (cancelled before prototype) |
| **MSDS Kind** | `Orb-Me-CP/K-GG/USSR-LEO` |
| **Classification** | `K-GG/2S+S?/USSR-LEO` (launch vehicle TBD) |
| **Crew** | 2–6 (optional) |
| **Function** | LEO crew/cargo transport; potential lunar missions |
| **US Counterpart** | X-38 (NASA) / Dream Chaser (partial) |
| **Notes** | Lifting-body design, smaller than Buran. Proposed as Soyuz replacement. Competed with Orel concept; lost to capsule approach. Would have launched on Angara or Zenit. |

**TL Justification:** Design study ~2000–2006 = TL 8.0. PMR 3 (competition proposal, never funded for development). Interesting alternative history vehicle.

---

#### CSSHQ (Chinese Spaceplane, ~2020–present)

| Attribute | Value |
|-----------|-------|
| **Name** | CSSHQ (Chinese Suborbital/Reusable Spaceplane, unofficial name) |
| **Archetype** | Robotic Spaceplane |
| **First Flight** | ~2020 (reported suborbital tests) |
| **MSDS TL** | 8.3 |
| **PMR** | 4 |
| **MSDS Kind** | `Orb-S-UC/K-GG/CHN-LEO` |
| **Classification** | `K-GG/2S/CHN-LEO` (Long March 2C or similar) |
| **Crew** | 0 |
| **Function** | Technology demonstration; on-orbit experiments; reusable testbed |
| **US Counterpart** | X-37B (USAF/NASA/Space Force) |
| **Notes** | Highly classified Chinese program. Suspected to be X-37B analog. Limited public information. Likely subscale test article for future larger vehicle. |

**TL Justification:** ~2020 tests = TL 8.3. PMR 4 (early tests, significant secrecy). Classification is speculative due to lack of open-source data.

---

#### Space Rider (ESA, planned 2025+)

| Attribute | Value |
|-----------|-------|
| **Name** | Space Rider |
| **Archetype** | Robotic Spaceplane |
| **First Flight** | — (planned ~2025–2026) |
| **MSDS TL** | 8.4 |
| **PMR** | 4 |
| **MSDS Kind** | `Orb-S-UC/S-SEG/EUR-LEO` |
| **Classification** | `S-SEG/3S/EUR-LEO` (Vega-C stack) |
| **Crew** | 0 |
| **Function** | Microgravity experiments; technology demonstration; sample return; Earth observation |
| **US Counterpart** | X-37B (partial) / Dream Chaser (partial) |
| **Notes** | Derived from IXV reentry demonstrator. ~800 kg payload capacity. Lands under parafoil. Vega-C launch. ESA's first reusable orbital vehicle. Replaces atmospheric drop tests with actual on-orbit exposure. |

**TL Justification:** Target 2025–2026 = TL 8.4. PMR 4 (IXV heritage but new orbital system). Small-scale; focused on experiments rather than cargo resupply.

---

## 4. Summary Matrix

| Vehicle | Archetype | Nation | Era | TL | PMR | Crew | Status |
|---------|-----------|--------|-----|----|-----|------|--------|
| **Buran** | Heavy Spaceplane | USSR | 1988 | 7.7 | 5 | 0–10 | Retired (1 flight) |
| **Hermes** | Heavy Spaceplane | Europe | 1990s (design) | 7.9 | 3 | 3 | Cancelled |
| **Soyuz** | LEO Crew Ferry | Russia | 1966–present | 7.3→7.8 | 9 | 1–3 | Operational |
| **Shenzhou** | LEO Crew Ferry | China | 2003–present | 8.0 | 6 | 1–3 | Operational |
| **Orel** | Deep Space Capsule | Russia | 2028+ (planned) | 8.4 | 4 | 4–6 | Development |
| **Mengzhou** | Deep Space Capsule | China | 2027+ (planned) | 8.5 | 5 | 3–7 | Development |
| **SUSIE** | Deep Space Capsule | Europe | 2030s (concept) | 8.6 | 3 | 3–5 | Proposal |
| **Progress** | Resupply Vehicle | Russia | 1978–present | 7.5→7.8 | 9 | 0 | Operational |
| **Tianzhou** | Resupply Vehicle | China | 2017–present | 8.3 | 6 | 0 | Operational |
| **ATV** | Resupply Vehicle | Europe | 2008–2015 | 8.1 | 7 | 0 | Retired (5 flights) |
| **Kliper** | Robotic Spaceplane | Russia | 2000s (design) | 8.0 | 3 | 0–6 | Cancelled |
| **CSSHQ** | Robotic Spaceplane | China | ~2020–present | 8.3 | 4 | 0 | Testing |
| **Space Rider** | Robotic Spaceplane | Europe | 2025+ (planned) | 8.4 | 4 | 0 | Development |

---

## 5. Library Population Notes

### Priority Tiers for Implementation

**Tier 1 — Operational, High Heritage (implement first):**
- Soyuz (7.3/7.8) — most flights, best calibration anchor
- Progress (7.5/7.8) — cargo variant of Soyuz
- Shenzhou (8.0) — active non-Western crew vehicle
- Tianzhou (8.3) — largest active resupply vehicle

**Tier 2 — Historical / Retired (important for timeline completeness):**
- Buran (7.7) — only Soviet spaceplane flight
- ATV (8.1) — European ISS contribution

**Tier 3 — Development / Near Future (add as designs mature):**
- Mengzhou (8.5) — Chinese lunar program
- Space Rider (8.4) — ESA reusable demonstrator

**Tier 4 — Cancelled / Conceptual (optional, for alternate history):**
- Hermes (7.9) — European what-if
- Orel (8.4) — troubled Russian replacement
- SUSIE (8.6) — European commercial concept
- Kliper (8.0) — Russian lifting-body what-if
- CSSHQ (8.3) — classified Chinese testbed

### Data Gaps to Resolve

| Vehicle | Missing Data | Source Needed |
|---------|-------------|---------------|
| CSSHQ | Mass, dimensions, any specs | Classified; use X-37B analog |
| Orel | Final LV assignment, dry mass | Roscosmos press releases |
| Mengzhou | Long March 10 specs, lunar variant mass | CNSA technical papers |
| SUSIE | Ariane 6 evolution specs, funding status | ArianeGroup presentations |
| Space Rider | Vega-C performance, landing precision | ESA technical docs |

---

## 6. Relationship to Existing Library

The current vehicle library (`/public/data/library/`) contains:
- Saturn V, N1-L3, Falcon 9 (Launch Vehicles)
- Apollo CSM, Apollo LM, Artemis HLS, Orion Crew (Crew/Deep Space)

This archetype document fills gaps in:
- **Soviet/Russian heritage**: Soyuz, Progress, Buran
- **Chinese programs**: Shenzhou, Tianzhou, Mengzhou, CSSHQ
- **European concepts**: Hermes, ATV, SUSIE, Space Rider
- **Cancelled but influential**: Kliper, Hermes

### Suggested Library JSON Filenames

| Vehicle | Filename | Notes |
|---------|----------|-------|
| Soyuz 7K-OK | `soyuz-7k-ok.json` | Original 1966 variant |
| Soyuz MS | `soyuz-ms.json` | Modern 2016 variant |
| Progress MS | `progress-ms.json` | Modern resupply variant |
| Shenzhou | `shenzhou.json` | Current operational variant |
| Tianzhou | `tianzhou.json` | Current operational variant |
| Buran | `buran.json` | 1988 flight configuration |
| ATV | `atv.json` | Generic ATV configuration |
| Mengzhou | `mengzhou-lunar.json` | Lunar variant (planned) |
| Space Rider | `space-rider.json` | Planned configuration |

---

*Document Status: v0.1 Draft — Archetype definitions and TL assignments established. Tier 1 vehicles ready for BOM generation.*

*Next step: Generate BOM JSONs for Tier 1 vehicles (Soyuz, Progress, Shenzhou, Tianzhou) using TL-appropriate components from the existing component catalog.*
