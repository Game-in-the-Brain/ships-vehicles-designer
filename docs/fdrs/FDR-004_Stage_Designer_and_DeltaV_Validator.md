# FDR-004: Stage Designer & Delta-V Validator

**Milestone:** M4  
**Status:** ⏳ Pending  
**Priority:** High — core design UX  
**Owner:** TBD  
**Created:** 2026-05-02  
**Depends On:** FDR-002 (BOM Calculator Core)

---

## 1. Goal

Create the primary design workspace where users build vehicles stage-by-stage. The UI must make the 3-level hierarchy (Stage → Engine/Fuel → Power Plant/Drive) visually obvious, provide real-time validation, and auto-derive the vehicle taxonomy. The experience should feel like assembling a rocket from labeled parts — accessible to non-engineers but accurate enough for enthusiasts.

---

## 2. Scope

| Item | In Scope | Out of Scope |
|------|----------|--------------|
| Stage stack visualization (bottom-to-top) | ✅ | ❌ |
| Expandable/collapsible stage cards | ✅ | ❌ |
| Engine builder (Power Plant + Drive picker) | ✅ | ❌ |
| Fuel block editor with auto tank-mass | ✅ | ❌ |
| Real-time delta-V validation per stage | ✅ | ❌ |
| Mission ΔV target checker (LEO ≥9,200 m/s) | ✅ | ❌ |
| Color-coded mass budget bars | ✅ | ❌ |
| Classification auto-derivation display | ✅ | ❌ |
| Program deviation / batch quirk editor | ✅ | ❌ |
| Feature/Bug roll system for upgrades | ❌ | ✅ (FDR-005) |
| Drag-to-reorder stages | ❌ | ✅ (nice-to-have) |
| 3D stage stack preview | ❌ | ✅ (FDR-006) |

---

## 3. Stage Stack Visualization

### Visual Model

```
┌─────────────────────────────┐
│  STAGE 3  |  S-IVB          │  ← Upper stage (smallest)
│  ΔV: 3,470 m/s  |  T/W: 0.8 │
│  [Engine: J-2] [Fuel: H2/LOX]│
├─────────────────────────────┤
│  STAGE 2  |  S-II           │
│  ΔV: 4,270 m/s  |  T/W: 1.1 │
│  [Engine: J-2×5] [Fuel: H2/LOX]│
├─────────────────────────────┤
│  STAGE 1  |  S-IC           │  ← Booster (largest)
│  ΔV: 3,550 m/s  |  T/W: 1.18│
│  [Engine: F-1×5] [Fuel: RP-1/LOX]│
└─────────────────────────────┘
```

### Rules
- Stages stack bottom-to-top (like real rocket)
- Each stage card shows: name, role badge, ΔV, TWR, engine summary, fuel type
- Expandable: click to reveal full BOM (engine details, fuel block, structural mass)
- Color coding:
  - Cyan border = valid (meets mission ΔV target)
  - Amber border = warning (TWR < 1.0 at sea level for first stage)
  - Red border = error (negative mass, impossible Isp)
- Width proportional to stage diameter (if known) or mass

---

## 4. Stage Card Detail View (Expanded)

### Section A: Engine Assembly
```
Engines (3×)
┌─────────────────────────────────────────┐
│ Power Plant: [Full-Flow Methalox ▼]     │
│ Drive:       [Gimbaled Bell      ▼]     │
│ Count:       [  3  ] ◄────►             │
│ ─────────────────────────────────────── │
│ Vacuum Isp:  385 s    │  Sea Level: 335 s│
│ Thrust:      7,740 kN │  Dry Mass: 4,800 kg│
│ Cost:        $3.0M    │  Reusable: ✅    │
└─────────────────────────────────────────┘
[+ Add Engine Variant]
```

### Section B: Fuel Block
```
Fuel Block
┌─────────────────────────────────────────┐
│ Propellant Mass: [ 1,100,000 ] kg       │
│ Tank Type:       [Al-Li Alloy   ▼]      │
│ Tank Mass Ratio: 0.008                  │
│ Auto Tank Mass:  8,800 kg               │
│ Ullage:          3.0%                   │
│ Boiloff:         0.05%/day              │
│ O/F Ratio:       3.6                    │
└─────────────────────────────────────────┘
```

### Section C: Mass Budget
```
Mass Budget
┌─────────────────────────────────────────┐
│ Structural  ████████████░░░░  45,000 kg │
│ Engines     ██████░░░░░░░░░░  14,400 kg │
│ Propellant  █████████████████ 1,100,000 │
│ Tanks       █░░░░░░░░░░░░░░░  8,800 kg  │
│ Payload     █████████████████ 100,000   │
│ ─────────────────────────────────────── │
│ Dry:  167,200 kg  |  Wet: 1,276,000 kg  │
└─────────────────────────────────────────┘
```

