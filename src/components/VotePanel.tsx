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
  const [votes, setVotes] = useState<Record<ProjectId, number>>({
    'todo-api': 0,
    'weather-cli': 0,
    'tictactoe': 0,
  });
  const [myVote, setMyVote] = useState<ProjectId | null>(null);
  const totalVotes = Object.values(votes).reduce((a, b) => a + b, 0);

  const handleVote = (id: ProjectId) => {
    if (myVote === id) return;
    setVotes(prev => ({
      ...prev,
      ...(myVote ? { [myVote]: prev[myVote] - 1 } : {}),
      [id]: prev[id] + 1,
    }));
    setMyVote(id);
  };

  const winner = totalVotes > 0
    ? PROJECTS.reduce((a, b) => votes[a.id] >= votes[b.id] ? a : b)
    : null;

  return (
    <div className="mt-6 space-y-4">
      {PROJECTS.map(p => {
        const count = votes[p.id];
        const pct = totalVotes > 0 ? Math.round((count / totalVotes) * 100) : 0;
        const isMyVote = myVote === p.id;
        const isWinning = winner?.id === p.id && totalVotes > 0;

        return (
          <button
            key={p.id}
            onClick={() => handleVote(p.id)}
            className={`w-full text-left rounded-lg border transition-all p-4 ${
              isMyVote
                ? 'border-[#58a6ff] bg-[#0c1c2e]'
                : 'border-[#30363d] bg-[#161b22] hover:border-[#58a6ff] hover:bg-[#161b22]'
            }`}
          >
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xl">{p.emoji}</span>
                  <span className="font-bold text-[#e6edf3] text-sm">{p.title}</span>
                  {isWinning && (
                    <span className="text-xs px-1.5 py-0.5 rounded bg-[#1f2937] text-[#3fb950] border border-[#3fb950] font-mono">
                      winning
                    </span>
                  )}
                </div>
                <p className="text-xs text-[#8b949e] leading-relaxed mb-2">{p.description}</p>
                <div className="flex gap-1">
                  {p.tags.map(t => (
                    <span key={t} className="text-[10px] px-1.5 py-0.5 rounded bg-[#21262d] text-[#8b949e] font-mono">
                      {t}
                    </span>
                  ))}
                </div>
              </div>
              <div className="shrink-0 text-right">
                <div className="text-lg font-bold text-[#58a6ff]">{count}</div>
                <div className="text-xs text-[#8b949e]">{pct}%</div>
              </div>
            </div>
            {totalVotes > 0 && (
              <div className="mt-3 h-1 rounded-full bg-[#21262d] overflow-hidden">
                <div
                  className="h-full rounded-full bg-[#58a6ff] transition-all duration-500"
                  style={{ width: `${pct}%` }}
                />
              </div>
            )}
          </button>
        );
      })}

      <div className="text-center text-xs text-[#8b949e] pt-2">
        {totalVotes === 0
          ? 'No votes yet — tap a project to vote!'
          : `${totalVotes} vote${totalVotes === 1 ? '' : 's'} cast${myVote ? ' · tap again to change' : ''}`}
      </div>
    </div>
  );
}
