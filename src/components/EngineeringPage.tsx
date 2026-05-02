import { useState } from 'react';
import { useVehicleStore } from '../store/vehicleStore';
import MsPanel from './primitives/MsPanel';
import { Wrench, ChevronDown, ChevronUp } from 'lucide-react';

export default function EngineeringPage() {
  const { currentVehicle } = useVehicleStore();
  const [expandedComponent, setExpandedComponent] = useState<string | null>(null);
  if (!currentVehicle) return null;

  const allComponents = currentVehicle.structures.flatMap((s) => s.components.map((c) => ({ ...c, structureName: s.name })));
  const grouped = {
    avionics: allComponents.filter((c) => c.type === 'avionics'),
    computer: allComponents.filter((c) => c.type === 'computer'),
    crew: allComponents.filter((c) => c.type === 'crew_module'),
    bridge: allComponents.filter((c) => c.type === 'bridge'),
    sensor: allComponents.filter((c) => c.type === 'sensor'),
    engine: allComponents.filter((c) => c.type === 'engine'),
    fuel: allComponents.filter((c) => c.type === 'fuel_tank'),
  };
  const totalCrew = grouped.crew.reduce((sum, c) => sum + (c.crewModule?.seats || 0), 0);
  const totalComputing = grouped.avionics.reduce((sum, c) => sum + (c.avionicsUnit?.computingMips || 0), 0) + grouped.computer.reduce((sum, c) => sum + (c.computerSystem?.computingMips || 0), 0);

  return (
    <div className="min-h-screen bg-ms-bg text-ms-ink font-mono">
      <div className="sticky top-0 bg-ms-bg/95 backdrop-blur border-b border-ms-hair z-40">
        <div className="max-w-5xl mx-auto px-4 py-3 flex items-center gap-3">
          <Wrench className="w-5 h-5 text-ms-cyan" />
          <h2 className="text-lg font-display font-semibold tracking-wide">Engineering</h2>
        </div>
      </div>

      <div className="max-w-5xl mx-auto p-4 grid grid-cols-1 lg:grid-cols-3 gap-4">
        <div className="lg:col-span-2 space-y-4">
          {Object.entries(grouped).map(([type, components]) => {
            if (components.length === 0) return null;
            return (
              <MsPanel key={type} title={type.replace('_', ' ').toUpperCase()} keyword={`${components.length}`}>
                <div className="space-y-2">
                  {components.map((component) => {
                    const isExpanded = expandedComponent === component.id;
                    return (
                      <div key={component.id} className="bg-ms-elevated/50">
                        <button onClick={() => setExpandedComponent(isExpanded ? null : component.id)} className="w-full flex items-center justify-between p-2 text-xs text-left">
                          <span className="font-semibold">{component.name}</span>
                          <div className="flex items-center gap-2">
                            <span className="text-ms-ink-dim">{component.massKg} kg</span>
                            {isExpanded ? <ChevronUp className="w-3 h-3" /> : <ChevronDown className="w-3 h-3" />}
                          </div>
                        </button>
                        {isExpanded && (
                          <div className="px-2 pb-2 text-xs text-ms-ink-soft space-y-1">
                            {component.engineAssembly && (<><p>Vacuum Isp: {component.engineAssembly.vacuumIsp} s</p><p>Thrust: {component.engineAssembly.totalThrustKn} kN</p><p>Count: {component.engineAssembly.count}</p></>)}
                            {component.fuelTank && (<><p>Type: {component.fuelTank.fuelType}</p><p>Propellant: {component.fuelTank.propellantMassKg.toLocaleString()} kg</p></>)}
                            {component.crewModule && (<><p>Seats: {component.crewModule.seats}</p><p>Duration: {component.crewModule.missionDurationDays} days</p><p>Volume: {component.crewModule.volumeM3} m³</p></>)}
                            {component.bridgeType && (<><p>Stations: {component.bridgeType.stations}</p><p>Crew: {component.bridgeType.minCrew}-{component.bridgeType.maxCrew}</p></>)}
                            {component.avionicsUnit && (<><p>MIPS: {component.avionicsUnit.computingMips}</p><p>Redundancy: {component.avionicsUnit.redundancy}</p></>)}
                            {component.sensor && (<><p>Category: {component.sensor.category}</p><p>Range: {component.sensor.range}</p></>)}
                          </div>
                        )}
                      </div>
                    );
                  })}
                </div>
              </MsPanel>
            );
          })}
        </div>

        <div className="space-y-4">
          <MsPanel title="Summary" keyword="INFO">
            <div className="space-y-3 text-xs">
              <div className="flex justify-between"><span className="text-ms-ink-dim">Total Components</span><span>{allComponents.length}</span></div>
              <div className="flex justify-between"><span className="text-ms-ink-dim">Crew Capacity</span><span>{totalCrew}</span></div>
              <div className="flex justify-between"><span className="text-ms-ink-dim">Computing</span><span>{totalComputing.toFixed(1)} MIPS</span></div>
              <div className="flex justify-between"><span className="text-ms-ink-dim">Structures</span><span>{currentVehicle.structures.length}</span></div>
            </div>
          </MsPanel>
        </div>
      </div>
    </div>
  );
}
