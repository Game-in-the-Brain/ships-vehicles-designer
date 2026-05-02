import type { VehicleDesign, Structure, AttachedComponent, EngineAssembly, FuelTank } from '../types';

export interface SimpleRocketsCraft {
  id: string; name: string; era: string; origin: string; type: string;
  url: string; importLink: string;
  specs: { parts: string | null; price: string | null; dimensions: { length: number; width: number; height: number } | null; deltaV: number | null; thrust: number | null; engines: string | null; wetMass: number | null; dryMass: number | null; gameVersion: string | null; createdOn: string | null; };
  chemistry: string;
}

const CHEMISTRY_TO_POWER_PLANT: Record<string, string> = {
  kerolox: 'gg-kerolox-1', hydrolox: 'gg-hydrolox-1', methalox: 'ff-methalox-1',
  hypergolic: 'hyg-1', solid: 'solid-seg-1', nuclear: 'ntr-1', electric: 'e-ion-1',
};

const CHEMISTRY_TO_DRIVE: Record<string, string> = {
  kerolox: 'gimbaled-1', hydrolox: 'fixed-bell-2', methalox: 'gimbaled-2',
  hypergolic: 'gimbaled-1', solid: 'fixed-bell-1', nuclear: 'fixed-bell-2', electric: 'ion-grid-1',
};

const ERA_TO_TL: Record<string, number> = {
  '1957': 7.0, '1958': 7.0, '1959': 7.1, '1960': 7.2, '1961': 7.2, '1962': 7.2, '1963': 7.3, '1964': 7.3, '1965': 7.3, '1966': 7.4, '1967': 7.4, '1968': 7.4, '1969': 7.4,
  '1970': 7.5, '1971': 7.5, '1972': 7.5, '1973': 7.5, '1974': 7.5, '1975': 7.5, '1976': 7.6, '1977': 7.6, '1978': 7.6, '1979': 7.6,
  '1980': 7.7, '1981': 7.8, '1982': 7.8, '1983': 7.8, '1984': 7.8, '1985': 7.8, '1986': 7.8, '1987': 7.8, '1988': 7.8, '1989': 7.8,
  '1990': 7.8, '1991': 7.8, '1992': 7.8, '1993': 7.9, '1994': 7.9, '1995': 7.9, '1996': 7.9, '1997': 7.9, '1998': 7.9, '1999': 7.9,
  '2000': 8.0, '2001': 8.0, '2002': 8.0, '2003': 8.0, '2004': 8.0, '2005': 8.0, '2006': 8.0, '2007': 8.0, '2008': 8.0, '2009': 8.1,
  '2010': 8.2, '2011': 8.2, '2012': 8.2, '2013': 8.2, '2014': 8.2, '2015': 8.3, '2016': 8.3, '2017': 8.3, '2018': 8.3, '2019': 8.3,
  '2020': 8.4, '2021': 8.4, '2022': 8.4, '2023': 8.4, '2024': 8.4, '2025': 8.5,
  '2050': 9.0, '2100': 9.5,
};

