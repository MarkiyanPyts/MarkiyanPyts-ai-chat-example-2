export type LogLevel = "info" | "warning" | "error";

export type AuthenticationType = "confluence" | "jira" | "salesforce" | null;

export type ToolStatus = 
  | "waiting_for_authentication" 
  | "waiting_user_approval" 
  | "in_progress" 
  | "completed" 
  | "failed" 
  | "user_rejected";

// Log entry interface
export interface LogEntry {
  timestamp?: string; // ISO 8601 format
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
  timestamp?: string; // ISO 8601 format
  agent_id: string;
  agent_name: string;
  agent_icon: string; // URL or emoji
  
  // For text messages (can contain markdown)
  response_delta?: string; // Markdown chunks of response stream
  
  // For tool messages
  toolName?: string;
  toolCallId?: string;
  status?: ToolStatus;
  authenticationType?: AuthenticationType;
  data?: ToolData;
}

// Agent function type
export type AgentFunction = () => StreamMessage[];

// Agent mapping for keyword routing
export interface AgentMappingKeywords {
  jiraAgent: string[];
  confluenceAgent: string[];
  salesforceAgent: string[];
}

// Agent map interface
export interface AgentsMap {
  allAiAgent: AgentFunction;
  jiraAgent: AgentFunction;
  confluenceAgent: AgentFunction;
  salesforceAgent: AgentFunction;
}