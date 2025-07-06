import { ThreadSidebar } from '@/components/thread/ThreadSidebar';
import { ThreadHeader } from '@/components/thread/ThreadHeader';
import { ThreadBody } from '@/components/thread/ThreadBody';
import { SendMessage } from '@/components/message/SendMessage';
import { useChatStore } from '@/store';
import { cn } from '@/lib/utils';

interface ChatLayoutProps {
  threadId?: string;
  className?: string;
}

export function ChatLayout({ threadId, className }: ChatLayoutProps) {
  const { threadCollection, activeThreadId } = useChatStore();

  const currentThreadId = threadId || activeThreadId;
  const currentThread = threadCollection.threads.find(t => t.id === currentThreadId);

  return (
    <div className={cn("flex h-screen bg-system-neutral-99", className)}>
      {/* Sidebar */}
      <ThreadSidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        {currentThread ? (
          <>
            {/* Thread Header */}
            <ThreadHeader thread={currentThread} />

            {/* Thread Body */}
            <ThreadBody thread={currentThread} />

            {/* Send Message */}
            <SendMessage threadId={currentThread.id} />
          </>
        ) : (
          /* Welcome Screen */
          <div className="flex-1 flex items-center justify-center">
            <div className="text-center max-w-md mx-auto px-4">
              <div className="w-24 h-24 bg-allai-blue-90 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">🤖</span>
              </div>
              <h1 className="text-2xl font-bold text-system-neutral-05 mb-4">
                Welcome to AI Agent Chat
              </h1>
              <p className="text-system-neutral-55 mb-8">
                Create a new thread to start chatting with our AI agents. 
                Your messages will be automatically routed to the most appropriate agent 
                based on your needs.
              </p>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 text-sm text-system-neutral-35">
                  <span className="w-8 h-8 bg-system-neutral-90 rounded-full flex items-center justify-center">
                    🔧
                  </span>
                  <span>JIRA Agent - Issue tracking and project management</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-system-neutral-35">
                  <span className="w-8 h-8 bg-system-neutral-90 rounded-full flex items-center justify-center">
                    📝
                  </span>
                  <span>Confluence Agent - Documentation and knowledge base</span>
                </div>
                <div className="flex items-center space-x-3 text-sm text-system-neutral-35">
                  <span className="w-8 h-8 bg-system-neutral-90 rounded-full flex items-center justify-center">
                    💼
                  </span>
                  <span>Salesforce Agent - CRM and sales management</span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}