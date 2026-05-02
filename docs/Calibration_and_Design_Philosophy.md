# Mneme MSDS — Calibration & Design Philosophy

**Version:** 0.1  
**Date:** 2026-05-02  
**Scope:** Explains why designs may deviate from real-world specifications and when such deviations are intentional.

---

## 1. Core Principle: Playability Over Perfection

Mneme MSDS is a **design tool and educational simulator**, not a forensic engineering audit. The system intentionally makes trade-offs that prioritize:

1. **Rapid iteration** — players can build and test designs without hunting for obscure historical datasheets
2. **Clear feedback** — violations are flagged only when they represent genuine design errors, not rounding artifacts
3. **Discoverability** — players learn *why* real rockets were built the way they were by experimenting with alternatives

This means some numbers are **optimistic** compared to historical hardware. This is by design.

---

## 2. The Mass Rounding Convention

### Rule
All component masses are **rounded up to the nearest practical unit** (typically 5 kg, 10 kg, 50 kg, or 100 kg depending on component class).

### Why
Real-world rockets include hundreds of small items that are tedious to account for individually:
- Fasteners, brackets, and fittings
- Wiring harnesses and plumbing
- Paint, thermal blankets, and insulation
- Margins for uncertainty and growth

Rather than force players to model every bolt, we **consolidate these into rounded base masses**. The rounding is always **upward**, meaning:
- A real engine that weighs 847 kg becomes 850 kg in the catalog
- A real tank frame that weighs 1,247 kg becomes 1,250 kg

### Consequence: Optimistic Performance
Because masses are rounded up, the **mass ratio** (wet mass / dry mass) of a design built in MSDS is slightly worse than the theoretical optimum. To compensate and keep the design process satisfying, engine **Isp and thrust values are set at the optimistic end of their real-world ranges**.

This creates a self-consistent system where:
- **Dry masses** → slightly heavier than minimum theoretical
- **Engine performance** → slightly better than average flight-proven
- **Net delta-V** → matches real-world mission requirements without frustration

> **Example:** The Apollo LM descent engine (AJ10-137) had a flight-proven Isp of ~311 s. In MSDS we use 311 s (the catalog value for `hyg-1`). A purist might argue for 305 s to account for plumbing losses and production variance. We keep the optimistic value so that a properly-designed LM achieves its ~4,700 m/s budget without the player needing to know every grams of plumbing mass.

---

## 3. Calibration Anchors

### Primary Anchor: Saturn V (TL 7.4, PMR 10)
All other designs are validated against the Saturn V stack:
- **Total ΔV:** 11,290 m/s (known mission profile)
- **LEO payload:** 118,000 kg (documented)
- **TLI payload:** 48,600 kg (documented)
- **Mass ratio:** S-IC 24.6:1, S-II 13.8:1, S-IVB 19.4:1

If a player builds a Saturn V replica using catalog components and gets within ±3% of these values, the calibration is considered valid.

### Secondary Anchors
| Vehicle | TL | PMR | Key Validation Metric |
|---------|-----|-----|----------------------|
| R-7 Semiorka | 7.0 | 10 | 1,300 kg to LEO |
| Falcon 9 Block 5 | 7.6 | 9 | 22,800 kg to LEO |
| Starship | 8.4 | 8 | 150,000 kg to LEO |
| Apollo LM | 7.4 | 10 | 4,720 m/s total ΔV |
| Orion | 8.2 | 8 | 1,350 m/s service module ΔV |

---

## 4. When Deviations Are NOT Flagged

The following deviations from real-world data are **intentional and not errors**:

| Deviation | Reason | Example |
|-----------|--------|---------|
| Engine Isp at catalog max rather than flight average | Mass rounding compensation | F-1 rated at 304 s vs. 301 s flight average |
| Tank mass fraction better than historical | Modern materials assumed for TL 8.0+ | Starship tanks at 4% dry mass vs. Shuttle ET at 8% |
| Avionics mass lighter than Apollo-era hardware | Moore's Law progression | Orion GNC at 70 kg vs. Apollo AGC at 32 kg + support hardware |
| Crew module volume larger than capsule exterior | Habitable volume vs. outer mold line | Crew Dragon 9.3 m³ internal vs. ~7 m³ external envelope |
| Structural mass not including intertank rings | Abstracted into structure mass | S-IC interstage included in 130 t structure mass |

---

## 5. When Deviations ARE Flagged

The following **are** flagged as design violations:

| Violation | Check | Severity |
|-----------|-------|----------|
| Structure over-capacity | Σ(component masses) > structure.capacityTons | **Critical** — red warning |
| Insufficient ΔV for mission | totalDeltaV < mission requirement | **Warning** — yellow alert |
| Mismatched chemistry | Fuel type does not match engine chemistry | **Error** — blocks simulation |
| Crew exceeds seats | Total crew > Σ(crewModule.seats) | **Warning** — yellow alert |
| Bridge stations < min crew | minCrew > Σ(bridgeType.stations) | **Warning** — yellow alert |

---

## 6. The "Within Spitting Distance" Rule

If a player builds a historical vehicle using catalog components and the result is:
- **Mass:** ±10% of real-world dry mass
- **ΔV:** ±5% of mission requirement
- **Cost:** ±25% of program cost (costs are notoriously uncertain)

…then the design is considered **calibrated**. The player has successfully captured the essence of the historical design.

> **Note to reviewers:** Do not file issues saying "the F-1 should be 301 s not 304 s" or "the Apollo LM should mass 16,400 kg not 15,400 kg." These are intentional calibrations. If you find a case where a *properly-built* historical vehicle is **more than 15% off** its known performance, that is a legitimate calibration bug.

---

## 7. Theoretical Vehicles (TL 9.0+)

For theoretical and conceptual vehicles (Bussard Ramjet, Alcubierre drive, etc.), there are no real-world anchors. These use:
- **Physics-based extrapolation** from known principles
- **Literature values** from concept studies
- **Generous margins** to account for unknown engineering challenges

Theoretical vehicles are explicitly marked with `origin: "THEO"` and should be understood as **best-case scenario** designs. They represent "if we could build this with today's understanding of physics, what would it look like?"

---

*End of document. This philosophy applies to all MSDS versions unless explicitly superseded.*
