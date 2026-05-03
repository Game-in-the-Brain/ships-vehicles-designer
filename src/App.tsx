import { useEffect } from 'react';
import { useVehicleStore } from './store/vehicleStore';
import { VERSION } from './version';
import StructureBuilder from './components/StructureBuilder';
import EngineeringPage from './components/EngineeringPage';
import LibraryScreen from './components/LibraryScreen';
import CompareScreen from './components/CompareScreen';
import TablesScreen from './components/TablesScreen';
import { Rocket, Wrench, BookOpen, Settings, Scale, Database } from 'lucide-react';

function App() {
  const { loaded, loadTables, loadError, currentVehicle, createVehicle, currentScreen, setScreen } = useVehicleStore();

  useEffect(() => { if (!loaded) loadTables(); }, [loaded, loadTables]);

  if (!loaded) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ms-bg text-ms-ink font-mono">
        <div className="text-center">
          <Rocket className="w-12 h-12 mx-auto mb-4 text-ms-cyan animate-pulse" />
          <p className="text-ms-ink-soft">Loading component tables...</p>
        </div>
      </div>
    );
  }

  if (loadError) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ms-bg text-ms-ink font-mono px-6">
        <div className="text-center max-w-lg">
          <Rocket className="w-12 h-12 mx-auto mb-4 text-ms-warn" />
          <h1 className="text-xl font-display font-bold mb-2 text-ms-warn">Failed to Load Data</h1>
          <p className="text-ms-ink-soft mb-6 text-sm">{loadError}</p>
          <button onClick={() => { useVehicleStore.setState({ loaded: false, loadError: null }); loadTables(); }} className="px-6 py-3 bg-ms-cyan text-ms-bg font-mono font-semibold text-sm hover:bg-ms-cyan-dim transition-colors">
            RETRY
          </button>
        </div>
      </div>
    );
  }

  if (!currentVehicle) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ms-bg text-ms-ink">
        <div className="text-center max-w-md px-6">
          <Rocket className="w-16 h-16 mx-auto mb-6 text-ms-cyan" />
          <h1 className="text-3xl font-display font-bold mb-2 tracking-tight">Mneme Vehicle Designer</h1>
          <p className="text-ms-ink-soft mb-2 font-mono text-sm">
            Structure-based mass design system.<br />Build vehicles from components. Physics is non-negotiable.
          </p>
          <p className="text-xs text-ms-ink-dim mb-8 font-mono">v{VERSION}</p>
          <button onClick={() => createVehicle('Untitled Vehicle')} className="px-6 py-3 bg-ms-cyan text-ms-bg font-mono font-semibold text-sm hover:bg-ms-cyan-dim transition-colors">
            CREATE NEW VEHICLE
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ms-bg">
      {/* Top header bar with version */}
      <header className="hidden lg:flex fixed top-0 left-16 right-0 h-10 bg-ms-elevated border-b border-ms-hair z-40 items-center justify-between px-4">
        <div className="flex items-center gap-2">
          <Rocket className="w-4 h-4 text-ms-cyan" />
          <span className="text-xs font-display font-semibold text-ms-ink tracking-wide">MNEME VEHICLE DESIGNER</span>
          <span className="text-[10px] text-ms-ink-dim font-mono">v{VERSION}</span>
        </div>
        <div className="text-[10px] text-ms-ink-dim font-mono">
          {currentVehicle.name} · {currentVehicle.structures.length} structures · {currentVehicle.totalMassTons.toLocaleString('en-US', {minimumFractionDigits: 1})} t
        </div>
      </header>

      <nav className="fixed bottom-0 left-0 right-0 bg-ms-elevated border-t border-ms-hair z-50 lg:hidden">
        <div className="flex justify-around">
          {[
            { s: 'design', i: Rocket, l: 'Design' },
            { s: 'tables', i: Database, l: 'Tables' },
            { s: 'library', i: BookOpen, l: 'Library' },
            { s: 'compare', i: Scale, l: 'Compare' },
            { s: 'settings', i: Settings, l: 'Settings' },
          ].map(({ s, i: Icon, l }) => (
            <button key={s} onClick={() => setScreen(s as any)} className={`flex flex-col items-center py-2 px-4 text-xs ${currentScreen === s ? 'text-ms-cyan' : 'text-ms-ink-dim'}`}>
              <Icon className="w-5 h-5 mb-1" />{l}
            </button>
          ))}
        </div>
      </nav>

      <nav className="hidden lg:flex fixed left-0 top-0 bottom-0 w-16 bg-ms-elevated border-r border-ms-hair z-50 flex-col items-center py-4 gap-6">
        <Rocket className="w-6 h-6 text-ms-cyan mb-4" />
        {[
          { s: 'design', i: Rocket, t: 'Design' },
          { s: 'tables', i: Database, t: 'Tables' },
          { s: 'library', i: BookOpen, t: 'Library' },
          { s: 'compare', i: Scale, t: 'Compare' },
          { s: 'settings', i: Settings, t: 'Settings' },
        ].map(({ s, i: Icon, t }) => (
          <button key={s} onClick={() => setScreen(s as any)} className={`p-2 rounded ${currentScreen === s ? 'text-ms-cyan bg-ms-cyan/10' : 'text-ms-ink-dim hover:text-ms-ink'}`} title={t}>
            <Icon className="w-5 h-5" />
          </button>
        ))}
      </nav>

      <div className="lg:ml-16 lg:pt-10 pb-16 lg:pb-0">
        {currentScreen === 'design' && <StructureBuilder />}
        {currentScreen === 'engineering' && <EngineeringPage />}
        {currentScreen === 'library' && <LibraryScreen />}
        {currentScreen === 'compare' && <CompareScreen />}
        {currentScreen === 'tables' && <TablesScreen />}
        {currentScreen === 'settings' && (
          <div className="min-h-screen flex items-center justify-center text-ms-ink-dim font-mono">
            <div className="text-center">
              <p className="mb-2">Settings — coming in M5</p>
              <p className="text-xs text-ms-ink-dim/60">v{VERSION}</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
