interface Props {
  type: 'tip' | 'info' | 'warning';
  text: string;
}

const config = {
  tip: { icon: '💡', label: 'Tip', border: 'border-[#3fb950]', bg: 'bg-[#0f2318]', text: 'text-[#3fb950]' },
  info: { icon: 'ℹ️', label: 'Note', border: 'border-[#58a6ff]', bg: 'bg-[#0c1c2e]', text: 'text-[#58a6ff]' },
  warning: { icon: '⚠️', label: 'Warning', border: 'border-[#d29922]', bg: 'bg-[#1f1a0e]', text: 'text-[#d29922]' },
};

export function Callout({ type, text }: Props) {
  const c = config[type];
  return (
    <div className={`mt-5 rounded-lg border-l-4 ${c.border} ${c.bg} px-4 py-3`}>
      <p className={`text-xs font-bold uppercase tracking-wide mb-1 ${c.text}`}>
        {c.icon} {c.label}
      </p>
      <p className="text-sm text-[#c9d1d9] leading-relaxed">{text}</p>
    </div>
  );
}