export function convertSimpleRocketsToMSDS(craft: SimpleRocketsCraft): VehicleDesign {
  const tl = ERA_TO_TL[craft.era] || 7.4;
  const ppId = CHEMISTRY_TO_POWER_PLANT[craft.chemistry] || 'gg-kerolox-1';
  const driveId = CHEMISTRY_TO_DRIVE[craft.chemistry] || 'gimbaled-1';
  const realWorldMass = getRealWorldMass(craft.id);
  const realWorldPayload = getRealWorldPayload(craft.id);
  const engineCount = craft.specs.engines ? parseInt(craft.specs.engines) || 1 : 1;

  const structure: Structure = {
    id: crypto.randomUUID(), name: `${craft.name} Structure`, massTons: realWorldMass.structureTons,
    cost: realWorldMass.cost, capacityTons: realWorldMass.wetTons, axis: 'longitudinal',
    components: [
      createEngineComponent(ppId, driveId, engineCount, tl),
      createFuelComponent(craft.chemistry, realWorldMass.propellantKg),
      createAvionicsComponent(tl),
    ],
    attachedMassTons: 0, attachedCost: 0, totalMassTons: 0, totalCost: 0,
    overCapacity: false, capacityUsedPercent: 0,
  };

  structure.attachedMassTons = structure.components.reduce((sum, c) => sum + c.massKg / 1000, 0);
  structure.attachedCost = structure.components.reduce((sum, c) => sum + c.costMusd, 0);
  structure.totalMassTons = structure.massTons + structure.attachedMassTons;
  structure.totalCost = structure.cost + structure.attachedCost;
  structure.capacityUsedPercent = (structure.attachedMassTons / structure.capacityTons) * 100;
  structure.overCapacity = structure.attachedMassTons > structure.capacityTons;

  const deltaV = craft.specs.deltaV || 9200;

  return {
    id: `sr-${craft.id}`, name: `${craft.name} (SR)`, type: craft.type as any, tl, pmr: 7,
    structures: [structure], totalMassTons: structure.totalMassTons, totalCost: structure.totalCost,
    totalDeltaV: deltaV, leoPayloadKg: realWorldPayload.leoKg, gtoPayloadKg: realWorldPayload.gtoKg,
    tliPayloadKg: realWorldPayload.tliKg, createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString(),
    notes: `Converted from SimpleRockets craft ${craft.id}.`,
  };
}

function getRealWorldMass(craftId: string) {
  const map: Record<string, any> = {
    'cEexA4': { structureTons: 25, propellantKg: 250000, wetTons: 280, cost: 8 },
    '3J51VN': { structureTons: 3, propellantKg: 16000, wetTons: 20, cost: 2 },
    '1SR3e8': { structureTons: 30, propellantKg: 280000, wetTons: 287, cost: 10 },
    'O34J4D': { structureTons: 15, propellantKg: 120000, wetTons: 120, cost: 8 },
    '8ikkK9': { structureTons: 12, propellantKg: 150000, wetTons: 154, cost: 8 },
    'ZUf7C7': { structureTons: 20, propellantKg: 250000, wetTons: 313, cost: 8 },
    '38Kfg0': { structureTons: 35, propellantKg: 500000, wetTons: 590, cost: 15 },
    '1KW3z2': { structureTons: 130, propellantKg: 2680000, wetTons: 2970, cost: 185 },
    'd1Vaq5': { structureTons: 80, propellantKg: 2000000, wetTons: 2000, cost: 450 },
    'jt8106': { structureTons: 45, propellantKg: 600000, wetTons: 693, cost: 25 },
    'uF7uc3': { structureTons: 40, propellantKg: 750000, wetTons: 777, cost: 40 },
    '5hSzxN': { structureTons: 25, propellantKg: 500000, wetTons: 549, cost: 15 },
    '9VK79N': { structureTons: 35, propellantKg: 1400000, wetTons: 1420, cost: 30 },
    'tdjwOs': { structureTons: 100, propellantKg: 2600000, wetTons: 2608, cost: 200 },
    'mok9JB': { structureTons: 35, propellantKg: 400000, wetTons: 475, cost: 20 },
    '8jSW0H': { structureTons: 30, propellantKg: 500000, wetTons: 540, cost: 25 },
    'LV1JV6': { structureTons: 150, propellantKg: 4600000, wetTons: 5000, cost: 30 },
    '05Rxn9': { structureTons: 105, propellantKg: 1900000, wetTons: 2400, cost: 300 },
    'B43Rb0': { structureTons: 100, propellantKg: 1900000, wetTons: 2400, cost: 300 },
    'x7Wjzl': { structureTons: 120, propellantKg: 1900000, wetTons: 2400, cost: 250 },
    'P02B94': { structureTons: 110, propellantKg: 1900000, wetTons: 2400, cost: 300 },
    'rivhRX': { structureTons: 105, propellantKg: 1900000, wetTons: 2400, cost: 300 },
    'RtWq97': { structureTons: 130, propellantKg: 1900000, wetTons: 2400, cost: 280 },
    'tAJ5cF': { structureTons: 450, propellantKg: 16000000, wetTons: 18000, cost: 500 },
    'y5gk3c': { structureTons: 450, propellantKg: 16000000, wetTons: 18000, cost: 500 },
    'Gcd2rb': { structureTons: 450, propellantKg: 16000000, wetTons: 18000, cost: 500 },
    'IHYfx0': { structureTons: 18, propellantKg: 18000, wetTons: 45, cost: 15 },
    'OXWIPH': { structureTons: 800, propellantKg: 8000000, wetTons: 10000, cost: 2000 },
    '42aU98': { structureTons: 5000, propellantKg: 5000000, wetTons: 10000, cost: 5000 },
    'y5U8ek': { structureTons: 5, propellantKg: 0, wetTons: 10, cost: 50 },
  };
  return map[craftId] || { structureTons: 50, propellantKg: 500000, wetTons: 500, cost: 20 };
}

