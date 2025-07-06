import { useState } from 'react';
import { Edit3, Trash2, Settings, Shield, ShieldCheck, Menu } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useChatStore } from '@/store';
import { cn } from '@/lib/utils';
import type { Thread } from '@/types';

interface ThreadHeaderProps {
  thread: Thread;
  onDelete?: () => void;
  className?: string;
}

export function ThreadHeader({ thread, onDelete, className }: ThreadHeaderProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [editingName, setEditingName] = useState(thread.name);

  const {
    renameThread,
    deleteThread,
    isTrustModeActive,
    toggleTrustMode,
    getCurrentThreadBlockState,
    toggleSidebar
  } = useChatStore();
  
  const { isSendMessageBlocked } = getCurrentThreadBlockState();

  const handleStartEdit = () => {
    setIsEditing(true);
    setEditingName(thread.name);
  };

  const handleSaveEdit = () => {
    if (editingName.trim() && editingName !== thread.name) {
      renameThread(thread.id, editingName.trim());
    }
    setIsEditing(false);
  };

  const handleCancelEdit = () => {
    setEditingName(thread.name);
    setIsEditing(false);
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleSaveEdit();
    } else if (e.key === 'Escape') {
      handleCancelEdit();
    }
  };

  const handleDelete = () => {
    deleteThread(thread.id);
    onDelete?.();
  };

  return (
    <Card className={cn("border-b border-system-neutral-85 rounded-none", className)}>
      <div className="flex items-center justify-between p-4">
        <div className="flex items-center space-x-4 flex-1">
          {/* Mobile Hamburger Menu */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleSidebar}
            className="md:hidden text-system-neutral-55 hover:text-system-neutral-35"
          >
            <Menu className="h-5 w-5" />
          </Button>
          {/* Thread Name */}
          <div className="flex-1">
            {isEditing ? (
              <Input
                value={editingName}
                onChange={(e) => setEditingName(e.target.value)}
                onKeyDown={handleKeyPress}
                onBlur={handleSaveEdit}
                className="text-lg font-semibold bg-transparent border-system-neutral-85"
                autoFocus
              />
            ) : (
              <h1 className="text-lg font-semibold text-system-neutral-05">
                {thread.name}
              </h1>
            )}
            <div className="flex items-center space-x-4 mt-1">
              <p className="text-sm text-system-neutral-55">
                {thread.messages.length} messages
              </p>
              {thread.updated_at && (
                <p className="text-sm text-system-neutral-35">
                  Updated {new Date(thread.updated_at).toLocaleString()}
                </p>
              )}
              {isSendMessageBlocked && (
                <Badge variant="secondary" className="bg-light-orange-70 text-light-orange-40">
                  Agent Processing...
                </Badge>
              )}
            </div>
          </div>
        </div>

        {/* Actions */}
        <div className="flex items-center space-x-2">
          {/* Trust Mode Toggle */}
          <Button
            variant="ghost"
            size="sm"
            onClick={toggleTrustMode}
            className={cn(
              "flex items-center space-x-2",
              isTrustModeActive
                ? "text-fluor-green-30 hover:text-fluor-green-40"
                : "text-system-neutral-55 hover:text-system-neutral-35"
            )}
            title={isTrustModeActive ? "Trust Mode: ON - Auto-approve tool calls" : "Trust Mode: OFF - Manual approval required"}
          >
            {isTrustModeActive ? (
              <ShieldCheck className="h-4 w-4" />
            ) : (
              <Shield className="h-4 w-4" />
            )}
            <span className="text-xs font-medium">
              {isTrustModeActive ? "Trusted" : "Manual"}
            </span>
          </Button>

          {/* Edit Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleStartEdit}
            disabled={isEditing}
            className="text-system-neutral-55 hover:text-system-neutral-35"
          >
            <Edit3 className="h-4 w-4" />
          </Button>

          {/* Delete Button */}
          <Button
            variant="ghost"
            size="sm"
            onClick={handleDelete}
            className="text-flamingo-rose-50 hover:text-flamingo-rose-60"
          >
            <Trash2 className="h-4 w-4" />
          </Button>
        </div>
      </div>
    </Card>
  );
}