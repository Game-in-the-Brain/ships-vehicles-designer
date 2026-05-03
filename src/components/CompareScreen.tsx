import { useState } from 'react';
import { useVehicleStore } from '../store/vehicleStore';
import CompareTable, { type CompareMode } from './CompareTable';
import VehicleSelectorModal from './VehicleSelectorModal';
import { Scale, Trash2, ArrowLeft, Plus, LayoutTemplate, Columns3, Columns2, LayoutGrid } from 'lucide-react';

export default function CompareScreen() {
  const {
    compareVehicles,
    setCompareVehicles,
    setScreen,
    currentVehicle,
    addToCompare,
  } = useVehicleStore();

  const [mode, setMode] = useState<CompareMode>('standard');
  const [showSelector, setShowSelector] = useState(false);

  const removeVehicle = (index: number) => {
    const next = [...compareVehicles];
    next.splice(index, 1);
    setCompareVehicles(next);
  };

  const clearAll = () => {
    setCompareVehicles([]);
  };

  const handleAddVehicle = (vehicle: import('../types').VehicleDesign) => {
    addToCompare(vehicle);
  };

  // Auto-switch mode based on vehicle count
  const effectiveMode = mode === 'standard' && compareVehicles.length >= 3
    ? 'super-compact'
    : mode;

  if (compareVehicles.length === 0) {
    return (
      <div className="min-h-screen flex items-center justify-center text-ms-ink-dim font-mono">
        <div className="text-center max-w-md px-6">
          <Scale className="w-12 h-12 mx-auto mb-4 opacity-30" />
          <p className="text-sm mb-4">No vehicles selected for comparison.</p>
          <div className="flex flex-col gap-2">
            <button
              onClick={() => setShowSelector(true)}
              className="px-4 py-2 bg-ms-cyan text-ms-bg font-mono text-sm font-semibold hover:bg-ms-cyan-dim transition-colors"
            >
              <Plus className="w-4 h-4 inline mr-2" />
              Add Vehicle to Compare
            </button>
            <button
              onClick={() => setScreen('library')}
              className="px-4 py-2 bg-ms-elevated border border-ms-hair text-ms-ink-soft font-mono text-sm hover:border-ms-cyan transition-colors"
            >
              <ArrowLeft className="w-4 h-4 inline mr-2" /> Go to Library
            </button>
          </div>
        </div>

        {showSelector && (
          <VehicleSelectorModal
            onSelect={handleAddVehicle}
            onClose={() => setShowSelector(false)}
            currentCount={compareVehicles.length}
            currentVehicle={currentVehicle}
          />
        )}
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ms-bg text-ms-ink font-mono">
      {/* Header */}
      <header className="border-b border-ms-hair bg-ms-elevated px-4 py-3 flex items-center justify-between sticky top-0 z-10 lg:top-10">
        <div className="flex items-center gap-3">
          <Scale className="w-5 h-5 text-ms-cyan" />
          <h1 className="text-sm font-display font-semibold tracking-wide">COMPARE</h1>
          <span className="text-xs text-ms-ink-dim">{compareVehicles.length}/3 vehicles</span>
        </div>

        <div className="flex items-center gap-2">
          {/* View Mode Toggle */}
          <div className="flex items-center gap-1 mr-2">
            <button
              onClick={() => setMode('standard')}
              title="Standard (2 ships)"
              className={`p-1.5 transition-colors ${
                mode === 'standard' ? 'text-ms-cyan bg-ms-cyan/10' : 'text-ms-ink-dim hover:text-ms-ink'
              }`}
            >
              <Columns2 className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMode('compact')}
              title="Compact (2 ships, more detail)"
              className={`p-1.5 transition-colors ${
                mode === 'compact' ? 'text-ms-cyan bg-ms-cyan/10' : 'text-ms-ink-dim hover:text-ms-ink'
              }`}
            >
              <LayoutGrid className="w-4 h-4" />
            </button>
            <button
              onClick={() => setMode('super-compact')}
              title="Super Compact (3 ships)"
              className={`p-1.5 transition-colors ${
                mode === 'super-compact' ? 'text-ms-cyan bg-ms-cyan/10' : 'text-ms-ink-dim hover:text-ms-ink'
              }`}
            >
              <Columns3 className="w-4 h-4" />
            </button>
          </div>

          {compareVehicles.length < 3 && (
            <button
              onClick={() => setShowSelector(true)}
              className="px-3 py-1.5 bg-ms-cyan/10 border border-ms-cyan/30 text-ms-cyan text-xs hover:bg-ms-cyan/20 transition-colors flex items-center gap-1"
            >
              <Plus className="w-3 h-3" /> Add
            </button>
          )}

          <button
            onClick={() => setScreen('library')}
            className="px-3 py-1.5 bg-ms-elevated border border-ms-hair text-ms-ink-soft text-xs hover:border-ms-cyan transition-colors"
          >
            <ArrowLeft className="w-3 h-3 inline mr-1" /> Library
          </button>

          <button
            onClick={clearAll}
            className="px-3 py-1.5 bg-ms-elevated border border-ms-hair text-ms-warn text-xs hover:border-ms-warn transition-colors"
          >
            <Trash2 className="w-3 h-3 inline mr-1" /> Clear
          </button>
        </div>
      </header>

      {/* Legend */}
      <div className="px-4 py-2 border-b border-ms-hair bg-ms-bg/50 text-[10px] text-ms-ink-dim flex items-center gap-4">
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-ms-good" /> Best
        </span>
        <span className="flex items-center gap-1">
          <span className="w-2 h-2 rounded-full bg-ms-ink-dim" /> Worst
        </span>
        <span className="ml-auto">
          Mode: <span className="text-ms-cyan">{effectiveMode.replace('-', ' ')}</span>
          {compareVehicles.length >= 3 && mode !== 'super-compact' && (
            <span className="text-ms-ink-dim ml-1">(auto-adjusted for 3 vehicles)</span>
          )}
        </span>
      </div>

      {/* Table */}
      <div className={effectiveMode === 'super-compact' ? 'p-2' : effectiveMode === 'compact' ? 'p-3' : 'p-4'}>
        <CompareTable
          vehicles={compareVehicles}
          mode={effectiveMode}
          onRemove={removeVehicle}
        />
      </div>

      {/* Selector Modal */}
      {showSelector && (
        <VehicleSelectorModal
          onSelect={handleAddVehicle}
          onClose={() => setShowSelector(false)}
          currentCount={compareVehicles.length}
          currentVehicle={currentVehicle}
        />
      )}
    </div>
  );
}