function getRealWorldPayload(craftId: string) {
  const map: Record<string, any> = {
    'cEexA4': { leoKg: 1300, gtoKg: null, tliKg: null },
    '3J51VN': { leoKg: null, gtoKg: null, tliKg: null },
    '1SR3e8': { leoKg: 4700, gtoKg: null, tliKg: null },
    'O34J4D': { leoKg: 1300, gtoKg: null, tliKg: null },
    '8ikkK9': { leoKg: 3600, gtoKg: null, tliKg: null },
    'ZUf7C7': { leoKg: 7150, gtoKg: null, tliKg: null },
    '38Kfg0': { leoKg: 18500, gtoKg: null, tliKg: null },
    '1KW3z2': { leoKg: 118000, gtoKg: null, tliKg: 48600 },
    'd1Vaq5': { leoKg: 24400, gtoKg: null, tliKg: null },
    'jt8106': { leoKg: 23000, gtoKg: 6900, tliKg: null },
    'uF7uc3': { leoKg: 21000, gtoKg: 10000, tliKg: null },
    '5hSzxN': { leoKg: 22800, gtoKg: 8300, tliKg: null },
    '9VK79N': { leoKg: 63800, gtoKg: 26700, tliKg: null },
    'tdjwOs': { leoKg: 95000, gtoKg: null, tliKg: 27000 },
    'mok9JB': { leoKg: 27200, gtoKg: 14700, tliKg: null },
    '8jSW0H': { leoKg: 21650, gtoKg: 11500, tliKg: null },
    'LV1JV6': { leoKg: 150000, gtoKg: null, tliKg: null },
    '05Rxn9': { leoKg: 30000, gtoKg: null, tliKg: null },
    'B43Rb0': { leoKg: 30000, gtoKg: null, tliKg: null },
    'x7Wjzl': { leoKg: 100000, gtoKg: 20000, tliKg: 32000 },
    'P02B94': { leoKg: 30000, gtoKg: null, tliKg: null },
    'rivhRX': { leoKg: 30000, gtoKg: null, tliKg: null },
    'RtWq97': { leoKg: 100000, gtoKg: 20000, tliKg: 32000 },
    'tAJ5cF': { leoKg: 550000, gtoKg: null, tliKg: null },
    'y5gk3c': { leoKg: 550000, gtoKg: null, tliKg: null },
    'Gcd2rb': { leoKg: 550000, gtoKg: null, tliKg: null },
    'IHYfx0': { leoKg: null, gtoKg: null, tliKg: null },
    'OXWIPH': { leoKg: null, gtoKg: null, tliKg: null },
    '42aU98': { leoKg: null, gtoKg: null, tliKg: null },
    'y5U8ek': { leoKg: null, gtoKg: null, tliKg: null },
  };
  return map[craftId] || { leoKg: null, gtoKg: null, tliKg: null };
}

