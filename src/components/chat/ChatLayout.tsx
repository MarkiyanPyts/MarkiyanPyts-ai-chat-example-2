import { ThreadSidebar } from '@/components/thread/ThreadSidebar';
import { ThreadHeader } from '@/components/thread/ThreadHeader';
import { ThreadBody } from '@/components/thread/ThreadBody';
import { SendMessage } from '@/components/message/SendMessage';
import { Button } from '@/components/ui/button';
import { Menu } from 'lucide-react';
import { useChatStore } from '@/store';
import { cn } from '@/lib/utils';

interface ChatLayoutProps {
  threadId?: string;
  className?: string;
}

export function ChatLayout({ threadId, className }: ChatLayoutProps) {
  const { threadCollection, activeThreadId, toggleSidebar } = useChatStore();

  const currentThreadId = threadId || activeThreadId;
  const currentThread = threadCollection.threads.find(t => t.id === currentThreadId);

  return (
    <div className={cn("flex h-dvh bg-system-neutral-99 relative", className)}>
      {/* Sidebar - Responsive */}
      <ThreadSidebar />

      {/* Main Content - Relative container for fixed send message */}
      <div className="flex-1 flex flex-col h-full relative w-full">
        {currentThread ? (
          <>
            {/* Thread Header */}
            <ThreadHeader thread={currentThread} className="flex-shrink-0" />

            {/* Thread Body - Takes remaining space with bottom padding for send message */}
            <ThreadBody thread={currentThread} className="flex-1 min-h-0" />

            {/* Send Message - Fixed at bottom of this container */}
            <div className="absolute bottom-0 left-0 right-0 z-10">
              <SendMessage threadId={currentThread.id} className="bg-system-neutral-99 border-t border-system-neutral-85" />
            </div>
          </>
        ) : (
          /* Welcome Screen */
          <div className="flex-1 flex flex-col">
            {/* Mobile Hamburger Menu for Welcome Screen */}
            <div className="md:hidden flex items-center justify-start p-4 border-b border-system-neutral-85">
              <Button
                variant="ghost"
                size="sm"
                onClick={toggleSidebar}
                className="text-system-neutral-55 hover:text-system-neutral-35"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </div>
            
            {/* Welcome Content */}
            <div className="flex-1 flex items-center justify-center">
              <div className="text-center max-w-md mx-auto px-4">
              <div className="w-24 h-24 bg-allai-blue-90 rounded-full flex items-center justify-center mx-auto mb-6">
                <span className="text-4xl">🤖</span>
              </div>
              <h1 className="text-2xl font-bold text-system-neutral-05 mb-4">
                AllAi Chat
              </h1>
              <p className="text-system-neutral-55 mb-8">
                We present you a collection of AI agents to handle anything Salesforce and beyond.
              </p>
              <div className="space-y-6">
                <div className="space-y-2">
                  <div className="flex items-center space-x-3 text-sm">
                    <span className="w-8 h-8 bg-system-neutral-90 rounded-full flex items-center justify-center">
                      🔧
                    </span>
                    <span className="font-medium text-system-neutral-05">JIRA Agent</span>
                  </div>
                  <p className="text-xs text-system-neutral-55 ml-11">
                    Issue tracking and project management
                  </p>
                  <div className="ml-11">
                    <p className="text-xs text-system-neutral-35 mb-1">Keywords:</p>
                    <div className="flex flex-wrap gap-1">
                      {["jira", "issue", "ticket", "bug", "task", "create", "report", "broken", "error", "problem"].map(keyword => (
                        <span key={keyword} className="px-2 py-1 bg-system-neutral-90 text-system-neutral-35 rounded text-xs">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-3 text-sm">
                    <span className="w-8 h-8 bg-system-neutral-90 rounded-full flex items-center justify-center">
                      📝
                    </span>
                    <span className="font-medium text-system-neutral-05">Confluence Agent</span>
                  </div>
                  <p className="text-xs text-system-neutral-55 ml-11">
                    Documentation and knowledge management
                  </p>
                  <div className="ml-11">
                    <p className="text-xs text-system-neutral-35 mb-1">Keywords:</p>
                    <div className="flex flex-wrap gap-1">
                      {["confluence", "page", "document", "wiki", "update", "edit", "notes", "guide", "write"].map(keyword => (
                        <span key={keyword} className="px-2 py-1 bg-system-neutral-90 text-system-neutral-35 rounded text-xs">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="flex items-center space-x-3 text-sm">
                    <span className="w-8 h-8 bg-system-neutral-90 rounded-full flex items-center justify-center">
                      💼
                    </span>
                    <span className="font-medium text-system-neutral-05">Salesforce Agent</span>
                  </div>
                  <p className="text-xs text-system-neutral-55 ml-11">
                    CRM and sales operations
                  </p>
                  <div className="ml-11">
                    <p className="text-xs text-system-neutral-35 mb-1">Keywords:</p>
                    <div className="flex flex-wrap gap-1">
                      {["salesforce", "crm", "opportunity", "lead", "account", "sales", "customer", "soql", "query"].map(keyword => (
                        <span key={keyword} className="px-2 py-1 bg-system-neutral-90 text-system-neutral-35 rounded text-xs">
                          {keyword}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}