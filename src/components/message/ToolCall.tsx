import { useState } from 'react';
import ReactMarkdown from 'react-markdown';
import { 
  ChevronDown, 
  ChevronRight, 
  Lock, 
  CheckCircle, 
  XCircle, 
  Loader2, 
  AlertTriangle,
  Clock,
  Shield
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { AuthPopup } from '@/components/modals/AuthPopup';
import { useChatStore } from '@/store';
import { cn } from '@/lib/utils';
import type { StreamMessage, ToolStatus } from '@/types';

interface ToolCallProps {
  message: StreamMessage;
  messageId: string;
  className?: string;
}

export function ToolCall({ message, messageId, className }: ToolCallProps) {
  const [isExpanded, setIsExpanded] = useState(false);
  const [showAuthPopup, setShowAuthPopup] = useState(false);
  
  const {
    updateToolStatus,
    simulateToolExecution
  } = useChatStore();

  if (message.type !== 'tool' || !message.data) return null;

  const { data, status, authenticationType, toolName, toolCallId } = message;
  
  // Provide default values for optional fields
  const safeStatus = status || 'waiting_for_authentication';
  const safeToolName = toolName || 'Unknown Tool';
  const safeToolCallId = toolCallId || message.id;

  const getStatusIcon = (status: ToolStatus) => {
    switch (status) {
      case 'waiting_for_authentication':
        return <Lock className="h-3.5 w-3.5 text-light-orange-60" />;
      case 'waiting_user_approval':
        return <Shield className="h-3.5 w-3.5 text-allai-blue-50" />;
      case 'in_progress':
        return <Loader2 className="h-3.5 w-3.5 animate-spin text-allai-blue-50" />;
      case 'completed':
        return <CheckCircle className="h-3.5 w-3.5 text-fluor-green-30" />;
      case 'failed':
        return <XCircle className="h-3.5 w-3.5 text-flamingo-rose-50" />;
      case 'user_rejected':
        return <XCircle className="h-3.5 w-3.5 text-flamingo-rose-50" />;
      default:
        return <Clock className="h-3.5 w-3.5 text-system-neutral-55" />;
    }
  };

  const getStatusColor = (status: ToolStatus) => {
    switch (status) {
      case 'waiting_for_authentication':
        return 'bg-light-orange-70/10 text-light-orange-40 border-light-orange-60';
      case 'waiting_user_approval':
        return 'bg-allai-blue-50/10 text-allai-blue-50 border-allai-blue-50';
      case 'in_progress':
        return 'bg-allai-blue-50/10 text-allai-blue-50 border-allai-blue-50';
      case 'completed':
        return 'bg-fluor-green-30/10 text-fluor-green-30 border-fluor-green-30';
      case 'failed':
        return 'bg-flamingo-rose-50/10 text-flamingo-rose-50 border-flamingo-rose-50';
      case 'user_rejected':
        return 'bg-flamingo-rose-50/10 text-flamingo-rose-50 border-flamingo-rose-50';
      default:
        return 'bg-system-neutral-90 text-system-neutral-35 border-system-neutral-80';
    }
  };

  const handleAuthenticate = () => {
    setShowAuthPopup(true);
  };

  const handleAuthComplete = () => {
    updateToolStatus(messageId, safeToolCallId, 'in_progress');
    // Simulate tool execution after authentication
    setTimeout(() => {
      simulateToolExecution(messageId, safeToolCallId);
    }, 1000);
  };

  const handleApprove = () => {
    updateToolStatus(messageId, safeToolCallId, 'in_progress');
    // Simulate tool execution after approval
    setTimeout(() => {
      simulateToolExecution(messageId, safeToolCallId);
    }, 1000);
  };

  const handleReject = () => {
    updateToolStatus(messageId, safeToolCallId, 'user_rejected');
  };

  const canShowActions = safeStatus === 'waiting_for_authentication' || safeStatus === 'waiting_user_approval';

  const handleTileClick = (e: React.MouseEvent) => {
    // Don't expand if clicking on action buttons
    if ((e.target as HTMLElement).closest('button')) {
      return;
    }
    setIsExpanded(!isExpanded);
  };

  return (
    <>
      <Card className={cn("mb-2 border-l-2 shadow-sm cursor-pointer transition-colors hover:bg-system-neutral-99/50", getStatusColor(safeStatus), className)}>
        <div className="p-3" onClick={handleTileClick}>
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center space-x-2">
              {getStatusIcon(safeStatus)}
              <div>
                <h4 className="text-xs font-medium text-system-neutral-05">
                  {safeToolName}
                </h4>
                <Badge variant="secondary" className="text-[10px] px-1.5 py-0 bg-transparent border-0 font-normal">
                  {safeStatus.replace(/_/g, ' ')}
                </Badge>
              </div>
            </div>

            <div className="flex items-center space-x-2">
              {/* Action Buttons */}
              {canShowActions && (
                <div className="flex space-x-2">
                  {safeStatus === 'waiting_for_authentication' && (
                    <Button
                      onClick={handleAuthenticate}
                      size="sm"
                      className="bg-light-orange-60 hover:bg-light-orange-70 text-white"
                    >
                      <Lock className="h-3 w-3 mr-0.5" />
                      Authenticate
                    </Button>
                  )}
                  
                  {safeStatus === 'waiting_user_approval' && (
                    <>
                      <Button
                        onClick={handleApprove}
                        size="sm"
                        className="bg-fluor-green-30 hover:bg-fluor-green-40 text-white"
                      >
                        <CheckCircle className="h-3 w-3 mr-0.5" />
                        Approve
                      </Button>
                      <Button
                        onClick={handleReject}
                        size="sm"
                        variant="outline"
                        className="border-flamingo-rose-50 text-flamingo-rose-50 hover:bg-flamingo-rose-50/10"
                      >
                        <XCircle className="h-3 w-3 mr-0.5" />
                        Reject
                      </Button>
                    </>
                  )}
                </div>
              )}
              
              {/* Expand/Collapse Icon */}
              <div className="text-allai-blue-50">
                {isExpanded ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )}
              </div>
            </div>
          </div>

        {/* Tool Description */}
        <p className="text-xs text-system-neutral-55 mb-2">
          {data.description}
        </p>

        {/* Expandable Content */}
        {isExpanded && (
          <div className="pt-3 border-t border-system-neutral-85/50">
            <div className="space-y-4">
              {/* Action Details */}
              <div>
                <h5 className="text-xs font-medium text-system-neutral-05 mb-1">Action</h5>
                <Card className="p-2 bg-system-neutral-95/50 border-0">
                  <div className="text-xs text-system-neutral-05 prose prose-xs max-w-none">
                    <ReactMarkdown 
                      components={{
                        p: ({ children }) => <p className="mb-2 last:mb-0">{children}</p>,
                        strong: ({ children }) => <strong className="font-semibold text-allai-blue-50">{children}</strong>,
                        em: ({ children }) => <em className="italic text-system-neutral-35">{children}</em>,
                      }}
                    >
                      {data.action}
                    </ReactMarkdown>
                  </div>
                </Card>
              </div>

              {/* Logs */}
              {data.logs && data.logs.length > 0 && (
                <div>
                  <h5 className="text-xs font-medium text-system-neutral-05 mb-1">
                    Logs ({data.logs.length})
                  </h5>
                  <ScrollArea className="h-24">
                    <div className="space-y-1">
                      {data.logs.map((log, index) => (
                        <div
                          key={index}
                          className={cn(
                            "flex items-start space-x-2 p-1.5 rounded text-xs",
                            log.type === 'error' && "bg-flamingo-rose-50/10 text-flamingo-rose-50",
                            log.type === 'warning' && "bg-light-orange-60/10 text-light-orange-60",
                            log.type === 'info' && "bg-system-neutral-90/50 text-system-neutral-35"
                          )}
                        >
                          {log.type === 'error' && <AlertTriangle className="h-3 w-3 mt-0.5 flex-shrink-0" />}
                          {log.type === 'warning' && <AlertTriangle className="h-3 w-3 mt-0.5 flex-shrink-0" />}
                          <div className="flex-1 min-w-0">
                            <p className="font-mono break-words">{log.message}</p>
                          </div>
                        </div>
                      ))}
                    </div>
                  </ScrollArea>
                </div>
              )}
            </div>
          </div>
        )}
        </div>
      </Card>

    {/* Authentication Popup */}
    {authenticationType && (
      <AuthPopup
        isOpen={showAuthPopup}
        onClose={() => setShowAuthPopup(false)}
        onAuthenticate={handleAuthComplete}
        authType={authenticationType}
        toolName={safeToolName}
      />
    )}
  </>
  );
}