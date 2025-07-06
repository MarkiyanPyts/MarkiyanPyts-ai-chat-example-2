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
import { agentRouter } from '@/services/mock';

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
  rejectUserApproval: (messageId: string, toolId: string) => void;
  
  closeAuthModal: () => void;
  closeApprovalModal: () => void;
  
  // Stream simulation
  simulateAgentStream: (threadId: string, agentFunction: () => StreamMessage[]) => void;
  
  // Tool management
  updateToolStatus: (messageId: string, toolId: string, status: ToolStatus) => void;
  simulateToolExecution: (messageId: string, toolId: string) => void;
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
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString()
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
            ? { ...thread, name: newName, updated_at: new Date().toISOString() }
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
      timestamp: new Date().toISOString(),
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
                updated_at: new Date().toISOString()
              }
            : thread
        )
      }
    }));
    
    // Route to appropriate agent and start streaming
    const agentFunction = agentRouter(content);
    get().simulateAgentStream(threadId, agentFunction);
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
                        updated_at: new Date().toISOString()
                      }
                    : message
                ),
                updated_at: new Date().toISOString()
              }
            : thread
        )
      }
    }));
  },
  
  completeAgentMessage: (threadId: string, messageId: string) => {
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
      currentStreamingMessageId: null,
      isSendMessageBlocked: false
    }));
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
    set({
      currentAuthenticationType: authenticationType,
      showAuthModal: true,
      isAuthenticated: false
    });
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
  
  rejectUserApproval: (messageId: string, toolId: string) => {
    const { activeThreadId } = get();
    if (!activeThreadId) return;
    
    // Add rejection chunk to the stream
    const rejectionChunk: StreamMessage = {
      id: uuid(),
      type: "tool",
      timestamp: new Date().toISOString(),
      agent_id: "system",
      agent_name: "System",
      agent_icon: "❌",
      toolName: "user_rejection",
      toolId,
      status: "user_rejected",
      data: {
        action: "**User Rejected Tool Call**",
        description: "User declined to approve this tool execution",
        logs: [
          {
            timestamp: new Date().toISOString(),
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
      isUserApproved: false
    });
  },
  
  closeAuthModal: () => {
    set({ showAuthModal: false });
  },
  
  closeApprovalModal: () => {
    set({ showApprovalModal: false, currentToolData: null });
  },
  
  // Stream simulation
  simulateAgentStream: async (threadId: string, agentFunction: () => StreamMessage[]) => {
    const messages = agentFunction();
    const messageId = uuid();
    
    // Create initial agent message
    const agentMessage: AgentMessage = {
      id: messageId,
      type: "agent",
      timestamp: new Date().toISOString(),
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
                updated_at: new Date().toISOString()
              }
            : thread
        )
      },
      currentStreamingMessageId: messageId,
      isSendMessageBlocked: true
    }));
    
    // Reset authentication and approval states for new stream
    set({
      isAuthenticated: false,
      isUserApproved: false
    });
    
    // Stream messages with delays
    for (let i = 0; i < messages.length; i++) {
      const message = messages[i];
      
      // Check for blocking statuses
      if (message.status === "waiting_for_authentication") {
        get().triggerAuthentication(message.authenticationType!);
        
        // Wait for authentication
        await new Promise<void>((resolve) => {
          const checkAuth = () => {
            if (get().isAuthenticated) {
              resolve();
            } else {
              setTimeout(checkAuth, 100);
            }
          };
          checkAuth();
        });
      } else if (message.status === "waiting_user_approval" && message.data) {
        get().triggerUserApproval(message.data);
        
        // Wait for user approval
        await new Promise<void>((resolve) => {
          const checkApproval = () => {
            if (get().isUserApproved) {
              resolve();
            } else {
              setTimeout(checkApproval, 100);
            }
          };
          checkApproval();
        });
      }
      
      // Add chunk to stream
      get().addStreamChunk(threadId, messageId, message);
      
      // Delay before next chunk
      const delay = message.type === "text" ? 200 : 1000;
      if (i < messages.length - 1) {
        await new Promise(resolve => setTimeout(resolve, delay));
      }
    }
    
    // Complete the agent message
    get().completeAgentMessage(threadId, messageId);
  },
  
  // Tool status management
  updateToolStatus: (messageId: string, toolId: string, status: ToolStatus) => {
    set((state) => ({
      threadCollection: {
        threads: state.threadCollection.threads.map(thread => ({
          ...thread,
          messages: thread.messages.map(message =>
            message.id === messageId && message.type === "agent"
              ? {
                  ...message as AgentMessage,
                  chunks: (message as AgentMessage).chunks.map(chunk =>
                    chunk.type === "tool" && chunk.toolId === toolId
                      ? { ...chunk, status }
                      : chunk
                  ),
                  updated_at: new Date().toISOString()
                }
              : message
          ),
          updated_at: new Date().toISOString()
        }))
      }
    }));
  },
  
  simulateToolExecution: (messageId: string, toolId: string) => {
    // Simulate tool execution with random success/failure
    const success = Math.random() > 0.1; // 90% success rate
    
    setTimeout(() => {
      const finalStatus = success ? 'completed' : 'failed';
      get().updateToolStatus(messageId, toolId, finalStatus);
    }, 2000 + Math.random() * 3000); // 2-5 second execution time
  }
}));