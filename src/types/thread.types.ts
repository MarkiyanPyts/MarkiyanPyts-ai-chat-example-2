import type { StreamMessage } from './agent.types';

// User message interface
export interface UserMessage {
  id: string;
  type: "user";
  timestamp?: string; // ISO 8601 format
  content: string; // User's message content
  user_id?: string; // Optional user identifier
  user_name?: string; // Optional user display name
  attachments?: FileAttachment[]; // File uploads
}

// Agent message interface
export interface AgentMessage {
  id: string;
  type: "agent";
  timestamp?: string; // ISO 8601 format
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
  created_at?: string; // ISO 8601 format
  updated_at?: string; // ISO 8601 format
  // Thread-specific UI state
  isSendMessageBlocked?: boolean;
  currentStreamingMessageId?: string | null;
}

// Collection of threads
export interface ThreadCollection {
  threads: Thread[];
}

// File attachment interface
export interface FileAttachment {
  id: string;
  name: string;
  size: number;
  type: string;
  url?: string; // Mock URL for preview
}