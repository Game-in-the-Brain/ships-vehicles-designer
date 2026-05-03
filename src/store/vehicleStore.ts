import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { immer } from 'zustand/middleware/immer';
import type { PowerPlant, Drive, AvionicsUnit, ComputerSystem, CrewModule, BridgeType, Sensor, Structure, VehicleDesign, AttachedComponent, AppSettings, AppScreen } from '../types';

interface StoreState {
  powerPlants: PowerPlant[]; drives: Drive[]; avionics: AvionicsUnit[];
  computers: ComputerSystem[]; crewModules: CrewModule[]; bridgeTypes: BridgeType[];
  sensors: Sensor[]; loaded: boolean; loadError: string | null;
  currentVehicle: VehicleDesign | null;
  currentScreen: AppScreen; settings: AppSettings; compareVehicles: VehicleDesign[];
}

interface StoreActions {
  loadTables: () => Promise<void>;
  createVehicle: (name: string) => void;
  updateStructure: (structureId: string, updates: Partial<Structure>) => void;
  addComponent: (structureId: string, component: AttachedComponent) => void;
  removeComponent: (structureId: string, componentId: string) => void;
  setCurrentVehicle: (vehicle: VehicleDesign | null) => void;
  setScreen: (screen: AppScreen) => void;
  loadLibraryVehicle: (vehicleId: string) => Promise<void>;
  setCompareVehicles: (vehicles: VehicleDesign[]) => void;
  addToCompare: (vehicle: VehicleDesign) => void;
  removeFromCompare: (vehicleId: string) => void;
  clearCompare: () => void;
  exportTables: () => string;
  importTables: (data: any) => void;
}

