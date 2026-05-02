interface Props { value: number | string; size?: 'sm' | 'md' | 'lg'; unit?: string; variant?: 'good' | 'warn' | 'amber' | 'dim' | 'cyan'; label?: string; }

export default function MsNum({ value, size = 'md', unit, variant = 'cyan', label }: Props) {
  const sizeClass = { sm: 'text-lg', md: 'text-2xl', lg: 'text-4xl' }[size];
  const variantClass = { good: 'text-ms-good', warn: 'text-ms-warn', amber: 'text-ms-amber', dim: 'text-ms-ink-dim', cyan: 'text-ms-cyan' }[variant];
  return (
    <div className="flex flex-col">
      {label && <span className="text-xs font-mono text-ms-ink-dim uppercase mb-1">{label}</span>}
      <span className={`font-mono font-semibold tabular-nums ${sizeClass} ${variantClass}`} style={variant === 'cyan' ? { textShadow: '0 0 12px rgba(0,229,255,0.4)' } : {}}>
        {value}{unit ? <span className="text-sm ml-1 opacity-60">{unit}</span> : null}
      </span>
    </div>
  );
}
