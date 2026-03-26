"use client";

import { useState } from "react";
import { usePhotos } from "@/hooks/use-files";
import { FilePreview } from "@/components/files/file-preview";
import { Topbar } from "@/components/layout/topbar";
import { Skeleton } from "@/components/ui/skeleton";
import type { FileItem } from "@/types";
import { format, parseISO } from "date-fns";
import { ImageIcon } from "lucide-react";

function groupByDate(photos: FileItem[]): Record<string, FileItem[]> {
  const groups: Record<string, FileItem[]> = {};
  for (const photo of photos) {
    const dateStr = photo.dateTaken || photo.createdAt;
    const date = format(parseISO(dateStr), "MMMM d, yyyy");
    if (!groups[date]) groups[date] = [];
    groups[date].push(photo);
  }
  return groups;
}

export default function PhotosPage() {
  const { photos, isLoading, mutate } = usePhotos();
  const [previewFile, setPreviewFile] = useState<FileItem | null>(null);

  const handleToggleFavorite = async (fileId: string, isFavorite: boolean) => {
    await fetch(`/api/files/${fileId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isFavorite }),
    });
    mutate();
  };

  const groups = groupByDate(photos);

  return (
    <>
      <Topbar title="Photos" />
      <div className="flex-1 overflow-y-auto">
        {isLoading ? (
          <div className="p-6 grid grid-cols-4 gap-2">
            {Array.from({ length: 12 }).map((_, i) => (
              <Skeleton key={i} className="aspect-square rounded-lg" />
            ))}
          </div>
        ) : photos.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <ImageIcon className="w-16 h-16 mb-4" />
            <p className="text-lg font-medium">No photos yet</p>
            <p className="text-sm">
              Upload images from My Drive to see them here
            </p>
          </div>
        ) : (
          <div className="p-6 space-y-8">
            {Object.entries(groups).map(([date, datePhotos]) => (
              <div key={date}>
                <h3 className="text-sm font-semibold text-gray-700 dark:text-gray-300 mb-3">
                  {date}
                </h3>
                <div className="grid grid-cols-3 sm:grid-cols-4 md:grid-cols-5 lg:grid-cols-6 xl:grid-cols-8 gap-1.5">
                  {datePhotos.map((photo) => (
                    <button
                      key={photo.id}
                      className="aspect-square rounded-lg overflow-hidden bg-gray-100 dark:bg-gray-800 hover:opacity-90 transition-opacity"
                      onClick={() => setPreviewFile(photo)}
                    >
                      {photo.thumbnailFileId ? (
                        <img
                          src={`/api/files/${photo.id}/thumbnail`}
                          alt={photo.originalName}
                          className="w-full h-full object-cover"
                          loading="lazy"
                        />
                      ) : (
                        <div className="w-full h-full flex items-center justify-center">
                          <ImageIcon className="w-8 h-8 text-gray-400" />
                        </div>
                      )}
                    </button>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {previewFile && (
        <FilePreview
          file={previewFile}
          files={photos}
          onClose={() => setPreviewFile(null)}
          onNavigate={setPreviewFile}
          onToggleFavorite={handleToggleFavorite}
        />
      )}
    </>
  );
}
