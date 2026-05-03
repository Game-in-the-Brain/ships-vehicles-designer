import { useEffect } from 'react';
import { useVehicleStore } from '../store/vehicleStore';
import MsPanel from './primitives/MsPanel';
import { Scale, X, Trash2, ArrowLeft, Weight, Zap, Rocket, Layers, Crosshair } from 'lucide-react';

export default function CompareScreen() {
  const { compareVehicles, setCompareVehicles, setScreen, loadLibraryVehicle } = useVehicleStore();

  // Auto-load prototype pair if empty
  useEffect(() => {
    if (compareVehicles.length === 0) {
      Promise.all([
        loadLibraryVehicle('saturn-v'),
        loadLibraryVehicle('n1-l3'),
      ]).then(() => {
        const store = useVehicleStore.getState();
        // Add both to compare if they loaded
        const vehicles = [];
        if (store.currentVehicle?.id === 'n1-l3') {
          // We loaded n1 last, currentVehicle is n1
          // Need to reload saturn-v to get it too
        }
      }).catch(() => {});
    }
  }, []);

  if (compareVehicles.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-ms-ink-dim font-mono">
        <div className="text-center max-w-md px-6">
          <Scale className="w-12 h-12 mx-auto mb-4 opacity-30" />
          <p className="text-sm mb-4">No vehicles selected for comparison.</p>
          <div className="flex flex-col gap-2">
            <button
              onClick={async () => {
                await loadLibraryVehicle('saturn-v');
                const saturn = useVehicleStore.getState().currentVehicle;
                if (saturn) {
                  useVehicleStore.getState().addToCompare(saturn);
                  await loadLibraryVehicle('n1-l3');
                  const n1 = useVehicleStore.getState().currentVehicle;
                  if (n1) useVehicleStore.getState().addToCompare(n1);
                }
              }}
              className="px-4 py-2 bg-ms-cyan text-ms-bg font-mono text-sm font-semibold hover:bg-ms-cyan-dim transition-colors"
            >
              <Rocket className="w-4 h-4 inline mr-2" />
              Load Saturn V vs N1 Prototype
            </button>
            <button onClick={() => setScreen('library')} className="px-4 py-2 bg-ms-elevated border border-ms-hair text-ms-ink-soft font-mono text-sm hover:border-ms-cyan transition-colors">
              <ArrowLeft className="w-4 h-4 inline mr-2" /> Go to Library
            </button>
          </div>
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
  };

  const loadPrototype = async () => {
    clearAll();
    await loadLibraryVehicle('saturn-v');
    const saturn = useVehicleStore.getState().currentVehicle;
    if (saturn) {
      useVehicleStore.getState().addToCompare(saturn);
      await loadLibraryVehicle('n1-l3');
      const n1 = useVehicleStore.getState().currentVehicle;
      if (n1) useVehicleStore.getState().addToCompare(n1);
    }
  };

  return (
    <div className="min-h-screen bg-ms-bg text-ms-ink font-mono">
      <header className="border-b border-ms-hair bg-ms-elevated px-4 py-3 flex items-center justify-between sticky top-0 z-10 lg:top-10">
        <div className="flex items-center gap-3">
          <Scale className="w-5 h-5 text-ms-cyan" />
          <h1 className="text-sm font-display font-semibold tracking-wide">COMPARE</h1>
          <span className="text-xs text-ms-ink-dim">{compareVehicles.length} vehicles</span>
        </div>
        <div className="flex items-center gap-2">
          <button onClick={loadPrototype} className="px-3 py-1.5 bg-ms-cyan/10 border border-ms-cyan/30 text-ms-cyan text-xs hover:bg-ms-cyan/20 transition-colors">
            <Rocket className="w-3 h-3 inline mr-1" /> Saturn V vs N1
          </button>
          <button onClick={() => setScreen('library')} className="px-3 py-1.5 bg-ms-elevated border border-ms-hair text-ms-ink-soft text-xs hover:border-ms-cyan transition-colors">
            <ArrowLeft className="w-3 h-3 inline mr-1" /> Library
          </button>
          <button onClick={clearAll} className="px-3 py-1.5 bg-ms-elevated border border-ms-hair text-ms-warn text-xs hover:border-ms-warn transition-colors">
            <Trash2 className="w-3 h-3 inline mr-1" /> Clear
          </button>
        </div>
      </header>

      <div className="max-w-7xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-2 gap-4">
        {compareVehicles.map((vehicle, index) => (
          <div key={`${vehicle.id}-${index}`} className="space-y-4">
            <MsPanel sheetNo={`#${index + 1}`} title={vehicle.name} keyword={`TL ${vehicle.tl} · PMR ${vehicle.pmr}`}>
              <button onClick={() => removeVehicle(index)} className="absolute top-2 right-2 p-1 text-ms-ink-dim hover:text-ms-warn transition-colors"><X className="w-4 h-4" /></button>
              <div className="space-y-4">
                <div className="grid grid-cols-2 gap-3">
                  <div>
                    <div className="text-[10px] text-ms-ink-dim uppercase tracking-wider">Type</div>
                    <div className="text-sm font-semibold">{vehicle.type}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-ms-ink-dim uppercase tracking-wider">TL</div>
                    <div className="text-sm font-semibold text-ms-cyan">{vehicle.tl}</div>
                  </div>
                </div>

                <div className="border-t border-ms-hair pt-3">
                  <h4 className="text-xs font-display font-semibold text-ms-ink-dim mb-2 flex items-center gap-1"><Weight className="w-3 h-3" /> Mass &amp; Performance</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs"><span className="text-ms-ink-soft">Total Mass</span><span className="font-semibold">{vehicle.totalMassTons.toFixed(0)} t</span></div>
                    <div className="flex justify-between text-xs"><span className="text-ms-ink-soft">Total Cost</span><span className="font-semibold">{vehicle.totalCost.toFixed(1)} M$</span></div>
                    <div className="flex justify-between text-xs"><span className="text-ms-ink-soft">Total ΔV</span><span className="font-semibold text-ms-good">{vehicle.totalDeltaV?.toFixed(0) ?? '—'} m/s</span></div>
                  </div>
                </div>

                <div className="border-t border-ms-hair pt-3">
                  <h4 className="text-xs font-display font-semibold text-ms-ink-dim mb-2 flex items-center gap-1"><Zap className="w-3 h-3" /> Payload</h4>
                  <div className="space-y-2">
                    <div className="flex justify-between text-xs"><span className="text-ms-ink-soft">LEO</span><span className="font-semibold">{vehicle.leoPayloadKg ? (vehicle.leoPayloadKg / 1000).toFixed(1) + ' t' : '—'}</span></div>
                    <div className="flex justify-between text-xs"><span className="text-ms-ink-soft">GTO</span><span className="font-semibold">{vehicle.gtoPayloadKg ? (vehicle.gtoPayloadKg / 1000).toFixed(1) + ' t' : '—'}</span></div>
                    <div className="flex justify-between text-xs"><span className="text-ms-ink-soft">TLI</span><span className="font-semibold text-ms-amber">{vehicle.tliPayloadKg ? (vehicle.tliPayloadKg / 1000).toFixed(1) + ' t' : '—'}</span></div>
                  </div>
                </div>

                <div className="border-t border-ms-hair pt-3">
                  <h4 className="text-xs font-display font-semibold text-ms-ink-dim mb-2 flex items-center gap-1"><Crosshair className="w-3 h-3" /> Propulsion</h4>
                  {vehicle.structures.map((s) => s.components.filter((c) => c.type === 'engine').map((engine) => (
                    <div key={engine.id} className="text-xs text-ms-ink-soft mb-2">
                      <div className="font-semibold text-ms-ink">{engine.name}</div>
                      <div className="flex gap-3 mt-1">
                        <span>Thrust: {engine.engineAssembly?.totalThrustKn} kN</span>
                        <span>Vac Isp: {engine.engineAssembly?.vacuumIsp} s</span>
                      </div>
                    </div>
                  )))}
                </div>

                <div className="border-t border-ms-hair pt-3">
                  <h4 className="text-xs font-display font-semibold text-ms-ink-dim mb-2 flex items-center gap-1"><Layers className="w-3 h-3" /> Stages</h4>
                  <div className="space-y-2">
                    {vehicle.structures.map((structure, si) => (
                      <div key={structure.id} className="text-xs">
                        <div className="flex justify-between"><span className="font-semibold">{si + 1}. {structure.name}</span><span className="text-ms-ink-dim">{structure.totalMassTons.toFixed(0)} t</span></div>
                        <div className="flex justify-between text-ms-ink-soft mt-0.5">
                          <span>{structure.components.length} components</span>
                          <span>{structure.capacityTons} t cap · {(structure.capacityUsedPercent).toFixed(0)}%</span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {vehicle.notes && (
                  <div className="border-t border-ms-hair pt-3">
                    <p className="text-[10px] text-ms-ink-dim leading-relaxed">{vehicle.notes}</p>
                  </div>
                )}
              </div>
            </MsPanel>
          </div>
        ))}
      </div>
    </div>
  );
}
