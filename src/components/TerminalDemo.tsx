import { useEffect, useState } from 'react';
import type { TerminalLine } from '../data/sections';

interface Props {
  lines: TerminalLine[];
  autoPlay?: boolean;
}

const DELAY_PER_LINE = 80;

export function TerminalDemo({ lines, autoPlay = true }: Props) {
  const [visibleCount, setVisibleCount] = useState(autoPlay ? 0 : lines.length);

  useEffect(() => {
    if (!autoPlay) return;
    setVisibleCount(0);
    const timers: ReturnType<typeof setTimeout>[] = [];
    lines.forEach((_, i) => {
      timers.push(setTimeout(() => setVisibleCount(i + 1), i * DELAY_PER_LINE + 300));
    });
    return () => timers.forEach(clearTimeout);
  }, [lines, autoPlay]);

  const lineColor = (type: TerminalLine['type']) => {
    switch (type) {
      case 'prompt': return 'text-[#3fb950]';
      case 'claude': return 'text-[#58a6ff]';
      case 'output': return 'text-[#8b949e]';
      default: return '';
    }
  };

  const linePrefix = (type: TerminalLine['type']) => {
    if (type === 'prompt') return <span className="text-[#3fb950] mr-2 select-none">$</span>;
    return null;
  };

  return (
    <div className="rounded-lg border border-[#30363d] bg-[#0d1117] overflow-hidden mt-3">
      {/* Window chrome */}
      <div className="flex items-center gap-1.5 px-3 py-2 bg-[#161b22] border-b border-[#30363d]">
        <span className="w-2.5 h-2.5 rounded-full bg-[#f85149] opacity-70" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#d29922] opacity-70" />
        <span className="w-2.5 h-2.5 rounded-full bg-[#3fb950] opacity-70" />
        <span className="ml-auto text-[10px] text-[#8b949e]">terminal</span>
      </div>
      <div className="p-4 font-mono text-sm leading-relaxed min-h-16">
        {lines.slice(0, visibleCount).map((line, i) => (
          <div key={i} className={`${line.type === 'blank' ? 'h-3' : ''} ${lineColor(line.type)}`}>
            {line.type !== 'blank' && (
              <>
                {linePrefix(line.type)}
                <span>{line.text}</span>
              </>
            )}
          </div>
        ))}
        {visibleCount < lines.length && (
          <span className="text-[#3fb950] cursor-blink">▋</span>
        )}
      </div>
    </div>
  );
}
