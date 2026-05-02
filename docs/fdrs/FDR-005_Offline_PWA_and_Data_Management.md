# FDR-005: Offline PWA, Data Management & Export

**Milestone:** M5  
**Status:** ⏳ Pending  
**Priority:** Medium — PWA completeness  
**Owner:** TBD  
**Created:** 2026-05-02  
**Depends On:** FDR-001 (PWA Shell), FDR-003 (Historical Library)

---

## 1. Goal

Make the app fully functional offline after first load. Users can design vehicles, browse the library, and export results without an internet connection. Provide robust data management: settings snapshots, custom component tables, import/export of designs, and update management.

---

## 2. Scope

| Item | In Scope | Out of Scope |
|------|----------|--------------|
| Service worker with Workbox (precache + runtime) | ✅ | ❌ |
| Offline indicator | ✅ | ❌ |
| Settings snapshots (save/load full settings state) | ✅ | ❌ |
| Custom component table editor | ✅ | ❌ |
| Import/export vehicle designs (JSON) | ✅ | ❌ |
| Import/export entire library | ✅ | ❌ |
| Export BOQ to CSV/text/print | ✅ | ❌ |
| Update detection and user-controlled reload | ✅ | ❌ |
| Version display in Settings | ✅ | ❌ |
| Data reset (per-table and global) | ✅ | ❌ |
| Cross-device sync | ❌ | ✅ (future) |
| Cloud save | ❌ | ✅ (future) |
| Multi-user collaboration | ❌ | ✅ (future) |

---

## 3. Offline Strategy

### Asset Caching (Workbox)

```javascript
// vite.config.ts → vite-plugin-pwa generates this
workbox.precaching.precacheAndRoute([
  { url: '/index.html', revision: '...' },
  { url: '/assets/main-xxx.js', revision: '...' },
  { url: '/assets/index-xxx.css', revision: '...' },
  { url: '/data/power_plants.json', revision: '...' },
  { url: '/data/drives.json', revision: '...' },
  // All historical library JSONs
]);
```

### Runtime Caches

| Cache Name | Strategy | Max Entries | TTL |
|------------|----------|-------------|-----|
| `fonts` | CacheFirst | 10 | 30 days |
| `images` | CacheFirst | 50 | 7 days |

### Offline UX

- **Online**: Green dot + "Online" text in header
- **Offline**: Amber dot + "Offline — designs saved locally" in header
- **Reconnecting**: Pulsing dot + "Reconnecting..."
- All data writes go to `localStorage` / IndexedDB regardless of connectivity

---

## 4. Settings Snapshots

Inspired by CE ShipGen's FR-024.

### Save Snapshot
```
┌─────────────────────────────────────────┐
│ Save Current Settings                   │
│ Name: [ My Custom Rules        ]        │
│                                         │
│ Includes:                               │
│   ✅ All component tables (modified)    │
│   ✅ Active rule set                    │
│   ✅ Theme & layout preferences         │
│   ❌ Vehicle library (never included)   │
│                                         │
│ [Save Snapshot]                         │
└─────────────────────────────────────────┘
```

### Load Snapshot
- List of saved snapshots with timestamp
- Click to load → confirmation dialog (warns of overwrite)
- Export snapshot as JSON file
- Import snapshot from JSON file
- Delete snapshot
- Max 50 snapshots per browser

### Storage Key
```
localStorage['mneme_settings_snapshots'] → Array<Snapshot>
```

---

## 5. Custom Component Table Editor

Users can modify or extend the built-in component tables.

### UI
- Settings → "Component Tables" tab
- Dropdown: Select table (Power Plants, Drives, Fuel Blocks)
- Inline JSON editor with syntax highlighting (CodeMirror or Monaco lightweight)
- Live preview: table renders as editable grid below editor
- Validation: schema check on save; reject if >10% rows fail
- "Reset to Defaults" button per table
- "Export Table" / "Import Table" buttons

### Active Table Registry
```typescript
// Which table is "in play" for each component type
localStorage['mneme_active_tables'] = {
  power_plants: 'custom_my_kerolox', // or 'default'
  drives: 'default',
};
```

---

## 6. Import / Export

### Vehicle Export Formats

| Format | Extension | Use Case |
|--------|-----------|----------|
| JSON | `.mneme.json` | Full fidelity, re-importable |
| CSV | `.mneme.csv` | Spreadsheet analysis |
| Text | `.mneme.txt` | Human-readable spec sheet |
| Print | — | Styled print view |

### JSON Export Schema
```json
{
  "_meta": {
    "format": "mneme-vehicle",
    "version": "0.1",
    "exportedAt": "2026-05-02T12:00:00Z",
    "appVersion": "0.1.0"
  },
  "vehicle": { /* full VehicleDesign object */ }
}
```

### Library Export
- Exports all user-created vehicles as a JSON array
- Does NOT include built-in historical vehicles (those are re-fetched from app bundle)

### Import Validation
- Check `_meta.format === 'mneme-vehicle'`
- Check required fields: `id`, `name`, `stages`
- Assign new UUID if `id` collides with existing
- Schema validation: reject if >10% of fields missing/invalid

---

## 7. Update Management

### Version Manifest
```json
// public/version.json (generated at build)
{
  "version": "0.1.0",
  "buildTimestamp": "2026-05-02T10:00:00Z",
  "channel": "stable",
  "changelog": "Initial release. Saturn V calibration. 26 historical vehicles.",
  "minimumCompatibleVersion": "0.1.0"
}
```

### Update Flow
1. Service worker detects new version on periodic check
2. App shows "Update available" pill in header
3. User clicks pill → confirmation dialog
4. User confirms → `updateServiceWorker(true)` → page reloads
5. Never auto-reload; never force update

### Data Preservation
- Settings snapshots: preserved
- Vehicle library: preserved
- Custom tables: preserved
- Active table registry: preserved
- Only app code/cache updates

---

## 8. Data Reset

### Per-Table Reset
- Settings → Component Tables → Select table → "Reset to Defaults"
- Warns: "This will discard your custom changes."

### Global Reset
- Settings → "Reset All Data"
- Warns: "This will delete all your designs and custom tables. Settings snapshots will be preserved."
- Requires confirmation: type "RESET" to confirm

---

## 9. Acceptance Criteria

- [ ] App works offline after first load (airplane mode test)
- [ ] Offline indicator visible in header when disconnected
- [ ] Settings snapshots save/load correctly
- [ ] Custom power plant table edits persist and are used in calculator
- [ ] Vehicle JSON export imports back identically
- [ ] Library export produces valid JSON array
- [ ] CSV export has correct headers and data types
- [ ] Print view renders full BOQ on one page (or paginated)
- [ ] Update detection works: changing version.json triggers update pill
- [ ] Update reload preserves all user data
- [ ] Global reset deletes designs but preserves snapshots
- [ ] Mobile: all import/export actions accessible via share sheet where appropriate

---

## 10. Blockers

| Blocker | Resolution |
|---------|------------|
| FDR-001 (PWA Shell) | Service worker and build pipeline |
| FDR-003 (Historical Library) | Library data to cache |

---

## 11. Notes

- Use `navigator.onLine` + `online`/`offline` events for connectivity detection.
- Use `indexedDB` for large data (vehicle library) to avoid `localStorage` quota issues.
- CE ShipGen's table store (`tableStore.ts`) is an excellent reference for the snapshot system.
- Keep snapshot JSON under 5MB to avoid `localStorage` quota (most browsers: 5–10MB).
- The update model is "user-controlled reload" — never surprise the user with a reload.
