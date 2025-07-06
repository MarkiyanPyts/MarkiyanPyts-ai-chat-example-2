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
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from '@/components/ui/accordion';
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

  const { data, status, authenticationType, toolName, toolId } = message;
  
  // Provide default values for optional fields
  const safeStatus = status || 'waiting_for_authentication';
  const safeToolName = toolName || 'Unknown Tool';
  const safeToolId = toolId || message.id;

  const getStatusIcon = (status: ToolStatus) => {
    switch (status) {
      case 'waiting_for_authentication':
        return <Lock className="h-4 w-4 text-light-orange-60" />;
      case 'waiting_user_approval':
        return <Shield className="h-4 w-4 text-allai-blue-50" />;
      case 'in_progress':
        return <Loader2 className="h-4 w-4 animate-spin text-allai-blue-50" />;
      case 'completed':
        return <CheckCircle className="h-4 w-4 text-fluor-green-40" />;
      case 'failed':
        return <XCircle className="h-4 w-4 text-flamingo-rose-50" />;
      case 'user_rejected':
        return <XCircle className="h-4 w-4 text-flamingo-rose-50" />;
      default:
        return <Clock className="h-4 w-4 text-system-neutral-55" />;
    }
  };

  const getStatusColor = (status: ToolStatus) => {
    switch (status) {
      case 'waiting_for_authentication':
        return 'bg-light-orange-70 text-light-orange-40 border-light-orange-60';
      case 'waiting_user_approval':
        return 'bg-allai-blue-90 text-allai-blue-30 border-allai-blue-50';
      case 'in_progress':
        return 'bg-allai-blue-90 text-allai-blue-30 border-allai-blue-50';
      case 'completed':
        return 'bg-fluor-green-40 text-fluor-green-20 border-fluor-green-30';
      case 'failed':
        return 'bg-flamingo-rose-70 text-flamingo-rose-30 border-flamingo-rose-50';
      case 'user_rejected':
        return 'bg-flamingo-rose-70 text-flamingo-rose-30 border-flamingo-rose-50';
      default:
        return 'bg-system-neutral-90 text-system-neutral-35 border-system-neutral-80';
    }
  };

  const handleAuthenticate = () => {
    setShowAuthPopup(true);
  };

  const handleAuthComplete = () => {
    updateToolStatus(messageId, safeToolId, 'in_progress');
    // Simulate tool execution after authentication
    setTimeout(() => {
      simulateToolExecution(messageId, safeToolId);
    }, 1000);
  };

  const handleApprove = () => {
    updateToolStatus(messageId, safeToolId, 'in_progress');
    // Simulate tool execution after approval
    setTimeout(() => {
      simulateToolExecution(messageId, safeToolId);
    }, 1000);
  };

  const handleReject = () => {
    updateToolStatus(messageId, safeToolId, 'user_rejected');
  };

  const canShowActions = safeStatus === 'waiting_for_authentication' || safeStatus === 'waiting_user_approval';

  return (
    <>
      <Card className={cn("mb-3 border-l-4", getStatusColor(safeStatus), className)}>
        <div className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center space-x-3">
              {getStatusIcon(safeStatus)}
              <div>
                <h4 className="text-sm font-medium text-system-neutral-05">
                  {safeToolName}
                </h4>
                <Badge variant="outline" className={cn("text-xs", getStatusColor(safeStatus))}>
                  {safeStatus.replace('_', ' ').toUpperCase()}
                </Badge>
              </div>
            </div>

            {/* Action Buttons */}
            {canShowActions && (
              <div className="flex space-x-2">
                {safeStatus === 'waiting_for_authentication' && (
                  <Button
                    onClick={handleAuthenticate}
                    size="sm"
                    className="bg-light-orange-60 hover:bg-light-orange-70 text-light-orange-40"
                  >
                    <Lock className="h-3 w-3 mr-1" />
                    Authenticate
                  </Button>
                )}
                
                {safeStatus === 'waiting_user_approval' && (
                  <>
                    <Button
                      onClick={handleApprove}
                      size="sm"
                      className="bg-fluor-green-40 hover:bg-fluor-green-30 text-fluor-green-20"
                    >
                      <CheckCircle className="h-3 w-3 mr-1" />
                      Approve
                    </Button>
                    <Button
                      onClick={handleReject}
                      size="sm"
                      variant="outline"
                      className="border-flamingo-rose-50 text-flamingo-rose-50 hover:bg-flamingo-rose-70"
                    >
                      <XCircle className="h-3 w-3 mr-1" />
                      Reject
                    </Button>
                  </>
                )}
              </div>
            )}
          </div>

        {/* Tool Description */}
        <p className="text-sm text-system-neutral-55 mb-3">
          {data.description}
        </p>

        {/* Expandable Content */}
        <Accordion type="single" collapsible>
          <AccordionItem value="details" className="border-none">
            <AccordionTrigger className="py-2 text-sm text-allai-blue-50 hover:text-allai-blue-60 hover:no-underline">
              <span className="flex items-center space-x-2">
                <span>View Details</span>
              </span>
            </AccordionTrigger>
            <AccordionContent className="pt-3">
              <div className="space-y-4">
                {/* Action Details */}
                <div>
                  <h5 className="text-sm font-medium text-system-neutral-05 mb-2">Action</h5>
                  <Card className="p-3 bg-system-neutral-95">
                    <div className="text-sm text-system-neutral-05 prose prose-sm max-w-none">
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
                    <h5 className="text-sm font-medium text-system-neutral-05 mb-2">
                      Logs ({data.logs.length})
                    </h5>
                    <ScrollArea className="h-32">
                      <div className="space-y-1">
                        {data.logs.map((log, index) => (
                          <div
                            key={index}
                            className={cn(
                              "flex items-start space-x-2 p-2 rounded text-xs",
                              log.type === 'error' && "bg-flamingo-rose-70 text-flamingo-rose-30",
                              log.type === 'warning' && "bg-light-orange-70 text-light-orange-40",
                              log.type === 'info' && "bg-system-neutral-90 text-system-neutral-35"
                            )}
                          >
                            {log.type === 'error' && <AlertTriangle className="h-3 w-3 mt-0.5 flex-shrink-0" />}
                            {log.type === 'warning' && <AlertTriangle className="h-3 w-3 mt-0.5 flex-shrink-0" />}
                            <div className="flex-1 min-w-0">
                              <p className="font-mono break-words">{log.message}</p>
                              <p className="opacity-75 mt-1">
                                {new Date(log.timestamp).toLocaleTimeString()}
                              </p>
                            </div>
                          </div>
                        ))}
                      </div>
                    </ScrollArea>
                  </div>
                )}
              </div>
            </AccordionContent>
          </AccordionItem>
        </Accordion>
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