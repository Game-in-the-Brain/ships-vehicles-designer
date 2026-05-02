# FDR-001: PWA Shell and Build Tooling

**Milestone:** M1  
**Status:** ⏳ Pending  
**Priority:** Critical — blocks all UI work  
**Owner:** TBD  
**Created:** 2026-05-02

---

## 1. Goal

Establish the build toolchain, project scaffolding, and PWA shell so that subsequent milestones have a working development environment and a deployable baseline. This milestone produces a runnable app that displays the design system and can be installed to a phone/desktop home screen.

---

## 2. Scope

| Item | In Scope | Out of Scope |
|------|----------|--------------|
| Vite + React + TypeScript scaffold | ✅ | ❌ |
| Tailwind CSS + custom CSS variables for dark sci-fi theme | ✅ | ❌ |
| PWA manifest + service worker (Workbox) | ✅ | ❌ |
| Static asset pipeline (fonts, icons) | ✅ | ❌ |
| Routing shell (React Router or Wouter) | ✅ | ❌ |
| State management (Zustand + Immer + Persist, as in CE ShipGen) | ✅ | ❌ |
| Design system primitives (ShPanel, ShField, ShNum, ShData) | ✅ | ❌ |
| Responsive layout engine (desktop/phone toggle) | ✅ | ❌ |
| Actual calculator logic | ❌ | ✅ |
| Component data table editors | ❌ | ✅ |
| Historical rocket library | ❌ | ✅ |

---

## 3. Technical Stack

| Layer | Choice | Rationale |
|-------|--------|-----------|
| Bundler | Vite 5+ | Fast HMR, native ESM, PWA plugin |
| Framework | React 18+ | Component model, ecosystem |
| Language | TypeScript 5+ | Type safety, shared types with CE ShipGen |
| Styling | Tailwind CSS 3+ | Utility-first, matches CE ShipGen |
| Design Tokens | CSS custom properties | Theme switching, sci-fi glow effects |
| State | Zustand + Immer + Persist | Proven in CE ShipGen, minimal boilerplate |
| Router | Wouter | Tiny, hooks-based, no context provider needed |
| PWA | Vite PWA plugin + Workbox | Auto-generated service worker, manifest |
| Icons | Lucide React | Lightweight, consistent |
| Fonts | Space Grotesk (headers) + JetBrains Mono (data) | Matches design spec |

---

## 4. Design System Tokens

```css
:root {
  /* Background */
  --ms-bg: #121212;
  --ms-bg-elevated: #1e1e1e;
  --ms-bg-panel: #1a1a1a;
  --ms-bg-input: #0d0d0d;

  /* Foreground */
  --ms-ink: #e0e0e0;
  --ms-ink-soft: #a0a0a0;
  --ms-ink-dim: #606060;

  /* Accent */
  --ms-cyan: #00e5ff;
  --ms-cyan-dim: #00b8cc;
  --ms-cyan-glow: rgba(0, 229, 255, 0.3);

  /* Semantic */
  --ms-warn: #ff6b6b;
  --ms-good: #51cf66;
  --ms-amber: #fcc419;

  /* Borders */
  --ms-hair: rgba(224, 224, 224, 0.12);
  --ms-hair-strong: rgba(224, 224, 224, 0.24);

  /* Typography */
  --font-display: 'Space Grotesk', sans-serif;
  --font-mono: 'JetBrains Mono', 'IBM Plex Mono', monospace;
}
```

---

## 5. Component Primitives

Reusable styled components modeled after CE ShipGen's `shipgen/primitives.tsx`:

### `MsPanel`
- Bordered container with decorative corner ticks
- Optional header: sheet number, title, keyword tag
- Props: `sheetNo?: string`, `title?: string`, `keyword?: string`, `children`

### `MsField`
- Labeled input/select with glow-on-focus border
- Props: `label`, `value`, `options?`, `onChange`, `type?`, `hint?`

### `MsNum`
- Large phosphor-glow number display
- Props: `value`, `size?`, `unit?`, `variant?: 'good' | 'warn' | 'amber' | 'dim'`

### `MsData`
- Inline data span with variant coloring
- Props: `value`, `size?`, `variant?`, `dim?`

