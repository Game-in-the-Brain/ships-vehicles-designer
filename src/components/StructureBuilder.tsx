import { useState, useRef } from 'react';
import { useVehicleStore } from '../store/vehicleStore';
import { fmtNum, fmtDeltaV, fmtMass, fmtCost } from '../utils/formatters';
import MsPanel from './primitives/MsPanel';
import MsNum from './primitives/MsNum';
import ChemistryBadge from './ChemistryBadge';
import { Rocket, Plus, Trash2, ChevronDown, ChevronUp, Save, FolderOpen, Download, Upload, FileJson, X, AlertCircle } from 'lucide-react';
import type { AttachedComponent, EngineAssembly, FuelTank } from '../types';
import type { SavedVehicleRecord } from '../store/vehicleStore';

export default function StructureBuilder() {
  const {
    currentVehicle, updateStructure, addComponent, removeComponent,
    saveVehicle, saveVehicleAs, loadSavedVehicle, listSavedVehicles,
    deleteSavedVehicle, exportVehicleToFile, importVehicleFromFile,
  } = useVehicleStore();
  const [expandedStructure, setExpandedStructure] = useState<string | null>(null);
  const [showAddEngine, setShowAddEngine] = useState<string | null>(null);
  const [showAddFuel, setShowAddFuel] = useState<string | null>(null);
  const [showAddCrew, setShowAddCrew] = useState<string | null>(null);
  const [showAddBridge, setShowAddBridge] = useState<string | null>(null);
  const [showAddAvionics, setShowAddAvionics] = useState<string | null>(null);
  const [showAddSensor, setShowAddSensor] = useState<string | null>(null);

  const [showSaveAsModal, setShowSaveAsModal] = useState(false);
  const [showLoadModal, setShowLoadModal] = useState(false);
  const [saveAsName, setSaveAsName] = useState('');
  const [savedVehicles, setSavedVehicles] = useState<SavedVehicleRecord[]>([]);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { powerPlants, drives, crewModules, bridgeTypes, avionics, sensors } = useVehicleStore();
  if (!currentVehicle) return null;

  const showError = (msg: string) => {
    setErrorMsg(msg);
    setTimeout(() => setErrorMsg(null), 4000);
  };

  const handleSave = () => {
    if (!currentVehicle) return;
    saveVehicle(currentVehicle);
  };

  const handleSaveAs = () => {
    setSaveAsName(currentVehicle.name);
    setShowSaveAsModal(true);
  };

  const confirmSaveAs = () => {
    if (!saveAsName.trim()) return;
    saveVehicleAs(saveAsName.trim());
    setShowSaveAsModal(false);
  };

  const handleLoadOpen = () => {
    setSavedVehicles(listSavedVehicles());
    setShowLoadModal(true);
  };

  const handleLoad = (id: string) => {
    loadSavedVehicle(id);
    setShowLoadModal(false);
  };

  const handleDeleteSaved = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    deleteSavedVehicle(id);
    setSavedVehicles(listSavedVehicles());
  };

  const handleExport = () => {
    if (!currentVehicle) return;
    exportVehicleToFile(currentVehicle);
  };

  const handleImportClick = () => {
    fileInputRef.current?.click();
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      await importVehicleFromFile(file);
    } catch (err: any) {
      showError(err?.message || 'Failed to import vehicle');
    }
    if (fileInputRef.current) fileInputRef.current.value = '';
  };

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
            <MsNum value={fmtNum(currentVehicle.totalMassTons, 1)} unit="t" size="sm" label="Mass" />
            <MsNum value={currentVehicle.totalDeltaV ? fmtNum(currentVehicle.totalDeltaV / 1000, 2) : '—'} unit="km/s" size="sm" label="ΔV" />
          </div>
        </div>
        <div className="max-w-5xl mx-auto px-4 pb-3 flex items-center gap-2 flex-wrap">
          <button onClick={handleSave} title="Save" className="flex items-center gap-1 px-2 py-1 text-xs bg-ms-input border border-ms-hair hover:border-ms-cyan transition-colors">
            <Save className="w-3 h-3" /> Save
          </button>
          <button onClick={handleSaveAs} title="Save As" className="flex items-center gap-1 px-2 py-1 text-xs bg-ms-input border border-ms-hair hover:border-ms-cyan transition-colors">
            <FileJson className="w-3 h-3" /> Save As
          </button>
          <button onClick={handleLoadOpen} title="Load" className="flex items-center gap-1 px-2 py-1 text-xs bg-ms-input border border-ms-hair hover:border-ms-cyan transition-colors">
            <FolderOpen className="w-3 h-3" /> Load
          </button>
          <button onClick={handleExport} title="Export JSON" className="flex items-center gap-1 px-2 py-1 text-xs bg-ms-input border border-ms-hair hover:border-ms-cyan transition-colors">
            <Download className="w-3 h-3" /> Export
          </button>
          <button onClick={handleImportClick} title="Import JSON" className="flex items-center gap-1 px-2 py-1 text-xs bg-ms-input border border-ms-hair hover:border-ms-cyan transition-colors">
            <Upload className="w-3 h-3" /> Import
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json,application/json"
            onChange={handleFileChange}
            className="hidden"
          />
          {errorMsg && (
            <div className="flex items-center gap-1 text-xs text-ms-warn ml-auto">
              <AlertCircle className="w-3 h-3" />
              {errorMsg}
            </div>
          )}
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-4 space-y-4">
        {currentVehicle.structures.map((structure) => {
          const isExpanded = expandedStructure === structure.id;
          return (
            <MsPanel key={structure.id} title={structure.name} keyword={`${structure.capacityUsedPercent.toFixed(0)}%`}>
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center gap-4 text-xs font-mono">
                  <span>Mass: {fmtMass(structure.totalMassTons)}</span>
                  <span>Cost: {fmtCost(structure.totalCost)}</span>
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
                        <span className="text-ms-ink-dim">{fmtNum(component.massKg / 1000, 2)} t</span>
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

      {/* Save As Modal */}
      {showSaveAsModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
          onClick={() => setShowSaveAsModal(false)}
        >
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-sm bg-ms-elevated border border-ms-hair flex flex-col">
            <div className="p-4 border-b border-ms-hair flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Save className="w-5 h-5 text-ms-cyan" />
                <h2 className="text-sm font-display font-bold text-ms-ink">Save As</h2>
              </div>
              <button onClick={() => setShowSaveAsModal(false)} className="p-1 text-ms-ink-dim hover:text-ms-warn transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="p-4 space-y-3">
              <label className="text-xs text-ms-ink-dim block">Vehicle Name</label>
              <input
                type="text"
                value={saveAsName}
                onChange={(e) => setSaveAsName(e.target.value)}
                onKeyDown={(e) => { if (e.key === 'Enter') confirmSaveAs(); }}
                className="w-full px-3 py-2 bg-ms-bg border border-ms-hair text-ms-ink text-sm font-mono placeholder:text-ms-ink-dim focus:border-ms-cyan focus:outline-none"
                autoFocus
              />
            </div>
            <div className="p-4 border-t border-ms-hair flex justify-end gap-2">
              <button
                onClick={() => setShowSaveAsModal(false)}
                className="px-4 py-2 bg-ms-elevated border border-ms-hair text-ms-ink-soft text-xs font-mono hover:border-ms-cyan transition-colors"
              >
                Cancel
              </button>
              <button
                onClick={confirmSaveAs}
                disabled={!saveAsName.trim()}
                className="px-4 py-2 bg-ms-cyan text-ms-bg text-xs font-mono font-semibold hover:bg-ms-cyan-dim transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                Save
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Load Modal */}
      {showLoadModal && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center p-4"
          style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
          onClick={() => setShowLoadModal(false)}
        >
          <div onClick={(e) => e.stopPropagation()} className="w-full max-w-lg bg-ms-elevated border border-ms-hair max-h-[80vh] flex flex-col">
            <div className="p-4 border-b border-ms-hair flex items-center justify-between">
              <div className="flex items-center gap-2">
                <FolderOpen className="w-5 h-5 text-ms-cyan" />
                <h2 className="text-sm font-display font-bold text-ms-ink">Load Vehicle</h2>
                <span className="text-[10px] text-ms-ink-dim font-mono">{savedVehicles.length} saved</span>
              </div>
              <button onClick={() => setShowLoadModal(false)} className="p-1 text-ms-ink-dim hover:text-ms-warn transition-colors">
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto p-2">
              {savedVehicles.length === 0 ? (
                <div className="text-center py-8 text-ms-ink-dim text-sm">No saved vehicles found.</div>
              ) : (
                <div className="space-y-1">
                  {savedVehicles.map((entry) => (
                    <div
                      key={entry.id}
                      className="w-full p-3 text-left border bg-ms-bg border-ms-hair hover:border-ms-cyan transition-colors flex items-center justify-between group cursor-pointer"
                      onClick={() => handleLoad(entry.id)}
                    >
                      <div>
                        <div className="text-sm font-semibold text-ms-ink">{entry.name}</div>
                        <div className="text-[10px] text-ms-ink-soft mt-0.5">
                          {entry.vehicle.type} · TL {entry.vehicle.tl} · {entry.vehicle.structures.length} structures · {fmtNum(entry.vehicle.totalMassTons, 1)} t
                        </div>
                        <div className="text-[10px] text-ms-ink-dim">
                          Saved {new Date(entry.savedAt).toLocaleString()}
                        </div>
                      </div>
                      <button
                        onClick={(e) => handleDeleteSaved(entry.id, e)}
                        title="Delete"
                        className="p-1.5 text-ms-ink-dim hover:text-ms-warn opacity-0 group-hover:opacity-100 transition-opacity"
                      >
                        <Trash2 className="w-4 h-4" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>
            <div className="p-4 border-t border-ms-hair flex justify-end">
              <button
                onClick={() => setShowLoadModal(false)}
                className="px-4 py-2 bg-ms-elevated border border-ms-hair text-ms-ink-soft text-xs font-mono hover:border-ms-cyan transition-colors"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}
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
