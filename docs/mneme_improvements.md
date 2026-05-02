# CE ShipGen → MSDS Integration Notes

**Version:** 0.1  
**Date:** 2026-05-02  
**Purpose:** Document how CE ShipGen's architecture, data model, and UI patterns map to the Mneme Ship Design System (MSDS). Identify what MSDS improves upon and what it borrows directly.

---

## 1. Executive Summary

CE ShipGen is a mature, playable PWA for Cepheus Engine starship design. MSDS replaces its displacement-ton model with a mass-based, delta-V-centric rocket engineering framework. This document maps CE ShipGen's concepts to MSDS equivalents and flags opportunities for improvement.

**Key Differences:**

| Aspect | CE ShipGen | MSDS |
|--------|------------|------|
| **Primary metric** | Displacement tons (dtons) | Mass (kg) |
| **Performance model** | Table lookups (drive code + hull size → thrust) | Tsiolkovsky rocket equation (ΔV = Isp × g₀ × ln(m_wet/m_dry)) |
| **Hierarchy** | Flat (Hull → Config → Armor → Drive → Power Plant → …) | 3 levels max (Stage → Engine/Fuel → Power Plant/Drive) |
| **Vehicle type** | Starships (FTL-capable) | Rockets / launch vehicles (sub-FTL) |
| **Economics** | Monthly mortgage, crew salaries, passenger revenue | Program cost, per-launch cost, development cost |
| **Tech Level** | Integer TL (7–15) | Decimal TL (7.0–9.0+) with .1 = ~5yr |
| **Classification** | Role + size class (e.g., "Freighter") | PROP-ARC/STG-CFG/MIS-ORG (e.g., `K-GG/2S+R/USA-LEO`) |
| **Visual style** | Sci-fi mainframe (green phosphor) | Modern tactical datasheet (charcoal/cyan) |

---

## 2. Data Model Mapping

### CE ShipGen → MSDS Type Equivalents

| CE ShipGen Type | MSDS Equivalent | Notes |
|-----------------|-----------------|-------|
| `ShipDesign` | `VehicleDesign` | Root aggregate. MSDS replaces `hullDtons` with `totalWetMassKg`. |
| `HullModel` | *(none)* | MSDS has no hull abstraction; stages define their own structure. |
| `DriveModel` | `PowerPlant` + `Drive` | CE collapses power plant and drive into one table. MSDS splits them (L3). |
| `PowerPlantModel` | `PowerPlant` | CE has 2 entries (Fission/Fusion). MSDS has 19 (chemical + nuclear + electric). |
| `ArmorModel` | *(none)* | Rockets don't have armor in MSDS v0.1. Future: TPS (thermal protection). |
| `BridgeModel` | *(none)* | Crewed vehicles may add this in v0.3. |
| `ComputerModel` | *(none)* | Guidance is abstracted into avionics mass. |
| `WeaponModel` | *(none)* | Military payloads are payload mass, not weapons. |
| `ChildItem` | `Engine`, `FuelBlock` | MSDS L2 components. Simpler because no nested slots. |
| `ShipComponent` | `Stage` | MSDS L1 component. Much richer (mass, ΔV, TWR, burn time). |
| `ShipClassification` | `VehicleClassification` | MSDS adds PROP-ARC and STG-CFG axes. |
| `CrewBreakdown` | *(none)* | Crew is payload mass or not modeled yet. |
| `OperatingCosts` | *(none)* | MSDS v0.1 only tracks build cost, not operating economics. |
| `ValidationResult` | `ValidationResult` | Direct port. MSDS adds TWR and ΔV targets. |

---

## 3. Table System Architecture

### What MSDS Borrows from CE ShipGen

| CE ShipGen Pattern | MSDS Adoption |
|--------------------|---------------|
| `DataTable<T>` generic interface | ✅ Directly adopted |
| `TableId` union type | ✅ Adopted as `ComponentTableId` |
| `TABLE_FILES` record mapping IDs to fetch paths | ✅ Adopted in `loadTables.ts` |
| `TABLE_NAMES` human-readable names | ✅ Adopted |
| Zustand + Immer + Persist store | ✅ Directly adopted (proven pattern) |
| `loadTables()` async fetch loop | ✅ Adopted |
| `updateTable`, `resetTable`, `importTables`, `exportTables` | ✅ Adopted |
| `activeTables` registry for custom tables | ✅ Adopted |
| Settings snapshots (FR-024) | ✅ Adopted in FDR-005 |

### What MSDS Improves Upon

