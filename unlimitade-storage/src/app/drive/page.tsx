"use client";

import { useState, useCallback } from "react";
import { Topbar } from "@/components/layout/topbar";
import { FileGrid } from "@/components/files/file-grid";
import { FilePreview } from "@/components/files/file-preview";
import { CreateFolderDialog } from "@/components/files/create-folder-dialog";
import { DropZone } from "@/components/upload/drop-zone";
import { useFiles } from "@/hooks/use-files";
import { useUpload } from "@/hooks/use-upload";
import type { FileItem } from "@/types";

export default function DrivePage() {
  const { files, folders, mutate } = useFiles(null);
  const { uploadFiles } = useUpload(null, () => mutate());
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const [previewFile, setPreviewFile] = useState<FileItem | null>(null);

  const handleCreateFolder = async (name: string) => {
    await fetch("/api/folders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name }),
    });
    mutate();
  };

  const handleToggleFavorite = async (fileId: string, isFavorite: boolean) => {
    await fetch(`/api/files/${fileId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isFavorite }),
    });
    mutate();
  };

  const handleDeleteFile = async (fileId: string) => {
    await fetch(`/api/files/${fileId}`, { method: "DELETE" });
    mutate();
  };

  const handleDeleteFolder = async (folderId: string) => {
    await fetch(`/api/folders/${folderId}`, { method: "DELETE" });
    mutate();
  };

  const handleRenameFile = async (fileId: string, currentName: string) => {
    const newName = prompt("Rename file:", currentName);
    if (newName && newName !== currentName) {
      await fetch(`/api/files/${fileId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ originalName: newName }),
      });
      mutate();
    }
  };

  const handleRenameFolder = async (folderId: string, currentName: string) => {
    const newName = prompt("Rename folder:", currentName);
    if (newName && newName !== currentName) {
      await fetch(`/api/folders/${folderId}`, {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: newName }),
      });
      mutate();
    }
  };

  const handleUpload = useCallback(
    (fileList: FileList) => uploadFiles(fileList),
    [uploadFiles]
  );

  return (
    <>
      <Topbar
        title="My Drive"
        onUpload={handleUpload}
        onCreateFolder={() => setShowCreateFolder(true)}
      />
      <DropZone onDrop={handleUpload}>
        <div className="flex-1 overflow-y-auto">
          <FileGrid
            files={files}
            folders={folders}
            onToggleFavorite={handleToggleFavorite}
            onDeleteFile={handleDeleteFile}
            onRenameFile={handleRenameFile}
            onDeleteFolder={handleDeleteFolder}
            onRenameFolder={handleRenameFolder}
            onFileClick={setPreviewFile}
          />
        </div>
      </DropZone>

      <CreateFolderDialog
        open={showCreateFolder}
        onOpenChange={setShowCreateFolder}
        onSubmit={handleCreateFolder}
      />

      {previewFile && (
        <FilePreview
          file={previewFile}
          files={files}
          onClose={() => setPreviewFile(null)}
          onNavigate={setPreviewFile}
          onToggleFavorite={handleToggleFavorite}
        />
      )}
    </>
  );
}
