# FDR-006: 3D Procedural Mesh Bridge

**Milestone:** M6  
**Status:** ⏳ Pending  
**Priority:** Low — downstream vision  
**Owner:** TBD  
**Created:** 2026-05-02  
**Depends On:** FDR-004 (Stage Designer)

---

## 1. Goal

Enable procedural generation of 3D rocket meshes from MSDS BOM data. The system exports a structured data file that a Godot 4 engine ingests to build a physically accurate (but stylized) 3D model. The visual style is influenced by the vehicle's origin (USA sleek, USSR blocky, European modular).

**Non-goal:** Real-time in-browser 3D rendering. The PWA exports data; Godot renders it.

---

## 2. Scope

| Item | In Scope | Out of Scope |
|------|----------|--------------|
| Export `.mneme.3d.json` format with mesh primitives | ✅ | ❌ |
| Per-origin visual style modifiers | ✅ | ❌ |
| Engine bell procedural mesh (lathe from Isp + thrust) | ✅ | ❌ |
| Tank procedural mesh (cylinder from propellant mass + density) | ✅ | ❌ |
| Stage stacking transform data | ✅ | ❌ |
| Fairing procedural mesh | ✅ | ❌ |
| Godot 4 import script (GDScript) | ✅ | ❌ |
| Real-time PWA 3D preview | ❌ | ✅ (future, Three.js) |
| CFD/ aerodynamic analysis | ❌ | ✅ (future) |
| Animation (staging, launch) | ❌ | ✅ (future) |

---

## 3. Export Format: `.mneme.3d.json`

```json
{
  "_meta": {
    "format": "mneme-3d",
    "version": "0.1",
    "unit": "meters",
    "origin": "USA",
    "style_preset": "sleek"
  },
  "vehicle": {
    "name": "Saturn V",
    "total_height_m": 110.6,
    "max_diameter_m": 10.1
  },
  "stages": [
    {
      "id": "s-ic",
      "role": "booster",
      "position_y_m": 0.0,
      "height_m": 42.1,
      "diameter_m": 10.1,
      "mesh": {
        "tank": {
          "type": "cylinder",
          "height_m": 30.0,
          "diameter_m": 10.1,
          "segments": 32,
          "color": "#c0c0c0"
        },
        "engines": [
          {
            "type": "lathe_bell",
            "throat_diameter_m": 0.76,
            "exit_diameter_m": 3.76,
            "length_m": 4.0,
            "position": [0, 0, 0],
            "rotation": [0, 0, 0],
            "color": "#888888"
          }
        ],
        "fins": null,
        "interstage": {
          "height_m": 6.5,
          "diameter_bottom_m": 10.1,
          "diameter_top_m": 6.6,
          "color": "#e0e0e0"
        }
      },
      "material": {
        "base_color": "#f0f0f0",
        "roughness": 0.6,
        "metallic": 0.2
      }
    }
  ]
}
```

---

## 4. Procedural Mesh Rules

### Tank Cylinder
```
tank_height_m = propellant_volume_m3 / (π × (diameter_m/2)²)
tank_diameter_m = historical or estimated from stage mass
tank_segments = 32 (smooth) or 16 (blocky/USSR style)
```

### Engine Bell (Lathe)
```
throat_diameter_m = f(thrust_kn, chamber_pressure_mpa)
exit_diameter_m = f(thrust_kn, ambient_pressure_pa, expansion_ratio)
bell_length_m = f(expansion_ratio, throat_diameter_m)
profile = Rao bell approximation
```

### Fairing
```
height_m = payload_volume_m3^(1/3) × 2.5
base_diameter_m = stage_diameter_m
tip_diameter_m = base_diameter_m × 0.15
profile = ogive or von Kármán
```

### Origin Style Modifiers

| Origin | Style Name | Visual Traits |
|--------|------------|---------------|
| USA | `sleek` | Smooth curves, white/black, clean panel lines, subtle USA flag |
| USSR | `blocky` | Angular, green/gray, riveted panels, Cyrillic labels |
| EUR | `modular` | White/blue, segmented fairings, ESA logos |
| CHN | `national` | Red/white, Long March family styling, Chinese characters |
| JPN | `precision` | Compact, white, minimal markings |
| IND | `cost_optimized` | White/green, utilitarian, ISRO logos |
| MLT | `commercial` | Mixed livery, company logos, custom paint |

---

## 5. Godot 4 Integration

### Import Script (`res://importers/mneme_3d.gd`)

```gdscript
extends Node

func import_mneme_3d(path: String) -> Node3D:
    var file = FileAccess.open(path, FileAccess.READ)
    var json = JSON.parse_string(file.get_as_text())
    var root = Node3D.new()
    root.name = json.vehicle.name
    
    for stage_data in json.stages:
        var stage = build_stage(stage_data)
        root.add_child(stage)
    
    return root

func build_stage(data: Dictionary) -> Node3D:
    var stage = Node3D.new()
    stage.name = data.id
    stage.position.y = data.position_y_m
    
    # Build tank
    if data.mesh.tank:
        var tank = build_cylinder(data.mesh.tank)
        stage.add_child(tank)
    
    # Build engines
    for engine_data in data.mesh.engines:
        var engine = build_lathe_bell(engine_data)
        stage.add_child(engine)
    
    return stage

func build_cylinder(data: Dictionary) -> MeshInstance3D:
    var mesh = CylinderMesh.new()
    mesh.height = data.height_m
    mesh.top_radius = data.diameter_m / 2.0
    mesh.bottom_radius = data.diameter_m / 2.0
    mesh.radial_segments = data.segments
    
    var instance = MeshInstance3D.new()
    instance.mesh = mesh
    return instance

func build_lathe_bell(data: Dictionary) -> MeshInstance3D:
    # Use SurfaceTool to lathe a Rao bell profile
    var st = SurfaceTool.new()
    st.begin(Mesh.PRIMITIVE_TRIANGLES)
    # ... lathe logic ...
    var instance = MeshInstance3D.new()
    instance.mesh = st.commit()
    return instance
```

### Export from PWA
- "Export → Godot 3D Scene" button in vehicle detail
- Downloads `.mneme.3d.json` file
- User drags file into Godot project
- Godot script auto-runs on file open (custom resource importer)

---

## 6. Acceptance Criteria

- [ ] Export produces valid JSON that passes schema validation
- [ ] Saturn V export produces a 3-stage stack with correct proportions
- [ ] Engine bells have plausible Rao profiles
- [ ] Tank heights are proportional to propellant mass
- [ ] Godot import script runs without errors
- [ ] Origin style modifiers produce visually distinct results
- [ ] Export includes material properties (color, roughness, metallic)
- [ ] Mobile: export button is prominent; file downloads to device
- [ ] Desktop: export + open-in-Godot workflow documented

---

## 7. Blockers

| Blocker | Resolution |
|---------|------------|
| FDR-004 (Stage Designer) | Need complete vehicle data to export |
| FDR-005 (Data Management) | Need export infrastructure |

---

## 8. Notes

- The 3D bridge is a **downstream goal** — do not let it block PWA development.
- Start with simple primitives (cylinder, lathe) before complex shapes.
- Godot 4's `SurfaceTool` and `ArrayMesh` are sufficient for procedural geometry.
- Consider glTF 2.0 export as an alternative to custom JSON — more universal but less parametric.
- The origin style system is a fun differentiator; keep it lightweight (just color + mesh segments + label language).
