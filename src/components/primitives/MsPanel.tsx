import { ReactNode } from 'react';

interface Props { sheetNo?: string; title: string; keyword?: string; children: ReactNode; className?: string; }

export default function MsPanel({ sheetNo, title, keyword, children, className = '' }: Props) {
  return (
    <div className={`relative border border-ms-hair bg-ms-panel p-4 ${className}`}>
      <div className="absolute top-0 left-0 w-2 h-2 border-t border-l border-ms-cyan" />
      <div className="absolute top-0 right-0 w-2 h-2 border-t border-r border-ms-cyan" />
      <div className="absolute bottom-0 left-0 w-2 h-2 border-b border-l border-ms-cyan" />
      <div className="absolute bottom-0 right-0 w-2 h-2 border-b border-r border-ms-cyan" />
      {(sheetNo || title || keyword) && (
        <div className="flex items-center justify-between mb-4 pb-3 border-b border-ms-hair">
          <div className="flex items-center gap-3">
            {sheetNo && <span className="text-xs font-mono text-ms-cyan">{sheetNo}</span>}
            <h3 className="text-sm font-display font-semibold text-ms-ink tracking-wide">{title}</h3>
          </div>
          {keyword && <span className="text-xs font-mono text-ms-ink-dim uppercase">{keyword}</span>}
        </div>
      )}
      {children}
    </div>
  );
}
