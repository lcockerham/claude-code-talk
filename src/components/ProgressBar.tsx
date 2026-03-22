interface Props {
  progress: number; // 0–100
}

export function ProgressBar({ progress }: Props) {
  return (
    <div className="fixed top-0 left-0 right-0 z-50 h-0.5 bg-[#21262d]">
      <div
        className="h-full bg-[#58a6ff] transition-all duration-200"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
}
