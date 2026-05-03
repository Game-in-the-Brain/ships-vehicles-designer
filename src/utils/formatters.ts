export function fmtNum(n: number, decimals = 0): string {
  return n.toLocaleString('en-US', {
    minimumFractionDigits: decimals,
    maximumFractionDigits: decimals,
  });
}

export function fmtMass(tons: number): string {
  return fmtNum(tons, 1) + ' t';
}

export function fmtDeltaV(ms: number | null): string {
  if (ms === null || ms === undefined) return '—';
  return fmtNum(ms / 1000, 2) + ' km/s';
}

export function fmtCost(musd: number): string {
  return fmtNum(musd, 1) + ' M$';
}

export function fmtPayload(kg: number | null): string {
  if (kg === null || kg === undefined) return '—';
  return fmtNum(kg / 1000, 1) + ' t';
}
