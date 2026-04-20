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

export interface ResourceLink {
  label: string;
  url: string;
  description: string;
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
    links?: ResourceLink[];
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
    id: 'how-llms-work',
    title: 'How LLMs Work',
    emoji: '🧠',
    tagline: 'Why AI is surprisingly good at writing code',
    content: {
      intro:
        "Before we get into Claude Code specifically, it helps to understand what's actually happening under the hood. Large Language Models (LLMs) like Claude are neural networks trained on enormous amounts of text — including a huge chunk of the world's publicly available code.",
      steps: [
        {
          label: "What is an LLM?",
          note: "An LLM is a statistical model that predicts the most likely next token (word or word-piece) given everything that came before. It's trained by reading billions of documents and learning patterns. It's not \"thinking\" the way you are — but the patterns it has learned are remarkably sophisticated.",
        },
        {
          label: "Why are LLMs good at code specifically?",
          note: "Code is unusually structured and consistent. It has strict syntax, predictable patterns, and the internet has billions of examples with explanations alongside them (Stack Overflow, GitHub, tutorials). LLMs have seen more code examples — with context — than any human could read in a thousand lifetimes.",
        },
        {
          label: "What is 'context'?",
          code: "┌─────────────────────────────────────────┐\n│  CONTEXT WINDOW                         │\n│                                         │\n│  [Your files]  [Chat history]           │\n│  [Instructions]  [Tool results]         │\n│                                         │\n│  ← Everything Claude can \"see\" right now│\n└─────────────────────────────────────────┘",
          language: "text",
          note: "The context window is Claude's working memory for a session. It holds your files, your conversation, and any tool results. Older content gets pushed out as new content comes in. Claude has no memory between sessions unless you provide it.",
        },
        {
          label: "Context has a size limit",
          note: "Claude Sonnet 4.6 has a ~200,000 token context window. That sounds big (roughly 150,000 words), but large codebases fill it fast. When context fills up, older parts are dropped — Claude can 'forget' earlier instructions or files it read.",
        },
      ],
      callout: {
        type: 'info',
        text: 'The practical implication: be intentional about what you put in context. Point Claude at relevant files rather than your whole repo. Use /compact to summarize and free up space. Use CLAUDE.md to give persistent instructions that load every session.',
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
        {
          label: "The harness matters as much as the model",
          code: "Model alone:    ██████░░░░  ~60% on SWE-bench\nWith harness:   ██████████  ~90%+ on SWE-bench\n\n            (same model, different wrapper)",
          language: "text",
          note: "Studies on coding benchmarks show that the scaffolding around a model — how it reads files, calls tools, retries errors, and manages context — can have a multiplicative impact beyond what the model achieves alone. Claude Code is Anthropic's answer to that harness problem.",
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
        {
          label: "CLI vs MCP: which one do you actually need?",
          code: "# Use a plain CLI tool when:\n#  - the tool already has a good CLI (git, gh, curl, jq)\n#  - you just need Claude to run a command and read stdout\n#  - one-shot: fetch this, run that, move on\n\n> run the test suite and tell me what failed\n# Claude calls: npm test  ← plain shell, no MCP needed\n\n# Use MCP when:\n#  - you need structured/typed data back (not raw text)\n#  - the tool has no CLI (Notion, Linear, Figma)\n#  - Claude needs to search, paginate, or react to results\n#  - you want Claude to stay in a conversation with the service\n\n> find all open GitHub issues labeled 'bug' and triage them\n# Claude uses: mcp-server-github → typed Issue objects",
          language: "bash",
          note: "Rule of thumb: if a junior dev would just shell out to it, Claude can too. Reach for MCP when the interaction is richer than a single command.",
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
    id: 'plan-mode',
    title: 'Plan Mode',
    emoji: '📐',
    tagline: 'Think before you type — and make Claude do the same',
    content: {
      intro:
        "One of the most common mistakes with AI coding tools is jumping straight to implementation. Claude Code has a built-in \"plan mode\" that forces a think-first workflow: Claude reads the codebase, asks clarifying questions, and writes a structured plan before touching a single file.",
      steps: [
        {
          label: "Enter plan mode",
          code: "/plan\n\n# or just ask:\n> Before you write any code, make a plan for how you'd\n> implement user authentication in this app.",
          language: "text",
          note: "In plan mode, Claude can read files and search the codebase but cannot write or edit anything.",
        },
        {
          label: "What a good plan looks like",
          code: "## Plan: Add User Authentication\n\n### Context\nThis Express API currently has no auth. We need JWT-based\nlogin with protected routes.\n\n### Approach\n1. Install jsonwebtoken, bcrypt\n2. Add User model (id, email, passwordHash)\n3. POST /auth/register — hash password, create user\n4. POST /auth/login — verify password, return JWT\n5. Middleware: verifyToken() for protected routes\n\n### Files to modify\n- src/routes/ (add auth.ts)\n- src/middleware/ (add auth.ts)\n- src/models/ (add user.ts)\n\n### Tests\n- register with valid/invalid input\n- login success/failure\n- protected route with/without token",
          language: "markdown",
        },
        {
          label: "Approve or adjust the plan",
          note: "Review the plan. Ask Claude to change the approach if needed. Once you're happy, approve it — Claude exits plan mode and starts implementing. This one step catches most mistakes before any code is written.",
        },
      ],
      terminal: [
        { type: 'prompt', text: 'add authentication to this app' },
        { type: 'claude', text: '● Entering plan mode...' },
        { type: 'claude', text: '● Reading src/routes/ (4 files)' },
        { type: 'claude', text: '● Reading src/models/ (2 files)' },
        { type: 'blank', text: '' },
        { type: 'output', text: '  I have a few questions before I start:' },
        { type: 'output', text: '  1. JWT or session-based auth?' },
        { type: 'output', text: '  2. Is there an existing User model?' },
        { type: 'output', text: '  3. Should /admin routes require a role check?' },
        { type: 'blank', text: '' },
        { type: 'prompt', text: 'JWT, no existing User model, yes admin needs role:admin' },
        { type: 'claude', text: '● Writing plan...' },
        { type: 'output', text: '  [Plan written — awaiting approval]' },
      ],
      callout: {
        type: 'tip',
        text: 'Use plan mode for anything non-trivial: new features, refactors, migrations. It\'s free — the tokens spent planning save far more tokens (and time) in back-and-forth fixing mistakes.',
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
    id: 'tokens-and-cost',
    title: 'Tokens & Cost',
    emoji: '💰',
    tagline: 'Understanding what you\'re paying for — and how to spend less',
    content: {
      intro:
        "Claude Code is a paid tool — it uses the Claude API, which charges per token. A token is roughly ¾ of a word. Understanding tokens helps you use Claude Code efficiently and avoid surprise bills.",
      steps: [
        {
          label: "What is a token?",
          code: "\"Hello, world!\"  →  4 tokens\n\"function\"       →  1 token\n\"getUserByEmail\" →  4 tokens\n\"import React from 'react'\" → 6 tokens\n\n~750 words ≈ 1,000 tokens",
          language: "text",
          note: "Code is generally more token-dense than prose because of identifiers, brackets, and punctuation.",
        },
        {
          label: "How Claude Code is billed",
          code: "Input tokens  = everything Claude reads (files, history, instructions)\nOutput tokens = everything Claude writes (responses, code edits)\n\nInput is cheaper than output.\nClaude Sonnet 4.6: ~$3 / 1M input, ~$15 / 1M output",
          language: "text",
          note: "A typical coding session with Claude Code might use 50,000–200,000 tokens. At Sonnet pricing that's roughly $0.15–$0.60 per session.",
        },
        {
          label: "Keep costs down: use /compact",
          code: "/compact",
          language: "text",
          note: "This summarizes your conversation history into a shorter form, freeing context space and reducing input tokens on future turns. Run it every 20–30 turns in a long session.",
        },
        {
          label: "Keep costs down: be specific",
          code: "# Expensive: vague, forces Claude to read everything\n> fix the bug\n\n# Cheaper: specific, Claude reads only what's needed\n> the login route at src/routes/auth.ts:42 is returning\n> 403 for valid tokens — fix it",
          language: "text",
          note: "Vague prompts cause Claude to read more files to orient itself. Specific prompts reduce input tokens.",
        },
        {
          label: "Set a budget and monitor usage",
          note: "The Anthropic Console (console.anthropic.com) shows your usage in real time. You can set a monthly spend limit to avoid surprises. Claude Code also shows a running token count in the session header.",
        },
      ],
      callout: {
        type: 'warning',
        text: 'Multiagent flows multiply your token usage — each agent has its own context and uses tokens independently. A 5-agent parallel workflow costs roughly 5x a single-agent session. Great for speed, but watch the meter.',
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
    id: 'more-learning',
    title: 'More Learning',
    emoji: '📚',
    tagline: 'Go deeper — the best people to follow as this field moves fast',
    content: {
      intro:
        "AI-assisted development is moving quickly. These are the writers, researchers, and practitioners worth following if you want to stay sharp.",
      links: [
        {
          label: "Simon Willison's Blog",
          url: "https://simonwillison.net",
          description:
            "The most consistently useful writing on LLMs and AI tools in the wild. Simon builds with AI constantly and writes up what he learns — practical, honest, and prolific.",
        },
        {
          label: "Andrej Karpathy",
          url: "https://karpathy.ai",
          description:
            "Former Tesla AI director and OpenAI founding member. His YouTube series on neural networks and LLMs (\"Neural Networks: Zero to Hero\") is the best technical foundation available for free.",
        },
        {
          label: "Boris Cherny on X",
          url: "https://x.com/bcherny",
          description:
            "Sharp takes on AI tooling, agent design, and software engineering in the LLM era. Good signal-to-noise for practitioners who want the engineering perspective.",
        },
        {
          label: "AI Engineering — Chip Huyen",
          url: "https://www.oreilly.com/library/view/ai-engineering/9781098166298/",
          description:
            "The definitive book on building production AI systems. Covers RAG, fine-tuning, evaluation, and deployment. If you're serious about putting LLMs into real products, start here.",
        },
      ],
      callout: {
        type: 'tip',
        text: "The field moves fast enough that blog posts and X threads are often more current than books. Follow people who build things, not just people who write about building things.",
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
