import { useState, useRef } from 'react';
import { useVehicleStore } from '../store/vehicleStore';
import { downloadJson, importJsonFile, generateSnapshotName } from '../utils/exportImport';
import { Database, Download, Upload, RotateCcw, FileJson, ChevronDown, ChevronRight } from 'lucide-react';

const TABLE_CONFIG = [
  { key: 'powerPlants', label: 'Power Plants', desc: 'Engines & propulsion systems' },
  { key: 'drives', label: 'Drives', desc: 'Propulsion drives' },
  { key: 'avionics', label: 'Avionics', desc: 'Guidance & control systems' },
  { key: 'computers', label: 'Computers', desc: 'Onboard computing' },
  { key: 'crewModules', label: 'Crew Modules', desc: 'Capsules & crew compartments' },
  { key: 'bridgeTypes', label: 'Bridge Types', desc: 'Command stations' },
  { key: 'sensors', label: 'Sensors', desc: 'Detection & measurement' },
] as const;

export default function TablesScreen() {
  const {
    powerPlants, drives, avionics, computers, crewModules, bridgeTypes, sensors,
    exportTables, importTables
  } = useVehicleStore();

  const [expanded, setExpanded] = useState<Set<string>>(new Set());
  const [saveMsg, setSaveMsg] = useState<string | null>(null);
  const [importErr, setImportErr] = useState<string | null>(null);
  const fileRef = useRef<HTMLInputElement>(null);

  const tables: Record<string, any[]> = {
    powerPlants, drives, avionics, computers, crewModules, bridgeTypes, sensors,
  };

  const toggle = (key: string) => {
    setExpanded(prev => {
      const next = new Set(prev);
      if (next.has(key)) next.delete(key); else next.add(key);
      return next;
    });
  };

  const handleExport = () => {
    const data = exportTables();
    downloadJson(data, `mneme-tables-${generateSnapshotName()}.json`);
    setSaveMsg('Tables exported');
    setTimeout(() => setSaveMsg(null), 2000);
  };

  const handleImport = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;
    try {
      const data = await importJsonFile(file) as any;
      importTables(data);
      setSaveMsg('Tables imported');
      setImportErr(null);
    } catch (err) {
      setImportErr((err as Error).message);
    }
    if (fileRef.current) fileRef.current.value = '';
  };

  return (
    <div className="min-h-screen bg-ms-bg text-ms-ink font-mono p-4 lg:p-6">
      <div className="max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <h1 className="text-2xl font-display font-bold tracking-tight text-ms-cyan">COMPONENT TABLES</h1>
            <p className="text-sm text-ms-ink-dim mt-1">Browse, export, and import component catalogs. All data loads from JSON.</p>
          </div>
          <div className="flex items-center gap-2">
            {saveMsg && (
              <span className="text-xs px-3 py-1 bg-ms-good/10 text-ms-good border border-ms-good/30">{saveMsg}</span>
            )}
            <button onClick={handleExport} className="flex items-center gap-2 px-3 py-2 bg-ms-elevated border border-ms-hair text-ms-ink-soft text-xs hover:border-ms-cyan hover:text-ms-cyan transition-colors">
              <Download className="w-3.5 h-3.5" /> Export All
            </button>
            <button onClick={() => fileRef.current?.click()} className="flex items-center gap-2 px-3 py-2 bg-ms-elevated border border-ms-hair text-ms-ink-soft text-xs hover:border-ms-cyan hover:text-ms-cyan transition-colors">
              <Upload className="w-3.5 h-3.5" /> Import
            </button>
            <input ref={fileRef} type="file" accept=".json" className="hidden" onChange={handleImport} />
          </div>
        </div>

        {importErr && (
          <div className="mb-4 p-3 text-xs bg-ms-warn/10 text-ms-warn border border-ms-warn/30">{importErr}</div>
        )}

        {/* Table list */}
        <div className="space-y-2">
          {TABLE_CONFIG.map(({ key, label, desc }) => {
            const rows = tables[key] || [];
            const isOpen = expanded.has(key);
            return (
              <div key={key} className="border border-ms-hair bg-ms-elevated">
                <button
                  onClick={() => toggle(key)}
                  className="w-full flex items-center justify-between px-4 py-3 hover:bg-ms-panel transition-colors"
                >
                  <div className="flex items-center gap-3">
                    {isOpen ? <ChevronDown className="w-4 h-4 text-ms-cyan" /> : <ChevronRight className="w-4 h-4 text-ms-ink-dim" />}
                    <Database className="w-4 h-4 text-ms-cyan" />
                    <span className="font-display font-semibold text-sm">{label}</span>
                    <span className="text-xs text-ms-ink-dim">{desc}</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="text-xs text-ms-ink-dim">{rows.length} entries</span>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        downloadJson(JSON.stringify(rows, null, 2), `mneme-${key}-${generateSnapshotName()}.json`);
                      }}
                      className="p-1.5 text-ms-ink-dim hover:text-ms-cyan hover:bg-ms-cyan/10 transition-colors"
                      title="Export this table"
                    >
                      <FileJson className="w-3.5 h-3.5" />
                    </button>
                  </div>
                </button>

                {isOpen && (
                  <div className="border-t border-ms-hair overflow-x-auto">
                    {rows.length === 0 ? (
                      <div className="p-4 text-xs text-ms-ink-dim">No entries loaded.</div>
                    ) : (
                      <table className="w-full text-xs">
                        <thead>
                          <tr className="border-b border-ms-hair bg-ms-panel">
                            {Object.keys(rows[0]).map(h => (
                              <th key={h} className="text-left px-3 py-2 text-ms-ink-soft font-mono uppercase tracking-wider">{h}</th>
                            ))}
                          </tr>
                        </thead>
                        <tbody>
                          {rows.slice(0, 20).map((row, i) => (
                            <tr key={i} className="border-b border-ms-hair/50 hover:bg-ms-panel/50">
                              {Object.values(row).map((v: any, j) => (
                                <td key={j} className="px-3 py-2 text-ms-ink whitespace-nowrap max-w-[200px] truncate">
                                  {Array.isArray(v) ? v.join(', ') : String(v ?? '—')}
                                </td>
                              ))}
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    )}
                    {rows.length > 20 && (
                      <div className="p-2 text-xs text-ms-ink-dim text-center">... {rows.length - 20} more entries</div>
                    )}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
