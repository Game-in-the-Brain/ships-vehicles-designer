import type { VehicleDesign, Structure, AttachedComponent } from '../types';
import { fmtNum, fmtMass, fmtDeltaV, fmtCost, fmtPayload } from '../utils/formatters';
import { Weight, Zap, Rocket, Layers, Crosshair, Users, Cpu, ArrowUp, ArrowDown, Minus } from 'lucide-react';

export type CompareMode = 'standard' | 'compact' | 'super-compact';

interface CompareTableProps {
  vehicles: VehicleDesign[];
  mode: CompareMode;
  onRemove: (index: number) => void;
}

// ─── Diff Highlighting ───

type CompareDirection = 'lower' | 'higher' | 'none';

interface DiffResult {
  bestIndices: number[];
  worstIndices: number[];
}

function compareValues(values: (number | null)[], direction: CompareDirection): DiffResult {
  if (direction === 'none') return { bestIndices: [], worstIndices: [] };

  const validEntries = values
    .map((v, i) => ({ value: v, index: i }))
    .filter((e) => e.value !== null && e.value !== undefined);

  if (validEntries.length === 0) return { bestIndices: [], worstIndices: [] };

  const sorted = [...validEntries].sort((a, b) =>
    direction === 'lower' ? (a.value! - b.value!) : (b.value! - a.value!)
  );

  const bestValue = sorted[0].value;
  const worstValue = sorted[sorted.length - 1].value;

  return {
    bestIndices: sorted.filter((e) => e.value === bestValue).map((e) => e.index),
    worstIndices: sorted.filter((e) => e.value === worstValue).map((e) => e.index),
  };
}

function getCellClass(diff: DiffResult, index: number, mode: CompareMode): string {
  if (mode === 'super-compact') return '';
  if (diff.bestIndices.includes(index)) return 'text-ms-good font-semibold';
  if (diff.worstIndices.includes(index) && diff.bestIndices.length > 0) return 'text-ms-ink-dim';
  return '';
}

// ─── Helpers ───

function getTotalThrust(vehicle: VehicleDesign): number {
  return vehicle.structures.reduce((sum, s) =>
    sum + s.components
      .filter((c) => c.type === 'engine')
      .reduce((esum, e) => esum + (e.engineAssembly?.totalThrustKn || 0), 0),
    0
  );
}

function getTotalEngines(vehicle: VehicleDesign): number {
  return vehicle.structures.reduce((sum, s) =>
    sum + s.components.filter((c) => c.type === 'engine').reduce((esum, e) => esum + (e.engineAssembly?.count || 1), 0),
    0
  );

}

function getPrimaryEngine(vehicle: VehicleDesign): AttachedComponent | null {
  for (const s of vehicle.structures) {
    const engine = s.components.find((c) => c.type === 'engine');
    if (engine) return engine;
  }
  return null;
}

function getTotalCrew(vehicle: VehicleDesign): number {
  return vehicle.structures.reduce((sum, s) =>
    sum + s.components
      .filter((c) => c.type === 'crew_module')
      .reduce((csum, c) => csum + (c.crewModule?.seats || 0), 0),
    0
  );
}

function getTotalComputing(vehicle: VehicleDesign): number {
  return vehicle.structures.reduce((sum, s) =>
    sum + s.components
      .filter((c) => c.type === 'computer')
      .reduce((csum, c) => csum + (c.computerSystem?.computingMips || 0), 0),
    0
  );
}

function getStructureEngines(structure: Structure): AttachedComponent[] {
  return structure.components.filter((c) => c.type === 'engine');
}

function getStructureThrust(structure: Structure): number {
  return getStructureEngines(structure).reduce((sum, e) => sum + (e.engineAssembly?.totalThrustKn || 0), 0);
}

function getStructureIsp(structure: Structure): number | null {
  const engines = getStructureEngines(structure);
  if (engines.length === 0) return null;
  const totalThrust = engines.reduce((sum, e) => sum + (e.engineAssembly?.totalThrustKn || 0), 0);
  const weightedIsp = engines.reduce((sum, e) => {
    const thrust = e.engineAssembly?.totalThrustKn || 0;
    const isp = e.engineAssembly?.vacuumIsp || 0;
    return sum + (thrust * isp);
  }, 0);
  return totalThrust > 0 ? weightedIsp / totalThrust : null;
}

// ─── Performance Badge ───

