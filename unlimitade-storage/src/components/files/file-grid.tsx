"use client";

import { FileCard } from "./file-card";
import { FolderCard } from "./folder-card";
import type { FileItem, FolderItem } from "@/types";

interface FileGridProps {
  files: FileItem[];
  folders: FolderItem[];
  onToggleFavorite?: (fileId: string, isFavorite: boolean) => void;
  onDeleteFile?: (fileId: string) => void;
  onRenameFile?: (fileId: string, currentName: string) => void;
  onDeleteFolder?: (folderId: string) => void;
  onRenameFolder?: (folderId: string, currentName: string) => void;
  onFileClick?: (file: FileItem) => void;
}

export function FileGrid({
  files,
  folders,
  onToggleFavorite,
  onDeleteFile,
  onRenameFile,
  onDeleteFolder,
  onRenameFolder,
  onFileClick,
}: FileGridProps) {
  if (files.length === 0 && folders.length === 0) {
    return (
      <div className="flex flex-col items-center justify-center py-20 text-gray-400">
        <svg
          className="w-16 h-16 mb-4"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={1}
            d="M7 21h10a2 2 0 002-2V9.414a1 1 0 00-.293-.707l-5.414-5.414A1 1 0 0012.586 3H7a2 2 0 00-2 2v14a2 2 0 002 2z"
          />
        </svg>
        <p className="text-lg font-medium">No files yet</p>
        <p className="text-sm">Upload files or create folders to get started</p>
      </div>
    );
  }

  return (
    <div className="space-y-6 p-6">
      {/* Folders */}
      {folders.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Folders
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-3">
            {folders.map((folder) => (
              <FolderCard
                key={folder.id}
                folder={folder}
                onRename={onRenameFolder}
                onDelete={onDeleteFolder}
              />
            ))}
          </div>
        </div>
      )}

      {/* Files */}
      {files.length > 0 && (
        <div>
          <h3 className="text-xs font-semibold text-gray-500 uppercase tracking-wider mb-3">
            Files
          </h3>
          <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
            {files.map((file) => (
              <FileCard
                key={file.id}
                file={file}
                onToggleFavorite={onToggleFavorite}
                onDelete={onDeleteFile}
                onRename={onRenameFile}
                onClick={onFileClick}
              />
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
