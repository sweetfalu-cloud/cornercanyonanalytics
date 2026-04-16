# Cloudflare React + Hono Starter Template

[cloudflarebutton]

A production-ready full-stack starter template for Cloudflare Workers and Pages. Features a modern React frontend with Tailwind CSS, shadcn/ui components, TanStack Query, React Router, and a Hono-powered API backend. Perfect for rapid development of performant, edge-deployed applications.

## Features

- **Modern React Stack**: React 18, Vite, TypeScript, React Router, TanStack Query for data fetching.
- **Beautiful UI**: shadcn/ui components, Tailwind CSS with custom design system, dark mode support, responsive design.
- **API Backend**: Hono framework for type-safe API routes, CORS enabled, error handling, health checks.
- **Developer Experience**: Hot reload, error boundaries, client error reporting, theme toggle, optional sidebar layout.
- **Cloudflare Optimized**: Deploy to Workers/Pages with zero-config SPA handling, assets bundling.
- **Production Ready**: ESLint, TypeScript strict mode, optimized builds, PWA-ready.
- **Extensible**: Easy to add routes (`worker/userRoutes.ts`), pages (`src/pages/`), components (`src/components/`).

## Tech Stack

- **Frontend**: React 18, TypeScript, Vite, Tailwind CSS, shadcn/ui, Lucide icons, Framer Motion, Sonner (toasts), React Query.
- **Backend**: Hono, Cloudflare Workers runtime.
- **State/UI**: Zustand, React Hook Form, Zod validation.
- **Utils**: clsx, Tailwind Merge, Immer, UUID.
- **Dev Tools**: Bun, ESLint, Wrangler, Cloudflare Vite plugin.

## Quick Start

### Prerequisites

- [Bun](https://bun.sh/) installed (`curl -fsSL https://bun.sh/install | bash`).
- [Cloudflare CLI (Wrangler)](https://developers.cloudflare.com/workers/wrangler/install-and-update/) (`bunx wrangler@latest init` or global install).
- Cloudflare account and API token for deployment.

### Installation

1. Clone the repository.
2. Install dependencies:

   ```bash
   bun install
   ```

3. (Optional) Generate Worker types:

   ```bash
   bun run cf-typegen
   ```

### Development

Start the development server:

```bash
bun run dev
```

- Frontend: http://localhost:3000
- API: http://localhost:3000/api/health (test endpoint)

Add frontend pages in `src/pages/` and update `src/main.tsx`.
Add API routes in `worker/userRoutes.ts`.

### Build

```bash
bun run build
```

Builds assets for production deployment.

## Usage

### Frontend Development

- Replace `src/pages/HomePage.tsx` with your app content.
- Use `AppLayout` from `src/components/layout/AppLayout.tsx` for sidebar layouts.
- Components: Full shadcn/ui library available in `src/components/ui/`.
- Hooks: `useTheme`, `useMobile`, custom hooks in `src/hooks/`.
- Styling: Extend Tailwind config in `tailwind.config.js`.

### Backend Development

- Add routes in `worker/userRoutes.ts` (e.g., `app.post('/api/data', ...)`).
- Access bindings via `Env` interface in `worker/core-utils.ts`.
- Core worker entry: Do not modify `worker/index.ts`.
- Test API: `curl http://localhost:3000/api/test`.

### Example API Route

```typescript
// worker/userRoutes.ts
app.get('/api/users/:id', async (c) => {
  const id = c.req.param('id');
  return c.json({ id, message: 'User fetched' });
});
```

## Deployment

Deploy to Cloudflare Workers/Pages:

1. Login to Wrangler:

   ```bash
   wrangler login
   ```

2. (Optional) Configure `wrangler.jsonc` with your account ID, secrets.

3. Deploy:

   ```bash
   bun run deploy
   ```

Your app will be live at `https://${wrangler_project_name}.workers.dev`.

[cloudflarebutton]

## Scripts

| Script | Description |
|--------|-------------|
| `bun run dev` | Start dev server |
| `bun run build` | Build for production |
| `bun run lint` | Lint codebase |
| `bun run preview` | Preview production build |
| `bun run deploy` | Build + deploy to Cloudflare |
| `bun run cf-typegen` | Generate Worker types |

## Project Structure

```
├── src/              # React frontend
│   ├── components/   # UI components, shadcn/ui
│   ├── pages/        # Route pages
│   ├── hooks/        # Custom hooks
│   └── lib/          # Utilities
├── worker/           # Hono API backend
│   └── userRoutes.ts # Add your routes here
├── tailwind.config.js # Design system
└── wrangler.jsonc    # Cloudflare config
```

## Contributing

1. Fork the repo.
2. Create a feature branch.
3. Install deps with Bun.
4. Commit changes.
5. Open PR.

## License

MIT License. See [LICENSE](LICENSE) for details.