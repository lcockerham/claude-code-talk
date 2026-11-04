# Cutting-Edge Software Engineering with Claude Code

Companion site for a talk Lucas Cockerham gave to computer science students at a local university in spring 2026. The audience could follow along on their own devices (via a QR code) while the talk covered:

- What Claude Code is and how it differs from a chat assistant
- First commands, skills, and slash commands
- Plan mode
- Test-driven development with Claude Code
- Multiagent flows (orchestrator + workers)
- Tokens and cost
- How this site was itself built with Claude Code
- Further learning, getting set up, and a live demo where the audience voted on what to build

> **Note:** The content dates from spring 2026. Models, pricing, plans, and commands are as they were then and may have changed since.

## Running it

Built with React, TypeScript, Vite, and Tailwind CSS.

```sh
npm install
npm run dev      # start the dev server
npm run build    # type-check and build to ./dist
```

The slide content lives in `src/data/sections.ts`.

## License

[MIT](LICENSE)
