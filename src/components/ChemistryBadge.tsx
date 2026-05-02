interface Props { chemistry: string; size?: 'sm' | 'md'; }

const CHEMISTRY_STYLES: Record<string, { bg: string; text: string; label: string }> = {
  kerolox: { bg: 'bg-orange-500/20', text: 'text-orange-400', label: 'KEROLOX' },
  hydrolox: { bg: 'bg-blue-500/20', text: 'text-blue-400', label: 'HYDROLOX' },
  methalox: { bg: 'bg-purple-500/20', text: 'text-purple-400', label: 'METHALOX' },
  hypergolic: { bg: 'bg-red-500/20', text: 'text-red-400', label: 'HYPERGOLIC' },
  apcp: { bg: 'bg-amber-500/20', text: 'text-amber-400', label: 'SOLID' },
  nuclear: { bg: 'bg-green-500/20', text: 'text-green-400', label: 'NUCLEAR' },
  electric: { bg: 'bg-cyan-500/20', text: 'text-cyan-400', label: 'ELECTRIC' },
};

export default function ChemistryBadge({ chemistry, size = 'sm' }: Props) {
  const style = CHEMISTRY_STYLES[chemistry] || { bg: 'bg-ms-ink/10', text: 'text-ms-ink-dim', label: chemistry.toUpperCase() };
  const sizeClass = size === 'sm' ? 'text-[10px] px-1.5 py-0.5' : 'text-xs px-2 py-1';
  return (
    <span className={`inline-block font-mono font-semibold tracking-wider ${sizeClass} ${style.bg} ${style.text}`}>
      {style.label}
    </span>
  );
}
