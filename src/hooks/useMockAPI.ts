import { useMutation } from '@tanstack/react-query';
import type { StreamMessage, AgentFunction } from '@/types';
import { useChatStore } from '@/store';

interface StreamRequest {
  threadId: string;
  agentFunction: AgentFunction;
}

// Mock API function that simulates streaming
const simulateAgentStream = async ({ threadId, agentFunction }: StreamRequest): Promise<void> => {
  const messages = agentFunction();
  const store = useChatStore.getState();
  
  // This will be handled by the store's simulateAgentStream method
  return store.simulateAgentStream(threadId, agentFunction);
};

export const useMockAPI = () => {
  const mutation = useMutation({
    mutationFn: simulateAgentStream,
    onError: (error) => {
      console.error('Agent stream error:', error);
      // Reset blocked state on error
      useChatStore.getState().setSendMessageBlocked(false);
    }
  });

  return {
    sendToAgent: mutation.mutate,
    isLoading: mutation.isPending,
    error: mutation.error
  };
};