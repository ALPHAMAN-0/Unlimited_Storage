"use client";

import { X, CheckCircle2, AlertCircle, Loader2 } from "lucide-react";
import { Progress } from "@/components/ui/progress";
import { useUploadStore } from "@/stores/upload-store";

function formatSize(bytes: number): string {
  if (bytes === 0) return "0 B";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return parseFloat((bytes / Math.pow(k, i)).toFixed(1)) + " " + sizes[i];
}

export function UploadProgress() {
  const { uploads, removeUpload, clearCompleted } = useUploadStore();

  if (uploads.length === 0) return null;

  const completed = uploads.filter((u) => u.status === "done").length;
  const total = uploads.length;

  return (
    <div className="fixed bottom-4 right-4 w-80 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl shadow-2xl z-40 overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 bg-gray-50 dark:bg-gray-800 border-b border-gray-200 dark:border-gray-700">
        <span className="text-sm font-medium">
          {completed === total
            ? `${total} upload${total > 1 ? "s" : ""} complete`
            : `Uploading ${completed + 1} of ${total}`}
        </span>
        {completed === total && (
          <button
            onClick={clearCompleted}
            className="text-xs text-blue-600 hover:underline"
          >
            Dismiss
          </button>
        )}
      </div>

      {/* Upload list */}
      <div className="max-h-60 overflow-y-auto">
        {uploads.map((upload) => (
          <div
            key={upload.id}
            className="flex items-center gap-3 px-4 py-2.5 border-b border-gray-100 dark:border-gray-800 last:border-0"
          >
            {upload.status === "done" && (
              <CheckCircle2 className="w-4 h-4 text-green-500 shrink-0" />
            )}
            {upload.status === "error" && (
              <AlertCircle className="w-4 h-4 text-red-500 shrink-0" />
            )}
            {(upload.status === "uploading" || upload.status === "queued") && (
              <Loader2 className="w-4 h-4 text-blue-500 animate-spin shrink-0" />
            )}

            <div className="flex-1 min-w-0">
              <p className="text-sm truncate">{upload.filename}</p>
              <div className="flex items-center gap-2">
                <p className="text-xs text-gray-500">{formatSize(upload.size)}</p>
                {upload.status === "uploading" && (
                  <Progress value={upload.progress} className="h-1 flex-1" />
                )}
                {upload.status === "error" && (
                  <p className="text-xs text-red-500">{upload.error}</p>
                )}
              </div>
            </div>

            <button
              onClick={() => removeUpload(upload.id)}
              className="p-1 hover:bg-gray-100 dark:hover:bg-gray-800 rounded"
            >
              <X className="w-3 h-3 text-gray-400" />
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
