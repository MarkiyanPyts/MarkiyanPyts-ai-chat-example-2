import { useState, useCallback } from 'react';
import { v4 as uuid } from 'uuid';
import type { FileAttachment } from '@/types';

export interface UseFileUploadReturn {
  files: FileAttachment[];
  addFiles: (fileList: FileList) => void;
  removeFile: (fileId: string) => void;
  clearFiles: () => void;
  uploadFile: (file: File) => Promise<FileAttachment>;
  isUploading: boolean;
}

export const useFileUpload = (): UseFileUploadReturn => {
  const [files, setFiles] = useState<FileAttachment[]>([]);
  const [isUploading, setIsUploading] = useState(false);

  const addFiles = useCallback((fileList: FileList) => {
    setIsUploading(true);
    
    const newFiles: FileAttachment[] = Array.from(fileList).map(file => ({
      id: uuid(),
      name: file.name,
      size: file.size,
      type: file.type,
      url: URL.createObjectURL(file) // Mock URL for preview
    }));

    setFiles(prev => [...prev, ...newFiles]);
    
    // Simulate upload delay
    setTimeout(() => {
      setIsUploading(false);
    }, 500);
  }, []);

  const removeFile = useCallback((fileId: string) => {
    setFiles(prev => {
      const fileToRemove = prev.find(f => f.id === fileId);
      if (fileToRemove?.url) {
        URL.revokeObjectURL(fileToRemove.url);
      }
      return prev.filter(f => f.id !== fileId);
    });
  }, []);

  const clearFiles = useCallback(() => {
    files.forEach(file => {
      if (file.url) {
        URL.revokeObjectURL(file.url);
      }
    });
    setFiles([]);
  }, [files]);

  const uploadFile = useCallback(async (file: File): Promise<FileAttachment> => {
    setIsUploading(true);
    
    // Create file attachment
    const attachment: FileAttachment = {
      id: uuid(),
      name: file.name,
      size: file.size,
      type: file.type,
      url: URL.createObjectURL(file) // Mock URL for preview
    };

    // Simulate upload delay
    await new Promise(resolve => setTimeout(resolve, 500));
    
    setIsUploading(false);
    return attachment;
  }, []);

  return {
    files,
    addFiles,
    removeFile,
    clearFiles,
    uploadFile,
    isUploading
  };
};