function getPerformanceBadge(vehicle: VehicleDesign): { label: string; classes: string } {
  const dv = vehicle.totalDeltaV || 0;
  const mass = vehicle.totalMassTons;

  if (mass > 2000 && dv > 8000) {
    return { label: 'Super Heavy', classes: 'bg-ms-cyan/15 text-ms-cyan border-ms-cyan/30' };
  }
  if (mass > 1000) {
    return { label: 'Heavy Lifter', classes: 'bg-ms-cyan/15 text-ms-cyan border-ms-cyan/30' };
  }
  if (dv >= 10000) {
    return { label: 'Interplanetary', classes: 'bg-ms-good/15 text-ms-good border-ms-good/30' };
  }
  if (dv >= 6000) {
    return { label: 'Deep Space', classes: 'bg-ms-amber/15 text-ms-amber border-ms-amber/30' };
  }
  if (dv >= 3000) {
    return { label: 'Orbital', classes: 'bg-ms-warn/15 text-ms-warn border-ms-warn/30' };
  }
  return { label: 'Suborbital', classes: 'bg-ms-ink-dim/10 text-ms-ink-dim border-ms-ink-dim/20' };
}

// ─── Mode Config ───

const MODE_CONFIG: Record<CompareMode, { labelClass: string; valueClass: string; sectionClass: string; padding: string; gap: string; summaryLabel: string; summaryValue: string }> = {
  'standard': {
    labelClass: 'text-[11px] text-ms-ink-dim uppercase tracking-wider',
    valueClass: 'text-sm',
    sectionClass: 'text-xs font-display font-semibold text-ms-ink-soft mb-3 flex items-center gap-1.5',
    padding: 'py-2.5 px-3.5',
    gap: 'gap-4',
    summaryLabel: 'text-[10px]',
    summaryValue: 'text-[12px]',
  },
  'compact': {
    labelClass: 'text-[10px] text-ms-ink-dim uppercase tracking-wider',
    valueClass: 'text-xs',
    sectionClass: 'text-[11px] font-display font-semibold text-ms-ink-soft mb-2 flex items-center gap-1',
    padding: 'py-2 px-3',
    gap: 'gap-3',
    summaryLabel: 'text-[9px]',
    summaryValue: 'text-[11px]',
  },
  'super-compact': {
    labelClass: 'text-[9px] text-ms-ink-dim uppercase tracking-wider',
    valueClass: 'text-[11px]',
    sectionClass: 'text-[10px] font-display font-semibold text-ms-ink-soft mb-1 flex items-center gap-1',
    padding: 'py-1 px-1.5',
    gap: 'gap-2',
    summaryLabel: 'text-[8px]',
    summaryValue: 'text-[10px]',
  },
};

// ─── Table Cell ───

function Cell({ children, className = '' }: { children?: React.ReactNode; className?: string }) {
  return <div className={`border-l border-ms-hair ${className}`}>{children}</div>;
}

function LabelCell({ children, mode }: { children: React.ReactNode; mode: CompareMode }) {
  const cfg = MODE_CONFIG[mode];
  return (
    <div className={`${cfg.padding} ${cfg.labelClass} flex items-center`}>
      {children}
    </div>
  );
}

function ValueCell({
  children,
  mode,
  diffClass = '',
}: {
  children: React.ReactNode;
  mode: CompareMode;
  diffClass?: string;
}) {
  const cfg = MODE_CONFIG[mode];
  return (
    <Cell className={`${cfg.padding} ${cfg.valueClass} ${diffClass}`}>
      {children}
    </Cell>
  );
}

// ─── Section Header ───

function SectionHeader({ icon, label, mode }: { icon: React.ReactNode; label: string; mode: CompareMode }) {
  const cfg = MODE_CONFIG[mode];
  return (
    <div className={`col-span-full ${cfg.sectionClass}`}>
      {icon}
      {label}
    </div>
  );
}

// ─── Performance Summary Card ───

