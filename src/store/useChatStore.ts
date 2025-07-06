import { create } from 'zustand';
import { v4 as uuid } from 'uuid';
import type { 
  ThreadCollection, 
  Thread, 
  UserMessage, 
  AgentMessage, 
  StreamMessage, 
  AuthenticationType, 
  ToolData, 
  ToolStatus,
  FileAttachment 
} from '@/types';
import { agentRouter, getTargetAgentForHandoff, mockAgents } from '@/services/mock';

export interface ChatStore {
  // Thread management
  threadCollection: ThreadCollection;
  activeThreadId: string | null;
  
  // UI state
  isSidebarOpen: boolean;
  isSendMessageBlocked: boolean;
  isTrustModeActive: boolean;
  
  // Authentication and approval
  isAuthenticated: boolean;
  isUserApproved: boolean;
  isUserRejected: boolean;
  currentAuthenticationType: AuthenticationType;
  currentToolData: ToolData | null;
  
  // Modal states
  showAuthModal: boolean;
  showApprovalModal: boolean;
  
  // Current streaming state
  currentStreamingMessageId: string | null;
  
  // Actions
  createThread: (threadName: string) => string;
  deleteThread: (threadId: string) => void;
  renameThread: (threadId: string, newName: string) => void;
  setActiveThread: (threadId: string) => void;
  
  sendMessage: (threadId: string, content: string, attachments?: FileAttachment[]) => void;
  addStreamChunk: (threadId: string, messageId: string, chunk: StreamMessage) => void;
  completeAgentMessage: (threadId: string, messageId: string) => void;
  
  toggleSidebar: () => void;
  toggleTrustMode: () => void;
  setSendMessageBlocked: (blocked: boolean) => void;
  
  triggerAuthentication: (authenticationType: AuthenticationType) => void;
  setAuthenticated: (authenticated: boolean) => void;
  
  triggerUserApproval: (toolData: ToolData) => void;
  setUserApproved: (approved: boolean) => void;
  rejectUserApproval: (messageId: string, toolCallId: string) => void;
  
  closeAuthModal: () => void;
  closeApprovalModal: () => void;
  
  // Stream simulation
  simulateAgentStream: (threadId: string, agentFunction: () => StreamMessage[], handoffTarget?: string | null) => void;
  
  // Tool management
  updateToolStatus: (messageId: string, toolCallId: string, status: ToolStatus) => void;
  simulateToolExecution: (messageId: string, toolCallId: string) => void;
}

