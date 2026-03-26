"use client";

import { useEffect, useCallback } from "react";
import { X, ChevronLeft, ChevronRight, Download, Star } from "lucide-react";
import { Button } from "@/components/ui/button";
import type { FileItem } from "@/types";

function formatSize(sizeStr: string): string {
  const bytes = parseInt(sizeStr);
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}

interface FilePreviewProps {
  file: FileItem;
  files: FileItem[];
  onClose: () => void;
  onNavigate: (file: FileItem) => void;
  onToggleFavorite?: (fileId: string, isFavorite: boolean) => void;
}

export function FilePreview({
  file,
  files,
  onClose,
  onNavigate,
  onToggleFavorite,
}: FilePreviewProps) {
  const currentIndex = files.findIndex((f) => f.id === file.id);
  const hasPrev = currentIndex > 0;
  const hasNext = currentIndex < files.length - 1;

  const goToPrev = useCallback(() => {
    if (hasPrev) onNavigate(files[currentIndex - 1]);
  }, [hasPrev, currentIndex, files, onNavigate]);

  const goToNext = useCallback(() => {
    if (hasNext) onNavigate(files[currentIndex + 1]);
  }, [hasNext, currentIndex, files, onNavigate]);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft") goToPrev();
      if (e.key === "ArrowRight") goToNext();
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [onClose, goToPrev, goToNext]);

  return (
    <div className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center">
      {/* Top bar */}
      <div className="absolute top-0 left-0 right-0 flex items-center justify-between p-4 bg-gradient-to-b from-black/60 to-transparent">
        <div className="text-white">
          <p className="font-medium">{file.originalName}</p>
          <p className="text-sm text-white/60">{formatSize(file.size)}</p>
        </div>
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
            onClick={() => onToggleFavorite?.(file.id, !file.isFavorite)}
          >
            <Star
              className={`w-5 h-5 ${
                file.isFavorite ? "text-yellow-500 fill-yellow-500" : ""
              }`}
            />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
            onClick={() => window.open(`/api/files/${file.id}/download`, "_blank")}
          >
            <Download className="w-5 h-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="text-white hover:bg-white/20"
            onClick={onClose}
          >
            <X className="w-5 h-5" />
          </Button>
        </div>
      </div>

      {/* Navigation arrows */}
      {hasPrev && (
        <button
          className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 text-white hover:bg-black/60"
          onClick={goToPrev}
        >
          <ChevronLeft className="w-6 h-6" />
        </button>
      )}
      {hasNext && (
        <button
          className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full bg-black/40 text-white hover:bg-black/60"
          onClick={goToNext}
        >
          <ChevronRight className="w-6 h-6" />
        </button>
      )}

      {/* Content */}
      <div className="max-w-[90vw] max-h-[80vh] flex items-center justify-center">
        {file.isImage ? (
          <img
            src={`/api/files/${file.id}/download`}
            alt={file.originalName}
            className="max-w-full max-h-[80vh] object-contain"
          />
        ) : file.isVideo ? (
          <video
            src={`/api/files/${file.id}/download`}
            controls
            autoPlay
            className="max-w-full max-h-[80vh]"
          />
        ) : (
          <div className="text-center text-white">
            <p className="text-lg">Preview not available</p>
            <Button
              className="mt-4"
              onClick={() => window.open(`/api/files/${file.id}/download`, "_blank")}
            >
              <Download className="w-4 h-4 mr-2" /> Download
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
