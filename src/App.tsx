import { useEffect } from 'react';
import { useVehicleStore } from './store/vehicleStore';
import StructureBuilder from './components/StructureBuilder';
import EngineeringPage from './components/EngineeringPage';
import LibraryScreen from './components/LibraryScreen';
import CompareScreen from './components/CompareScreen';
import { Rocket, Wrench, BookOpen, Settings, Scale } from 'lucide-react';

function App() {
  const { loaded, loadTables, currentVehicle, createVehicle, currentScreen, setScreen } = useVehicleStore();

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

  if (!currentVehicle) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-ms-bg text-ms-ink">
        <div className="text-center max-w-md px-6">
          <Rocket className="w-16 h-16 mx-auto mb-6 text-ms-cyan" />
          <h1 className="text-3xl font-display font-bold mb-2 tracking-tight">Mneme Vehicle Designer</h1>
          <p className="text-ms-ink-soft mb-8 font-mono text-sm">
            Structure-based mass design system.<br />Build vehicles from components. Physics is non-negotiable.
          </p>
          <button onClick={() => createVehicle('Untitled Vehicle')} className="px-6 py-3 bg-ms-cyan text-ms-bg font-mono font-semibold text-sm hover:bg-ms-cyan-dim transition-colors">
            CREATE NEW VEHICLE
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-ms-bg">
      <nav className="fixed bottom-0 left-0 right-0 bg-ms-elevated border-t border-ms-hair z-50 lg:hidden">
        <div className="flex justify-around">
          {[
            { s: 'design', i: Rocket, l: 'Design' },
            { s: 'engineering', i: Wrench, l: 'Eng' },
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
          { s: 'engineering', i: Wrench, t: 'Engineering' },
          { s: 'library', i: BookOpen, t: 'Library' },
          { s: 'compare', i: Scale, t: 'Compare' },
          { s: 'settings', i: Settings, t: 'Settings' },
        ].map(({ s, i: Icon, t }) => (
          <button key={s} onClick={() => setScreen(s as any)} className={`p-2 rounded ${currentScreen === s ? 'text-ms-cyan bg-ms-cyan/10' : 'text-ms-ink-dim hover:text-ms-ink'}`} title={t}>
            <Icon className="w-5 h-5" />
          </button>
        ))}
      </nav>

      <div className="lg:ml-16 pb-16 lg:pb-0">
        {currentScreen === 'design' && <StructureBuilder />}
        {currentScreen === 'engineering' && <EngineeringPage />}
        {currentScreen === 'library' && <LibraryScreen />}
        {currentScreen === 'compare' && <CompareScreen />}
        {currentScreen === 'settings' && (
          <div className="min-h-screen flex items-center justify-center text-ms-ink-dim font-mono">Settings — coming in M5</div>
        )}
      </div>
    </div>
  );
}

export default App;
