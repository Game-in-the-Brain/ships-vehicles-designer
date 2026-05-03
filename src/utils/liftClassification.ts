/**
 * Lift classification based on LEO payload mass.
 * Aligns with Vehicle Taxonomy size classes.
 */

export type LiftClass = 'Micro' | 'Small' | 'Medium' | 'Heavy' | 'Super-Heavy' | 'Ultra-Heavy' | 'Unknown';

export interface LiftClassification {
  class: LiftClass;
  label: string;        // e.g. "Heavy Lift"
  tlLabel: string;      // e.g. "TL 7.4 Heavy Lift"
  minPayloadKg: number;
  maxPayloadKg: number | null;
}

export function getLiftClass(leoPayloadKg: number | null): LiftClassification {
  if (leoPayloadKg === null || leoPayloadKg === undefined) {
    return {
      class: 'Unknown',
      label: 'Unknown Lift',
      tlLabel: 'Unknown Lift',
      minPayloadKg: 0,
      maxPayloadKg: null,
    };
  }

  if (leoPayloadKg < 100) {
    return { class: 'Micro', label: 'Micro Lift', tlLabel: 'Micro Lift', minPayloadKg: 0, maxPayloadKg: 100 };
  }
  if (leoPayloadKg < 2000) {
    return { class: 'Small', label: 'Small Lift', tlLabel: 'Small Lift', minPayloadKg: 100, maxPayloadKg: 2000 };
  }
  if (leoPayloadKg < 10000) {
    return { class: 'Medium', label: 'Medium Lift', tlLabel: 'Medium Lift', minPayloadKg: 2000, maxPayloadKg: 10000 };
  }
  if (leoPayloadKg < 30000) {
    return { class: 'Heavy', label: 'Heavy Lift', tlLabel: 'Heavy Lift', minPayloadKg: 10000, maxPayloadKg: 30000 };
  }
  if (leoPayloadKg < 100000) {
    return { class: 'Super-Heavy', label: 'Super-Heavy Lift', tlLabel: 'Super-Heavy Lift', minPayloadKg: 30000, maxPayloadKg: 100000 };
  }
  return { class: 'Ultra-Heavy', label: 'Ultra-Heavy Lift', tlLabel: 'Ultra-Heavy Lift', minPayloadKg: 100000, maxPayloadKg: null };
}

export function getLiftClassWithTL(leoPayloadKg: number | null, tl: number): string {
  const lift = getLiftClass(leoPayloadKg);
  if (lift.class === 'Unknown') return `TL ${tl} — Unknown Lift`;
  return `TL ${tl} ${lift.label}`;
}

export function getLiftTags(leoPayloadKg: number | null, tl: number): string[] {
  const lift = getLiftClass(leoPayloadKg);
  const tags: string[] = [];

  if (lift.class !== 'Unknown') {
    tags.push(lift.label);
    tags.push(`TL ${Math.floor(tl * 10) / 10} ${lift.label}`);
  }

  // Also add TL-era tags
  if (tl < 7.5) tags.push('First Space Age');
  else if (tl < 8.0) tags.push('Shuttle Era');
  else if (tl < 8.5) tags.push('NewSpace Era');
  else tags.push('Lunar Return Era');

  return tags;
}

export const LIFT_CLASS_ORDER: LiftClass[] = [
  'Ultra-Heavy',
  'Super-Heavy',
  'Heavy',
  'Medium',
  'Small',
  'Micro',
  'Unknown',
];
