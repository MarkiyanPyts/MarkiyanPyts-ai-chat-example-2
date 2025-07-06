# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

This is an AI Agent Chat Application built as a React 19 SPA with Vite and TypeScript. It features multiple specialized AI agents (JIRA, Confluence, Salesforce) with streaming responses, authentication flows, and tool execution capabilities. The project uses TanStack Router for file-based routing, TanStack Query for data fetching, Zustand for global state management, and shadcn/ui for UI components. The project uses ESM modules, strict TypeScript configuration, and Tailwind CSS v4.

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

# UI Components
npx shadcn@latest add [component]  # Add shadcn/ui components
```

## Architecture

### UI Framework
- **shadcn/ui** components with "new-york" theme variant
- **Tailwind CSS v4** with complete theming system
- **Dark mode support** with CSS variables and OKLCH color space
- **Lucide React** icons integration
- **Path aliases**: `@/components`, `@/lib`, `@/hooks`

### State Management
- **Zustand** for global state management (`useChatStore`)
  - Thread management (create, delete, rename with UUID-based IDs)
  - Message streaming with real-time chunks
  - Authentication flow management
  - User approval system with trust mode
  - Tool status tracking
  - UI state (sidebar visibility, modal states, send blocking)
- **TanStack Query** for server state management
- **Query devtools** available in development
- **QueryClient** configured at app root

### Routing System
- **File-based routing** with TanStack Router
- Routes defined in `src/routes/` directory
- `src/routeTree.gen.ts` is auto-generated - **never edit manually**
- Root layout in `src/routes/__root.tsx` with `<Outlet />` for child routes
- Router devtools available in development

### Key Directories
- `src/routes/` - Route components (file-based routing)
  - `/` - Homepage with ChatLayout
  - `/thread/$threadId` - Individual thread view
- `src/components/` - Reusable components
  - `chat/` - ChatLayout component
  - `message/` - AgentMessage, UserMessage, SendMessage, ToolCall components
  - `modals/` - AuthPopup and approval modals
  - `thread/` - ThreadSidebar, ThreadHeader, ThreadBody components
  - `ui/` - shadcn/ui components
- `src/hooks/` - Custom React hooks (useFileUpload, useMockAPI)
- `src/lib/` - Utility functions and shared logic
- `src/services/` - Agent router logic and mock services
  - `agentRouter.ts` - Keyword-based agent routing
  - `mock/` - Mock API and streaming simulation
  - `mockAgents/` - Individual agent implementations
- `src/store/` - Zustand store (`useChatStore`)
- `src/types/` - TypeScript type definitions
- `public/` - Static assets
- `dist/` - Build output (git ignored)

### Configuration
- **Vite**: `vite.config.ts` with TanStack Router, Tailwind CSS v4 plugins, path alias `@/` → `./src/`
- **TypeScript**: Strict mode enabled, ES2022 target, path mapping configured
- **Testing**: Vitest with jsdom environment, @testing-library/react
- **shadcn/ui**: `components.json` with TypeScript, Lucide icons, CSS variables

## Styling System

### Custom Brand Colors (IMPORTANT)
**This project uses ONLY custom brand colors. Do NOT use default Tailwind colors.**

The following custom colors are available:
- **Primary Colors**: `allai-blue-*` (20, 30, 50, 55, 60, 70, 90) - Main brand blue
- **System Neutrals**: `system-neutral-*` (05, 10, 15, 20, 25, 30, 35, 55, 65, 80, 85, 90, 95, 99)
- **Accent Colors**:
  - `flamingo-rose-*` (30, 50, 60, 70) - Error/destructive states
  - `fluor-green-*` (20, 30, 40) - Success states
  - `light-orange-*` (40, 60, 70) - Warning states
  - `tangerine-orange-70` - Secondary accent
- **Additional Colors**:
  - `bronze-*` (30, 55, 65, 90)
  - `silver-*` (30, 70, 80, 90)
  - `gold-*` (25, 60, 75, 95)
  - `purple-*` (45, 70, 75, 90)

  for further details look at COLOR_PALETTE.md and src/styles.css

**Color Usage Guidelines:**
- Primary actions: Use `allai-blue-50` (light) / `allai-blue-60` (dark)
- Backgrounds: Use `system-neutral-99` (light) / `system-neutral-10` (dark)
- Text: Use `system-neutral-05` (light) / `system-neutral-95` (dark)
- Borders: Use `system-neutral-85` (light) / `system-neutral-25` (dark)
- Success: Use `fluor-green-*` colors
- Errors: Use `flamingo-rose-*` colors
- Warnings: Use `light-orange-*` colors

### Tailwind CSS v4
- **CSS variables** for theming with `--color-*` custom properties
- **Dark mode** using custom variant `@custom-variant dark`
- **Radius system**: `--radius-sm/md/lg/xl` variants
- **shadcn/ui components** automatically use the mapped custom colors

### Utility Functions
- `src/lib/utils.ts` - Core `cn()` function combining `clsx` and `tailwind-merge`
- Use for conditional styling: `cn("base-classes", condition && "conditional-classes")`

## Development Notes

- Uses React 19 with new JSX transform
- ESM module system (import/export syntax required)
- Hot Module Replacement via Vite
- Performance monitoring with web-vitals
- Auto code splitting handled by TanStack Router
- Animation utilities available via `tw-animate-css`

## AI Agent System

### Agent Architecture
- **Agent Router** (`src/services/agentRouter.ts`) - Keyword-based routing that analyzes user messages
- **Four Specialized Agents**:
  - **JIRA Agent**: Issue tracking (keywords: jira, issue, bug, task, etc.)
  - **Confluence Agent**: Documentation (keywords: confluence, page, document, wiki, etc.)
  - **Salesforce Agent**: CRM operations (keywords: salesforce, crm, opportunity, soql, etc.)
  - **AllAi Agent**: Default agent for unmatched requests and orchestration

### Mock Streaming Implementation
- Simulates real AI agent responses with timed chunks (1s intervals, 0.2s for text)
- Supports authentication workflows with modal interruptions
- Handles user approval flows with trust mode bypass
- Tool execution simulation with success/failure states
- Stream interruption for `waiting_for_authentication` and `waiting_user_approval` statuses
- **isSendMessageBlocked** state variable prevents new messages during streaming

### Authentication & Approval Flow
- Service-specific authentication (JIRA, Confluence, Salesforce)
- Trust mode for automatic approvals
- Manual approval with action details
- Tool execution status tracking
- User rejection handling
- **isUserApproved** and **isAuthenticated** state variables control stream resumption

## Thread Management

### Thread Features
- Create new threads with auto-generated names
- Rename/delete existing threads
- UUID-based thread identification
- Thread persistence in Zustand store
- Sidebar toggle for mobile optimization

### Message System
- Real-time message chunk display
- Markdown rendering support with `react-markdown`
- Tool call status indicators
- Stream interruption for authentication/approval
- Typing indicator simulation
- File upload support with preview capabilities

## Adding New Routes

Create new files in `src/routes/` - the route tree will auto-generate. Follow existing patterns in `src/routes/index.tsx` and `src/routes/thread/$threadId.tsx`.

## Adding UI Components

1. Install shadcn/ui components: `npx shadcn@latest add button`
2. Components installed to `src/components/ui/`
3. Import and use: `import { Button } from "@/components/ui/button"`
4. Use `cn()` utility for conditional styling
5. Leverage Lucide React icons: `import { ChevronRight } from "lucide-react"`

## Adding New Agents

1. Create agent implementation in `src/services/mockAgents/`
2. Add agent to `agentsMap` in `src/services/mock/mockStreamingService.ts`
3. Update agent router keywords in `src/services/agentRouter.ts`
4. Define agent-specific types in `src/types/`
5. Test streaming behavior and authentication flows

## State Management Patterns

### Zustand Store Usage
```typescript
import { useChatStore } from '@/store/useChatStore'

// Access state
const { threads, currentThreadId, messages } = useChatStore()

// Update state
const { createThread, sendMessage, updateStreamChunk } = useChatStore()
```

### Stream Management
- Use `isSendMessageBlocked` to prevent new messages during streaming
- Set `isUserApproved` and `isAuthenticated` to `false` at start of tool calls
- Handle stream interruption for authentication and approval workflows
- Close stream when agent function call ends to resolve TanStack Query

## Important Development Notes

- **Never edit** `src/routeTree.gen.ts` manually - it's auto-generated
- **Always use custom brand colors** - never use default Tailwind colors
- **Follow streaming patterns** - respect authentication and approval interruptions
- **Use TypeScript strictly** - all components and functions are fully typed
- **Test agent routing** - ensure keywords properly route to correct agents