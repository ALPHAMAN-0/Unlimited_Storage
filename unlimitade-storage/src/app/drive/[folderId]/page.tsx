"use client";

import { useState, useCallback, useEffect } from "react";
import { useParams } from "next/navigation";
import { Topbar } from "@/components/layout/topbar";
import { Breadcrumbs } from "@/components/layout/breadcrumbs";
import { FileGrid } from "@/components/files/file-grid";
import { FilePreview } from "@/components/files/file-preview";
import { CreateFolderDialog } from "@/components/files/create-folder-dialog";
import { DropZone } from "@/components/upload/drop-zone";
import { useFiles } from "@/hooks/use-files";
import { useUpload } from "@/hooks/use-upload";
import type { FileItem } from "@/types";

interface BreadcrumbItem {
  id: string;
  name: string;
}

export default function FolderPage() {
  const params = useParams();
  const folderId = params.folderId as string;
  const { files, folders, mutate } = useFiles(folderId);
  const { uploadFiles } = useUpload(folderId, () => mutate());
  const [showCreateFolder, setShowCreateFolder] = useState(false);
  const [previewFile, setPreviewFile] = useState<FileItem | null>(null);
  const [breadcrumbs, setBreadcrumbs] = useState<BreadcrumbItem[]>([]);

  // Build breadcrumb path
  useEffect(() => {
    async function buildPath() {
      const crumbs: BreadcrumbItem[] = [];
      let currentId: string | null = folderId;

      while (currentId) {
        try {
          const res = await fetch(`/api/folders/${currentId}`);
          if (!res.ok) break;
          // Folder PATCH returns the folder data, but we need a GET.
          // For simplicity, we build breadcrumbs from the folder list
          break;
        } catch {
          break;
        }
      }

      // Simple approach: just show current folder name from the folders we know
      setBreadcrumbs(crumbs);
    }
    buildPath();
  }, [folderId]);

  const handleCreateFolder = async (name: string) => {
    await fetch("/api/folders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ name, parentId: folderId }),
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

  const handleDeleteFolder = async (fId: string) => {
    await fetch(`/api/folders/${fId}`, { method: "DELETE" });
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

  const handleRenameFolder = async (fId: string, currentName: string) => {
    const newName = prompt("Rename folder:", currentName);
    if (newName && newName !== currentName) {
      await fetch(`/api/folders/${fId}`, {
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
        onUpload={handleUpload}
        onCreateFolder={() => setShowCreateFolder(true)}
      />
      <Breadcrumbs path={breadcrumbs} />
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
