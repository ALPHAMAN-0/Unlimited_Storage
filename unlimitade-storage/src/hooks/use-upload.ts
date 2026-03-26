"use client";

import { useCallback } from "react";
import { toast } from "sonner";
import { useUploadStore } from "@/stores/upload-store";

const MAX_FILE_SIZE = 2 * 1024 * 1024 * 1024; // 2GB (Telegram limit)
const MAX_BATCH_SIZE = 20;

export function useUpload(folderId?: string | null, onComplete?: () => void) {
  const { addUpload, updateUpload } = useUploadStore();

  const uploadFiles = useCallback(
    async (files: FileList | File[]) => {
      const fileArray = Array.from(files);

      if (fileArray.length > MAX_BATCH_SIZE) {
        toast.error(`Maximum ${MAX_BATCH_SIZE} files per batch`);
        return;
      }

      const validFiles: File[] = [];
      for (const file of fileArray) {
        if (file.size > MAX_FILE_SIZE) {
          toast.error(`${file.name} exceeds the 2GB size limit`);
        } else if (file.size === 0) {
          toast.error(`${file.name} is empty`);
        } else {
          validFiles.push(file);
        }
      }

      if (validFiles.length === 0) return;

      for (const file of validFiles) {
        const uploadId = addUpload(file);

        try {
          updateUpload(uploadId, { status: "uploading" });

          const formData = new FormData();
          formData.append("file", file);
          if (folderId) formData.append("folderId", folderId);

          const xhr = new XMLHttpRequest();

          await new Promise<void>((resolve, reject) => {
            xhr.upload.addEventListener("progress", (e) => {
              if (e.lengthComputable) {
                const progress = Math.round((e.loaded / e.total) * 100);
                updateUpload(uploadId, { progress });
              }
            });

            xhr.addEventListener("load", () => {
              if (xhr.status >= 200 && xhr.status < 300) {
                updateUpload(uploadId, {
                  status: "done",
                  progress: 100,
                });
                resolve();
              } else {
                reject(new Error(`Upload failed: ${xhr.status}`));
              }
            });

            xhr.addEventListener("error", () => reject(new Error("Upload failed")));

            xhr.open("POST", "/api/files");
            xhr.send(formData);
          });
        } catch (error) {
          updateUpload(uploadId, {
            status: "error",
            error: error instanceof Error ? error.message : "Upload failed",
          });
        }
      }

      onComplete?.();
    },
    [folderId, addUpload, updateUpload, onComplete]
  );

  return { uploadFiles };
}
