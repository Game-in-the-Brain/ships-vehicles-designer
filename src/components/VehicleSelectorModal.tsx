import { useState, useEffect } from 'react';
import type { VehicleDesign } from '../types';
import { Search, X, Rocket, BookOpen, Wrench, Tag } from 'lucide-react';

interface VehicleSelectorModalProps {
  onSelect: (vehicle: VehicleDesign) => void;
  onClose: () => void;
  currentCount: number;
  currentVehicle: VehicleDesign | null;
}

interface LibraryEntry {
  id: string;
  name: string;
  type: string;
  tl: number;
  description: string;
  tags?: string[];
}

export default function VehicleSelectorModal({ onSelect, onClose, currentCount, currentVehicle }: VehicleSelectorModalProps) {
  const [search, setSearch] = useState('');
  const [tagFilter, setTagFilter] = useState<string>('all');
  const [library, setLibrary] = useState<LibraryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [selectedId, setSelectedId] = useState<string | null>(null);

  useEffect(() => {
    const loadLibrary = async () => {
      try {
        const url = new URL(document.baseURI);
        if (!url.pathname.endsWith('/')) url.pathname += '/';
        const res = await fetch(`${url.pathname}data/library/index.json`);
        if (!res.ok) throw new Error('Failed to load library index');
        const data = await res.json();
        setLibrary(data.vehicles || []);
      } catch (err) {
        console.error('Failed to load library:', err);
      } finally {
        setLoading(false);
      }
    };
    loadLibrary();
  }, []);

  const loadVehicle = async (id: string) => {
    setSelectedId(id);
    try {
      const url = new URL(document.baseURI);
      if (!url.pathname.endsWith('/')) url.pathname += '/';
      const res = await fetch(`${url.pathname}data/library/${id}.json`);
      if (!res.ok) throw new Error(`Failed to load ${id}`);
      const data = await res.json();
      onSelect(data.vehicle);
      onClose();
    } catch (err) {
      console.error('Failed to load vehicle:', err);
      setSelectedId(null);
    }
  };

  const allTags = Array.from(new Set(library.flatMap((e) => e.tags || []))).sort();
  const liftTags = allTags.filter((t) => t.includes('Lift'));

  const filtered = library.filter((v) => {
    const searchMatch = v.name.toLowerCase().includes(search.toLowerCase()) ||
      v.type.toLowerCase().includes(search.toLowerCase()) ||
      (v.tags || []).some((t) => t.toLowerCase().includes(search.toLowerCase()));
    const tagMatch = tagFilter === 'all' || (v.tags || []).includes(tagFilter);
    return searchMatch && tagMatch;
  });

  const canAddCurrent = currentVehicle && currentCount < 3;

  return (
    <div
      className="fixed inset-0 z-[100] flex items-center justify-center p-4"
      style={{ background: 'rgba(0,0,0,0.7)', backdropFilter: 'blur(4px)' }}
      onClick={onClose}
    >
      <div
        onClick={(e) => e.stopPropagation()}
        className="w-full max-w-lg bg-ms-elevated border border-ms-hair max-h-[80vh] flex flex-col"
      >
        {/* Header */}
        <div className="p-4 border-b border-ms-hair flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Rocket className="w-5 h-5 text-ms-cyan" />
            <h2 className="text-sm font-display font-bold text-ms-ink">Load Vehicle</h2>
            <span className="text-[10px] text-ms-ink-dim font-mono">
              {currentCount}/3 loaded
            </span>
          </div>
          <button onClick={onClose} className="p-1 text-ms-ink-dim hover:text-ms-warn transition-colors">
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Search & Tag Filter */}
        <div className="p-4 border-b border-ms-hair space-y-2">
          <div className="relative">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-ms-ink-dim" />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Search library..."
              className="w-full pl-9 pr-3 py-2 bg-ms-bg border border-ms-hair text-ms-ink text-sm font-mono placeholder:text-ms-ink-dim focus:border-ms-cyan focus:outline-none"
            />
          </div>
          <select
            value={tagFilter}
            onChange={(e) => setTagFilter(e.target.value)}
            className="w-full text-xs py-1.5 px-2 bg-ms-bg border border-ms-hair text-ms-ink font-mono"
          >
            <option value="all">All Lift Classes</option>
            {liftTags.map((tag) => (
              <option key={tag} value={tag}>{tag}</option>
            ))}
          </select>
        </div>

        {/* Current Design */}
        {canAddCurrent && (
          <div className="p-4 border-b border-ms-hair">
            <div className="text-[10px] text-ms-ink-dim uppercase tracking-wider mb-2 flex items-center gap-1">
              <Wrench className="w-3 h-3" /> Current Design
            </div>
            <button
              onClick={() => {
                onSelect(currentVehicle);
                onClose();
              }}
              className="w-full p-3 bg-ms-cyan/10 border border-ms-cyan/30 text-left hover:bg-ms-cyan/20 transition-colors"
            >
              <div className="text-sm font-semibold text-ms-cyan">{currentVehicle.name}</div>
              <div className="text-[10px] text-ms-ink-soft mt-0.5">
                {currentVehicle.type} · TL {currentVehicle.tl} · {currentVehicle.structures.length} structures
              </div>
            </button>
          </div>
        )}

        {/* Library List */}
        <div className="flex-1 overflow-y-auto p-2">
          {loading ? (
            <div className="text-center py-8 text-ms-ink-dim text-sm">Loading library...</div>
          ) : filtered.length === 0 ? (
            <div className="text-center py-8 text-ms-ink-dim text-sm">No vehicles found.</div>
          ) : (
            <div className="space-y-1">
              {filtered.map((entry) => (
                <button
                  key={entry.id}
                  onClick={() => loadVehicle(entry.id)}
                  disabled={selectedId !== null}
                  className={`w-full p-3 text-left border transition-colors ${
                    selectedId === entry.id
                      ? 'bg-ms-cyan/20 border-ms-cyan'
                      : 'bg-ms-bg border-ms-hair hover:border-ms-cyan'
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="text-sm font-semibold text-ms-ink">{entry.name}</div>
                      <div className="text-[10px] text-ms-ink-soft mt-0.5">
                        {entry.type} · TL {entry.tl}
                      </div>
                    </div>
                    {selectedId === entry.id && (
                      <div className="text-[10px] text-ms-cyan animate-pulse">Loading...</div>
                    )}
                  </div>
                  <div className="flex flex-wrap gap-1 mt-1">
                    {(entry.tags || []).slice(0, 2).map((tag) => (
                      <span key={tag} className={`text-[9px] px-1.5 py-0.5 font-mono border ${tag.includes('Heavy') ? 'bg-ms-warn/10 border-ms-warn/30 text-ms-warn' : 'bg-ms-bg border-ms-hair text-ms-ink-dim'}`}>
                        {tag}
                      </span>
                    ))}
                  </div>
                  {entry.description && (
                    <p className="text-[10px] text-ms-ink-dim mt-1 line-clamp-1">{entry.description}</p>
                  )}
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="p-4 border-t border-ms-hair flex justify-between items-center">
          <span className="text-[10px] text-ms-ink-dim">
            {filtered.length} vehicles in library
          </span>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-ms-elevated border border-ms-hair text-ms-ink-soft text-xs font-mono hover:border-ms-cyan transition-colors"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}