| CE ShipGen Limitation | MSDS Improvement |
|-----------------------|------------------|
| Flat 19-step wizard | 3-level hierarchy with visual stage stack |
| Displacement tons (abstract) | Kilograms (physically grounded) |
| Table lookups for performance | Physics-based rocket equation |
| Drive codes (A–Z) hide physics | Explicit Isp, thrust, mass, TWR |
| Integer TL (coarse) | Decimal TL with .1 ≈ 5yr increments |
| No historical vehicles | 26 pre-built historical rockets |
| No classification beyond role/size | 3-axis taxonomy (PROP-ARC/STG-CFG/MIS-ORG) |
| No batch quirks / program deviations | Program deviation system for realism |
| No mission ΔV targets | Validator checks against LEO/GTO/TLI targets |
| No offline-first emphasis | Full offline PWA with Workbox |
| Green phosphor only | Multiple themes + accessibility modes |

---

## 4. UI Pattern Mapping

| CE ShipGen Component | MSDS Equivalent | Status |
|----------------------|-----------------|--------|
| `ShipDesigner.tsx` | `DesignerScreen.tsx` | 🔄 Redesigned for stage stack |
| `BOQView.tsx` | `BOQView.tsx` | ✅ Direct port (sidebar summary) |
| `ShipLibrary.tsx` | `LibraryScreen.tsx` | 🔄 Enhanced with filters |
| `ShipDetailModal.tsx` | `VehicleDetailModal.tsx` | 🔄 Adds real-world comparison |
| `SettingsPanel.tsx` | `SettingsScreen.tsx` | 🔄 Adds table editor |
| `StartupScreen.tsx` | `StartupScreen.tsx` | 🔄 Redesigned branding |
| `ChildTable.tsx` | `ChildTable.tsx` | ✅ Direct port (editable mini-tables) |
| `ShPanel` | `MsPanel` | 🔄 Renamed, same corner-tick aesthetic |
| `ShField` | `MsField` | 🔄 Same glow-on-focus pattern |
| `ShNum` | `MsNum` | 🔄 Same phosphor-glow numbers |
| `ShData` | `MsData` | 🔄 Same variant coloring |
| `TonnageGauge` | `MassGauge` | 🔄 Renamed, same tick-mark bar |
| `ThemeProvider.tsx` | `ThemeProvider.tsx` | 🔄 New color tokens (charcoal/cyan) |
| `TableManager.tsx` | `TableManager.tsx` | ✅ Direct port |
| `TableEditor.tsx` | `TableEditor.tsx` | ✅ Direct port |
| `VariantGenerator.tsx` | *(none)* | ❌ Not in MSDS v0.1 |
| `MnemeCombatPanel.tsx` | *(none)* | ❌ Not in MSDS v0.1 |
| `SuperiorityCalculator.tsx` | *(none)* | ❌ Not in MSDS v0.1 |

---

## 5. State Management Mapping

### CE ShipGen Store (`tableStore.ts`)

```typescript
interface TableState {
  tables: Record<TableId, DataTable>;
  defaults: Record<TableId, DataTable>;
  ships: ShipDesign[];
  currentShip: ShipDesign | null;
  activeTables: Record<TableId, ActiveTableSource>;
}
```

### MSDS Store (`vehicleStore.ts` — proposed)

```typescript
interface VehicleState {
  // Component tables (like CE's tables)
  powerPlants: PowerPlant[];
  drives: Drive[];
  fuelBlocks: FuelBlock[];
  defaults: {
    powerPlants: PowerPlant[];
    drives: Drive[];
    fuelBlocks: FuelBlock[];
  };

  // Vehicle library (like CE's ships)
  vehicles: VehicleDesign[];
  currentVehicle: VehicleDesign | null;

  // Active table registry (like CE's activeTables)
  activeTables: Record<ComponentTableId, 'default' | 'custom'>;

  // Settings (CE doesn't have a settings slice in tableStore)
  settings: AppSettings;
}
```

### Key Insight

MSDS splits CE's monolithic `tables` record into typed arrays (`powerPlants`, `drives`, etc.) because:
1. TypeScript strict mode prefers typed arrays over `Record<string, unknown>`
2. MSDS has fewer tables (5 vs. 19)
3. Each table has a distinct schema (not flat row objects)

---

## 6. Calculation Engine Mapping

| CE ShipGen Calculation | MSDS Calculation | Notes |
|------------------------|------------------|-------|
| `Hull Points = floor(Dtons/50)` | *(none)* | No hull points in MSDS |
| `Jump Fuel = 0.1 × Dtons × Jump Range` | `Propellant Mass = f(ΔV, Isp, dry mass)` | Rocket equation replaces fuel table lookup |
| `Weekly Fuel = PowerPlantTons/3` | *(none)* | No weekly consumption model |
| `Total Cost = sum(components)` | `Total Cost = sum(stage costs)` | Same pattern, different components |
| `Construction Time = from hull table` | *(none)* | Build time not modeled yet |
| `Crew = sum(component requirements)` | *(none)* | Crew not modeled yet |
| `Thrust = from engine_performance table` | `Thrust = PowerPlant.typicalThrustKn × count` | Direct property, no table lookup |
| `Jump Range = floor(thrust/2)` | *(none)* | No FTL in MSDS |