function PerformanceSummary({ vehicle, mode }: { vehicle: VehicleDesign; mode: CompareMode }) {
  const cfg = MODE_CONFIG[mode];
  const thrust = getTotalThrust(vehicle);
  const badge = getPerformanceBadge(vehicle);
  const isSuperCompact = mode === 'super-compact';

  return (
    <div className={`${cfg.padding} h-full flex flex-col`}>
      <div className={`inline-block self-start px-1.5 py-0.5 rounded text-[10px] font-semibold border mb-1.5 ${badge.classes}`}>
        {badge.label}
      </div>
      <div className="space-y-0.5 flex-1">
        <div className="flex justify-between gap-1">
          <span className={`${cfg.summaryLabel} text-ms-ink-dim`}>Mass</span>
          <span className={`${cfg.summaryValue} font-medium tabular-nums`}>{fmtMass(vehicle.totalMassTons)}</span>
        </div>
        <div className="flex justify-between gap-1">
          <span className={`${cfg.summaryLabel} text-ms-ink-dim`}>ΔV</span>
          <span className={`${cfg.summaryValue} font-medium tabular-nums`}>{fmtDeltaV(vehicle.totalDeltaV)}</span>
        </div>
        <div className="flex justify-between gap-1">
          <span className={`${cfg.summaryLabel} text-ms-ink-dim`}>Thrust</span>
          <span className={`${cfg.summaryValue} font-medium tabular-nums`}>{fmtNum(thrust, 0)} kN</span>
        </div>
        {!isSuperCompact && vehicle.leoPayloadKg !== null && vehicle.leoPayloadKg !== undefined && (
          <div className="flex justify-between gap-1">
            <span className={`${cfg.summaryLabel} text-ms-ink-dim`}>LEO</span>
            <span className={`${cfg.summaryValue} font-medium tabular-nums`}>{fmtPayload(vehicle.leoPayloadKg)}</span>
          </div>
        )}
        <div className={`${cfg.summaryLabel} text-ms-ink-dim mt-0.5`}>
          TL {vehicle.tl} · PMR {vehicle.pmr}
        </div>
      </div>
    </div>
  );
}

// ─── Main Component ───

