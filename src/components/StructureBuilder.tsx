import { useState } from 'react';
import { useVehicleStore } from '../store/vehicleStore';
import MsPanel from './primitives/MsPanel';
import MsNum from './primitives/MsNum';
import ChemistryBadge from './ChemistryBadge';
import { Rocket, Plus, Trash2, ChevronDown, ChevronUp } from 'lucide-react';
import type { AttachedComponent, EngineAssembly, FuelTank } from '../types';

export default function StructureBuilder() {
  const { currentVehicle, updateStructure, addComponent, removeComponent } = useVehicleStore();
  const [expandedStructure, setExpandedStructure] = useState<string | null>(null);
  const [showAddEngine, setShowAddEngine] = useState<string | null>(null);
  const [showAddFuel, setShowAddFuel] = useState<string | null>(null);
  const [showAddCrew, setShowAddCrew] = useState<string | null>(null);
  const [showAddBridge, setShowAddBridge] = useState<string | null>(null);
  const [showAddAvionics, setShowAddAvionics] = useState<string | null>(null);
  const [showAddSensor, setShowAddSensor] = useState<string | null>(null);

  const { powerPlants, drives, crewModules, bridgeTypes, avionics, sensors } = useVehicleStore();
  if (!currentVehicle) return null;

  return (
    <div className="min-h-screen bg-ms-bg text-ms-ink font-mono">
      <div className="sticky top-0 bg-ms-bg/95 backdrop-blur border-b border-ms-hair z-40">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Rocket className="w-5 h-5 text-ms-cyan" />
            <h2 className="text-lg font-display font-semibold tracking-wide">{currentVehicle.name}</h2>
            <span className="text-xs font-mono text-ms-ink-dim">{currentVehicle.structures.length} structures</span>
          </div>
          <div className="flex items-center gap-3">
            <MsNum value={currentVehicle.totalMassTons.toFixed(1)} unit="t" size="sm" label="Mass" />
            <MsNum value={currentVehicle.totalDeltaV?.toFixed(0) || '—'} unit="m/s" size="sm" label="ΔV" />
          </div>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-4 space-y-4">
        {currentVehicle.structures.map((structure) => {
          const isExpanded = expandedStructure === structure.id;
          return (
            <MsPanel key={structure.id} title={structure.name} keyword={`${structure.capacityUsedPercent.toFixed(0)}%`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-4 text-xs font-mono">
                  <span>Mass: {structure.totalMassTons.toFixed(1)} t</span>
                  <span>Cost: {structure.totalCost.toFixed(1)} M$</span>
                  <span className={structure.overCapacity ? 'text-ms-warn' : 'text-ms-good'}>
                    {structure.overCapacity ? 'OVER CAPACITY' : 'OK'}
                  </span>
                </div>
                <button onClick={() => setExpandedStructure(isExpanded ? null : structure.id)} className="p-1 text-ms-ink-dim hover:text-ms-ink">
                  {isExpanded ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
                </button>
              </div>
              <div className="h-2 bg-ms-hair mb-3">
                <div className={`h-full ${structure.overCapacity ? 'bg-ms-warn' : 'bg-ms-cyan'}`} style={{ width: `${Math.min(structure.capacityUsedPercent, 100)}%` }} />
              </div>

              {isExpanded && (
                <div className="space-y-3">
                  {structure.components.map((component) => (
                    <div key={component.id} className="flex items-center justify-between bg-ms-elevated/50 p-2 text-xs">
                      <div className="flex items-center gap-2">
                        {component.type === 'engine' && component.engineAssembly && (
                          <ChemistryBadge chemistry={
                            component.engineAssembly.powerPlantId.includes('kerolox') ? 'kerolox' :
                            component.engineAssembly.powerPlantId.includes('hydrolox') ? 'hydrolox' :
                            component.engineAssembly.powerPlantId.includes('methalox') ? 'methalox' :
                            component.engineAssembly.powerPlantId.includes('hyg') ? 'hypergolic' : 'unknown'
                          } />
                        )}
                        <span className="font-semibold">{component.name}</span>
                        <span className="text-ms-ink-dim">{(component.massKg / 1000).toFixed(2)} t</span>
                      </div>
                      <button onClick={() => removeComponent(structure.id, component.id)} className="p-1 text-ms-ink-dim hover:text-ms-warn">
                        <Trash2 className="w-3 h-3" />
                      </button>
                    </div>
                  ))}

                  <div className="flex flex-wrap gap-2 pt-2">
                    {[
                      { s: showAddEngine, set: setShowAddEngine, l: 'Engine' },
                      { s: showAddFuel, set: setShowAddFuel, l: 'Fuel' },
                      { s: showAddCrew, set: setShowAddCrew, l: 'Crew' },
                      { s: showAddBridge, set: setShowAddBridge, l: 'Bridge' },
                      { s: showAddAvionics, set: setShowAddAvionics, l: 'Avionics' },
                      { s: showAddSensor, set: setShowAddSensor, l: 'Sensor' },
                    ].map(({ s, set, l }) => (
                      <button key={l} onClick={() => set(s === structure.id ? null : structure.id)} className="px-2 py-1 text-xs bg-ms-input border border-ms-hair hover:border-ms-cyan transition-colors">
                        <Plus className="w-3 h-3 inline mr-1" /> {l}
                      </button>
                    ))}
                  </div>

                  {showAddEngine === structure.id && <AddEngineForm structureId={structure.id} powerPlants={powerPlants} drives={drives} onAdd={(c) => { addComponent(structure.id, c); setShowAddEngine(null); }} onCancel={() => setShowAddEngine(null)} />}
                  {showAddFuel === structure.id && <AddFuelForm onAdd={(c) => { addComponent(structure.id, c); setShowAddFuel(null); }} onCancel={() => setShowAddFuel(null)} />}
                  {showAddCrew === structure.id && <AddCrewForm crewModules={crewModules} onAdd={(c) => { addComponent(structure.id, c); setShowAddCrew(null); }} onCancel={() => setShowAddCrew(null)} />}
                  {showAddBridge === structure.id && <AddBridgeForm bridgeTypes={bridgeTypes} onAdd={(c) => { addComponent(structure.id, c); setShowAddBridge(null); }} onCancel={() => setShowAddBridge(null)} />}
                  {showAddAvionics === structure.id && <AddAvionicsForm avionics={avionics} onAdd={(c) => { addComponent(structure.id, c); setShowAddAvionics(null); }} onCancel={() => setShowAddAvionics(null)} />}
                  {showAddSensor === structure.id && <AddSensorForm sensors={sensors} onAdd={(c) => { addComponent(structure.id, c); setShowAddSensor(null); }} onCancel={() => setShowAddSensor(null)} />}
                </div>
              )}
            </MsPanel>
          );
        })}
      </div>
    </div>
  );
}

function AddEngineForm({ structureId, powerPlants, drives, onAdd, onCancel }: any) {
  const [ppId, setPpId] = useState(powerPlants[0]?.id || '');
  const [driveId, setDriveId] = useState(drives[0]?.id || '');
  const [count, setCount] = useState(1);
  const pp = powerPlants.find((p: any) => p.id === ppId);
  const drive = drives.find((d: any) => d.id === driveId);

  const handleAdd = () => {
    if (!pp || !drive) return;
    const engine: EngineAssembly = {
      id: `${ppId}-${driveId}-${count}`, name: `${pp.name} ×${count}`, powerPlantId: ppId, driveId, count,
      vacuumIsp: pp.ispVacuum, seaLevelIsp: pp.ispSeaLevel, totalThrustKn: pp.thrustKn * count,
      dryMassKg: (pp.massKg + drive.massKg) * count, costMusd: (pp.costMusd + drive.costMusd) * count,
      throttleRange: [1, 1],
    };
    onAdd({ id: crypto.randomUUID(), type: 'engine', name: engine.name, massKg: engine.dryMassKg, costMusd: engine.costMusd, engineAssembly: engine });
  };

  const chemGroups: Record<string, any[]> = {};
  powerPlants.forEach((pp: any) => { if (!chemGroups[pp.chemistry]) chemGroups[pp.chemistry] = []; chemGroups[pp.chemistry].push(pp); });

  return (
    <div className="bg-ms-elevated p-3 space-y-2">
      <div>
        <label className="text-xs text-ms-ink-dim block mb-1">Power Plant</label>
        <select value={ppId} onChange={(e) => setPpId(e.target.value)} className="w-full text-xs bg-ms-input border border-ms-hair p-1.5">
          {Object.entries(chemGroups).map(([chem, pps]: [string, any]) => (
            <optgroup key={chem} label={chem.toUpperCase()}>
              {pps.map((p: any) => <option key={p.id} value={p.id}>{p.name} ({p.thrustKn} kN, {p.ispVacuum}s)</option>)}
            </optgroup>
          ))}
        </select>
      </div>
      <div>
        <label className="text-xs text-ms-ink-dim block mb-1">Drive</label>
        <select value={driveId} onChange={(e) => setDriveId(e.target.value)} className="w-full text-xs bg-ms-input border border-ms-hair p-1.5">
          {drives.map((d: any) => <option key={d.id} value={d.id}>{d.name}</option>)}
        </select>
      </div>
      <div>
        <label className="text-xs text-ms-ink-dim block mb-1">Count</label>
        <input type="number" min={1} max={20} value={count} onChange={(e) => setCount(parseInt(e.target.value) || 1)} className="w-20 text-xs bg-ms-input border border-ms-hair p-1.5" />
      </div>
      <div className="flex gap-2">
        <button onClick={handleAdd} className="px-3 py-1.5 text-xs bg-ms-cyan text-ms-bg font-semibold">Add</button>
        <button onClick={onCancel} className="px-3 py-1.5 text-xs bg-ms-input border border-ms-hair">Cancel</button>
      </div>
    </div>
  );
}

function AddFuelForm({ onAdd, onCancel }: any) {
  const [fuelType, setFuelType] = useState('RP-1/LOX');
  const [mass, setMass] = useState(10000);
  const handleAdd = () => {
    const tankMass = mass * 0.008;
    const fuelTank: FuelTank = { id: crypto.randomUUID(), name: `${fuelType} Tank`, fuelType, propellantMassKg: mass, tankMassKg: tankMass, ullageFraction: 0.03, totalMassKg: mass + tankMass };
    onAdd({ id: crypto.randomUUID(), type: 'fuel_tank', name: fuelTank.name, massKg: fuelTank.totalMassKg, costMusd: tankMass * 0.001, fuelTank });
  };
  return (
    <div className="bg-ms-elevated p-3 space-y-2">
      <div>
        <label className="text-xs text-ms-ink-dim block mb-1">Fuel Type</label>
        <select value={fuelType} onChange={(e) => setFuelType(e.target.value)} className="w-full text-xs bg-ms-input border border-ms-hair p-1.5">
          <option>RP-1/LOX</option><option>LH2/LOX</option><option>CH4/LOX</option><option>N2O4/UDMH</option><option>APCP</option>
        </select>
      </div>
      <div>
        <label className="text-xs text-ms-ink-dim block mb-1">Propellant Mass (kg)</label>
        <input type="number" min={100} value={mass} onChange={(e) => setMass(parseInt(e.target.value) || 0)} className="w-full text-xs bg-ms-input border border-ms-hair p-1.5" />
      </div>
      <div className="flex gap-2">
        <button onClick={handleAdd} className="px-3 py-1.5 text-xs bg-ms-cyan text-ms-bg font-semibold">Add</button>
        <button onClick={onCancel} className="px-3 py-1.5 text-xs bg-ms-input border border-ms-hair">Cancel</button>
      </div>
    </div>
  );
}

function AddCrewForm({ crewModules, onAdd, onCancel }: any) {
  const [selected, setSelected] = useState(crewModules[0]?.id || '');
  const cm = crewModules.find((c: any) => c.id === selected);
  const handleAdd = () => { if (!cm) return; onAdd({ id: crypto.randomUUID(), type: 'crew_module', name: cm.name, massKg: cm.massKg, costMusd: cm.costMusd, crewModule: cm }); };
  return (
    <div className="bg-ms-elevated p-3 space-y-2">
      <select value={selected} onChange={(e) => setSelected(e.target.value)} className="w-full text-xs bg-ms-input border border-ms-hair p-1.5">
        {crewModules.map((cm: any) => <option key={cm.id} value={cm.id}>{cm.name} ({cm.seats} seats, {cm.massKg} kg)</option>)}
      </select>
      <div className="flex gap-2">
        <button onClick={handleAdd} className="px-3 py-1.5 text-xs bg-ms-cyan text-ms-bg font-semibold">Add</button>
        <button onClick={onCancel} className="px-3 py-1.5 text-xs bg-ms-input border border-ms-hair">Cancel</button>
      </div>
    </div>
  );
}

function AddBridgeForm({ bridgeTypes, onAdd, onCancel }: any) {
  const [selected, setSelected] = useState(bridgeTypes[0]?.id || '');
  const bt = bridgeTypes.find((b: any) => b.id === selected);
  const handleAdd = () => { if (!bt) return; onAdd({ id: crypto.randomUUID(), type: 'bridge', name: bt.name, massKg: bt.massKg, costMusd: bt.costMusd, bridgeType: bt }); };
  return (
    <div className="bg-ms-elevated p-3 space-y-2">
      <select value={selected} onChange={(e) => setSelected(e.target.value)} className="w-full text-xs bg-ms-input border border-ms-hair p-1.5">
        {bridgeTypes.map((bt: any) => <option key={bt.id} value={bt.id}>{bt.name} ({bt.stations} stations)</option>)}
      </select>
      <div className="flex gap-2">
        <button onClick={handleAdd} className="px-3 py-1.5 text-xs bg-ms-cyan text-ms-bg font-semibold">Add</button>
        <button onClick={onCancel} className="px-3 py-1.5 text-xs bg-ms-input border border-ms-hair">Cancel</button>
      </div>
    </div>
  );
}

function AddAvionicsForm({ avionics, onAdd, onCancel }: any) {
  const [selected, setSelected] = useState(avionics[0]?.id || '');
  const av = avionics.find((a: any) => a.id === selected);
  const handleAdd = () => { if (!av) return; onAdd({ id: crypto.randomUUID(), type: 'avionics', name: av.name, massKg: av.massKg, costMusd: av.costMusd, avionicsUnit: av }); };
  return (
    <div className="bg-ms-elevated p-3 space-y-2">
      <select value={selected} onChange={(e) => setSelected(e.target.value)} className="w-full text-xs bg-ms-input border border-ms-hair p-1.5">
        {avionics.map((av: any) => <option key={av.id} value={av.id}>{av.name}</option>)}
      </select>
      <div className="flex gap-2">
        <button onClick={handleAdd} className="px-3 py-1.5 text-xs bg-ms-cyan text-ms-bg font-semibold">Add</button>
        <button onClick={onCancel} className="px-3 py-1.5 text-xs bg-ms-input border border-ms-hair">Cancel</button>
      </div>
    </div>
  );
}

function AddSensorForm({ sensors, onAdd, onCancel }: any) {
  const [selected, setSelected] = useState(sensors[0]?.id || '');
  const s = sensors.find((s: any) => s.id === selected);
  const handleAdd = () => { if (!s) return; onAdd({ id: crypto.randomUUID(), type: 'sensor', name: s.name, massKg: s.massKg, costMusd: s.costMusd, sensor: s }); };
  return (
    <div className="bg-ms-elevated p-3 space-y-2">
      <select value={selected} onChange={(e) => setSelected(e.target.value)} className="w-full text-xs bg-ms-input border border-ms-hair p-1.5">
        {sensors.map((s: any) => <option key={s.id} value={s.id}>{s.name} ({s.category})</option>)}
      </select>
      <div className="flex gap-2">
        <button onClick={handleAdd} className="px-3 py-1.5 text-xs bg-ms-cyan text-ms-bg font-semibold">Add</button>
        <button onClick={onCancel} className="px-3 py-1.5 text-xs bg-ms-input border border-ms-hair">Cancel</button>
      </div>
    </div>
  );
}
