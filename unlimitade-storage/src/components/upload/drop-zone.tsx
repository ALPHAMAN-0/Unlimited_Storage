"use client";

import { useState, useCallback } from "react";
import { Upload } from "lucide-react";

interface DropZoneProps {
  children: React.ReactNode;
  onDrop: (files: FileList) => void;
}

export function DropZone({ children, onDrop }: DropZoneProps) {
  const [isDragging, setIsDragging] = useState(false);

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      e.stopPropagation();
      setIsDragging(false);

      if (e.dataTransfer.files && e.dataTransfer.files.length > 0) {
        onDrop(e.dataTransfer.files);
      }
    },
    [onDrop]
  );

  return (
    <div
      className="relative flex-1"
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      {children}

      {/* Drag overlay */}
      {isDragging && (
        <div className="absolute inset-0 z-50 bg-blue-500/10 border-2 border-dashed border-blue-500 rounded-xl flex items-center justify-center backdrop-blur-sm">
          <div className="text-center">
            <Upload className="w-12 h-12 text-blue-500 mx-auto mb-3" />
            <p className="text-lg font-medium text-blue-700 dark:text-blue-300">
              Drop files here to upload
            </p>
          </div>
        </div>
      )}
    </div>
  );
}
