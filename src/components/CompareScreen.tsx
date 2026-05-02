import { useVehicleStore } from '../store/vehicleStore';
import MsPanel from './primitives/MsPanel';
import MsNum from './primitives/MsNum';
import MsButton from './primitives/MsButton';
import ChemistryBadge from './ChemistryBadge';
import { Scale, X, Trash2, ArrowLeft, Weight, Zap, Database, Layers } from 'lucide-react';

export default function CompareScreen() {
  const { compareVehicles, setCompareVehicles, setScreen } = useVehicleStore();
  if (compareVehicles.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-ms-ink-dim font-mono">
        <div className="text-center">
          <Scale className="w-12 h-12 mx-auto mb-4 opacity-30" />
          <p className="text-sm mb-4">No vehicles selected for comparison.</p>
          <MsButton variant="primary" onClick={() => setScreen('library')}>
            <ArrowLeft className="w-4 h-4" /> Go to Library
          </MsButton>
        </div>
      </div>
    );
  }

  const removeVehicle = (index: number) => {
    const next = [...compareVehicles];
    next.splice(index, 1);
    setCompareVehicles(next);
  };

  const clearAll = () => {
    setCompareVehicles([]);
    setScreen('library');
  };

  return (
    <div className="min-h-screen bg-ms-bg text-ms-ink font-mono">
      <header className="border-b border-ms-hair bg-ms-elevated px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <Scale className="w-5 h-5 text-ms-cyan" />
          <h1 className="text-sm font-display font-semibold tracking-wide">Compare</h1>
          <span className="text-xs text-ms-ink-dim">{compareVehicles.length} vehicles</span>
        </div>
        <div className="flex items-center gap-2">
          <MsButton variant="secondary" size="sm" onClick={() => setScreen('library')}>
            <ArrowLeft className="w-3 h-3" /> Back
          </MsButton>
          <MsButton variant="warn" size="sm" onClick={clearAll}>
            <Trash2 className="w-3 h-3" /> Clear
          </MsButton>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {compareVehicles.map((vehicle, index) => (
          <div key={`${vehicle.id}-${index}`} className="space-y-4">
            <MsPanel sheetNo={`#${index + 1}`} title={vehicle.name} keyword={`${vehicle.classification} · ${vehicle.kind}`}>
              <button onClick={() => removeVehicle(index)} className="absolute top-2 right-2 p-1 text-ms-ink-dim hover:text-ms-warn transition-colors"><X className="w-4 h-4" /></button>
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <ChemistryBadge chemistry={vehicle.classification.split('/')[0].toLowerCase() as any} />
                  <span className="text-xs text-ms-ink-dim">{vehicle.classification}</span>
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <MsNum label="TL" value={vehicle.tl} size="sm" />
                  <MsNum label="PMR" value={vehicle.pmr} size="sm" variant="amber" />
                </div>
                <div className="border-t border-ms-hair pt-3">
                  <h4 className="text-xs font-display font-semibold text-ms-ink-dim mb-2 flex items-center gap-1"><Weight className="w-3 h-3" /> Mass &amp; Performance</h4>
                  <div className="space-y-2">
                    <MsNum label="Total Mass" value={`${vehicle.totalMassTons.toFixed(0)}`} unit="t" size="sm" />
                    <MsNum label="Dry Mass" value={`${vehicle.dryMassTons.toFixed(0)}`} unit="t" size="sm" />
                    <MsNum label="Total ΔV" value={`${(vehicle.totalDeltaV / 1000).toFixed(2)}`} unit="km/s" size="sm" variant="good" />
                  </div>
                </div>
                <div className="border-t border-ms-hair pt-3">
                  <h4 className="text-xs font-display font-semibold text-ms-ink-dim mb-2 flex items-center gap-1"><Zap className="w-3 h-3" /> Payload</h4>
                  <div className="space-y-2">
                    <MsNum label="LEO" value={`${(vehicle.payload?.leoKg / 1000 || 0).toFixed(1)}`} unit="t" size="sm" />
                    <MsNum label="GTO" value={`${(vehicle.payload?.gtoKg / 1000 || 0).toFixed(1)}`} unit="t" size="sm" variant="cyan" />
                    <MsNum label="TLI" value={`${(vehicle.payload?.tliKg / 1000 || 0).toFixed(1)}`} unit="t" size="sm" variant="amber" />
                  </div>
                </div>
                <div className="border-t border-ms-hair pt-3">
                  <h4 className="text-xs font-display font-semibold text-ms-ink-dim mb-2 flex items-center gap-1"><Database className="w-3 h-3" /> Propulsion</h4>
                  {vehicle.structures.map((s) => s.components.filter((c) => c.type === 'engine').map((engine) => (
                    <div key={engine.id} className="text-xs text-ms-ink-soft mb-2">
                      <div className="font-semibold">{engine.name}</div>
                      <div className="flex gap-3 mt-1">
                        <span>Thrust: {engine.engineAssembly?.totalThrustKn} kN</span>
                        <span>Vac Isp: {engine.engineAssembly?.vacuumIsp} s</span>
                        <span>Count: {engine.engineAssembly?.count}</span>
                      </div>
                    </div>
                  )))}
                </div>
                <div className="border-t border-ms-hair pt-3">
                  <h4 className="text-xs font-display font-semibold text-ms-ink-dim mb-2 flex items-center gap-1"><Layers className="w-3 h-3" /> Structures</h4>
                  <div className="space-y-2">
                    {vehicle.structures.map((structure) => (
                      <div key={structure.id} className="text-xs">
                        <div className="flex justify-between"><span className="font-semibold">{structure.name}</span><span className="text-ms-ink-dim">{structure.massTons} t</span></div>
                        <div className="flex justify-between text-ms-ink-soft mt-0.5"><span>{structure.components.length} components</span><span>{structure.capacityTons} t cap</span></div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            </MsPanel>
          </div>
        ))}
      </div>
    </div>
  );
}
