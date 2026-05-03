# 07 — Material Science

**Version:** 0.1  
**Scope:** Structural materials from steel to carbon composites, strength-to-weight ratios, thermal limits, and the bottleneck materials that constrain vehicle performance.

---

## The Material Bottleneck

Material science is the **primary constraint** on rocket performance. Better materials enable:
- Higher propellant fractions (lighter tanks)
- Higher chamber pressures (more efficient engines)
- Reusability (thermal protection, fatigue resistance)
- Larger structures (lighter beams, taller tanks)

Every generation of rocket technology corresponds to a generation of material capability.

---

## Material Generations

### Generation 1: Steel and Aluminum (1950s–1960s)

| Material | Density (g/cm³) | Yield Strength (MPa) | Use Case |
|----------|-----------------|----------------------|----------|
| 301 Stainless Steel | 7.9 | 275 | Atlas balloon tanks, early engines |
| 2014-T6 Aluminum | 2.8 | 415 | Saturn V S-IC, S-II |
| 7075-T6 Aluminum | 2.8 | 505 | Aircraft-grade, fairings |

**Characteristics:**
- Heavy but well-understood
- Good cryogenic properties (aluminum)
- Prone to fatigue (steel)
- Limited temperature range

**Example:** Atlas used thin-wall stainless steel tanks pressurized for structural rigidity (balloon tanks). This saved mass but was fragile.

### Generation 2: Aluminum-Lithium and Alloys (1970s–1990s)

| Material | Density (g/cm³) | Yield Strength (MPa) | Use Case |
|----------|-----------------|----------------------|----------|
| 2195 Al-Li | 2.7 | 580 | Shuttle ET, SLS core stage |
| 2099 Al-Li | 2.6 | 550 | Modern aircraft, launch vehicles |
| Ti-6Al-4V | 4.4 | 880 | High-temperature components, bolts |

**Characteristics:**
- 5–10% lighter than pure aluminum
- Better cryogenic properties
- Higher cost
- More difficult to weld

**Example:** The Space Shuttle External Tank switched from 2219 aluminum to 2195 Al-Li, saving ~3,400 kg.

### Generation 3: Carbon Fiber Composites (1990s–present)

| Material | Density (g/cm³) | Tensile Strength (MPa) | Use Case |
|----------|-----------------|------------------------|----------|
| Carbon/Epoxy (T300) | 1.6 | 1,500 | Fairings, interstages |
| Carbon/Epoxy (T800) | 1.6 | 2,750 | High-performance structures |
| Carbon/Epoxy (IM7) | 1.7 | 3,100 | Pressure vessels, modern rockets |

**Characteristics:**
- 40–60% lighter than aluminum for equivalent strength
- Directional properties (anisotropic)
- Excellent stiffness-to-weight
- Damage tolerance issues (brittle)
- High cost

**Example:** Falcon 9 uses carbon fiber composite fairings and interstage. Starship plans extensive use of carbon fiber (though initially used stainless steel for manufacturing simplicity).

### Generation 4: Advanced Composites and Ceramics (2020s–2030s)

| Material | Density (g/cm³) | Max Temp (°C) | Use Case |
|----------|-----------------|---------------|----------|
| C/C (Carbon-Carbon) | 1.5 | 2,000+ | Nozzles, reentry TPS |
| C/SiC | 2.0 | 1,650 | Hot structures, nozzles |
| Ceramic Matrix Composite | 2.0–2.5 | 1,200–1,600 | Turbine blades, TPS |
| Graphene-reinforced | 1.5–2.0 | 500+ | Conceptual, 2030s+ |

### Generation 5: Nanomaterials and Exotics (2040s+)

| Material | Theoretical Property | Projected Availability |
|----------|---------------------|----------------------|
| Carbon Nanotube (CNT) | 100× steel strength, 1/6 weight | TL 8.5+ (2030s) |
| Graphene | 200× steel strength, flexible | TL 9.0+ (2050s) |
| Diamond-like Carbon | Extreme hardness, low friction | TL 9.0+ |
| Metallic Glass | High strength, corrosion-proof | TL 8.5+ |

---

## Strength-to-Weight Comparison