---

## 7. Validation Engine Mapping

| CE ShipGen Hard Constraint | MSDS Hard Constraint | Notes |
|---------------------------|----------------------|-------|
| Tonnage used ≤ Hull Dtons | Total wet mass ≤ launch pad capacity | Equivalent concept |
| Power Plant ≥ max(M-Drive, J-Drive) | Power Plant TL ≥ Drive TL | Simpler: TL check |
| Hardpoints ≤ floor(Hull/100) | Engine count ≤ structural hardpoints | Similar limit |
| Bridge stations ≥ crew positions | *(none)* | No crew yet |
| Tech Level ≥ component requirements | TL ≥ max(component TLs) | Direct equivalent |

| CE ShipGen Soft Warning | MSDS Soft Warning | Notes |
|------------------------|-------------------|-------|
| Fuel < 2 weeks operation | Propellant < mission ΔV target | Equivalent: endurance vs. performance |
| Weapons without fire control | No redundancy / engine-out | Safety warning |
| Jump drive without nav software | *(none)* | No FTL |
| Crew > life support capacity | TWR < 1.0 at sea level | Performance warning |

---

## 8. What to Port Directly from CE ShipGen

These files/patterns can be copied with minimal modification:

1. **`src/store/tableStore.ts`** → Rename to `vehicleStore.ts`, adapt types
2. **`src/components/BOQView.tsx`** → Direct port, rename `dtons` to `kg`
3. **`src/components/ChildTable.tsx`** → Direct port (generic editable table)
4. **`src/components/shipgen/primitives.tsx`** → Rename `Sh*` to `Ms*`, update colors
5. **`vite.config.ts`** → Copy PWA plugin configuration
6. **`public/manifest.json`** → Adapt names and colors
7. **`scripts/write-version.mjs`** → Copy for build-time version generation
8. **`.github/workflows/deploy.yml`** → Copy CI/CD workflow
9. **`src/calculations/`** → Reference pattern, rewrite math
10. **Settings snapshot system (FR-024)** → Copy logic, adapt storage keys

---

## 9. What MSDS Does Differently

1. **No displacement tons.** All mass in kg. No abstract tonnage.
2. **No FTL.** No jump drives, no parsecs, no M-Drive/J-Drive split.
3. **No crew economics.** No monthly mortgage, salaries, or passenger revenue.
4. **No combat.** No weapons, armor, or Mneme Space Combat integration.
5. **No flat wizard.** Hierarchical stage builder instead of 19-step checklist.
6. **Historical focus.** Real rockets, not fictional starships.
7. **Decimal TLs.** .1 increments for realistic technology evolution.
8. **3-level max.** Hard cognitive constraint; CE has 4+ levels implicitly.
9. **Program deviations.** Batch quirks unique to MSDS.
10. **3D bridge.** Procedural mesh export for Godot; CE has no equivalent.

---

## 10. Migration Path (for CE ShipGen users)

If a CE ShipGen user wants to try MSDS:

| CE ShipGen Concept | How to Think in MSDS |
|--------------------|----------------------|
| "I want to design a 200-ton Free Trader" | "I want to design a Falcon 9-class LEO launcher" |
| "Pick a hull size" | "Pick a mission target (LEO/GTO/TLI)" |
| "Select M-Drive code A" | "Select Power Plant (K-GG) + Drive (Gimbaled Bell)" |
| "Add jump fuel" | "Add propellant until ΔV ≥ 9,200 m/s" |
| "Check tonnage gauge" | "Check mass budget bar" |
| "Export to USDF" | "Export to JSON/CSV/Godot 3D" |

---

## 11. Open Questions

| Question | Impact | Proposed Resolution |
|----------|--------|---------------------|
| Should MSDS support space stations (SSt)? | Adds crew, life support | Defer to v0.3 |
| Should MSDS support crewed ships (CSh)? | Adds capsules, abort systems | Defer to v0.3 |
| Should MSDS support orbital tugs (OTV)? | Adds refueling, electric propulsion | Add ion drive entries now; UI later |
| Should MSDS include TPS modeling? | Adds re-entry physics | Defer to v0.4 |
| Should MSDS support reusable boosters with landing propellant? | Complex mass budgeting | Add `landingReserveFraction` to Stage |
| Should MSDS import CE ShipGen designs? | Cross-compatibility | Unlikely; models are too different |

---

*"MSDS is not a fork of CE ShipGen. It is a parallel design tool for a different domain, borrowing proven patterns where they apply and inventing new ones where they don't."*
