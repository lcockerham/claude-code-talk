import { sections } from '../data/sections';

interface Props {
  activeId: string;
}

export function Sidebar({ activeId }: Props) {
  return (
    <aside className="hidden lg:flex flex-col w-56 shrink-0 sticky top-0 h-screen border-r border-[#21262d] bg-[#0d1117] py-6 px-3 gap-1">
      <div className="px-3 mb-4">
        <span className="text-[#58a6ff] text-xs font-bold tracking-widest uppercase">Claude Code Talk</span>
      </div>
      {sections.map((s, i) => {
        const isActive = s.id === activeId;
        return (
          <a
            key={s.id}
            href={`#${s.id}`}
            className={`flex items-center gap-2 px-3 py-2 rounded-md text-sm transition-colors no-underline ${
              isActive
                ? 'bg-[#1f2937] text-[#e6edf3]'
                : 'text-[#8b949e] hover:text-[#e6edf3] hover:bg-[#161b22]'
            }`}
          >
            <span className="text-base w-5 text-center">{s.emoji}</span>
            <span className="truncate">{i === 0 ? s.title : `${i}. ${s.title}`}</span>
          </a>
        );
      })}
    </aside>
  );
}
