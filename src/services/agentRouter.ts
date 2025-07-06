import type { AgentFunction } from '@/types';
import { agentRouter, mockAgents, agentMappingKeywords } from './mock';

// Re-export for convenience
export { agentRouter, agentMappingKeywords };

// Agent orchestration - can trigger multiple agents in sequence
export const triggerAgentChain = async (
  userMessage: string,
  onAgentCall: (agentFunction: AgentFunction) => Promise<void>
) => {
  // First, determine the primary agent
  const primaryAgent = agentRouter(userMessage);
  
  // Execute the primary agent
  await onAgentCall(primaryAgent);
  
  // Check if we need to trigger additional agents based on the message content
  const lowercaseMessage = userMessage.toLowerCase();
  
  // Example: If user mentions both bug report AND documentation
  if (lowercaseMessage.includes('bug') && lowercaseMessage.includes('document')) {
    // After JIRA agent, trigger Confluence agent
    setTimeout(() => {
      onAgentCall(mockAgents.confluenceAgent);
    }, 2000); // 2 second delay between agents
  }
};

// Check which agent would be triggered by a message (for UI preview)
export const getTargetAgent = (userMessage: string): keyof typeof agentMappingKeywords | 'defaultResponse' => {
  const lowercaseMessage = userMessage.toLowerCase();
  
  for (const [agentKey, keywords] of Object.entries(agentMappingKeywords)) {
    if (keywords.some(keyword => lowercaseMessage.includes(keyword))) {
      return agentKey as keyof typeof agentMappingKeywords;
    }
  }
  
  return 'defaultResponse';
};

// Get agent info for UI display
export const getAgentInfo = (agentFunction: AgentFunction) => {
  // Create a sample message to get agent info
  const sampleMessages = agentFunction();
  const firstMessage = sampleMessages[0];
  
  return {
    id: firstMessage?.agent_id || 'unknown',
    name: firstMessage?.agent_name || 'Unknown Agent',
    icon: firstMessage?.agent_icon || '🤖'
  };
};