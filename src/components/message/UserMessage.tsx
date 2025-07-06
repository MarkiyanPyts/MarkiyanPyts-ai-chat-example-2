import { Paperclip, User } from 'lucide-react';
import { Card } from '@/components/ui/card';
import { Avatar, AvatarContent, AvatarFallback } from '@/components/ui/avatar';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { UserMessage as UserMessageType } from '@/types';

interface UserMessageProps {
  message: UserMessageType;
  className?: string;
}

export function UserMessage({ message, className }: UserMessageProps) {
  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <div className={cn("flex justify-end mb-6", className)}>
      <div className="flex items-start space-x-3 max-w-[70%]">
        <div className="flex flex-col items-end flex-1">
          {/* Message Content */}
          <Card className="p-4 bg-allai-blue-50 border-allai-blue-60 text-system-neutral-99">
            <div className="space-y-3">
              {/* Text Content */}
              <p className="text-sm whitespace-pre-wrap break-words">
                {message.content}
              </p>

              {/* File Attachments */}
              {message.attachments && message.attachments.length > 0 && (
                <div className="space-y-2 pt-2 border-t border-allai-blue-60">
                  <div className="flex items-center space-x-1 text-xs text-allai-blue-90">
                    <Paperclip className="h-3 w-3" />
                    <span>{message.attachments.length} attachment(s)</span>
                  </div>
                  <div className="space-y-1">
                    {message.attachments.map((file) => (
                      <div
                        key={file.id}
                        className="flex items-center justify-between p-2 bg-allai-blue-60 rounded text-xs"
                      >
                        <div className="flex items-center space-x-2 flex-1 min-w-0">
                          <Paperclip className="h-3 w-3 flex-shrink-0" />
                          <span className="truncate">{file.name}</span>
                        </div>
                        <Badge variant="secondary" className="ml-2 bg-allai-blue-70 text-allai-blue-20 text-xs">
                          {formatFileSize(file.size)}
                        </Badge>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </Card>

          {/* Timestamp */}
          <p className="text-xs text-system-neutral-55 mt-1 mr-2">
            {new Date(message.timestamp).toLocaleTimeString()}
          </p>
        </div>

        {/* User Avatar */}
        <Avatar className="h-8 w-8 bg-system-neutral-80">
          <AvatarContent>
            <User className="h-4 w-4 text-system-neutral-35" />
          </AvatarContent>
          <AvatarFallback className="bg-system-neutral-80 text-system-neutral-35">
            {message.user_name ? message.user_name.charAt(0).toUpperCase() : 'U'}
          </AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
}