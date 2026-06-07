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
    title: 'Claude Code vs. Just Using ChatGPT',
    emoji: '🧠',
    tagline: 'Same underlying model — very different results. Here\'s why the wrapper matters.',
    content: {
      intro:
        "You've probably used ChatGPT or Claude in a browser. Claude Code uses the same underlying model — so why is it dramatically better for coding? The answer is the harness: the scaffolding that connects the model to your actual project.",
      steps: [
        {
          label: "A chatbot sees what you paste. Claude Code sees your project.",
          note: "When you paste code into ChatGPT, you're manually copying context. Claude Code reads your files directly — it can see the entire codebase, run your tests, read error output, and make edits. It's the difference between describing a problem and showing it.",
        },
        {
          label: "The harness multiplies the model's capability",
          code: "Model alone:    ██████░░░░  ~60% on SWE-bench\nWith harness:   ██████████  ~90%+ on SWE-bench\n\n            (same model, different wrapper)",
          language: "text",
          note: "SWE-bench measures whether AI can fix real GitHub issues end-to-end. The same Claude model jumps from ~60% to 90%+ just by adding a proper tool-use harness. Scaffolding matters as much as the model itself.",
        },
        {
          label: "Claude Code has tools. A chatbot doesn't.",
          note: "Claude Code can read files, write files, run shell commands, search your codebase, and call external services — all in a loop. A browser chatbot can only generate text. Tool use is what turns a language model into an agent.",
        },
        {
          label: "The context window: Claude's working memory",
          code: "┌─────────────────────────────────────────┐\n│  CONTEXT WINDOW                         │\n│                                         │\n│  [Your files]  [Chat history]           │\n│  [Instructions]  [Tool results]         │\n│                                         │\n│  ← Everything Claude can \"see\" right now│\n└─────────────────────────────────────────┘",
          language: "text",
          note: "Claude Sonnet 4.6 has a ~200k token context window (~150k words). Large codebases fill it fast. Use /compact to free up space, and CLAUDE.md to give persistent instructions that reload every session.",
        },
      ],
      callout: {
        type: 'info',
        text: 'Mental model: Claude Code is Claude with eyes (file reading), hands (file editing), and legs (shell commands). A browser chatbot is Claude in a box.',
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
          note: "Claude Code reads your project files and is ready to help. No config, no setup — just talk to it.",
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
          label: "Building a real skill: anatomy and best practices",
          code: "# .claude/commands/review.md\n# Usage: /review src/routes/auth.ts\n\nYou are doing a focused code review of: $ARGUMENTS\n\n## Steps\n1. Read the file at $ARGUMENTS\n2. Read CLAUDE.md to understand project conventions\n3. Check for:\n   - Logic errors or missing edge cases\n   - Unvalidated inputs at system boundaries\n   - Missing test coverage for new code paths\n   - Any violations of the patterns in CLAUDE.md\n\n## Output format\n### Summary\n[One sentence: what this code does]\n\n### Issues\n- [line N] — [description and suggested fix]\n\n### Looks good\n- [things the author did well]\n\nBe direct. Skip praise for things that are merely correct.",
          language: "markdown",
          note: "Use $ARGUMENTS to accept input when you invoke the skill — here, /review src/auth.ts passes the file path. Reference CLAUDE.md so the skill automatically stays in sync with your project's own conventions. Project skills live in .claude/commands/; global skills (available in every project) live in ~/.claude/commands/.",
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
    id: 'try-it-yourself',
    title: 'Try It Yourself',
    emoji: '🛠️',
    tagline: 'What it costs, how to sign up, and what to build first',
    content: {
      intro:
        "Claude Code is a paid tool, but getting started is cheap — $5 in API credits will last you through several real projects. Here's exactly what you need.",
      steps: [
        {
          label: "Option A — Claude.ai Pro ($17/mo, easiest)",
          code: "1. Sign up at claude.ai\n2. Upgrade to Pro ($17/month)\n3. npm install -g @anthropic-ai/claude-code\n4. claude  ← you're in",
          language: "bash",
          note: "Pro includes Claude Code within your subscription — no separate billing. Best if you plan to use it regularly.",
        },
        {
          label: "Option B — API credits (pay-as-you-go, cheapest to start)",
          code: "1. Sign up at console.anthropic.com\n2. Add $5–$20 in credits\n3. npm install -g @anthropic-ai/claude-code\n4. export ANTHROPIC_API_KEY=sk-ant-...\n5. claude",
          language: "bash",
          note: "$5 in credits goes a long way for light use — roughly 10–20 casual coding sessions at Sonnet pricing.",
        },
        {
          label: "System requirements",
          code: "node --version   # needs 18+\nnpm --version    # needs 8+\n# Works on macOS, Linux, and Windows (WSL recommended)",
          language: "bash",
        },
        {
          label: "What to build first",
          note: "Best first project: something you actually need. A script to automate a tedious task, a REST API for a class project, a CLI tool for your workflow. Give Claude Code a real problem — that's when it shines.",
        },
      ],
      callout: {
        type: 'tip',
        text: 'Start with API credits if you want to experiment before committing. Start with Pro if you\'re going to use it daily. Either way: the first hour of real use will teach you more than any tutorial.',
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
  {
    id: 'react-vite-primer',
    title: 'React & Vite Primer',
    emoji: '⚛️',
    tagline: 'Backup slide — a quick foundation for understanding this site\'s stack',
    content: {
      intro:
        "This site is built with React and Vite. If those names are new to you, here's the 5-minute version.",
      steps: [
        {
          label: "React: UI as a tree of components",
          code: "// A component is just a function that returns UI\nfunction Greeting({ name }: { name: string }) {\n  return <h1>Hello, {name}!</h1>  // JSX — HTML-in-JS\n}\n\n// Compose components like HTML tags\nfunction App() {\n  return (\n    <div>\n      <Greeting name=\"CS students\" />\n      <Greeting name=\"everyone else\" />\n    </div>\n  )\n}",
          language: "tsx",
          note: "JSX looks like HTML but it's JavaScript. React turns your component tree into actual DOM nodes in the browser.",
        },
        {
          label: "State: data that triggers re-renders",
          code: "import { useState } from 'react'\n\nfunction Counter() {\n  const [count, setCount] = useState(0)  // [value, setter]\n\n  return (\n    <button onClick={() => setCount(count + 1)}>\n      Clicked {count} times\n    </button>\n  )\n}",
          language: "tsx",
          note: "When you call setCount(), React re-renders only the components that depend on that state. Everything else stays untouched.",
        },
        {
          label: "Effects: sync with the outside world",
          code: "import { useEffect, useState } from 'react'\n\nfunction UserProfile({ userId }: { userId: string }) {\n  const [user, setUser] = useState(null)\n\n  useEffect(() => {\n    fetch(`/api/users/${userId}`)\n      .then(r => r.json())\n      .then(setUser)\n  }, [userId])  // re-runs when userId changes\n\n  return user ? <div>{user.name}</div> : <div>Loading...</div>\n}",
          language: "tsx",
          note: "useEffect runs after render. The dependency array controls when it re-runs. Omit it and it runs every render; pass [] and it runs once on mount.",
        },
        {
          label: "Vite: the build tool that replaced webpack",
          code: "# Create a new React + TypeScript project\nnpm create vite@latest my-app -- --template react-ts\ncd my-app\nnpm install\nnpm run dev   # starts dev server at localhost:5173\n\n# What Vite does:\n# dev:   serves files with native ES modules — instant startup\n# build: bundles everything into optimized static files\n# preview: serves the production build locally",
          language: "bash",
          note: "Vite's dev server uses native browser ES modules — no bundling step during development. Hot Module Replacement (HMR) means edits appear in the browser in milliseconds.",
        },
        {
          label: "How React + Vite fit together",
          code: "my-app/\n├── index.html          ← Vite entry point\n├── vite.config.ts      ← Vite config (plugins, aliases)\n├── src/\n│   ├── main.tsx        ← mounts <App /> into index.html\n│   ├── App.tsx         ← root React component\n│   └── components/     ← your component files\n└── package.json\n\n# The flow:\n# Browser loads index.html\n#   → Vite serves main.tsx as an ES module\n#   → React renders <App /> into <div id=\"root\">\n#   → Your components take over",
          language: "text",
          note: "This site follows exactly this structure. The sections data lives in src/data/sections.ts — Claude Code wrote every line of it from a single prompt.",
        },
      ],
      callout: {
        type: 'info',
        text: 'React handles what the UI looks like and how it updates. Vite handles how the code gets from your editor to the browser. They solve different problems and work great together.',
      },
    },
  },
]
