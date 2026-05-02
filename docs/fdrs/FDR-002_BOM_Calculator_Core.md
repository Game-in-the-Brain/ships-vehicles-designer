# FDR-002: BOM Calculator Core

**Milestone:** M2  
**Status:** ⏳ Pending  
**Priority:** Critical — core value proposition  
**Owner:** TBD  
**Created:** 2026-05-02  
**Depends On:** FDR-001 (PWA Shell)

---

## 1. Goal

Implement the mass-based delta-V calculator that is the heart of MSDS. Users can assemble a vehicle from L3 components (Power Plant + Drive), group them into L2 Engines and Fuel Blocks, stack them into L1 Stages, and see real-time delta-V, TWR, and cost calculations. All math must match the Tsiolkovsky rocket equation and the Saturn V calibration anchor.

---

## 2. Scope

| Item | In Scope | Out of Scope |
|------|----------|--------------|
| L3 component selector (Power Plant + Drive) | ✅ | ❌ |
| L2 Engine assembly (Power Plant + Drive → Engine) | ✅ | ❌ |
| L2 Fuel Block editor (propellant mass, tank type, ullage) | ✅ | ❌ |
| L1 Stage builder (Engine + Fuel + Structure + Payload) | ✅ | ❌ |
| Real-time delta-V calculation per stage | ✅ | ❌ |
| Total vehicle delta-V cascade | ✅ | ❌ |
| Mass budget display (Ms, Mp, Mpld, Mr) | ✅ | ❌ |
| TWR at sea level and vacuum | ✅ | ❌ |
| Cost accumulator | ✅ | ❌ |
| Historical vehicle import (pre-built Saturn V, Falcon 9, etc.) | ✅ | ❌ |
| JSON table editor for custom components | ❌ | ✅ (FDR-003) |
| Program deviation / batch quirk system | ❌ | ✅ (FDR-004) |
| Visual stage stack renderer | ❌ | ✅ (FDR-004) |
| Export to JSON/CSV | ❌ | ✅ (FDR-005) |

---

## 3. Data Model

Uses TypeScript types from `src/types/index.ts`. Key entities:

### L3 → L2 Assembly Rules

```
Engine.vacuumIsp = PowerPlant.vacuumIsp × Drive.vacuumIspMultiplier
Engine.seaLevelIsp = PowerPlant.seaLevelIsp × Drive.seaLevelIspMultiplier (if both non-null)
Engine.dryMassKg = PowerPlant.dryMassKg + Drive.dryMassKg
Engine.costMusd = PowerPlant.costMusd + Drive.costMusd
Engine.totalThrustKn = PowerPlant.typicalThrustKn × Engine.count
Engine.throttleRange = intersection(PowerPlant capabilities, Drive throttleRange)
```

### L2 → L1 Stage Assembly Rules

```
Stage.wetMassKg = Stage.dryMassKg + FuelBlock.propellantMassKg + FuelBlock.tankMassKg + Stage.residualMassKg
Stage.dryMassKg = Stage.structuralMassKg + sum(Engine.dryMassKg) + avionicsMassKg + recoveryMassKg
Stage.vacuumDeltaV = Engine.vacuumIsp × g₀ × ln(Stage.wetMassKg / Stage.dryMassKg)
Stage.seaLevelDeltaV = Engine.seaLevelIsp × g₀ × ln(Stage.wetMassKg / Stage.dryMassKg) (if applicable)
Stage.twrVacuum = Stage.totalThrustKn × 1000 / (Stage.wetMassKg × g₀)
Stage.twrSeaLevel = Stage.totalThrustKn × 1000 / (Stage.wetMassKg × g₀) (if applicable)
Stage.burnTimeSeconds = FuelBlock.propellantMassKg / (massFlowRateKgS)
  where massFlowRateKgS = Stage.totalThrustKn × 1000 / (Engine.vacuumIsp × g₀)
```

### L1 Stack → Vehicle

```
Vehicle.totalDeltaV = sum(Stage.vacuumDeltaV) for all stages
Vehicle.totalWetMassKg = Stage[0].wetMassKg (bottom stage carries everything above)
Vehicle.totalDryMassKg = sum(Stage.dryMassKg) + payload
Vehicle.leoPayloadKg = derived from totalDeltaV minus required LEO ΔV (9,200 m/s)
```

---

## 4. UI Flow

### Step 1: Component Selector
- Two dropdowns: Power Plant (from `power_plants.json`) and Drive (from `drives.json`)
- Filter by TL compatibility: Drive.tl must be ≥ PowerPlant.tl - 0.2
- Live preview: computed Isp, thrust, mass, cost
- "Add Engine" button → creates L2 Engine entry

### Step 2: Engine Configuration
- Engine count slider (1–30)
- Throttle setting (if Drive supports throttling)
- Delete / duplicate engine

### Step 3: Fuel Block
- Propellant mass input (kg)
- Tank type selector (aluminum, aluminum-lithium, carbon composite, balloon)
- Auto-calculate tank mass from tank mass ratio
- Ullage fraction input (default 0.03)
- Boiloff rate (for cryogenics)

### Step 4: Stage Assembly
- Structural mass input
- Payload mass input (for upper stages)
- Avionics mass auto-estimate (0.5% of stage wet mass)
- Real-time delta-V, TWR, burn time display
- "Add Stage" button → pushes new stage above current