function createEngineComponent(ppId: string, driveId: string, count: number, _tl: number): AttachedComponent {
  const thrustPerEngine = ppId.includes('kerolox') ? 845 : ppId.includes('hydrolox') ? 1030 : ppId.includes('methalox') ? 2300 : ppId.includes('hyg') ? 1800 : ppId.includes('solid') ? 16000 : ppId.includes('ntr') ? 250 : 100;
  const isp = ppId.includes('kerolox') ? 304 : ppId.includes('hydrolox') ? 421 : ppId.includes('methalox') ? 380 : ppId.includes('hyg') ? 316 : ppId.includes('solid') ? 268 : ppId.includes('ntr') ? 900 : 310;
  const massPerEngine = ppId.includes('kerolox') ? 900 : ppId.includes('hydrolox') ? 3300 : ppId.includes('methalox') ? 1700 : ppId.includes('hyg') ? 2200 : ppId.includes('solid') ? 130000 : ppId.includes('ntr') ? 6500 : 1000;
  const costPerEngine = ppId.includes('kerolox') ? 2.0 : ppId.includes('hydrolox') ? 15.0 : ppId.includes('methalox') ? 1.5 : ppId.includes('hyg') ? 3.0 : ppId.includes('solid') ? 40.0 : ppId.includes('ntr') ? 100.0 : 5.0;
  const driveMass = driveId.includes('fixed') ? 150 : driveId.includes('gimbaled') ? 250 : driveId.includes('extendable') ? 120 : driveId.includes('ion') ? 30 : 150;

  const engine: EngineAssembly = {
    id: `${ppId}-${driveId}-${count}`, name: `Engine ×${count}`, powerPlantId: ppId, driveId, count,
    vacuumIsp: isp, seaLevelIsp: ppId.includes('hydrolox') && driveId.includes('fixed-bell-2') ? null : Math.round(isp * 0.87),
    totalThrustKn: thrustPerEngine * count, dryMassKg: (massPerEngine + driveMass) * count,
    costMusd: (costPerEngine + 0.5) * count, throttleRange: ppId.includes('kerolox-2') ? [0.39, 1] : [1, 1],
  };

  return { id: crypto.randomUUID(), type: 'engine', name: engine.name, massKg: engine.dryMassKg, costMusd: engine.costMusd, engineAssembly: engine };
}

function createFuelComponent(chemistry: string, propellantMassKg: number): AttachedComponent {
  const fuelType = chemistry === 'kerolox' ? 'RP-1/LOX' : chemistry === 'hydrolox' ? 'LH2/LOX' : chemistry === 'methalox' ? 'CH4/LOX' : chemistry === 'hypergolic' ? 'N2O4/UDMH' : chemistry === 'solid' ? 'APCP' : chemistry === 'nuclear' ? 'LH2' : 'Xe';
  const tankMass = propellantMassKg * 0.008;
  const fuelTank: FuelTank = { id: crypto.randomUUID(), name: `${fuelType} Tank`, fuelType, propellantMassKg, tankMassKg: tankMass, ullageFraction: 0.03, totalMassKg: propellantMassKg + tankMass };
  return { id: crypto.randomUUID(), type: 'fuel_tank', name: fuelTank.name, massKg: fuelTank.totalMassKg, costMusd: tankMass * 0.001, fuelTank };
}

function createAvionicsComponent(tl: number): AttachedComponent {
  const avId = tl >= 8.0 ? 'av-guidance-80' : tl >= 7.5 ? 'av-guidance-75' : tl >= 7.2 ? 'av-guidance-72' : 'av-guidance-70';
  const name = tl >= 8.0 ? 'FPGA-Based Reconfigurable GNC' : tl >= 7.5 ? 'Redundant Digital Flight System' : tl >= 7.2 ? 'Digital Discrete-Logic Guidance' : 'Analog Radio-Inertial Guidance';
  const mass = tl >= 8.0 ? 14 : tl >= 7.5 ? 70 : tl >= 7.2 ? 32 : 450;
  const cost = tl >= 8.0 ? 0.8 : tl >= 7.5 ? 4.2 : tl >= 7.2 ? 3.5 : 2.5;

  return {
    id: crypto.randomUUID(), type: 'avionics', name, massKg: mass, costMusd: cost,
    avionicsUnit: {
      id: avId, category: 'guidance', name, shortName: name.split(' ').slice(0, 2).join(' '),
      tl: Math.floor(tl * 10) / 10, yearRange: `${Math.floor(1950 + (tl - 7) * 50)}–${Math.floor(1954 + (tl - 7) * 50)}`,
      massKg: mass, costMusd: cost, powerWatts: 250, reliability: 0.95,
      capabilities: ['guidance', 'navigation', 'control'], redundancy: 'dual', computingMips: 100,
      notes: 'Auto-generated from SimpleRockets conversion', examples: [],
    },
  };
}
