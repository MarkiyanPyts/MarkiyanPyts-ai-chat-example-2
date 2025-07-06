# AI Agent Chat Application - Development Plan

## Project Overview

Building a responsive AI-powered chat application with multiple specialized agents, thread-based conversations, and tool calling capabilities. The application will simulate real AI agent interactions with authentication flows, user approvals, and streaming responses.

## Technology Stack

- **Frontend**: React 19, TypeScript, TanStack Router
- **State Management**: Zustand + TanStack Query
- **UI Components**: shadcn/ui with custom brand colors
- **Styling**: Tailwind CSS v4
- **Build Tool**: Vite

## Development Phases

### Phase 1: Foundation Setup

#### 1.1 Project Structure
- [ ] Create directory structure for features
- [ ] Set up type definitions
- [ ] Configure store with Zustand
- [ ] Set up routing structure

**Directory Structure:**
```
src/
├── types/
│   ├── agent.types.ts
│   ├── thread.types.ts
│   └── index.ts
├── store/
│   ├── useAgentStore.ts
│   ├── useThreadStore.ts
│   └── index.ts
├── hooks/
│   ├── useMockAPI.ts
│   ├── useFileUpload.ts
│   └── useStreamSimulation.ts
├── components/
│   ├── thread/
│   │   ├── ThreadSidebar.tsx
│   │   ├── ThreadBody.tsx
│   │   ├── ThreadHeader.tsx
│   │   └── SendMessage.tsx
│   ├── message/
│   │   ├── UserMessage.tsx
│   │   ├── AgentMessage.tsx
│   │   └── ToolCall.tsx
│   ├── modals/
│   │   ├── AuthenticationModal.tsx
│   │   └── ApprovalModal.tsx
│   └── ui/ (shadcn components)
├── services/
│   ├── mockAgents/
│   │   ├── allAiAgent.ts
│   │   ├── confluenceAgent.ts
│   │   ├── jiraAgent.ts
│   │   └── salesforceAgent.ts
│   └── agentRouter.ts
└── routes/
    ├── index.tsx
    └── thread.$id.tsx
```

#### 1.2 Type System Implementation
- [ ] Implement all TypeScript interfaces from specification
- [ ] Create type guards and utilities
- [ ] Set up proper type exports

```
export type LogLevel = "info" | "warning" | "error";

export type AuthenticationType = "confluence" | "jira" | "github" | "salesforce" | null;

export type ToolStatus = 
  | "waiting_for_authentication" 
  | "waiting_user_approval" 
  | "in_progress" 
  | "completed" 
  | "failed" 
  | "user_rejected";

// Log entry interface
export interface LogEntry {
  timestamp: string; // ISO 8601 format
  type: LogLevel;
  message: string;
}

// Tool data interface
export interface ToolData {
  action: string; // Markdown formatted action details
  description: string;
  logs: LogEntry[];
}

// Stream message interface for agent messages
export interface StreamMessage {
  id: string;
  type: "text" | "tool";
  timestamp: string; // ISO 8601 format
  agent_id: string;
  agent_name: string;
  agent_icon: string; // URL or emoji
  
  // For text messages (can contain markdown)
  response_delta?: string; // Markdown chunks of response stream
  
  // For tool messages
  toolName?: string;
  toolId?: string;
  status?: ToolStatus;
  authenticationType?: AuthenticationType;
  data?: ToolData;
}

// User message interface
export interface UserMessage {
  id: string;
  type: "user";
  timestamp: string; // ISO 8601 format
  content: string; // User's message content
  user_id?: string; // Optional user identifier
  user_name?: string; // Optional user display name
}

// Agent message interface
export interface AgentMessage {
  id: string;
  type: "agent";
  timestamp: string; // ISO 8601 format
  agent_id: string;
  agent_name: string;
  agent_icon: string; // URL or emoji
  chunks: StreamMessage[]; // Array of stream message chunks
  final_content?: string; // Optional final assembled content
  status: "streaming" | "completed" | "failed";
}

// Union type for all message types
export type Message = UserMessage | AgentMessage;

// Thread interface
export interface Thread {
  id: string;
  name: string;
  messages: Message[];
  created_at: string; // ISO 8601 format
  updated_at: string; // ISO 8601 format
}

// Collection of threads
export interface ThreadCollection {
  threads: Thread[];
}
```

