import { useState, useRef } from 'react';
import { Send, Paperclip, X, Upload } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { useChatStore } from '@/store';
import { useFileUpload } from '@/hooks/useFileUpload';
import { cn } from '@/lib/utils';
import type { FileAttachment } from '@/types';

interface SendMessageProps {
  threadId: string;
  disabled?: boolean;
  className?: string;
}

export function SendMessage({ threadId, disabled, className }: SendMessageProps) {
  const [message, setMessage] = useState('');
  const [attachments, setAttachments] = useState<FileAttachment[]>([]);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const { sendMessage, getCurrentThreadBlockState } = useChatStore();
  const { uploadFile, isUploading } = useFileUpload();
  
  const { isSendMessageBlocked } = getCurrentThreadBlockState();
  const isDisabled = disabled || isSendMessageBlocked || isUploading;

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!message.trim() && attachments.length === 0) return;
    if (isDisabled) return;

    await sendMessage(threadId, message.trim(), attachments);
    
    // Reset form
    setMessage('');
    setAttachments([]);
    
    // Reset textarea height
    if (textareaRef.current) {
      textareaRef.current.style.height = 'auto';
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSubmit(e);
    }
  };

  const handleFileSelect = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || []);
    
    for (const file of files) {
      try {
        const attachment = await uploadFile(file);
        setAttachments(prev => [...prev, attachment]);
      } catch (error) {
        console.error('File upload failed:', error);
      }
    }
    
    // Reset input
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  };

  const handleRemoveAttachment = (attachmentId: string) => {
    setAttachments(prev => prev.filter(file => file.id !== attachmentId));
  };

  const formatFileSize = (bytes: number): string => {
    if (bytes === 0) return '0 Bytes';
    const k = 1024;
    const sizes = ['Bytes', 'KB', 'MB', 'GB'];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i];
  };

  return (
    <Card className={cn("border-t border-system-neutral-85 rounded-none", className)}>
      <form onSubmit={handleSubmit} className="p-4">
        {/* File Attachments */}
        {attachments.length > 0 && (
          <div className="mb-3 space-y-2">
            <div className="flex items-center space-x-2 text-sm text-system-neutral-55">
              <Paperclip className="h-4 w-4" />
              <span>{attachments.length} attachment(s)</span>
            </div>
            <div className="flex flex-wrap gap-2">
              {attachments.map((file) => (
                <div
                  key={file.id}
                  className="flex items-center space-x-2 bg-system-neutral-90 rounded-lg p-2 text-sm"
                >
                  <Paperclip className="h-3 w-3 text-system-neutral-55" />
                  <span className="text-system-neutral-05 truncate max-w-32">
                    {file.name}
                  </span>
                  <Badge variant="secondary" className="text-xs">
                    {formatFileSize(file.size)}
                  </Badge>
                  <Button
                    type="button"
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveAttachment(file.id)}
                    className="h-4 w-4 p-0 text-system-neutral-55 hover:text-flamingo-rose-50"
                  >
                    <X className="h-3 w-3" />
                  </Button>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Message Input */}
        <div className="flex items-end space-x-2">
          <div className="flex-1">
            <Textarea
              ref={textareaRef}
              value={message}
              onChange={(e) => setMessage(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder={
                isSendMessageBlocked 
                  ? "Please wait for the agent to finish processing..."
                  : "Type your message... (Enter to send, Shift+Enter for new line)"
              }
              disabled={isDisabled}
              className="min-h-[44px] max-h-32 resize-none"
              rows={1}
            />
          </div>

          {/* File Upload Button */}
          <Button
            type="button"
            variant="ghost"
            size="sm"
            onClick={() => fileInputRef.current?.click()}
            disabled={isDisabled}
            className="text-system-neutral-55 hover:text-system-neutral-35"
          >
            {isUploading ? (
              <Upload className="h-4 w-4 animate-pulse" />
            ) : (
              <Paperclip className="h-4 w-4" />
            )}
          </Button>

          {/* Send Button */}
          <Button
            type="submit"
            size="sm"
            disabled={isDisabled || (!message.trim() && attachments.length === 0)}
            className="bg-allai-blue-50 hover:bg-allai-blue-60 text-system-neutral-99"
          >
            <Send className="h-4 w-4" />
          </Button>
        </div>

        {/* Hidden File Input */}
        <input
          ref={fileInputRef}
          type="file"
          multiple
          onChange={handleFileSelect}
          className="hidden"
          accept=".txt,.pdf,.doc,.docx,.jpg,.jpeg,.png,.gif,.mp3,.mp4,.mov,.avi"
        />

        {/* Status Messages */}
        {isSendMessageBlocked && (
          <div className="mt-2 text-xs text-light-orange-60">
            ⏳ Agent is processing your request...
          </div>
        )}
        
        {isUploading && (
          <div className="mt-2 text-xs text-allai-blue-50">
            📤 Uploading files...
          </div>
        )}
      </form>
    </Card>
  );
}