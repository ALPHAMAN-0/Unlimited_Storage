"use client";

import { useState } from "react";
import { useFavorites } from "@/hooks/use-files";
import { FileCard } from "@/components/files/file-card";
import { FilePreview } from "@/components/files/file-preview";
import { Topbar } from "@/components/layout/topbar";
import { Star } from "lucide-react";
import type { FileItem } from "@/types";

export default function FavoritesPage() {
  const { files, mutate } = useFavorites();
  const [previewFile, setPreviewFile] = useState<FileItem | null>(null);

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

  return (
    <>
      <Topbar title="Favorites" />
      <div className="flex-1 overflow-y-auto">
        {files.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <Star className="w-16 h-16 mb-4" />
            <p className="text-lg font-medium">No favorites yet</p>
            <p className="text-sm">
              Star files to find them here quickly
            </p>
          </div>
        ) : (
          <div className="p-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
              {files.map((file) => (
                <FileCard
                  key={file.id}
                  file={file}
                  onToggleFavorite={handleToggleFavorite}
                  onDelete={handleDeleteFile}
                  onClick={setPreviewFile}
                />
              ))}
            </div>
          </div>
        )}
      </div>

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
