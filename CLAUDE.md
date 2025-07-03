# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is a React 19 SPA built with Vite and TypeScript, using TanStack Router for file-based routing. The project uses ESM modules and strict TypeScript configuration.

## Development Commands

```bash
# Development
npm install          # Install dependencies
npm run dev         # Start development server on port 3000
npm run start       # Alternative to dev

# Testing
npm run test        # Run tests once (Vitest with jsdom)

# Production
npm run build       # Build for production (Vite + TypeScript compilation)
npm run serve       # Preview production build
```

## Architecture

### Routing System
- **File-based routing** with TanStack Router
- Routes defined in `src/routes/` directory
- `src/routeTree.gen.ts` is auto-generated - **never edit manually**
- Root layout in `src/routes/__root.tsx` with `<Outlet />` for child routes
- Router devtools available in development

### Key Directories
- `src/routes/` - Route components (file-based routing)
- `src/` - Main application code
- `public/` - Static assets
- `dist/` - Build output (git ignored)

### Configuration
- **Vite**: `vite.config.ts` with TanStack Router plugin and path alias `@/` → `./src/`
- **TypeScript**: Strict mode enabled, ES2022 target, path mapping configured
- **Testing**: Vitest with jsdom environment, @testing-library/react

## Development Notes

- Uses React 19 with new JSX transform
- ESM module system (import/export syntax required)
- Hot Module Replacement via Vite
- Performance monitoring with web-vitals
- Plain CSS styling (no framework like Tailwind)
- Auto code splitting handled by TanStack Router

## Adding New Routes

Create new files in `src/routes/` - the route tree will auto-generate. Follow existing patterns in `src/routes/index.tsx` and `src/routes/about.tsx`.