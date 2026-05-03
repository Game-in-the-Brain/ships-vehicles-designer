# Mneme Vehicle Designer — Project Log & Roadmap

**Last Updated:** 2026-05-03  
**Current Phase:** v0.1 Specification Complete → v0.2 Data & Types  
**Next Milestone:** M1 (PWA Shell and Tooling)

---

## 1. Progress Summary

### ✅ Completed (2026-03 → 2026-05)

| Date | Deliverable | Location |
|------|-------------|----------|
| 2026-03 | CE ShipGen research & PRD analysis | `../ce-shipgen/` (external reference) |
| 2026-03 | JNO (SimpleRockets) historical rocket catalog | `references/JNO_Orbital_Spaceflight_Timeline_Catalog.md` |
| 2026-04 | Core mechanics document (mass-based, delta-V-centric) | `Mneme_Ship_Design_System.md` |
| 2026-04 | 3-level hierarchy specification | `Mneme_Vehicle_Component_System.md` |
| 2026-04 | Saturn V calibration anchor (TL 7.4) | `Mneme_Ship_Design_System.md` §9 |
| 2026-04 | Design system spec (dark sci-fi, Space Grotesk + JetBrains Mono) | `README.md` §Design System |
| 2026-05-02 | Rocket taxonomy & classification system | `docs/taxonomy/Rocket_Classification_System.md` |
| 2026-05-02 | L3 Power Plant JSON catalog (19 entries, TL 7.0–8.4) | `data/power_plants.json` |
| 2026-05-02 | L3 Drive JSON catalog (13 entries, TL 7.0–8.4) | `data/drives.json` |
| 2026-05-02 | TypeScript type definitions (VehicleDesign, Stage, Engine, etc.) | `src/types/index.ts` |
| 2026-05-02 | Feature Design Records (FDR-001 through FDR-006) | `docs/fdrs/FDR-001` … `FDR-006` |
| 2026-05-02 | CE ShipGen → MSDS integration notes | `docs/mneme_improvements.md` |
| 2026-05-03 | v0.01: Recovery after git clean, initial deploy scripts | `scripts/deploy.mjs`, `scripts/inline-build.py` |
| 2026-05-03 | v0.02: Versioning system (0.01 increments), visible version in UI | `VERSION`, `scripts/bump-version.mjs`, `src/version.ts` |
| 2026-05-03 | v0.03: Fix base path computation for trailing-slash URLs | `src/store/vehicleStore.ts` |
| 2026-05-03 | v0.04: Component tables screen, import/export, version header | `src/components/TablesScreen.tsx`, `src/utils/exportImport.ts` |
| 2026-05-03 | v0.05: N1-L3 Soviet lunar rocket data, Saturn V vs N1 compare prototype | `data/library/n1-l3.json`, `src/components/CompareScreen.tsx` |

### 📊 Statistics

| Metric | Count |
|--------|-------|
| Specification documents | 4 |
| Data tables (JSON) | 7 component catalogs + 8 library vehicles |
| Type definitions | 12 interfaces, 8 type aliases |
| FDRs | 6 |
| Historical rockets cataloged | 27 |
| Power plant entries | 19 |
| Drive entries | 13 |
| App versions deployed | 5 (v0.01 → v0.05) |
| Lines of documentation | ~2,500 |

---

## 2. Milestone Roadmap

```
M1 ──► M2 ──► M3 ──► M4 ──► M5 ──► M6
│      │      │      │      │      │
│      │      │      │      │      └── 3D Procedural Mesh Bridge
│      │      │      │      └── Offline PWA, Data Management, Export
│      │      │      └── Stage Designer & Delta-V Validator
│      │      └── Historical Rocket Library
│      └── BOM Calculator Core
└── PWA Shell and Build Tooling
```

### M1: PWA Shell and Tooling ⏳
**FDR:** `docs/fdrs/FDR-001_PWA_Shell_and_Tooling.md`  
**Goal:** Build toolchain, design system primitives, routing, PWA manifest, service worker.  
**Duration Estimate:** 2–3 days  
**Blockers:** None  
**Key Deliverables:**
- Vite + React + TypeScript scaffold
- Tailwind + custom CSS variables
- PWA manifest + Workbox service worker
- Design system primitives (MsPanel, MsField, MsNum, MsData, MsButton)
- Responsive layout engine (desktop/mobile toggle)
- Zustand store scaffolding
- Routing shell (Startup → Designer → Library → Settings)

