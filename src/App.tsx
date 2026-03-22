import { useEffect, useRef, useState } from 'react';
import { sections } from './data/sections';
import { Sidebar } from './components/Sidebar';
import { Section } from './components/Section';
import { ProgressBar } from './components/ProgressBar';

function App() {
  const [activeId, setActiveId] = useState(sections[0].id);
  const [progress, setProgress] = useState(0);
  const mainRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            setActiveId(entry.target.id);
          }
        }
      },
      { rootMargin: '-40% 0px -55% 0px' }
    );

    sections.forEach(s => {
      const el = document.getElementById(s.id);
      if (el) observer.observe(el);
    });

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    const handleScroll = () => {
      const el = mainRef.current;
      if (!el) return;
      const scrolled = el.scrollTop;
      const total = el.scrollHeight - el.clientHeight;
      setProgress(total > 0 ? (scrolled / total) * 100 : 0);
    };

    const el = mainRef.current;
    el?.addEventListener('scroll', handleScroll);
    return () => el?.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div className="flex w-full">
      <ProgressBar progress={progress} />
      <Sidebar activeId={activeId} />
      <main
        ref={mainRef}
        className="flex-1 overflow-y-auto h-screen"
      >
        {/* Top bar for mobile */}
        <div className="lg:hidden sticky top-0 z-40 bg-[#0d1117]/95 backdrop-blur border-b border-[#21262d] px-4 py-2">
          <span className="text-[#58a6ff] text-xs font-bold tracking-widest uppercase">Claude Code Talk</span>
        </div>

        <div className="flex flex-col items-start">
          {sections.map((section, i) => (
            <Section key={section.id} section={section} index={i} />
          ))}
          <footer className="w-full px-6 lg:px-12 py-8 text-xs text-[#8b949e] border-t border-[#21262d]">
            Built with Claude Code ·{' '}
            <a
              href="https://github.com/lcockerham/claude-code-talk"
              target="_blank"
              rel="noreferrer"
              className="text-[#58a6ff] hover:underline"
            >
              github.com/lcockerham/claude-code-talk
            </a>
          </footer>
        </div>
      </main>
    </div>
  );
}

export default App;