### Phase 2: Core Infrastructure

#### 2.1 State Management
- [ ] Implement Zustand store with following slices:
  - Thread management (create, read, update, delete)
  - Message management
  - Authentication state
  - UI state (modals, trust mode, etc.)
- [ ] Integrate TanStack Query for async operations

#### 2.2 Mock API Middleware
- [ ] Create mock streaming implementation
- [ ] Implement agent router with keyword mapping
- [ ] Build individual agent response functions
- [ ] Add stream delay simulation (1s for tools, 0.2s for text)

#### 2.3 Agent Implementation
- [ ] AllAi Agent (orchestrator)
- [ ] Confluence Agent
- [ ] JIRA Agent
- [ ] Salesforce Agent

### Phase 3: UI Components

#### 3.1 Thread Management UI
- [ ] Thread sidebar with CRUD operations
- [ ] Thread header with rename/delete
- [ ] Thread body with message display
- [ ] Send message component with file upload

#### 3.2 Message Components
- [ ] User message display
- [ ] Agent message with streaming support
- [ ] Tool call accordion with status indicators
- [ ] Markdown rendering support

#### 3.3 Interactive Components
- [ ] Authentication modal (username/password)
- [ ] Approval modal with action details
- [ ] Trust mode toggle
- [ ] File upload with preview

### Phase 4: Features & Polish

#### 4.1 Advanced Features
- [ ] Multi-file upload support
- [ ] Thread persistence (localStorage)
- [ ] Keyboard shortcuts
- [ ] Mobile responsive design
- [ ] Dark mode support

#### 4.2 User Experience
- [ ] Loading states
- [ ] Error handling
- [ ] Animations and transitions
- [ ] Empty states
- [ ] Tool status indicators

## Implementation Details

### Mock API Streaming Architecture

- Simulate streaming AI API responses using React Context API hook
- Handle request/response patterns similar to production AI APIs with tanstack query
- Each Agent will have it’s own middleware function in the hook
- Inside a middleware, we will have a map of words to agent middleware function calls called **agentsMap**
- When user sends message from the UI of the thread(check details in Threads UX  section bellow), this message goes to the **agentRouter** function in the mock API middleware where the string is analyzed, and if certain words is found in a string we will invoke a mock agent response function that has certain logic and responds with a stream of messages of type **StreamMessage** described below.

Each message in the stream can  be AI tool call or just a text message chunk that comes before or after the tool call chunk

Simulate this streaming behaviour that sends chunks of stream as messages over time, every 1 second(0.2 for text to simulate typing UX), unless  chunks have statuses of **waiting_for_authentication**, **waiting_user_approval**, in these cases stop the stream(not close it) and wait for local state variables **isUserApproved** or **IsAuthenticated** to be set to true (set them to false at the start of every tool call…meaning after the first chunk of specific tool id is added to the stream)
- As agent function stream starts **isSendMessageBlocked** state variable in the store needs to be set to true when stream finishes it’s work it needs to be set to false
- When the agent function call ends, it closes the stream, therefore resolving tanstack query call
- After current stream is closed agent middleware function can trigger event in FD app that does tanstack query call to different agent from agentsMap in the store that will create another AI response message in UI


Add to the store function called **triggerAuthentication** that will trigger authentication modal in FD app having title that correctly maps to the tool chunk that is currently in **waiting_for_authentication** it has info about what auth it should be in **authenticationType** prop if user fills the username and password fields (no other validation required it’s just mock functionality) and clicks authenticate button then set **IsAuthenticated** to true (this should trigger next chunk in the stream as per logic described above).Make a separate react component for it with chad cn for this you can look up latest chad cn docs on the web

Add to the store function called triggerUserApproval , it should check store property called **isTrustModeActive(add it to store)** if it’s true then automatically set **isUserApproved** to true else show it the UI a component that allows user to approve or reject the tool call 

