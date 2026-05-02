export type Chemistry = 'kerolox' | 'hydrolox' | 'methalox' | 'hypergolic' | 'solid' | 'nuclear' | 'electric';

export interface PowerPlant {
  id: string; name: string; chemistry: Chemistry; tl: number; year: number;
  thrustKn: number; ispVacuum: number; ispSeaLevel: number | null;
  massKg: number; costMusd: number; notes: string;
}

export interface Drive {
  id: string; name: string; tl: number; year: number;
  massKg: number; costMusd: number; notes: string;
}

export interface AvionicsUnit {
  id: string; category: string; name: string; shortName: string; tl: number;
  yearRange: string; massKg: number; costMusd: number; powerWatts: number;
  reliability: number; capabilities: string[]; redundancy: string;
  computingMips: number; notes: string; examples: string[];
}

export interface ComputerSystem {
  id: string; name: string; shortName: string; tl: number; year: number;
  massKg: number; costMusd: number; computingMips: number; memoryKb: number;
  redundancy: string; notes: string;
}

export interface CrewModule {
  id: string; name: string; shortName: string; tl: number; year: number;
  seats: number; massKg: number; costMusd: number; volumeM3: number;
  missionDurationDays: number; notes: string;
}

export interface BridgeType {
  id: string; name: string; shortName: string; tl: number; year: number;
  stations: number; massKg: number; costMusd: number; minCrew: number;
  maxCrew: number; notes: string;
}

export interface Sensor {
  id: string; name: string; shortName: string; category: string; tl: number;
  year: number; massKg: number; costMusd: number; powerWatts: number;
  range: string; notes: string;
}

export interface EngineAssembly {
  id: string; name: string; powerPlantId: string; driveId: string; count: number;
  vacuumIsp: number; seaLevelIsp: number | null; totalThrustKn: number;
  dryMassKg: number; costMusd: number; throttleRange: [number, number];
}

export interface FuelTank {
  id: string; name: string; fuelType: string; propellantMassKg: number;
  tankMassKg: number; ullageFraction: number; totalMassKg: number;
}

export type ComponentType = 'engine' | 'fuel_tank' | 'avionics' | 'computer' | 'crew_module' | 'bridge' | 'sensor' | 'payload' | 'recovery';

export interface AttachedComponent {
  id: string; type: ComponentType; name: string; massKg: number; costMusd: number;
  engineAssembly?: EngineAssembly; fuelTank?: FuelTank; avionicsUnit?: AvionicsUnit;
  computerSystem?: ComputerSystem; crewModule?: CrewModule; bridgeType?: BridgeType;
  sensor?: Sensor; notes?: string;
}

export type StructureAxis = 'longitudinal' | 'lateral' | 'radial' | 'all';

export interface Structure {
  id: string; name: string; massTons: number; cost: number; capacityTons: number;
  axis: StructureAxis; components: AttachedComponent[];
  attachedMassTons: number; attachedCost: number; totalMassTons: number;
  totalCost: number; overCapacity: boolean; capacityUsedPercent: number;
}

export type VehicleType = 'LV' | 'Bst' | 'Orb' | 'TLI' | 'LEV' | 'OTV' | 'SSt' | 'CSh' | 'CNT' | 'Prb' | 'Sail' | 'Dep';

export interface VehicleDesign {
  id: string; name: string; type: VehicleType; tl: number; pmr: number;
  structures: Structure[]; totalMassTons: number; totalCost: number;
  totalDeltaV: number | null; leoPayloadKg: number | null; gtoPayloadKg: number | null;
  tliPayloadKg: number | null; createdAt: string; updatedAt: string; notes: string;
}

export type AppScreen = 'design' | 'engineering' | 'library' | 'compare' | 'settings';

export interface AppSettings {
  theme: 'dark' | 'light';
  units: 'metric' | 'imperial';
}