### `MsButton`
- Primary (cyan fill), secondary (outline), ghost (text only)
- Props: `variant`, `size`, `children`, `onClick`

---

## 6. Layout Engine

### Desktop (≥768px)
- 2-column grid: `minmax(0, 1fr) 420px`
- Left: scrollable design workspace
- Right: sticky summary panel (BOQ preview)

### Mobile (<768px)
- Single column, vertical stack
- Bottom navigation bar (Design / Library / Settings)
- Summary collapses to expandable header

### Layout Toggle
- Manual button in Settings + auto-detect via `matchMedia`
- Preference stored in `localStorage`

---

## 7. PWA Requirements

### Manifest (`manifest.json`)
```json
{
  "name": "Mneme Vehicle Designer",
  "short_name": "MnemeVeh",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#121212",
  "theme_color": "#00e5ff",
  "icons": [{ "src": "/icon-192.png", "sizes": "192x192" }, ...]
}
```

### Service Worker (Workbox)
- Precache: HTML, JS, CSS, fonts, JSON data tables
- Runtime cache: external fonts from CDN
- Strategy: `StaleWhileRevalidate` for data, `CacheFirst` for assets
- Update flow: Show "Update available" pill; user clicks to reload

### Install UX
- Detect `beforeinstallprompt`
- "Install App" button in Settings
- iOS manual instructions (Safari → Share → Add to Home Screen)
- Running-mode indicator: browser vs standalone badge

---

## 8. Directory Structure

```
src/
  main.tsx              # Entry point
  App.tsx               # Router + layout shell
  index.css             # Global styles + CSS vars
  types/
    index.ts            # Shared TypeScript types
  store/
    vehicleStore.ts     # Zustand store (vehicles, settings)
  components/
    primitives/
      MsPanel.tsx
      MsField.tsx
      MsNum.tsx
      MsData.tsx
      MsButton.tsx
    layout/
      AppLayout.tsx
      DesktopLayout.tsx
      MobileLayout.tsx
      BottomNav.tsx
    screens/
      StartupScreen.tsx
      DesignerScreen.tsx
      LibraryScreen.tsx
      SettingsScreen.tsx
  data/
    (compiled JSON tables — see FDR-002)
public/
  data/
    power_plants.json
    drives.json
    fuel_blocks.json
    sample_vehicles.json
  fonts/
  icons/
```

---

## 9. Acceptance Criteria

- [ ] `npm run dev` starts dev server in <3s
- [ ] `npm run build` produces static files in `dist/`
- [ ] `npm run preview` serves built app locally
- [ ] App displays correctly at 320px–2560px width
- [ ] PWA passes Lighthouse audit: ≥90 Performance, 100 PWA, 100 Accessibility
- [ ] Install prompt works on Chrome Android
- [ ] Offline mode works after first load (all assets cached)
- [ ] Theme CSS variables render correctly in dark mode
- [ ] All primitive components render in Storybook-style test page
- [ ] Router navigates between Startup / Designer / Library / Settings without reload

---

## 10. Dependencies

```json
{
  "dependencies": {
    "react": "^18.3.0",
    "react-dom": "^18.3.0",
    "wouter": "^3.0.0",
    "zustand": "^4.5.0",
    "immer": "^10.0.0",
    "lucide-react": "^0.350.0"
  },
  "devDependencies": {
    "@types/react": "^18.3.0",
    "@types/react-dom": "^18.3.0",
    "typescript": "^5.4.0",
    "vite": "^5.2.0",
    "@vitejs/plugin-react": "^4.2.0",
    "vite-plugin-pwa": "^0.19.0",
    "tailwindcss": "^3.4.0",
    "postcss": "^8.4.0",
    "autoprefixer": "^10.4.0"
  }
}
```

---

## 11. Blockers

| Blocker | Resolution |
|---------|------------|
| None | M1 is the first milestone; no upstream dependencies |

---

## 12. Notes

- Copy CE ShipGen's `vite.config.ts` PWA plugin configuration as a starting point.
- The `public/data/` JSON files are stubs at this stage (empty arrays or minimal entries).
- Do NOT implement actual business logic in M1 — only UI shell and routing.
- Keep bundle size <200KB gzipped for initial load.
