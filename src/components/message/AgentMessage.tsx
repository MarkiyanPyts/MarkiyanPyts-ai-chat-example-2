import ReactMarkdown from 'react-markdown';
import { Avatar, AvatarContent, AvatarFallback } from '@/components/ui/avatar';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ToolCall } from './ToolCall';
import { cn } from '@/lib/utils';
import type { AgentMessage as AgentMessageType } from '@/types';

interface AgentMessageProps {
  message: AgentMessageType;
  className?: string;
}

export function AgentMessage({ message, className }: AgentMessageProps) {
  // Separate tool calls and text messages
  const toolCalls = message.chunks.filter(chunk => chunk.type === 'tool');
  const textChunks = message.chunks.filter(chunk => chunk.type === 'text');
  
  // Combine text chunks into final content
  const textContent = textChunks
    .map(chunk => chunk.response_delta)
    .filter(Boolean)
    .join('');

  const getAgentIcon = (agentIcon: string) => {
    // If it's an emoji, return it directly
    if (/^\p{Emoji}+$/u.test(agentIcon)) {
      return agentIcon;
    }
    
    // If it's a URL, we could show an image, but for now return first letter
    return message.agent_name.charAt(0);
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'streaming':
        return 'bg-allai-blue-90 text-allai-blue-30';
      case 'completed':
        return 'bg-fluor-green-40 text-fluor-green-20';
      case 'failed':
        return 'bg-flamingo-rose-70 text-flamingo-rose-30';
      default:
        return 'bg-system-neutral-90 text-system-neutral-35';
    }
  };

  return (
    <div className={cn("flex justify-start mb-6", className)}>
      <div className="flex items-start space-x-3 max-w-[85%]">
        {/* Agent Avatar */}
        <Avatar className="h-8 w-8 bg-system-neutral-90 flex-shrink-0">
          <AvatarContent className="text-lg">
            {getAgentIcon(message.agent_icon)}
          </AvatarContent>
          <AvatarFallback className="bg-system-neutral-90 text-system-neutral-35 text-xs">
            {message.agent_name.charAt(0)}
          </AvatarFallback>
        </Avatar>

        <div className="flex flex-col flex-1 min-w-0">
          {/* Agent Name and Status */}
          <div className="flex items-center space-x-2 mb-2">
            <h3 className="text-sm font-medium text-system-neutral-05">
              {message.agent_name}
            </h3>
            <Badge variant="outline" className={cn("text-xs", getStatusColor(message.status))}>
              {message.status}
            </Badge>
            <span className="text-xs text-system-neutral-55">
              {new Date(message.timestamp).toLocaleTimeString()}
            </span>
          </div>

          {/* Tool Calls */}
          {toolCalls.length > 0 && (
            <div className="space-y-2 mb-3">
              {toolCalls.map((toolCall) => (
                <ToolCall
                  key={toolCall.id}
                  message={toolCall}
                  messageId={message.id}
                />
              ))}
            </div>
          )}

          {/* Text Content */}
          {textContent && (
            <Card className="p-4 bg-system-neutral-99 border-system-neutral-85">
              <ReactMarkdown 
                className="text-sm text-system-neutral-05 prose prose-sm max-w-none"
                components={{
                  p: ({ children }) => <p className="mb-3 last:mb-0">{children}</p>,
                  strong: ({ children }) => <strong className="font-semibold text-allai-blue-50">{children}</strong>,
                  em: ({ children }) => <em className="italic text-system-neutral-55">{children}</em>,
                  code: ({ children }) => (
                    <code className="bg-system-neutral-90 text-allai-blue-50 px-1 py-0.5 rounded text-xs font-mono">
                      {children}
                    </code>
                  ),
                  pre: ({ children }) => (
                    <pre className="bg-system-neutral-95 p-3 rounded-lg overflow-x-auto text-xs font-mono border">
                      {children}
                    </pre>
                  ),
                  a: ({ children, href }) => (
                    <a 
                      href={href} 
                      target="_blank" 
                      rel="noopener noreferrer"
                      className="text-allai-blue-50 hover:text-allai-blue-60 underline"
                    >
                      {children}
                    </a>
                  ),
                  ul: ({ children }) => <ul className="list-disc list-inside space-y-1 mb-3">{children}</ul>,
                  ol: ({ children }) => <ol className="list-decimal list-inside space-y-1 mb-3">{children}</ol>,
                  li: ({ children }) => <li className="text-sm">{children}</li>,
                  h1: ({ children }) => <h1 className="text-lg font-semibold mb-2 text-system-neutral-05">{children}</h1>,
                  h2: ({ children }) => <h2 className="text-base font-semibold mb-2 text-system-neutral-05">{children}</h2>,
                  h3: ({ children }) => <h3 className="text-sm font-semibold mb-2 text-system-neutral-05">{children}</h3>,
                }}
              >
                {textContent}
              </ReactMarkdown>

              {/* Streaming indicator */}
              {message.status === 'streaming' && (
                <div className="flex items-center space-x-2 mt-3 pt-3 border-t border-system-neutral-85">
                  <div className="flex space-x-1">
                    <div className="w-2 h-2 bg-allai-blue-50 rounded-full animate-pulse"></div>
                    <div className="w-2 h-2 bg-allai-blue-50 rounded-full animate-pulse delay-75"></div>
                    <div className="w-2 h-2 bg-allai-blue-50 rounded-full animate-pulse delay-150"></div>
                  </div>
                  <span className="text-xs text-system-neutral-55">Agent is typing...</span>
                </div>
              )}
            </Card>
          )}

          {/* Final Content Preview (for completed messages) */}
          {message.status === 'completed' && message.final_content && message.final_content !== textContent && (
            <div className="mt-2">
              <details className="text-xs text-system-neutral-55">
                <summary className="cursor-pointer hover:text-system-neutral-35">
                  View assembled content
                </summary>
                <Card className="mt-2 p-3 bg-system-neutral-95">
                  <pre className="whitespace-pre-wrap text-xs font-mono">
                    {message.final_content}
                  </pre>
                </Card>
              </details>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}