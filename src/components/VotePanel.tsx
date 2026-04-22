import { useState } from 'react';

const PROJECTS = [
  {
    id: 'todo-api',
    emoji: '📝',
    title: 'Mini Todo API',
    description: 'Build a REST API with Express — create, list, and complete tasks. Great for seeing TDD in action.',
    tags: ['Node.js', 'REST API', 'Tests'],
  },
  {
    id: 'weather-cli',
    emoji: '🌤️',
    title: 'CLI Weather Tool',
    description: 'A command-line tool that fetches and displays the weather for any city. Good for showing how Claude Code handles external APIs.',
    tags: ['CLI', 'API calls', 'Node.js'],
  },
  {
    id: 'tictactoe',
    emoji: '🎮',
    title: 'Tic-Tac-Toe Web Game',
    description: 'A browser-based game with an unbeatable AI opponent. Fun, visual, and accessible to everyone in the room.',
    tags: ['React', 'Game logic', 'UI'],
  },
] as const;

type ProjectId = (typeof PROJECTS)[number]['id'];

export function VotePanel() {
  const [myVote, setMyVote] = useState<ProjectId | null>(null);

  return (
    <div className="mt-6 space-y-4">
      {PROJECTS.map(p => {
        const isMyVote = myVote === p.id;

        return (
          <button
            key={p.id}
            onClick={() => setMyVote(p.id)}
            className={`w-full text-left rounded-lg border transition-all p-4 ${
              isMyVote
                ? 'border-[#58a6ff] bg-[#0c1c2e]'
                : 'border-[#30363d] bg-[#161b22] hover:border-[#58a6ff] hover:bg-[#161b22]'
            }`}
          >
            <div className="flex items-center gap-3">
              <span className="text-xl">{p.emoji}</span>
              <div className="flex-1">
                <div className="font-bold text-[#e6edf3] text-sm mb-1">{p.title}</div>
                <p className="text-xs text-[#8b949e] leading-relaxed mb-2">{p.description}</p>
                <div className="flex gap-1">
                  {p.tags.map(t => (
                    <span key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-[#21262d] text-[#8b949e] font-mono">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              {isMyVote && (
                <span className="shrink-0 text-[#58a6ff] text-lg font-bold">✓</span>
              )}
            </div>
          </button>
        );
      })}

      <div className="text-center text-xs text-[#8b949e] pt-2">
        {myVote
          ? 'Your pick is locked in — raise your hand when the presenter asks!'
          : 'Tap a project to indicate your preference'}
      </div>
      <p className="text-center text-[10px] text-[#484f58]">
        Presenter: tally votes by show of hands
      </p>
    </div>
  );
}
