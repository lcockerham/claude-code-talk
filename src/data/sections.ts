export interface Step {
  label: string;
  code?: string;
  language?: string;
  note?: string;
}

export interface TerminalLine {
  type: 'prompt' | 'output' | 'claude' | 'blank';
  text: string;
}

export interface Section {
  id: string;
  title: string;
  emoji: string;
  tagline: string;
  content: {
    intro?: string;
    steps?: Step[];
    terminal?: TerminalLine[];
    callout?: { type: 'tip' | 'info' | 'warning'; text: string };
    extra?: string;
  };
}

export const sections: Section[] = [
  {
    id: 'welcome',
    title: 'Welcome',
    emoji: '👋',
    tagline: 'Cutting-Edge Software Engineering with Claude Code',
    content: {
      intro:
        "You're in the right place. This site is your companion for the next hour — follow along, copy commands, and try things as we go. You can open it on your phone, laptop, or just watch the screen.",
      steps: [
        {
          label: "1. What is Claude Code? (10 min)",
          note: "Plain-language intro — no jargon, just vibes",
        },
        {
          label: "2. Your First Commands (10 min)",
          note: "How to actually talk to Claude Code",
        },
        {
          label: "3. Skills & Slash Commands (10 min)",
          note: "Power-user features that make Claude Code feel like a teammate",
        },
        {
          label: "4. Test-Driven Development (10 min)",
          note: "Write better code by writing tests first — with AI doing the heavy lifting",
        },
        {
          label: "5. Multiagent Flows (10 min)",
          note: "When one AI isn't enough",
        },
        {
          label: "6. Live Demo — You Pick the Project",
          note: "We build something from scratch, together",
        },
      ],
      callout: {
        type: 'tip',
        text: 'Scan the QR code or go to the URL at the top of the screen to follow along on your own device.',
      },
    },
  },
  {
    id: 'what-is-claude-code',
    title: 'What is Claude Code?',
    emoji: '🤖',
    tagline: 'An AI that lives in your terminal and actually understands your code',
    content: {
      intro:
        "Claude Code is a command-line tool made by Anthropic that uses a large language model (Claude) to help you write, edit, test, and understand code. Unlike a chatbot you open in a browser, Claude Code runs right in your terminal — it can read your files, run commands, and make changes directly. Think of it as a very capable coding partner that never gets tired.",
      steps: [
        {
          label: "Install it (requires Node.js 18+)",
          code: "npm install -g @anthropic-ai/claude-code",
          language: "bash",
        },
        {
          label: "Start a session in any project folder",
          code: "cd my-project\nclaude",
          language: "bash",
        },
        {
          label: "That's it. You're in.",
          note: "Claude Code reads your project files and is ready to help.",
        },
      ],
      terminal: [
        { type: 'prompt', text: 'claude' },
        { type: 'claude', text: '✻ Welcome to Claude Code! (claude-sonnet-4-6)' },
        { type: 'output', text: '  Working in: /Users/you/my-project' },
        { type: 'blank', text: '' },
        { type: 'output', text: '  What would you like to work on?' },
        { type: 'blank', text: '' },
        { type: 'prompt', text: 'explain what this codebase does' },
        { type: 'claude', text: '● Reading project files...' },
        { type: 'output', text: '  This looks like a Node.js REST API with Express.' },
        { type: 'output', text: '  It has 3 routes: /users, /posts, and /auth.' },
        { type: 'output', text: '  Tests are in the __tests__/ directory.' },
      ],
      callout: {
        type: 'info',
        text: 'Claude Code is not magic — it reads your actual files and uses AI to reason about them. The more context you give it, the better it does.',
      },
    },
  },
  {
    id: 'first-commands',
    title: 'Your First Commands',
    emoji: '⌨️',
    tagline: 'How to actually talk to Claude Code',
    content: {
      intro:
        "Once you're inside Claude Code, you just... talk to it. In plain English. But there are some patterns that work especially well.",
      steps: [
        {
          label: "Ask it to explain code",
          code: '> what does the authenticate() function do?',
          language: "text",
          note: "Claude reads the file and gives you a plain-English explanation",
        },
        {
          label: "Ask it to make a change",
          code: '> add input validation to the /users POST endpoint',
          language: "text",
          note: "Claude edits the file directly — you can review before accepting",
        },
        {
          label: "Ask it to find a bug",
          code: '> the login endpoint is returning 500 for valid users — find out why',
          language: "text",
          note: "Claude searches through your code to trace the problem",
        },
        {
          label: "Use CLAUDE.md to set the rules",
          code: "# My Project\n\n## Rules\n- Always use TypeScript strict mode\n- Tests must pass before any commit\n- Prefer functional style over classes",
          language: "markdown",
          note: "Drop a CLAUDE.md file in your project root — Claude reads it every session",
        },
      ],
      callout: {
        type: 'tip',
        text: 'CLAUDE.md is like a readme for your AI collaborator. Use it to capture your team\'s coding standards, preferred libraries, and "gotchas" about the project.',
      },
    },
  },
  {
    id: 'skills-and-commands',
    title: 'Skills & Slash Commands',
    emoji: '⚡',
    tagline: 'Power-user features that make Claude Code feel like a real teammate',
    content: {
      intro:
        "Claude Code has a built-in command system. Type / inside a session to see all commands. Some are built-in, and you can write your own.",
      steps: [
        {
          label: "Built-in slash commands",
          code: "/help          — see all commands\n/clear         — clear context, start fresh\n/compact       — summarize history to save space\n/review-pr     — review a pull request\n/commit        — write and stage a git commit",
          language: "text",
        },
        {
          label: "Custom skills: write your own commands",
          code: "# .claude/commands/daily-standup.md\n\nLook at today's git commits and open PRs, then\nwrite a short standup update for Slack:\n- What I did\n- What I'm doing today\n- Any blockers",
          language: "markdown",
          note: "Save this as a .md file — now you have /daily-standup",
        },
        {
          label: "MCP Servers: connect Claude to anything",
          code: '# .claude/settings.json\n{\n  "mcpServers": {\n    "github": {\n      "command": "npx",\n      "args": ["@anthropic-ai/mcp-server-github"]\n    }\n  }\n}',
          language: "json",
          note: "MCP (Model Context Protocol) lets Claude read GitHub issues, Notion pages, databases, and more",
        },
      ],
      terminal: [
        { type: 'prompt', text: '/daily-standup' },
        { type: 'claude', text: '● Reading git log for today...' },
        { type: 'claude', text: '● Checking open PRs...' },
        { type: 'blank', text: '' },
        { type: 'output', text: '📋 Standup for @lcockerham:' },
        { type: 'output', text: '  ✅ Yesterday: Added auth middleware, fixed login 500 bug' },
        { type: 'output', text: '  🔨 Today: Finish /users pagination, review #42' },
        { type: 'output', text: '  🚧 Blockers: Need DB creds for staging env' },
      ],
      callout: {
        type: 'info',
        text: 'Skills are just Markdown files. Anyone on your team can write one. No code required.',
      },
    },
  },
  {
    id: 'tdd',
    title: 'TDD with Claude Code',
    emoji: '🧪',
    tagline: 'Write tests first — let Claude do the implementation',
    content: {
      intro:
        "Test-Driven Development (TDD) is the practice of writing a failing test before you write any implementation code. The cycle is: Red (write a failing test) → Green (write the minimum code to make it pass) → Refactor (clean it up). Claude Code is remarkably good at this loop.",
      steps: [
        {
          label: "Step 1 — Red: Ask Claude to write the tests",
          code: '> Write tests for a function called formatCurrency(amount, currency)\n> that takes a number and a currency code and returns a formatted string.\n> Don\'t implement the function yet — just the tests.',
          language: "text",
        },
        {
          label: "Claude writes the tests (they'll fail)",
          code: "// formatCurrency.test.ts\nimport { formatCurrency } from './formatCurrency'\n\ntest('formats USD correctly', () => {\n  expect(formatCurrency(1234.5, 'USD')).toBe('$1,234.50')\n})\n\ntest('formats EUR correctly', () => {\n  expect(formatCurrency(99.99, 'EUR')).toBe('€99.99')\n})\n\ntest('handles zero', () => {\n  expect(formatCurrency(0, 'USD')).toBe('$0.00')\n})",
          language: "typescript",
        },
        {
          label: "Step 2 — Green: Ask Claude to make them pass",
          code: "> Now implement formatCurrency() to make those tests pass.",
          language: "text",
        },
        {
          label: "Step 3 — Refactor: Ask Claude to clean it up",
          code: "> The implementation works but looks messy. Refactor it — keep all tests green.",
          language: "text",
        },
      ],
      terminal: [
        { type: 'prompt', text: 'npm test' },
        { type: 'output', text: ' FAIL src/formatCurrency.test.ts' },
        { type: 'output', text: '   ● formats USD correctly' },
        { type: 'output', text: '     Cannot find module \'./formatCurrency\'' },
        { type: 'blank', text: '' },
        { type: 'prompt', text: '> implement formatCurrency to make tests pass' },
        { type: 'claude', text: '● Writing src/formatCurrency.ts...' },
        { type: 'blank', text: '' },
        { type: 'prompt', text: 'npm test' },
        { type: 'output', text: ' PASS src/formatCurrency.test.ts' },
        { type: 'output', text: '   ✓ formats USD correctly (3ms)' },
        { type: 'output', text: '   ✓ formats EUR correctly (1ms)' },
        { type: 'output', text: '   ✓ handles zero (1ms)' },
      ],
      callout: {
        type: 'tip',
        text: 'TDD + Claude Code is a superpower: the tests define your intent in code, so Claude has a precise, machine-checkable spec to work against. It fails less often than "just make it work."',
      },
    },
  },
  {
    id: 'multiagent',
    title: 'Multiagent Flows',
    emoji: '🕸️',
    tagline: 'When one AI isn\'t enough',
    content: {
      intro:
        "A single Claude conversation has limits — it can only hold so much context. For large tasks (migrate a codebase, review 50 files, run parallel experiments), you can spawn multiple Claude agents that work independently and report back.",
      steps: [
        {
          label: "What is an agent?",
          note: "An 'agent' is just Claude running a task autonomously — reading files, running commands, making decisions — without you guiding every step.",
        },
        {
          label: "Built-in: Claude Code spawns agents automatically",
          code: '> Refactor every API endpoint to use the new auth middleware.\n> There are 12 endpoint files.',
          language: "text",
          note: "Claude Code may spawn sub-agents to work on files in parallel",
        },
        {
          label: "Agent SDK: build your own multiagent system",
          code: "import Anthropic from '@anthropic-ai/sdk'\n\nconst client = new Anthropic()\n\n// Orchestrator asks Claude to spawn workers\nconst response = await client.messages.create({\n  model: 'claude-sonnet-4-6',\n  max_tokens: 8096,\n  tools: [spawnAgentTool, readFileTool, writeFileTool],\n  messages: [{\n    role: 'user',\n    content: 'Review all 12 endpoint files in parallel and report issues'\n  }]\n})",
          language: "typescript",
        },
        {
          label: "Real patterns: orchestrator + workers",
          code: "Orchestrator Claude\n  ├── Worker A: reviews auth endpoints\n  ├── Worker B: reviews data endpoints  \n  └── Worker C: runs the test suite\n        ↓\n  Combines results, writes summary report",
          language: "text",
          note: "Workers run in parallel — a task that takes 30 min in one conversation takes 5 in parallel",
        },
      ],
      callout: {
        type: 'warning',
        text: 'Multiagent flows are powerful but tricky — agents can conflict if they edit the same file. Design your tasks so workers have clear, non-overlapping scopes.',
      },
    },
  },
  {
    id: 'behind-the-scenes',
    title: 'Behind the Scenes',
    emoji: '🔍',
    tagline: 'How this site was built with Claude Code',
    content: {
      intro:
        "This entire site was built with Claude Code — in a single conversation. Here's what that actually looked like.",
      steps: [
        {
          label: "The initial prompt",
          code: '> I want to do a talk at a local university on "cutting edge\n> software engineering with Claude Code". Can you help me build\n> an app that walks through the basics for an audience of CS\n> students? Cover skills, commands, TDD, and multiagent flows.',
          language: "text",
        },
        {
          label: "Plan mode first",
          note: "Before writing any code, Claude Code entered plan mode — asking clarifying questions about format, duration, audience, and topics. No code was written until the plan was approved.",
        },
        {
          label: "Then: scaffold, components, content",
          code: "git init && gh repo create claude-code-talk --public\nnpm create vite@latest . -- --template react-ts\nnpm install tailwindcss react-syntax-highlighter qrcode.react\n# ... then Claude wrote every component and all the content",
          language: "bash",
        },
        {
          label: "The result",
          note: "~8 component files, ~600 lines of content, deployed to GitHub — all from one conversation. Total wall-clock time: about 20 minutes.",
        },
      ],
      callout: {
        type: 'info',
        text: 'The meta-lesson: Claude Code isn\'t just for writing functions. It\'s for building entire things — and the workflow (plan → scaffold → build → deploy) is the same whether you\'re making a site or a production system.',
      },
    },
  },
  {
    id: 'live-demo',
    title: 'Live Demo',
    emoji: '🚀',
    tagline: 'You pick the project — we build it from scratch with Claude Code',
    content: {
      intro:
        "Vote for what we build live. Whichever option wins, we'll fire up Claude Code right now and build it from scratch — using the TDD and multiagent patterns we just covered.",
    },
  },
]
