import { useEffect, useRef } from 'react';
import { ScrollArea } from '@/components/ui/scroll-area';
import { UserMessage } from '@/components/message/UserMessage';
import { AgentMessage } from '@/components/message/AgentMessage';
import { cn } from '@/lib/utils';
import type { Thread } from '@/types';

interface ThreadBodyProps {
  thread: Thread;
  className?: string;
}

export function ThreadBody({ thread, className }: ThreadBodyProps) {
  const scrollAreaRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when new messages are added
  useEffect(() => {
    if (scrollAreaRef.current) {
      const scrollContainer = scrollAreaRef.current.querySelector('[data-radix-scroll-area-viewport]');
      if (scrollContainer) {
        scrollContainer.scrollTop = scrollContainer.scrollHeight;
      }
    }
  }, [thread.messages]);

  return (
    <div className={cn("flex-1 flex flex-col", className)}>
      <ScrollArea ref={scrollAreaRef} className="flex-1 p-4">
        {thread.messages.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center py-12">
            <div className="w-16 h-16 bg-system-neutral-90 rounded-full flex items-center justify-center mb-4">
              <span className="text-2xl">💬</span>
            </div>
            <h3 className="text-lg font-medium text-system-neutral-05 mb-2">
              Start a conversation
            </h3>
            <p className="text-sm text-system-neutral-55 max-w-md">
              Ask a question or describe what you need help with. The AI agents will automatically route your request to the most appropriate service.
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {thread.messages.map((message) => (
              <div key={message.id}>
                {message.type === 'user' ? (
                  <UserMessage message={message} />
                ) : (
                  <AgentMessage message={message} />
                )}
              </div>
            ))}
          </div>
        )}
      </ScrollArea>
    </div>
  );
}