export default function CompareTable({ vehicles, mode, onRemove }: CompareTableProps) {
  const cfg = MODE_CONFIG[mode];

  // Grid: label col + N vehicle cols
  // Tuned for 1920×1080: no horizontal scroll at full width
  const gridStyle = {
    display: 'grid',
    gridAutoRows: 'minmax(2rem, auto)',
    gridTemplateColumns: mode === 'super-compact' ? '110px repeat(3, 1fr)' : '160px repeat(2, 1fr)',
  } as React.CSSProperties;

  const isSuperCompact = mode === 'super-compact';

  // Compute diffs
  const massDiff = compareValues(vehicles.map((v) => v.totalMassTons), 'lower');
  const costDiff = compareValues(vehicles.map((v) => v.totalCost), 'lower');
  const dvDiff = compareValues(vehicles.map((v) => v.totalDeltaV), 'higher');
  const leoDiff = compareValues(vehicles.map((v) => v.leoPayloadKg), 'higher');
  const gtoDiff = compareValues(vehicles.map((v) => v.gtoPayloadKg), 'higher');
  const tliDiff = compareValues(vehicles.map((v) => v.tliPayloadKg), 'higher');
  const thrustDiff = compareValues(vehicles.map((v) => getTotalThrust(v)), 'higher');

  // Max structures for alignment
  const maxStructures = Math.max(...vehicles.map((v) => v.structures.length));

  return (
    <div className="space-y-4">
      {/* Performance Summary */}
      <div style={gridStyle} className="border border-ms-hair bg-ms-panel rounded-sm overflow-hidden">
        <SectionHeader icon={<Zap className={isSuperCompact ? 'w-3 h-3' : 'w-3.5 h-3.5'} />} label="Performance Summary" mode={mode} />

        <LabelCell mode={mode}>Quick Stats</LabelCell>
        {vehicles.map((v) => (
          <Cell key={v.id} className="border-l border-ms-hair bg-ms-elevated/50">
            <PerformanceSummary vehicle={v} mode={mode} />
          </Cell>
        ))}
      </div>

      {/* Header Row */}
      <div className="sticky top-0 z-10 bg-ms-bg/95 backdrop-blur border-b border-ms-hair">
        <div style={gridStyle}>
          <div className={`${cfg.padding} text-[10px] text-ms-ink-dim uppercase tracking-wider flex items-center`}>
            METRIC
          </div>
          {vehicles.map((v, i) => (
            <Cell key={v.id} className={`${cfg.padding} relative`}>
              <div className="flex items-center justify-between">
                <div>
                  <div className={`${cfg.valueClass} font-display font-bold text-ms-ink`}>{v.name}</div>
                  {!isSuperCompact && (
                    <div className="text-[10px] text-ms-ink-dim mt-0.5">
                      {v.type} · TL {v.tl} · PMR {v.pmr}
                    </div>
                  )}
                </div>
                <button
                  onClick={() => onRemove(i)}
                  className="p-1 text-ms-ink-dim hover:text-ms-warn transition-colors ml-2 shrink-0"
                  title="Remove"
                >
                  <Minus className="w-3.5 h-3.5" />
                </button>
              </div>
            </Cell>
          ))}
        </div>
      </div>

      {/* Mass & Performance */}
      <div style={gridStyle} className="border border-ms-hair bg-ms-elevated">
        <SectionHeader icon={<Weight className={isSuperCompact ? 'w-3 h-3' : 'w-3.5 h-3.5'} />} label="Mass & Performance" mode={mode} />

        <LabelCell mode={mode}>Total Mass</LabelCell>
        {vehicles.map((v, i) => (
          <ValueCell key={v.id} mode={mode} diffClass={getCellClass(massDiff, i, mode)}>
            {fmtMass(v.totalMassTons)}
          </ValueCell>
        ))}

        {!isSuperCompact && (
          <>
            <LabelCell mode={mode}>Total Cost</LabelCell>
            {vehicles.map((v, i) => (
              <ValueCell key={v.id} mode={mode} diffClass={getCellClass(costDiff, i, mode)}>
                {fmtCost(v.totalCost)}
              </ValueCell>
            ))}
          </>
        )}

        <LabelCell mode={mode}>Total ΔV</LabelCell>
        {vehicles.map((v, i) => (
          <ValueCell key={v.id} mode={mode} diffClass={getCellClass(dvDiff, i, mode)}>
            {fmtDeltaV(v.totalDeltaV)}
          </ValueCell>
        ))}
      </div>

      {/* Payload */}
      <div style={gridStyle} className="border border-ms-hair bg-ms-elevated">
        <SectionHeader icon={<Zap className={isSuperCompact ? 'w-3 h-3' : 'w-3.5 h-3.5'} />} label="Payload" mode={mode} />

        <LabelCell mode={mode}>LEO</LabelCell>
        {vehicles.map((v, i) => (
          <ValueCell key={v.id} mode={mode} diffClass={getCellClass(leoDiff, i, mode)}>
            {fmtPayload(v.leoPayloadKg)}
          </ValueCell>
        ))}

        {!isSuperCompact && (
          <>
            <LabelCell mode={mode}>GTO</LabelCell>
            {vehicles.map((v, i) => (
              <ValueCell key={v.id} mode={mode} diffClass={getCellClass(gtoDiff, i, mode)}>
                {fmtPayload(v.gtoPayloadKg)}
              </ValueCell>
            ))}

            <LabelCell mode={mode}>TLI</LabelCell>
            {vehicles.map((v, i) => (
              <ValueCell key={v.id} mode={mode} diffClass={getCellClass(tliDiff, i, mode)}>
                {fmtPayload(v.tliPayloadKg)}
              </ValueCell>
            ))}
          </>
        )}
      </div>

      {/* Propulsion */}
      <div style={gridStyle} className="border border-ms-hair bg-ms-elevated">
        <SectionHeader icon={<Crosshair className={isSuperCompact ? 'w-3 h-3' : 'w-3.5 h-3.5'} />} label="Propulsion" mode={mode} />

        <LabelCell mode={mode}>Total Thrust</LabelCell>
        {vehicles.map((v, i) => (
          <ValueCell key={v.id} mode={mode} diffClass={getCellClass(thrustDiff, i, mode)}>
            {fmtNum(getTotalThrust(v), 0)} kN
          </ValueCell>
        ))}

        {!isSuperCompact && (
          <>
            <LabelCell mode={mode}>Engines</LabelCell>
            {vehicles.map((v) => (
              <ValueCell key={v.id} mode={mode}>
                {getTotalEngines(v)}
              </ValueCell>
            ))}

            <LabelCell mode={mode}>Primary Engine</LabelCell>
            {vehicles.map((v) => {
              const engine = getPrimaryEngine(v);
              return (
                <ValueCell key={v.id} mode={mode}>
                  {engine ? (
                    <div>
                      <div className="font-medium">{engine.name}</div>
                      {mode === 'standard' && (
                        <div className="text-[10px] text-ms-ink-dim mt-0.5">
                          {engine.engineAssembly?.totalThrustKn} kN · {engine.engineAssembly?.vacuumIsp}s
                        </div>
                      )}
                    </div>
                  ) : (
                    '—'
                  )}
                </ValueCell>
              );
            })}
          </>
        )}
      </div>

      {/* Structures */}
      {Array.from({ length: maxStructures }).map((_, si) => (
        <div key={si} style={gridStyle} className="border border-ms-hair bg-ms-elevated">
          <SectionHeader
            icon={<Layers className={isSuperCompact ? 'w-3 h-3' : 'w-3.5 h-3.5'} />}
            label={`Structure ${si + 1}`}
            mode={mode}
          />

          <LabelCell mode={mode}>Name</LabelCell>
          {vehicles.map((v) => {
            const s = v.structures[si];
            return (
              <ValueCell key={v.id} mode={mode}>
                {s ? s.name : '—'}
              </ValueCell>
            );
          })}

          <LabelCell mode={mode}>Total Mass</LabelCell>
          {vehicles.map((v) => {
            const s = v.structures[si];
            return (
              <ValueCell key={v.id} mode={mode}>
                {s ? fmtMass(s.totalMassTons) : '—'}
              </ValueCell>
            );
          })}

          {!isSuperCompact && (
            <>
              <LabelCell mode={mode}>Dry Mass</LabelCell>
              {vehicles.map((v) => {
                const s = v.structures[si];
                return (
                  <ValueCell key={v.id} mode={mode}>
                    {s ? fmtMass(s.massTons) : '—'}
                  </ValueCell>
                );
              })}

              <LabelCell mode={mode}>Attached Mass</LabelCell>
              {vehicles.map((v) => {
                const s = v.structures[si];
                return (
                  <ValueCell key={v.id} mode={mode}>
                    {s ? fmtMass(s.attachedMassTons) : '—'}
                  </ValueCell>
                );
              })}

              <LabelCell mode={mode}>Capacity</LabelCell>
              {vehicles.map((v) => {
                const s = v.structures[si];
                return (
                  <ValueCell key={v.id} mode={mode}>
                    {s ? (
                      <span className={s.overCapacity ? 'text-ms-warn' : ''}>
                        {fmtNum(s.capacityUsedPercent, 0)}%
                      </span>
                    ) : '—'}
                  </ValueCell>
                );
              })}
            </>
          )}

          <LabelCell mode={mode}>Thrust</LabelCell>
          {vehicles.map((v) => {
            const s = v.structures[si];
            return (
              <ValueCell key={v.id} mode={mode}>
                {s ? fmtNum(getStructureThrust(s), 0) + ' kN' : '—'}
              </ValueCell>
            );
          })}

          {!isSuperCompact && (
            <>
              <LabelCell mode={mode}>Vac Isp</LabelCell>
              {vehicles.map((v) => {
                const s = v.structures[si];
                const isp = s ? getStructureIsp(s) : null;
                return (
                  <ValueCell key={v.id} mode={mode}>
                    {isp ? fmtNum(isp, 0) + ' s' : '—'}
                  </ValueCell>
                );
              })}

              <LabelCell mode={mode}>Components</LabelCell>
              {vehicles.map((v) => {
                const s = v.structures[si];
                return (
                  <ValueCell key={v.id} mode={mode}>
                    {s ? (
                      <div className="text-[10px] text-ms-ink-soft">
                        {s.components.filter((c) => c.type === 'engine').length} engines ·{' '}
                        {s.components.filter((c) => c.type === 'fuel_tank').length} tanks ·{' '}
                        {s.components.filter((c) => c.type === 'crew_module').length} crew
                      </div>
                    ) : '—'}
                  </ValueCell>
                );
              })}
            </>
          )}
        </div>
      ))}

      {/* Crew & Systems (standard only) */}
      {!isSuperCompact && (
        <div style={gridStyle} className="border border-ms-hair bg-ms-elevated">
          <SectionHeader icon={<Users className="w-3.5 h-3.5" />} label="Crew & Systems" mode={mode} />

          <LabelCell mode={mode}>Total Crew</LabelCell>
          {vehicles.map((v) => (
            <ValueCell key={v.id} mode={mode}>
              {getTotalCrew(v)} seats
            </ValueCell>
          ))}

          <LabelCell mode={mode}>Computing</LabelCell>
          {vehicles.map((v) => (
            <ValueCell key={v.id} mode={mode}>
              {fmtNum(getTotalComputing(v), 0)} MIPS
            </ValueCell>
          ))}
        </div>
      )}

      {/* Notes (standard only) */}
      {mode === 'standard' && (
        <div style={gridStyle} className="border border-ms-hair bg-ms-elevated">
          <SectionHeader icon={<Rocket className="w-3.5 h-3.5" />} label="Notes" mode={mode} />

          <LabelCell mode={mode}>Description</LabelCell>
          {vehicles.map((v) => (
            <ValueCell key={v.id} mode={mode}>
              {v.notes ? (
                <p className="text-[10px] text-ms-ink-soft leading-relaxed">{v.notes}</p>
              ) : (
                <span className="text-ms-ink-dim">—</span>
              )}
            </ValueCell>
          ))}
        </div>
      )}
    </div>
  );
}