### M2: BOM Calculator Core ⏳
**FDR:** `docs/fdrs/FDR-002_BOM_Calculator_Core.md`  
**Goal:** Real-time mass/delta-V calculator with L3→L2→L1 assembly.  
**Duration Estimate:** 3–4 days  
**Blockers:** M1  
**Key Deliverables:**
- Component selector (Power Plant + Drive)
- Engine assembly with count, throttle, cost
- Fuel block editor (propellant, tank type, ullage)
- Stage builder with real-time ΔV
- Vehicle delta-V cascade
- Saturn V calibration validation (±2%)
- Cost accumulator

### M3: Historical Rocket Library ⏳
**FDR:** `docs/fdrs/FDR-003_Historical_Rocket_Library.md`  
**Goal:** Browsable library of 26 pre-built historical rockets.  
**Duration Estimate:** 2–3 days  
**Blockers:** M2  
**Key Deliverables:**
- JSON designs for 26 vehicles
- Library grid with search/filter
- Detail modal with BOQ and real-world comparison
- Load-into-calculator workflow
- Import/export individual vehicles

### M4: Stage Designer & Delta-V Validator ⏳
**FDR:** `docs/fdrs/FDR-004_Stage_Designer_and_DeltaV_Validator.md`  
**Goal:** Primary design workspace with visual stage stack, validation, classification.  
**Duration Estimate:** 4–5 days  
**Blockers:** M2  
**Key Deliverables:**
- Stage stack visualization (bottom-to-top)
- Expandable stage cards
- Real-time validation (hard errors + soft warnings)
- Mission ΔV target checker
- Classification auto-derivation
- Program deviation editor
- Mass budget bars

### M5: Offline PWA, Data Management & Export ⏳
**FDR:** `docs/fdrs/FDR-005_Offline_PWA_and_Data_Management.md`  
**Goal:** Full offline functionality, settings snapshots, custom tables, export formats.  
**Duration Estimate:** 3–4 days  
**Blockers:** M1, M3  
**Key Deliverables:**
- Offline asset caching
- Settings snapshots (save/load/export)
- Custom component table editor
- Vehicle export (JSON, CSV, text, print)
- Update detection and user-controlled reload
- Data reset (per-table and global)

### M6: 3D Procedural Mesh Bridge ⏳
**FDR:** `docs/fdrs/FDR-006_3D_Procedural_Mesh_Bridge.md`  
**Goal:** Export `.mneme.3d.json` for Godot 4 procedural mesh generation.  
**Duration Estimate:** 3–5 days  
**Blockers:** M4, M5  
**Key Deliverables:**
- 3D export format spec
- Procedural mesh rules (tank, engine bell, fairing)
- Per-origin visual style modifiers
- Godot 4 import script (GDScript)
- Export button in vehicle detail

---

## 3. Testability Checklist

At each milestone, the app must pass these tests before proceeding:

### M1 Testable?
- [ ] `npm run dev` starts in <3s
- [ ] `npm run build` completes without errors
- [ ] Lighthouse PWA score = 100
- [ ] App installable on Android Chrome
- [ ] App renders at 320px and 2560px
- [ ] All 4 routes navigable

### M2 Testable?
- [ ] Saturn V loads with ΔV = 11,290 m/s ±2%
- [ ] Changing propellant mass updates ΔV in <50ms
- [ ] All 19 power plants and 13 drives selectable
- [ ] Cost accumulator sums correctly
- [ ] Mobile: all inputs thumb-usable

### M3 Testable?
- [ ] All 26 historical vehicles loadable
- [ ] Search filters work (name, origin, mission, propulsion)
- [ ] Detail modal shows real-world vs MSDS comparison
- [ ] Load-into-calculator copies correctly
- [ ] Export JSON re-imports identically

### M4 Testable?
- [ ] New vehicle → 3 stages → stack visualizes
- [ ] Hard errors block export
- [ ] Warnings allow export with confirmation
- [ ] Classification updates live
- [ ] Mission target selector changes thresholds

### M5 Testable?
- [ ] Airplane mode: all screens functional
- [ ] Settings snapshot save/load
- [ ] Custom table edits persist
- [ ] Update detection triggers pill
- [ ] Global reset works

### M6 Testable?
- [ ] Export produces valid JSON
- [ ] Godot import script runs
- [ ] Saturn V 3D model has correct proportions
- [ ] Origin styles produce distinct visuals

---

## 4. Known Issues & Risks

