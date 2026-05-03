import { useEffect, useState } from 'react';
import { useVehicleStore } from '../store/vehicleStore';
import { fmtNum, fmtDeltaV, fmtMass } from '../utils/formatters';
import type { VehicleDesign } from '../types';
import MsPanel from './primitives/MsPanel';
import MsButton from './primitives/MsButton';
import MsNum from './primitives/MsNum';
import ChemistryBadge from './ChemistryBadge';
import { BookOpen, Rocket, Calendar, Weight, ArrowRight, Globe, Scale, CheckSquare, Square, Tag, Filter } from 'lucide-react';

interface LibraryEntry {
  id: string; name: string; type: string; tl: number; pmr: number;
  classification: string; kind: string; leoPayloadKg: number | null;
  tliPayloadKg: number | null; gtoPayloadKg: number | null;
  totalDeltaV: number | null; totalMassTons: number; status: string;
  firstFlight: string; origin: string; description: string;
  thumbnail: string; source: 'msds' | 'simplerockets'; tags?: string[];
}

export default function LibraryScreen() {
  const { loadLibraryVehicle, createVehicle, setCurrentVehicle, setScreen, setCompareVehicles } = useVehicleStore();
  const [entries, setEntries] = useState<LibraryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedEntry, setSelectedEntry] = useState<LibraryEntry | null>(null);
  const [filter, setFilter] = useState<'all' | 'msds' | 'simplerockets'>('all');
  const [tagFilter, setTagFilter] = useState<string>('all');
  const [compareMode, setCompareMode] = useState(false);
  const [compareSelection, setCompareSelection] = useState<Set<string>>(new Set());

  useEffect(() => {
    const base = (import.meta as any).env?.BASE_URL || '/';
    fetch(`${base}data/library/index.json`)
      .then(r => r.json())
      .then((data) => {
        const entries: LibraryEntry[] = (data.vehicles || []).map((v: any) => ({
          ...v,
          source: v.status === 'converted' ? 'simplerockets' : 'msds' as const,
          thumbnail: v.thumbnail || '🚀',
        }));
        setEntries(entries);
        setLoading(false);
      })
      .catch((err) => { console.error('Failed to load library:', err); setLoading(false); });
  }, []);

  const allTags = Array.from(new Set(entries.flatMap((e) => e.tags || []))).sort();
  const liftTags = allTags.filter((t) => t.includes('Lift'));

  const filteredEntries = entries.filter((e) => {
    const sourceMatch = filter === 'all' || e.source === filter;
    const tagMatch = tagFilter === 'all' || (e.tags || []).includes(tagFilter);
    return sourceMatch && tagMatch;
  });

  const getOriginColor = (origin: string) => {
    const map: Record<string, string> = { USA: 'text-ms-cyan', USSR: 'text-ms-warn', EUR: 'text-ms-good', CHN: 'text-ms-amber', JPN: 'text-ms-ink-soft', IND: 'text-ms-amber', MLT: 'text-ms-ink-dim' };
    return map[origin] || 'text-ms-ink-soft';
  };

  const toggleCompareSelection = (entry: LibraryEntry) => {
    setCompareSelection((prev) => {
      const next = new Set(prev);
      if (next.has(entry.id)) next.delete(entry.id);
      else if (next.size < 3) next.add(entry.id);
      return next;
    });
  };

  const handleCompare = async () => {
    const selected = entries.filter((e) => compareSelection.has(e.id));
    const vehicles: VehicleDesign[] = [];
    for (const entry of selected) {
      try {
        const base = (import.meta as any).env?.BASE_URL || '/';
        const res = await fetch(`${base}data/library/${entry.id}.json`);
        const data = await res.json();
        const vehicle = data.vehicle || data;
        vehicles.push(vehicle);
      } catch (err) { console.error('Failed to load vehicle for compare:', err); }
    }
    setCompareVehicles(vehicles);
    setScreen('compare');
    setCompareMode(false);
    setCompareSelection(new Set());
  };

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-ms-ink-dim font-mono">
        <BookOpen className="w-8 h-8 mr-3 animate-pulse" />Loading vehicle library...
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ms-bg text-ms-ink font-mono">
      <header className="border-b border-ms-hair bg-ms-elevated px-4 py-3 flex items-center justify-between sticky top-0 z-10">
        <div className="flex items-center gap-3">
          <BookOpen className="w-5 h-5 text-ms-cyan" />
          <h1 className="text-sm font-display font-semibold tracking-wide">Vehicle Library</h1>
          <span className="text-xs text-ms-ink-dim">{filteredEntries.length} vehicles</span>
        </div>
        <div className="flex items-center gap-2">
          <select value={tagFilter} onChange={(e) => setTagFilter(e.target.value)} className="text-xs py-1 px-2 bg-ms-input border border-ms-hair">
            <option value="all">All Lift Classes</option>
            {liftTags.map((tag) => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
          <select value={filter} onChange={(e) => setFilter(e.target.value as any)} className="text-xs py-1 px-2 bg-ms-input border border-ms-hair">
            <option value="all">All Sources</option><option value="msds">MSDS Calibrated</option><option value="simplerockets">SimpleRockets</option>
          </select>
          <button onClick={() => { setCompareMode(!compareMode); setCompareSelection(new Set()); }} className={`flex items-center gap-1.5 px-2.5 py-1.5 text-xs font-mono border transition-colors ${compareMode ? 'bg-ms-cyan/10 border-ms-cyan text-ms-cyan' : 'bg-ms-input border-ms-hair text-ms-ink-dim hover:text-ms-ink'}`}>
            <Scale className="w-3.5 h-3.5" />{compareMode ? 'Done' : 'Compare'}
          </button>
          <MsButton variant="secondary" size="sm" onClick={() => createVehicle('Untitled Vehicle')}>
            <Rocket className="w-3 h-3" /> New
          </MsButton>
        </div>
      </header>

      <div className="max-w-6xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredEntries.map((entry) => {
              const isCompareSelected = compareSelection.has(entry.id);
              const isDetailSelected = selectedEntry?.id === entry.id;
              return (
                <div key={entry.id} onClick={() => { if (compareMode) toggleCompareSelection(entry); else setSelectedEntry(entry); }} className={`cursor-pointer transition-colors ${!compareMode && isDetailSelected ? 'ring-1 ring-ms-cyan' : ''} ${compareMode && isCompareSelected ? 'ring-1 ring-ms-good' : ''}`}>
                  <MsPanel title={entry.name} keyword={entry.classification}>
                    <div className="flex items-start justify-between mb-3">
                      <div className="flex items-center gap-2">
                        {compareMode && <div className={isCompareSelected ? 'text-ms-good' : 'text-ms-ink-dim'}>{isCompareSelected ? <CheckSquare className="w-5 h-5" /> : <Square className="w-5 h-5" />}</div>}
                        <div className="text-4xl">{entry.thumbnail}</div>
                      </div>
                      <div className="flex flex-col items-end gap-1">
                        <div className={`text-xs font-mono font-semibold ${getOriginColor(entry.origin)}`}>{entry.origin}</div>
                        {entry.source === 'simplerockets' && <span className="text-[10px] bg-purple-500/20 text-purple-400 px-1.5 py-0.5 font-mono">SR2</span>}
                      </div>
                    </div>
                    <div className="flex items-center gap-2 mb-2">
                      <ChemistryBadge chemistry={entry.classification.startsWith('K') ? 'kerolox' : entry.classification.startsWith('H') ? 'hydrolox' : entry.classification.startsWith('M') ? 'methalox' : entry.classification.startsWith('HYG') ? 'hypergolic' : entry.classification.startsWith('S') ? 'apcp' : 'unknown'} />
                      <span className="text-xs text-ms-ink-dim">{entry.classification.split('/')[0]}</span>
                    </div>
                    <div className="flex flex-wrap gap-1 mb-2">
                      {(entry.tags || []).slice(0, 3).map((tag) => (
                        <span key={tag} className={`text-[9px] px-1.5 py-0.5 font-mono border ${tag.includes('Heavy') ? 'bg-ms-warn/10 border-ms-warn/30 text-ms-warn' : tag.includes('Space Age') || tag.includes('Era') ? 'bg-ms-cyan/10 border-ms-cyan/30 text-ms-cyan' : 'bg-ms-bg border-ms-hair text-ms-ink-dim'}`}>
                          {tag}
                        </span>
                      ))}
                    </div>
                    <div className="grid grid-cols-2 gap-2 mb-3">
                      <MsNum label="TL" value={entry.tl} size="sm" />
                      <MsNum label="PMR" value={entry.pmr} size="sm" variant="amber" />
                    </div>
                    <div className="text-xs text-ms-ink-soft mb-3 line-clamp-2">{entry.description}</div>
                    <div className="flex items-center justify-between text-xs text-ms-ink-dim">
                      <span className="flex items-center gap-1"><Calendar className="w-3 h-3" /> {entry.firstFlight.slice(0, 4)}</span>
                      <span className="flex items-center gap-1"><Weight className="w-3 h-3" /> {fmtMass(entry.totalMassTons)}</span>
                    </div>
                  </MsPanel>
                </div>
              );
            })}
          </div>
        </div>

        {compareMode && (
          <div className="fixed bottom-16 lg:bottom-4 left-0 right-0 z-40 px-4">
            <div className="max-w-6xl mx-auto bg-ms-elevated border border-ms-hair p-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <Scale className="w-4 h-4 text-ms-cyan" />
                <span className="text-xs font-mono"><span className="text-ms-cyan font-semibold">{compareSelection.size}</span><span className="text-ms-ink-dim"> / 3 selected</span></span>
                {compareSelection.size > 0 && <button onClick={() => setCompareSelection(new Set())} className="text-xs font-mono text-ms-warn hover:underline">Clear</button>}
              </div>
              <button onClick={handleCompare} disabled={compareSelection.size < 2} className={`px-4 py-2 text-xs font-mono font-semibold transition-colors ${compareSelection.size >= 2 ? 'bg-ms-cyan text-ms-bg hover:bg-ms-cyan-dim' : 'bg-ms-hair text-ms-ink-dim cursor-not-allowed'}`}>Compare Selected</button>
            </div>
          </div>
        )}

        <div className="space-y-4">
          {selectedEntry ? (
            <MsPanel sheetNo="DETAIL" title={selectedEntry.name} keyword={selectedEntry.kind}>
              <div className="space-y-4">
                <div className="text-center text-6xl py-4">{selectedEntry.thumbnail}</div>
                <div className="grid grid-cols-2 gap-3">
                  <MsNum label="Total Mass" value={`${selectedEntry.totalMassTons.toFixed(0)}`} unit="t" size="sm" />
                  <MsNum label="Total ΔV" value={selectedEntry.totalDeltaV ? `${(selectedEntry.totalDeltaV / 1000).toFixed(2)}` : '—'} unit="km/s" size="sm" />
                </div>
                <div className="grid grid-cols-2 gap-3">
                  <MsNum label="LEO Payload" value={selectedEntry.leoPayloadKg ? `${(selectedEntry.leoPayloadKg / 1000).toFixed(1)}` : '—'} unit="t" size="sm" variant="good" />
                  <MsNum label="GTO Payload" value={selectedEntry.gtoPayloadKg ? `${(selectedEntry.gtoPayloadKg / 1000).toFixed(1)}` : '—'} unit="t" size="sm" variant="cyan" />
                </div>
                {selectedEntry.tliPayloadKg && <MsNum label="TLI Payload" value={`${(selectedEntry.tliPayloadKg / 1000).toFixed(1)}`} unit="t" size="sm" variant="amber" />}
                <div className="border-t border-ms-hair pt-3 space-y-2 text-xs">
                  <div className="flex justify-between"><span className="text-ms-ink-dim">Classification</span><span className="font-mono text-ms-cyan">{selectedEntry.classification}</span></div>
                  <div className="flex justify-between"><span className="text-ms-ink-dim">Origin</span><span className={getOriginColor(selectedEntry.origin)}>{selectedEntry.origin}</span></div>
                  <div className="flex justify-between"><span className="text-ms-ink-dim">First Flight</span><span>{selectedEntry.firstFlight}</span></div>
                  <div className="flex justify-between"><span className="text-ms-ink-dim">Status</span><span className="capitalize">{selectedEntry.status}</span></div>
                  <div className="flex justify-between"><span className="text-ms-ink-dim">Source</span><span className={selectedEntry.source === 'msds' ? 'text-ms-good' : 'text-purple-400'}>{selectedEntry.source === 'msds' ? 'MSDS Calibrated' : 'SimpleRockets'}</span></div>
                </div>
                <div className="text-xs text-ms-ink-soft pt-2 border-t border-ms-hair">{selectedEntry.description}</div>
                <MsButton variant="primary" size="md" className="w-full justify-center" onClick={() => loadLibraryVehicle(selectedEntry.id)}>
                  <ArrowRight className="w-4 h-4" /> Load into Designer
                </MsButton>
              </div>
            </MsPanel>
          ) : (
            <MsPanel title="Select a Vehicle" keyword="INFO">
              <div className="text-center py-8 text-ms-ink-dim">
                <Globe className="w-12 h-12 mx-auto mb-3 opacity-30" />
                <p className="text-sm">Click a vehicle card to view details.</p>
                <p className="text-xs mt-2 text-ms-ink-dim">Vehicles marked SR2 are converted from SimpleRockets community builds.<br />MSDS calibrated vehicles use real-world physics data.</p>
              </div>
            </MsPanel>
          )}
        </div>
      </div>
    </div>
  );
}