Show in this component action and description from current ToolData so user could know what he is about to confirm.

If user approved call method from the store that is setting **isUserApproved to true …** you can prop drill this to the UI component from the store on the page

If user rejected then call method in the store that is adding a last chunk to the message stream that has **user_rejected** ToolStatus

Make a separate react component for it with chad cn for this you can look up latest chad cn docs on the web

### Agent Router Logic

```typescript
const agentRouter = (userMessage: string): AgentFunction => {
  const lowercaseMessage = userMessage.toLowerCase();
  
  for (const [agent, keywords] of Object.entries(agentMappingKeywords)) {
    if (keywords.some(keyword => lowercaseMessage.includes(keyword))) {
      return agents[agent];
    }
  }
  
  return agents.allAiAgent;
};
```

## Key Features to Implement

### 1. Authentication Flow
- Modal appears when tool status is `waiting_for_authentication`
- Simple username/password form
- Updates store state on success
- Resumes stream automatically

### 2. Approval Flow
- Checks `isTrustModeActive` flag
- Auto-approves if trust mode is on
- Shows approval UI with action details
- Handles approve/reject actions

### 3. Thread Management
- Make a threads sidebar component that is having **ThreadCollection** interface, to support it add prop of this type in the store and methods to create, delete and rename threads by id. There should be ability in UI to toggle threads sidebar component with animation that allows to get more real estate for thread conversation interface.

When user clicks on “New Thread” button a CreateThread(threadName: string) ⇒ {} method from the store should be called…it should push this thread to the store and trigger redirect to /thread/${id} route that needs to be added. The page will fetch message by id from the store property with Thread interface under **ThreadCollection**
- Make React components with chadcn help to interact with this methods
- Make some nice homepage route that will allow to browse the threads sidebar yet have some nice SVG encouraging to create your first thread
- When thread is created user is to be redirected to thread route which would have unique id use uuid library
- In the thread interface component there should be ability to toggle **isTrustModeActive** from the store, method to do that is to be prop drilled from page level
- /thread/${id} route will show ThreadBody and SendMessage components, above thread body we should also have thread header with it’s name and delete/rename UX (make subcomponents for it, use above mentioned store methods to power the functionality)
- ThreadBody component will display thread messages(**Message** part of interface) and tool calls from it, tool calls should have UX elements for functionality described above(one message of AgentMessage type can display multiple tool calls one after other and final reply that consists from StreamMessage of type text after tool calls are done). Use chad cn to create this components
- When tool call is waiting for authentication on a tool called tile and display authenticate button that will open a pop-up allowing to authenticate. After user authenticated, make a tool tile active signaling to the user. Success of the operation. When waiting for approval is in order, display on the tile "approve" or "reject".  Tile should be an expandable accordion that allows the user to check details about the tool call, .
- SendMessage component will allow users to send messages(which they can type in text area) via SendMessage method from the store (please create one). This method will push UserMessage to the store under prop with ThreadCollection interface. It will find needed thread using ${id} url parameter
- File Upload functionality - user will be able to upload the file and it will appear attached to the message before it is send. useFileUpload hook is to be created on FD for this mock functionality.  We should also support multiple file uploads. File upploaded should appear attached to user message in thread UI


- UUID-based thread IDs
- Sidebar with thread list
- Create/rename/delete operations
- Route-based thread selection

### 4. Message Streaming
- Real-time chunk display
- Markdown rendering
- Tool call accordions
- Status indicators

## Success Metrics

1. **Performance**
   - Smooth streaming without jank
   - Fast thread switching
   - Responsive UI interactions

2. **User Experience**
   - Intuitive agent interactions
   - Clear status indicators
   - Seamless authentication/approval flows

3. **Code Quality**
   - 100% TypeScript coverage
   - Clean, maintainable architecture

## Next Steps

1. Set up the project structure
2. Create type definitions
3. Consult AGENTS_EXAMPLE.md file to know more about agents we will use in UI
4. Implement the store
5. Build the mock API system
6. Create base UI components

Ready to start implementation step by step!