### Step 5: Vehicle Summary
- Stack visualization (bottom-to-top, like real rocket)
- Total ΔV, total mass, total cost
- Per-stage breakdown table
- Classification auto-derivation (PROP-ARC/STG-CFG/MIS-ORG)

---

## 5. Calculation Engine

### Module: `src/calculations/deltaV.ts`

```typescript
export function computeStageDeltaV(
  stage: Stage,
  g0: number = 9.80665
): { vacuum: number; seaLevel: number | null } {
  const totalEngineDryMass = stage.engines.reduce((sum, e) => sum + e.dryMassKg, 0);
  const dryMass = stage.structuralMassKg + totalEngineDryMass + stage.avionicsMassKg;
  const wetMass = dryMass + stage.fuelBlock.propellantMassKg + stage.fuelBlock.tankMassKg;

  const avgIspVac = weightedAverageIsp(stage.engines, 'vacuum');
  const deltaVVac = avgIspVac * g0 * Math.log(wetMass / dryMass);

  // Sea-level only if all engines have seaLevelIsp
  const avgIspSL = weightedAverageIsp(stage.engines, 'seaLevel');
  const deltaVSL = avgIspSL !== null ? avgIspSL * g0 * Math.log(wetMass / dryMass) : null;

  return { vacuum: deltaVVac, seaLevel: deltaVSL };
}

export function computeVehicleDeltaV(stages: Stage[]): number {
  return stages.reduce((sum, stage) => sum + stage.vacuumDeltaV, 0);
}
```

### Module: `src/calculations/massBudget.ts`

```typescript
export interface MassBudget {
  structural: number;
  propulsion: number;
  propellant: number;
  payload: number;
  residual: number;
  avionics: number;
  totalDry: number;
  totalWet: number;
}

export function computeMassBudget(stage: Stage): MassBudget { ... }
```

### Module: `src/calculations/cost.ts`

```typescript
export function computeStageCost(stage: Stage): number {
  const engineCost = stage.engines.reduce((sum, e) => sum + e.costMusd, 0);
  const tankCost = stage.fuelBlock.tankMassKg * 0.001; // $1,000/kg tank
  const structureCost = stage.structuralMassKg * 0.0005; // $500/kg structure
  return engineCost + tankCost + structureCost;
}
```

---

## 6. Saturn V Calibration Validation

The calculator MUST produce these values (±2%) when loaded with the Saturn V reference BOM:

| Stage | Wet Mass (kg) | Dry Mass (kg) | ΔV (m/s) | Isp (vac) |
|-------|--------------|---------------|----------|-----------|
| S-IC | 2,286,217 | 130,609 | 3,550 | 304 (F-1) |
| S-II | 496,100 | 40,100 | 4,270 | 421 (J-2) |
| S-IVB | 123,000 | 13,300 | 3,470 | 421 (J-2) |
| **Total** | — | — | **11,290** | — |

If calculations deviate by >2%, the engine or fuel block data is wrong.

---

## 7. Component Data Loading

```typescript
// src/data/loadTables.ts
export async function loadComponentTables(): Promise<{
  powerPlants: PowerPlant[];
  drives: Drive[];
}> {
  const base = import.meta.env.BASE_URL;
  const [ppRes, dRes] = await Promise.all([
    fetch(`${base}data/power_plants.json`),
    fetch(`${base}data/drives.json`),
  ]);
  const ppData = await ppRes.json();
  const dData = await dRes.json();
  return {
    powerPlants: ppData.power_plants,
    drives: dData.drives,
  };
}
```

---

## 8. State Management

Zustand store slice for calculator:

```typescript
interface CalculatorState {
  powerPlants: PowerPlant[];
  drives: Drive[];
  currentVehicle: VehicleDesign | null;
  // Actions
  loadTables: () => Promise<void>;
  createVehicle: (name: string, type: VehicleType) => void;
  addStage: (stage: Stage) => void;
  updateStage: (id: string, updates: Partial<Stage>) => void;
  removeStage: (id: string) => void;
  addEngineToStage: (stageId: string, powerPlantId: string, driveId: string) => void;
  computeVehicle: () => VehicleDesign;
}
```

---

## 9. Acceptance Criteria

- [ ] User can select any Power Plant + Drive combination and see computed engine stats
- [ ] Adding a Stage with F-1 + Fixed Bell produces S-IC-equivalent numbers (±5%)
- [ ] Stacking S-IC + S-II + S-IVB produces total ΔV within ±2% of 11,290 m/s
- [ ] Real-time updates: changing propellant mass instantly updates ΔV
- [ ] Vehicle summary shows correct classification string (e.g., `H-GG/3S/USA-TLI`)
- [ ] Cost accumulator sums all stages to within ±20% of historical cost
- [ ] Mobile: all inputs usable with thumb; no horizontal scroll
- [ ] Desktop: BOQ sidebar shows per-stage mass and cost breakdown
- [ ] Calculator state persists in `localStorage` (Zustand persist)

---

## 10. Blockers

| Blocker | Resolution |
|---------|------------|
| FDR-001 (PWA Shell) | Must have build system and layout shell before UI can be built |

---

## 11. Notes

- Use `g₀ = 9.80665 m/s²` (standard gravity) for all Isp × g₀ conversions.
- Propellant mass flow rate: `ṁ = F / (Isp × g₀)` where F is total thrust in Newtons.
- For multi-engine stages, use thrust-weighted average Isp.
- Sea-level ΔV is only meaningful for first stages; upper stages should display N/A.
- Keep calculation latency <50ms for any single input change.