### Section D: Performance
```
Performance
┌─────────────────────────────────────────┐
│ ΔV (vacuum):   4,150 m/s    ✅          │
│ ΔV (sea level): 3,280 m/s   ✅          │
│ Burn Time:      162 s                   │
│ TWR (vac):      1.45                    │
│ TWR (SL):       1.12        ✅          │
└─────────────────────────────────────────┘
```

---

## 5. Delta-V Validator

### Mission Targets (configurable)

| Mission | Min ΔV (m/s) | Description |
|---------|--------------|-------------|
| LEO | 9,200 | Low Earth Orbit (200 km × 28.5°) |
| Polar LEO | 9,400 | High-inclination LEO |
| GTO | 10,500 | Geostationary Transfer |
| TLI | 10,800 | Trans-Lunar Injection |
| Mars | 11,600 | Earth escape + Mars transfer |
| Custom | user-defined | Any target |

### Validation Rules

**Hard Errors (block save/export):**
- `E001`: Negative mass anywhere
- `E002`: Stage dry mass ≥ wet mass
- `E003`: TWR at sea level < 0.8 for first stage
- `E004`: Total ΔV < mission target
- `E005`: Power Plant TL > Vehicle TL
- `E006`: Drive incompatible with Power Plant chemistry

**Soft Warnings (allow with amber highlight):**
- `W001`: TWR at sea level < 1.0 (marginal first-stage performance)
- `W002`: Propellant fraction < 0.85 (inefficient stage)
- `W003`: Engine count > 9 (combustion instability risk)
- `W004`: Cost exceeds $5B (unrealistic for single vehicle)
- `W005`: No redundancy in engine-out capability

### Validation Display
- Persistent banner at top of designer
- Green check + "Valid for LEO" when passing
- Red banner with error list when failing
- Amber banner with warning count when warnings exist

---

## 6. Program Deviation Editor

Each vehicle can have batch quirks (program deviations) that modify base values:

```
Program Deviations
┌─────────────────────────────────────────┐
│ [+ Add Deviation]                       │
│                                         │
│ 1. Mass: -3%  |  Batch: Soyuz 732-741   │
│    "Lightweight fairing variant"        │
│                                         │
│ 2. Isp: +2%   |  Batch: Merlin 1D+     │
│    "Improved turbopump efficiency"      │
└─────────────────────────────────────────┘
```

Deviation axes: mass, isp, thrust, cost, reliability.
Modifiers stack additively (not multiplicatively).

---

## 7. Classification Auto-Derivation

As the user builds stages, the classification badge updates live:

```
Current Classification: K-GG/2S+R/USA-LEO
  └─ Prop-ARC: K-GG  (Kerolox Gas-Generator)
  └─ Stg-CFG: 2S+R   (2-stage, reusable booster)
  └─ Origin:  USA
  └─ Mission: LEO
```

Derivation logic is in `src/calculations/classification.ts`.

---

## 8. Responsive Behavior

### Desktop (≥1024px)
- 2-column: Designer (60%) + BOQ/Validator (40%)
- Stage cards are wide; all sections visible when expanded
- Keyboard shortcuts: Ctrl+S (save), Ctrl+N (new stage), Delete (remove selected)

### Tablet (768–1023px)
- 2-column narrower; BOQ collapses to tabs
- Stage cards still wide; horizontal scroll for mass budget bars

### Mobile (<768px)
- Single column; stage cards stack vertically
- BOQ in bottom sheet (swipe up)
- Stage cards are compact (collapsed by default)
- Tap to expand; swipe to delete

---

## 9. Acceptance Criteria

- [ ] User can create a new vehicle, add 3 stages, and see a stack visualization
- [ ] Changing propellant mass instantly updates ΔV (<50ms)
- [ ] Saturn V reference design validates with zero errors
- [ ] N1 reference design validates but shows warnings (underpowered upper stage)
- [ ] Classification updates live as engines change
- [ ] Mission target selector changes validator thresholds
- [ ] Program deviation editor applies modifiers correctly
- [ ] Mobile: all actions achievable with thumb; no horizontal scroll
- [ ] Desktop: keyboard shortcuts work; BOQ stays visible while scrolling
- [ ] Invalid designs cannot be exported (hard error block)
- [ ] Warning designs can be exported with confirmation dialog

---

## 10. Blockers

| Blocker | Resolution |
|---------|------------|
| FDR-002 (BOM Calculator) | Need calculation engine for real-time validation |
| FDR-001 (PWA Shell) | Need layout shell for responsive design |

---

## 11. Notes

- The stage stack visualization is the "hero" UI element — invest in polished CSS.
- Use CSS Grid for the stack; each stage is a grid item with `order` property for bottom-to-top.
- Mass budget bars use CSS `linear-gradient` with stops at the fraction point.
- Keep the 3-level hierarchy visually distinct: L1 = large card, L2 = inner panel, L3 = form rows.
- CE ShipGen's `ChildTable` component is a good reference for editable mini-tables inside cards.
