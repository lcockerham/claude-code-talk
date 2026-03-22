import type { Section as SectionType } from '../data/sections';
import { sections } from '../data/sections';
import { StepList } from './StepList';
import { TerminalDemo } from './TerminalDemo';
import { Callout } from './Callout';
import { VotePanel } from './VotePanel';

interface Props {
  section: SectionType;
  index: number;
}

export function Section({ section, index }: Props) {
  const { id, title, emoji, tagline, content } = section;

  return (
    <section
      id={id}
      className="min-h-screen py-16 px-6 lg:px-12 max-w-2xl border-b border-[#21262d] last:border-b-0"
    >
      {/* Section header */}
      <div className="mb-8">
        <div className="flex items-center gap-2 mb-2">
          {index > 0 && (
            <span className="text-xs font-mono text-[#8b949e] bg-[#161b22] border border-[#30363d] px-2 py-0.5 rounded">
              {index} / {sections.length - 1}
            </span>
          )}
        </div>
        <h2 className="text-2xl lg:text-3xl font-bold text-[#e6edf3] mb-2 flex items-center gap-3">
          <span>{emoji}</span>
          <span>{title}</span>
        </h2>
        <p className="text-[#8b949e] text-sm leading-relaxed">{tagline}</p>
      </div>

      {/* Intro */}
      {content.intro && (
        <p className="text-[#c9d1d9] text-sm leading-relaxed mb-6">{content.intro}</p>
      )}

      {/* Steps */}
      {content.steps && <StepList steps={content.steps} />}

      {/* Terminal demo */}
      {content.terminal && <TerminalDemo lines={content.terminal} />}

      {/* Callout */}
      {content.callout && <Callout type={content.callout.type} text={content.callout.text} />}

      {/* Extra text */}
      {content.extra && (
        <p className="text-[#8b949e] text-xs mt-4 leading-relaxed">{content.extra}</p>
      )}

      {/* Vote panel for live demo section */}
      {id === 'live-demo' && <VotePanel />}
    </section>
  );
}
