import { ReactNode } from 'react';

interface Props { children: ReactNode; variant?: 'primary' | 'secondary' | 'danger'; size?: 'sm' | 'md'; onClick?: () => void; className?: string; }

export default function MsButton({ children, variant = 'primary', size = 'md', onClick, className = '' }: Props) {
  const variantClass = { primary: 'bg-ms-cyan text-ms-bg hover:bg-ms-cyan-dim', secondary: 'bg-ms-input text-ms-ink border border-ms-hair hover:border-ms-cyan', danger: 'bg-ms-warn/10 text-ms-warn border border-ms-warn/30 hover:bg-ms-warn/20' }[variant];
  const sizeClass = { sm: 'px-2 py-1 text-xs', md: 'px-3 py-2 text-sm' }[size];
  return (
    <button onClick={onClick} className={`font-mono font-semibold transition-colors flex items-center gap-1.5 ${variantClass} ${sizeClass} ${className}`}>
      {children}
    </button>
  );
}