| Material | Specific Strength (kN·m/kg) | Specific Stiffness (MN·m/kg) |
|----------|----------------------------|------------------------------|
| Steel (301) | 35 | 27 |
| Aluminum (7075) | 180 | 26 |
| Titanium (Ti-6Al-4V) | 200 | 25 |
| Carbon/Epoxy (T300) | 940 | 85 |
| Carbon/Epoxy (T800) | 1,720 | 100 |
| Carbon Nanotube (theoretical) | 50,000+ | 1,000+ |

**Key insight:** Carbon fiber composites are 5–10× better than aluminum on a strength-to-weight basis. This is why modern rockets can achieve propellant fractions >0.93.

---

## Thermal Protection Materials

Reusable vehicles need materials that survive extreme thermal environments:

### Ablative Materials (Expendable)

| Material | Max Temp | Use Case |
|----------|----------|----------|
| SLA-561V (silicone) | 1,650°C | Apollo, Viking |
| PICA (phenolic) | 2,760°C | Dragon, Starship |
| Avcoat | 2,760°C | Orion, Apollo |

### Reusable TPS (Thermal Protection System)

| Material | Max Temp | Reusability | Use Case |
|----------|----------|-------------|----------|
| RCC (Reinforced C/C) | 1,650°C | 100+ flights | Shuttle nose, leading edges |
| LI-900 Silica Tiles | 1,260°C | 100+ flights | Shuttle orbiter belly |
| TUFROC | 1,900°C | 50+ flights | X-37B, next-gen reusables |
| Stainless Steel (301) | 820°C | Unlimited (if cooled) | Starship windward side |

**Starship's steel TPS approach:** Rather than fragile tiles, Starship uses actively cooled stainless steel skin with transpiration cooling. Simpler manufacturing, easier repair, but requires active cooling systems.

---

## Cryogenic Considerations

| Material | LOX Compatible | LH2 Compatible | Notes |
|----------|---------------|----------------|-------|
| Aluminum alloys | Yes | Yes | Standard for cryo tanks |
| Stainless steel | Yes | Yes | Used for lines, small tanks |
| Carbon fiber | Yes (with coating) | Risky | Hydrogen embrittlement |
| Titanium | Yes | Yes | Expensive, used for lines |
| Copper | Yes | Yes | Used for cooling jackets |

**Hydrogen embrittlement:** Some materials (high-strength steels, some composites) become brittle when exposed to hydrogen. This limits tank material choices for hydrolox stages.

---

## Material Science Timeline

| TL | Era | Key Material Advances | Vehicle Impact |
|----|-----|----------------------|----------------|
| 7.0 | 1950s | Steel, aluminum alloys | First orbital rockets |
| 7.4 | 1960s | Aluminum-lithium research | Apollo/Saturn V |
| 7.8 | 1980s | Al-Li production, early composites | Shuttle, Ariane |
| 8.0 | 2000s | Carbon fiber maturity | Falcon 9, Delta IV |
| 8.4 | 2020s | Advanced CMCs, 3D-printed alloys | Starship, SLS |
| 8.8 | 2040s | CNT composites, metallic glass | Ultra-light structures |
| 9.0 | 2050s | Graphene production | Gigaton-scale space structures |
| 9.5 | 2070s | Molecular manufacturing | Self-repairing structures |

---

## The Material Bottleneck for Nuclear Thermal Rockets

NTRs require materials that survive:
- 2,000+°C temperatures
- Hydrogen corrosion
- Neutron embrittlement

| Material | Max Temp | Neutron Resistance | Status |
|----------|----------|-------------------|--------|
| Graphite | 2,500°C | Good | NERVA heritage, erodes |
| C/C Composite | 2,000°C | Good | Modern research |
| Tungsten | 3,000°C | Fair | Heavy, brittle |
| Ceramic (ZrC, HfC) | 2,500°C | Good | Active research |

**This is why NTRs remain at TL 9.0 despite being tested in the 1970s.** The materials are the bottleneck.

---

## Sources

- [Atomic Rockets: Materials](https://projectrho.com/public_html/rocket/)
- NASA: [Thermal Protection Systems](https://nasa.gov)
- Wikipedia: [Carbon fiber reinforced polymer](https://en.wikipedia.org/wiki/Carbon_fiber_reinforced_polymer)

---

*Part of the Mneme Vehicle Design Knowledge Base*