| Issue | Severity | Mitigation |
|-------|----------|------------|
| No build toolchain yet | 🟢 Low | Vite + React + TypeScript scaffold working |
| Forgejo Pages white-page bug | 🟢 Low | CSS/JS inlining fixed; deploy script automated |
| Historical rocket data accuracy | 🟡 Medium | Cross-reference 3+ sources; flag estimates |
| CE ShipGen diverges from MSDS model | 🟡 Medium | `mneme_improvements.md` documents differences |
| 3D bridge is unproven | 🟢 Low | De-prioritized to M6; PWA is primary value |
| Mobile performance with large JSON | 🟡 Medium | Paginate library; lazy-load vehicle details |
| TypeScript strict mode may slow dev | 🟢 Low | Start with strict; relax only if blocking |

---

## 5. Reference Materials

| Document | Purpose |
|----------|---------|
| `Mneme_Ship_Design_System.md` | Core v0.1 mechanics, Saturn V calibration, TL framework |
| `Mneme_Vehicle_Component_System.md` | 3-level hierarchy, L3 component catalogs, delta-V cascade |
| `docs/taxonomy/Rocket_Classification_System.md` | Architecture-based taxonomy, classification strings |
| `docs/mneme_improvements.md` | CE ShipGen → MSDS mapping, what to improve |
| `data/power_plants.json` | L3 Power Plant catalog |
| `data/drives.json` | L3 Drive catalog |
| `src/types/index.ts` | TypeScript type definitions |
| `docs/fdrs/FDR-001` … `FDR-006` | Milestone specifications |
| `../ce-shipgen/PRD.md` | CE ShipGen reference PRD |
| `../ce-shipgen/src/types/index.ts` | CE ShipGen type architecture |

---

## 6. Next Actions

1. **Implement multi-launcher comparison** — See §7 below
2. **Build component primitives** — MsPanel, MsField, MsNum, MsData, MsButton
3. **Implement calculation engine** — `deltaV.ts`, `massBudget.ts`, `cost.ts`
4. **Populate remaining historical JSON designs** — Energia, Starship, SLS, Long March
5. **Stage Designer & Delta-V Validator** — M4 core workspace

---

## 7. Feature Plan: Multi-Launcher Comparison

### Goal
View multiple launchers side-by-side in a configurable grid. Start with "two launchers" mode (Saturn V vs N1), extend to 3–4 launchers.

### Two-Launchers Mode (v0.06)
- **Layout**: 2-column grid, full-height cards
- **Quick-load buttons**: "Saturn V vs N1", "Falcon 9 vs Starship", "Custom..."
- **Metrics displayed**:
  - Header: Name, origin flag, TL, PMR, status
  - Mass: Total, dry, propellant per stage
  - Performance: ΔV, TWR, Isp (vac/sea)
  - Payload: LEO, GTO, TLI bars (normalized to max)
  - Propulsion: Engine count, thrust, chemistry
  - Cost: Total M$, per-kg to LEO
  - Stages: Expandable tree (SL2) with component counts
- **Actions**: Remove either, swap left/right, add notes

### Multi-Launchers Mode (v0.07)
- **Layout**: 3-column (desktop), 2-column (tablet), carousel (mobile)
- **Launcher selector**: Dropdown from library + "Load from file"
- **Comparison table**: Dense row-per-metric, column-per-vehicle
  - Highlight winner per row (green)
  - Sort rows by difference magnitude
- **Filter**: Show only differences > threshold
- **Export**: Screenshot or CSV of comparison table

### Russian Competitor Quick-Add (v0.06)
- In any comparison view, button: "+ Russian Competitor"
- Auto-selects N1, Energia, or Proton based on current vehicle class
- If comparing USA vehicles → suggests USSR counterpart
- If comparing modern → suggests Long March or Angara

### Data Needed
| Vehicle | Status | File |
|---------|--------|------|
| Saturn V | ✅ Done | `data/library/saturn-v.json` |
| N1-L3 | ✅ Done | `data/library/n1-l3.json` |
| Energia-Buran | 📝 Needed | `data/library/energia.json` |
| Starship | 📝 Needed | `data/library/starship.json` |
| SLS Block 1 | 📝 Needed | `data/library/sls.json` |
| Long March 5 | 📝 Needed | `data/library/long-march-5.json` |
| Falcon Heavy | 📝 Needed | `data/library/falcon-heavy.json` |
| Proton-M | 📝 Needed | `data/library/proton-m.json` |

---

*"If a design wants a 4th level, that level gets promoted to a 3rd-level component type, or the hierarchy is re-factored."* — MSDS v0.2