export const useVehicleStore = create<StoreState & StoreActions>()(
  immer(persist((set, get) => ({
    powerPlants: [], drives: [], avionics: [], computers: [], crewModules: [],
    bridgeTypes: [], sensors: [], loaded: false, loadError: null, currentVehicle: null,
    currentScreen: 'design', settings: { theme: 'dark', units: 'metric' },
    compareVehicles: [],

    loadTables: async () => {
      // Compute actual base path — ensure trailing slash so relative paths resolve correctly
      const url = new URL(document.baseURI);
      if (!url.pathname.endsWith('/')) url.pathname += '/';
      const base = url.pathname;
      try {
        const [ppRes, dRes, aRes, cRes, cmRes, bRes, sRes] = await Promise.all([
          fetch(`${base}data/power_plants.json`), fetch(`${base}data/drives.json`),
          fetch(`${base}data/avionics.json`), fetch(`${base}data/computers.json`),
          fetch(`${base}data/crew_modules.json`), fetch(`${base}data/bridge_types.json`),
          fetch(`${base}data/sensors.json`),
        ]);
        // Check for HTTP errors
        const responses = [ppRes, dRes, aRes, cRes, cmRes, bRes, sRes];
        const names = ['power_plants', 'drives', 'avionics', 'computers', 'crew_modules', 'bridge_types', 'sensors'];
        for (let i = 0; i < responses.length; i++) {
          if (!responses[i].ok) throw new Error(`Failed to load ${names[i]}: ${responses[i].status} ${responses[i].statusText}`);
        }
        const [ppData, dData, aData, cData, cmData, bData, sData] = await Promise.all([
          ppRes.json(), dRes.json(), aRes.json(), cRes.json(), cmRes.json(), bRes.json(), sRes.json()
        ]);
        set({
          powerPlants: ppData.power_plants, drives: dData.drives,
          avionics: aData.avionics, computers: cData.computers,
          crewModules: cmData.crew_modules, bridgeTypes: bData.bridge_types,
          sensors: sData.sensors, loaded: true, loadError: null,
        });
      } catch (err: any) {
        console.error('Failed to load component tables:', err);
        set({ loaded: true, loadError: err?.message || 'Unknown error loading component data' });
      }
    },

    createVehicle: (name) => {
      const vehicle: VehicleDesign = {
        id: crypto.randomUUID(), name, type: 'LV', tl: 7.4, pmr: 5,
        structures: [{
          id: crypto.randomUUID(), name: 'Primary Structure', massTons: 50, cost: 10,
          capacityTons: 500, axis: 'longitudinal', components: [],
          attachedMassTons: 0, attachedCost: 0, totalMassTons: 50, totalCost: 10,
          overCapacity: false, capacityUsedPercent: 0,
        }],
        totalMassTons: 50, totalCost: 10, totalDeltaV: null,
        leoPayloadKg: null, gtoPayloadKg: null, tliPayloadKg: null,
        createdAt: new Date().toISOString(), updatedAt: new Date().toISOString(), notes: '',
      };
      set({ currentVehicle: vehicle, currentScreen: 'design' });
    },

    updateStructure: (structureId, updates) => {
      set((state) => {
        const vehicle = state.currentVehicle;
        if (!vehicle) return;
        const s = vehicle.structures.find((x) => x.id === structureId);
        if (!s) return;
        Object.assign(s, updates);
        s.attachedMassTons = s.components.reduce((sum, c) => sum + c.massKg / 1000, 0);
        s.attachedCost = s.components.reduce((sum, c) => sum + c.costMusd, 0);
        s.totalMassTons = s.massTons + s.attachedMassTons;
        s.totalCost = s.cost + s.attachedCost;
        s.capacityUsedPercent = (s.attachedMassTons / s.capacityTons) * 100;
        s.overCapacity = s.attachedMassTons > s.capacityTons;
        vehicle.totalMassTons = vehicle.structures.reduce((sum, st) => sum + st.totalMassTons, 0);
        vehicle.totalCost = vehicle.structures.reduce((sum, st) => sum + st.totalCost, 0);
        vehicle.updatedAt = new Date().toISOString();
      });
    },

    addComponent: (structureId, component) => {
      set((state) => {
        const vehicle = state.currentVehicle;
        if (!vehicle) return;
        const s = vehicle.structures.find((x) => x.id === structureId);
        if (!s) return;
        s.components.push(component);
        get().updateStructure(structureId, {});
      });
    },

    removeComponent: (structureId, componentId) => {
      set((state) => {
        const vehicle = state.currentVehicle;
        if (!vehicle) return;
        const s = vehicle.structures.find((x) => x.id === structureId);
        if (!s) return;
        s.components = s.components.filter((c) => c.id !== componentId);
        get().updateStructure(structureId, {});
      });
    },

    setCurrentVehicle: (vehicle) => set({ currentVehicle: vehicle }),
    setScreen: (screen) => set({ currentScreen: screen }),
    loadLibraryVehicle: async (vehicleId) => {
      const url = new URL(document.baseURI);
      if (!url.pathname.endsWith('/')) url.pathname += '/';
      const base = url.pathname;
      try {
        const res = await fetch(`${base}data/library/${vehicleId}.json`);
        if (!res.ok) throw new Error(`Failed to load ${vehicleId}`);
        const data = await res.json();
        set({ currentVehicle: data.vehicle, currentScreen: 'design' });
      } catch (err) { console.error('Failed to load library vehicle:', err); }
    },
    setCompareVehicles: (vehicles) => set({ compareVehicles: vehicles }),
    addToCompare: (vehicle) => set((state) => {
      if (state.compareVehicles.length >= 3) return;
      if (state.compareVehicles.find((v) => v.id === vehicle.id)) return;
      state.compareVehicles.push(vehicle);
    }),
    removeFromCompare: (vehicleId) => set((state) => {
      state.compareVehicles = state.compareVehicles.filter((v) => v.id !== vehicleId);
    }),
    clearCompare: () => set({ compareVehicles: [] }),

    exportTables: () => {
      const state = get();
      return JSON.stringify({
        power_plants: state.powerPlants,
        drives: state.drives,
        avionics: state.avionics,
        computers: state.computers,
        crew_modules: state.crewModules,
        bridge_types: state.bridgeTypes,
        sensors: state.sensors,
      }, null, 2);
    },

    importTables: (data: any) => {
      set((state) => {
        if (data.power_plants) state.powerPlants = data.power_plants;
        if (data.drives) state.drives = data.drives;
        if (data.avionics) state.avionics = data.avionics;
        if (data.computers) state.computers = data.computers;
        if (data.crew_modules) state.crewModules = data.crew_modules;
        if (data.bridge_types) state.bridgeTypes = data.bridge_types;
        if (data.sensors) state.sensors = data.sensors;
      });
    },
  }), {
    name: 'mneme-vehicle-store',
    partialize: (state) => ({ currentVehicle: state.currentVehicle, settings: state.settings }),
  }))
);