export const useChatStore = create<ChatStore>((set, get) => ({
  // Initial state
  threadCollection: { threads: [] },
  activeThreadId: null,
  
  isSidebarOpen: true,
  isSendMessageBlocked: false,
  isTrustModeActive: false,
  
  isAuthenticated: false,
  isUserApproved: false,
  isUserRejected: false,
  currentAuthenticationType: null,
  currentToolData: null,
  
  showAuthModal: false,
  showApprovalModal: false,
  
  currentStreamingMessageId: null,
  
  // Thread management actions
  createThread: (threadName: string) => {
    const threadId = uuid();
    const newThread: Thread = {
      id: threadId,
      name: threadName,
      messages: [],
    };
    
    set((state) => ({
      threadCollection: {
        threads: [...state.threadCollection.threads, newThread]
      },
      activeThreadId: threadId
    }));
    
    return threadId;
  },
  
  deleteThread: (threadId: string) => {
    set((state) => ({
      threadCollection: {
        threads: state.threadCollection.threads.filter(t => t.id !== threadId)
      },
      activeThreadId: state.activeThreadId === threadId ? null : state.activeThreadId
    }));
  },
  
  renameThread: (threadId: string, newName: string) => {
    set((state) => ({
      threadCollection: {
        threads: state.threadCollection.threads.map(thread =>
          thread.id === threadId 
            ? { ...thread, name: newName }
            : thread
        )
      }
    }));
  },
  
  setActiveThread: (threadId: string) => {
    set({ activeThreadId: threadId });
  },
  
  // Message actions
  sendMessage: (threadId: string, content: string, attachments?: FileAttachment[]) => {
    const userMessage: UserMessage = {
      id: uuid(),
      type: "user",
      content,
      attachments: attachments || []
    };
    
    // Add user message to thread
    set((state) => ({
      threadCollection: {
        threads: state.threadCollection.threads.map(thread =>
          thread.id === threadId
            ? {
                ...thread,
                messages: [...thread.messages, userMessage],
              }
            : thread
        )
      }
    }));
    
    // Route to appropriate agent and start streaming
    const targetAgent = getTargetAgentForHandoff(content);
    const agentFunction = agentRouter(content);
    
    // If orchestrator is being used, create dynamic response with user message and target
    if (targetAgent) {
      const dynamicAllAiFunction = () => mockAgents.allAiAgent(content, targetAgent);
      get().simulateAgentStream(threadId, dynamicAllAiFunction, targetAgent);
    } else {
      // Start with default response (no handoff needed)
      get().simulateAgentStream(threadId, agentFunction);
    }
  },
  
  addStreamChunk: (threadId: string, messageId: string, chunk: StreamMessage) => {
    set((state) => ({
      threadCollection: {
        threads: state.threadCollection.threads.map(thread =>
          thread.id === threadId
            ? {
                ...thread,
                messages: thread.messages.map(message =>
                  message.id === messageId && message.type === "agent"
                    ? {
                        ...message as AgentMessage,
                        chunks: [...(message as AgentMessage).chunks, chunk],
                              }
                    : message
                ),
              }
            : thread
        )
      }
    }));
  },
  
  completeAgentMessage: (threadId: string, messageId: string) => {
    set((state) => {
      // Only unblock UI if this is the currently streaming message
      const shouldUnblock = state.currentStreamingMessageId === messageId;
      
      return {
        threadCollection: {
          threads: state.threadCollection.threads.map(thread =>
            thread.id === threadId
              ? {
                  ...thread,
                  messages: thread.messages.map(message =>
                    message.id === messageId && message.type === "agent"
                      ? {
                          ...message as AgentMessage,
                          status: "completed" as const,
                          final_content: (message as AgentMessage).chunks
                            .filter(chunk => chunk.type === "text")
                            .map(chunk => chunk.response_delta)
                            .join("")
                        }
                      : message
                  )
                }
              : thread
          )
        },
        currentStreamingMessageId: shouldUnblock ? null : state.currentStreamingMessageId,
        isSendMessageBlocked: shouldUnblock ? false : state.isSendMessageBlocked
      };
    });
  },
  
  // UI actions
  toggleSidebar: () => {
    set((state) => ({ isSidebarOpen: !state.isSidebarOpen }));
  },
  
  toggleTrustMode: () => {
    set((state) => ({ isTrustModeActive: !state.isTrustModeActive }));
  },
  
  setSendMessageBlocked: (blocked: boolean) => {
    set({ isSendMessageBlocked: blocked });
  },
  
  // Authentication actions
  triggerAuthentication: (authenticationType: AuthenticationType) => {
    const { isTrustModeActive } = get();
    
    if (isTrustModeActive) {
      // Auto-authenticate if trust mode is active
      set({ isAuthenticated: true });
    } else {
      // Show authentication modal
      set({
        currentAuthenticationType: authenticationType,
        showAuthModal: true,
        isAuthenticated: false
      });
    }
  },
  
  setAuthenticated: (authenticated: boolean) => {
    set({
      isAuthenticated: authenticated,
      showAuthModal: false
    });
  },
  
  // Approval actions
  triggerUserApproval: (toolData: ToolData) => {
    const { isTrustModeActive } = get();
    
    if (isTrustModeActive) {
      // Auto-approve if trust mode is active
      set({ isUserApproved: true });
    } else {
      // Show approval modal
      set({
        currentToolData: toolData,
        showApprovalModal: true,
        isUserApproved: false
      });
    }
  },
  
  setUserApproved: (approved: boolean) => {
    set({
      isUserApproved: approved,
      showApprovalModal: false,
      currentToolData: null
    });
  },
  
  rejectUserApproval: (messageId: string, toolCallId: string) => {
    const { activeThreadId } = get();
    if (!activeThreadId) return;
    
    // Add rejection chunk to the stream
    const rejectionChunk: StreamMessage = {
      id: uuid(),
      type: "tool",
      agent_id: "system",
      agent_name: "System",
      agent_icon: "❌",
      toolName: "user_rejection",
      toolCallId,
      status: "user_rejected",
      data: {
        action: "**User Rejected Tool Call**",
        description: "User declined to approve this tool execution",
        logs: [
          {
                  type: "warning",
            message: "Tool call rejected by user"
          }
        ]
      }
    };
    
    get().addStreamChunk(activeThreadId, messageId, rejectionChunk);
    get().completeAgentMessage(activeThreadId, messageId);
    
    set({
      showApprovalModal: false,
      currentToolData: null,
      isUserApproved: false,
      isUserRejected: true
    });
  },
  
  closeAuthModal: () => {
    set({ showAuthModal: false });
  },
  
  closeApprovalModal: () => {
    set({ showApprovalModal: false, currentToolData: null });
  },
  
  // Stream simulation
  simulateAgentStream: async (threadId: string, agentFunction: () => StreamMessage[], handoffTarget?: string | null) => {
    const messages = agentFunction();
    const messageId = uuid();
    
    // Create initial agent message
    const agentMessage: AgentMessage = {
      id: messageId,
      type: "agent",
      agent_id: messages[0]?.agent_id || "unknown",
      agent_name: messages[0]?.agent_name || "Unknown Agent",
      agent_icon: messages[0]?.agent_icon || "🤖",
      chunks: [],
      status: "streaming"
    };
    
    // Add agent message to thread
    set((state) => ({
      threadCollection: {
        threads: state.threadCollection.threads.map(thread =>
          thread.id === threadId
            ? {
                ...thread,
                messages: [...thread.messages, agentMessage],
              }
            : thread
        )
      },
      currentStreamingMessageId: messageId,
      isSendMessageBlocked: true
    }));
    
    // Reset authentication and approval states for new stream
    // But preserve authentication if trust mode is active
    const { isTrustModeActive } = get();
    set({
      isAuthenticated: isTrustModeActive, // Keep authenticated if trust mode is on
      isUserApproved: false,
      isUserRejected: false
    });
    
    // Stream messages with delays
    for (let i = 0; i < messages.length; i++) {
      const message = messages[i];
      
      // Add chunk to stream FIRST so it appears in UI
      get().addStreamChunk(threadId, messageId, message);
      
      // Check for blocking statuses AFTER adding chunk
      if (message.status === "waiting_for_authentication") {
        get().triggerAuthentication(message.authenticationType!);
        
        // Wait for authentication with timeout
        await new Promise<void>((resolve) => {
          let attempts = 0;
          const maxAttempts = 600; // 60 seconds max wait (increased for user interaction)
          
          const checkAuth = () => {
            if (get().isAuthenticated) {
              resolve();
            } else if (attempts >= maxAttempts) {
              // Only auto-authenticate after long timeout if trust mode is off and user hasn't interacted
              const { isTrustModeActive, showAuthModal } = get();
              if (!isTrustModeActive && !showAuthModal) {
                console.warn('Authentication timeout - auto-authenticating');
                get().setAuthenticated(true);
              }
              resolve();
            } else {
              attempts++;
              setTimeout(checkAuth, 100);
            }
          };
          checkAuth();
        });
      } else if (message.status === "waiting_user_approval" && message.data) {
        get().triggerUserApproval(message.data);
        
        // Wait for user approval with timeout
        await new Promise<void>((resolve) => {
          let attempts = 0;
          const maxAttempts = 600; // 60 seconds max wait (increased for user interaction)
          
          const checkApproval = () => {
            const { isUserApproved, isUserRejected } = get();
            if (isUserApproved || isUserRejected) {
              // User made a decision (approve or reject) - continue
              resolve();
            } else if (attempts >= maxAttempts) {
              // Only auto-approve after long timeout if trust mode is off and user hasn't interacted
              const { isTrustModeActive, showApprovalModal } = get();
              if (!isTrustModeActive && !showApprovalModal) {
                console.warn('Approval timeout - auto-approving');
                get().setUserApproved(true);
              }
              resolve();
            } else {
              attempts++;
              setTimeout(checkApproval, 100);
            }
          };
          checkApproval();
        });
        
        // Check if user rejected - if so, stop processing remaining chunks
        if (get().isUserRejected) {
          console.log('Tool execution stopped due to user rejection');
          break; // Exit the loop, don't process any more chunks
        }
      }
      
      // Delay before next chunk - reduce delay for auth/approval flows
      let delay = message.type === "text" ? 200 : 4000;
      
      // Use shorter delay for authentication/approval flows to improve UX
      if (message.status === "waiting_for_authentication" || message.status === "waiting_user_approval") {
        delay = 500; // Much shorter delay for interactive steps
      }
      
      if (i < messages.length - 1) {
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    
    // Complete the agent message only if not rejected (rejection already completes it)
    if (!get().isUserRejected) {
      get().completeAgentMessage(threadId, messageId);
    }
    
    // Handle orchestrator handoff if needed
    if (handoffTarget && mockAgents[handoffTarget as keyof typeof mockAgents]) {
      // Small delay before starting the handoff agent
      await new Promise(resolve => setTimeout(resolve, 1000));
      
      // Start the specialized agent stream (without handoff target to prevent infinite recursion)
      const specializedAgentFunction = mockAgents[handoffTarget as keyof typeof mockAgents];
      get().simulateAgentStream(threadId, specializedAgentFunction, null);
    }
  },
  
  // Tool status management
  updateToolStatus: (messageId: string, toolCallId: string, status: ToolStatus) => {
    set((state) => ({
      threadCollection: {
        threads: state.threadCollection.threads.map(thread => ({
          ...thread,
          messages: thread.messages.map(message =>
            message.id === messageId && message.type === "agent"
              ? {
                  ...message as AgentMessage,
                  chunks: (message as AgentMessage).chunks.map(chunk =>
                    chunk.type === "tool" && chunk.toolCallId === toolCallId
                      ? { ...chunk, status }
                      : chunk
                  ),
                  }
              : message
          )
        }))
      }
    }));
  },
  
  simulateToolExecution: (messageId: string, toolCallId: string) => {
    // Simulate tool execution with random success/failure
    const success = Math.random() > 0.1; // 90% success rate
    
    setTimeout(() => {
      const finalStatus = success ? 'completed' : 'failed';
      get().updateToolStatus(messageId, toolCallId, finalStatus);
    }, 2000 + Math.random() * 3000); // 2-5 second execution time
  }
}));