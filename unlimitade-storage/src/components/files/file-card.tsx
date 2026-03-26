"use client";

import { useState } from "react";
import { Star, MoreVertical, Download, Trash2, Edit3, FolderInput } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { FileIconDisplay } from "./file-icon";
import type { FileItem } from "@/types";

function formatSize(sizeStr: string): string {
  const bytes = parseInt(sizeStr);
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}

interface FileCardProps {
  file: FileItem;
  onToggleFavorite?: (fileId: string, isFavorite: boolean) => void;
  onDelete?: (fileId: string) => void;
  onRename?: (fileId: string, currentName: string) => void;
  onClick?: (file: FileItem) => void;
}

export function FileCard({
  file,
  onToggleFavorite,
  onDelete,
  onRename,
  onClick,
}: FileCardProps) {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div
      className="group relative bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-3 hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800 transition-all cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={() => onClick?.(file)}
    >
      {/* Thumbnail or Icon */}
      <div className="aspect-square rounded-lg bg-gray-50 dark:bg-gray-800 flex items-center justify-center mb-3 overflow-hidden">
        {file.isImage && file.thumbnailFileId ? (
          <img
            src={`/api/files/${file.id}/thumbnail`}
            alt={file.originalName}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <FileIconDisplay mimeType={file.mimeType} className="w-12 h-12" />
        )}
      </div>

      {/* File info */}
      <div className="space-y-1">
        <p className="text-sm font-medium truncate text-gray-900 dark:text-white">
          {file.originalName}
        </p>
        <p className="text-xs text-gray-500">{formatSize(file.size)}</p>
      </div>

      {/* Favorite star */}
      {(file.isFavorite || isHovered) && (
        <button
          className="absolute top-2 left-2 p-1 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
          onClick={(e) => {
            e.stopPropagation();
            onToggleFavorite?.(file.id, !file.isFavorite);
          }}
        >
          <Star
            className={`w-4 h-4 ${
              file.isFavorite
                ? "text-yellow-500 fill-yellow-500"
                : "text-gray-400"
            }`}
          />
        </button>
      )}

      {/* Menu */}
      {isHovered && (
        <div className="absolute top-2 right-2">
          <DropdownMenu>
            <DropdownMenuTrigger
              className="p-1 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm"
              onClick={(e) => e.stopPropagation()}
            >
              <MoreVertical className="w-4 h-4 text-gray-600" />
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  window.open(`/api/files/${file.id}/download`, "_blank");
                }}
              >
                <Download className="w-4 h-4 mr-2" /> Download
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  onRename?.(file.id, file.originalName);
                }}
              >
                <Edit3 className="w-4 h-4 mr-2" /> Rename
              </DropdownMenuItem>
              <DropdownMenuItem
                onClick={(e) => {
                  e.stopPropagation();
                  onToggleFavorite?.(file.id, !file.isFavorite);
                }}
              >
                <Star className="w-4 h-4 mr-2" />
                {file.isFavorite ? "Remove from favorites" : "Add to favorites"}
              </DropdownMenuItem>
              <DropdownMenuSeparator />
              <DropdownMenuItem
                className="text-red-600"
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete?.(file.id);
                }}
              >
                <Trash2 className="w-4 h-4 mr-2" /> Delete
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      )}
    </div>
  );
}
