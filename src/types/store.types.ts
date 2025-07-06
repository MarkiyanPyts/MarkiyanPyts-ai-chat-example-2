import { ThreadCollection, Thread, Message, UserMessage } from './thread.types';
import { StreamMessage, AuthenticationType, ToolData } from './agent.types';

// Store state interface
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
  
  // Actions
  createThread: (threadName: string) => string; // Returns thread ID
  deleteThread: (threadId: string) => void;
  renameThread: (threadId: string, newName: string) => void;
  setActiveThread: (threadId: string) => void;
  
  sendMessage: (threadId: string, content: string, attachments?: any[]) => void;
  addStreamChunk: (threadId: string, messageId: string, chunk: StreamMessage) => void;
  
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
}