import { useState } from 'react';
import { useNavigate } from '@tanstack/react-router';
import { Plus, MessageSquare, Trash2, Edit3, ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { ScrollArea } from '@/components/ui/scroll-area';
import { Separator } from '@/components/ui/separator';
import { useChatStore } from '@/store';
import { cn } from '@/lib/utils';

interface ThreadSidebarProps {
  className?: string;
}

export function ThreadSidebar({ className }: ThreadSidebarProps) {
  const navigate = useNavigate();
  const [editingThreadId, setEditingThreadId] = useState<string | null>(null);
  const [editingName, setEditingName] = useState('');

  const {
    threadCollection,
    activeThreadId,
    isSidebarOpen,
    createThread,
    deleteThread,
    renameThread,
    toggleSidebar,
    setActiveThread,
  } = useChatStore();

  const handleCreateThread = () => {
    const threadName = `New Thread ${threadCollection.threads.length + 1}`;
    const threadId = createThread(threadName);
    navigate({ to: `/thread/${threadId}` });
  };

  const handleThreadSelect = (threadId: string) => {
    setActiveThread(threadId);
    navigate({ to: `/thread/${threadId}` });
  };

  const handleStartEdit = (threadId: string, currentName: string) => {
    setEditingThreadId(threadId);
    setEditingName(currentName);
  };

  const handleSaveEdit = () => {
    if (editingThreadId && editingName.trim()) {
      renameThread(editingThreadId, editingName.trim());
    }
    setEditingThreadId(null);
    setEditingName('');
  };

  const handleCancelEdit = () => {
    setEditingThreadId(null);
    setEditingName('');
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSaveEdit();
    } else if (e.key === 'Escape') {
      handleCancelEdit();
    }
  };

  return (
    <div className={cn(
      "flex h-full transition-all duration-300 ease-in-out",
      isSidebarOpen ? "w-80" : "w-12",
      className
    )}>
      {/* Sidebar Content */}
      <Card className={cn(
        "flex flex-col h-full border-r",
        isSidebarOpen ? "w-80" : "w-12"
      )}>
        {/* Header */}
        <div className="flex items-center justify-between p-4 border-b">
          {isSidebarOpen && (
            <h2 className="text-lg font-semibold text-system-neutral-05">Threads</h2>
          )}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className="ml-auto"
          >
            {isSidebarOpen ? (
              <ChevronLeft className="h-4 w-4" />
            ) : (
              <ChevronRight className="h-4 w-4" />
            )}
          </Button>
        </div>

        {isSidebarOpen && (
          <>
            {/* New Thread Button */}
            <div className="p-4">
              <Button
                onClick={handleCreateThread}
                className="w-full justify-start bg-allai-blue-50 hover:bg-allai-blue-60 text-system-neutral-99"
              >
                <Plus className="h-4 w-4 mr-2" />
                New Thread
              </Button>
            </div>

            <Separator />

            {/* Thread List */}
            <ScrollArea className="flex-1 p-2">
              {threadCollection.threads.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-8 text-center">
                  <MessageSquare className="h-12 w-12 text-system-neutral-55 mb-4" />
                  <p className="text-sm text-system-neutral-55 mb-2">No threads yet</p>
                  <p className="text-xs text-system-neutral-35">
                    Create your first thread to get started
                  </p>
                </div>
              ) : (
                <div className="space-y-2">
                  {threadCollection.threads.map((thread) => (
                    <div
                      key={thread.id}
                      className={cn(
                        "group relative rounded-lg p-3 cursor-pointer transition-colors",
                        "hover:bg-system-neutral-90",
                        activeThreadId === thread.id
                          ? "bg-allai-blue-90 border border-allai-blue-50"
                          : "bg-system-neutral-99"
                      )}
                      onClick={() => handleThreadSelect(thread.id)}
                    >
                      {editingThreadId === thread.id ? (
                        <Input
                          value={editingName}
                          onChange={(e) => setEditingName(e.target.value)}
                          onKeyDown={handleKeyPress}
                          onBlur={handleSaveEdit}
                          className="h-auto p-0 border-none bg-transparent text-sm font-medium"
                          autoFocus
                        />
                      ) : (
                        <>
                          <h3 className="text-sm font-medium text-system-neutral-05 truncate pr-12">
                            {thread.name}
                          </h3>
                          <p className="text-xs text-system-neutral-55 mt-1">
                            {thread.messages.length} messages
                          </p>
                          <p className="text-xs text-system-neutral-35">
                            {new Date(thread.updated_at).toLocaleDateString()}
                          </p>

                          {/* Action Buttons */}
                          <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
                            <div className="flex space-x-1">
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  handleStartEdit(thread.id, thread.name);
                                }}
                                className="h-6 w-6 p-0"
                              >
                                <Edit3 className="h-3 w-3" />
                              </Button>
                              <Button
                                variant="ghost"
                                size="sm"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  deleteThread(thread.id);
                                }}
                                className="h-6 w-6 p-0 text-flamingo-rose-50 hover:text-flamingo-rose-60"
                              >
                                <Trash2 className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </>
                      )}
                    </div>
                  ))}
                </div>
              )}
            </ScrollArea>
          </>
        )}
      </Card>
    </div>
  );
}