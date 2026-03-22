import type { Step } from '../data/sections';
import { CodeBlock } from './CodeBlock';

interface Props {
  steps: Step[];
}

export function StepList({ steps }: Props) {
  return (
    <ol className="space-y-5 mt-4 list-none p-0">
      {steps.map((step, i) => (
        <li key={i} className="flex gap-4">
          <span className="shrink-0 w-6 h-6 mt-0.5 rounded-full bg-[#1f2937] border border-[#30363d] text-[#58a6ff] text-xs font-bold flex items-center justify-center">
            {i + 1}
          </span>
          <div className="flex-1 min-w-0">
            <p className="text-sm text-[#e6edf3] font-medium leading-snug">{step.label}</p>
            {step.code && (
              <CodeBlock code={step.code} language={step.language} />
            )}
            {step.note && (
              <p className="text-xs text-[#8b949e] mt-1.5 leading-relaxed">{step.note}</p>
            )}
          </div>
        </li>
      ))}
    </ol>
  );
}
