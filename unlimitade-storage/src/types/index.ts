export interface FileItem {
  id: string;
  originalName: string;
  mimeType: string;
  size: string; // BigInt serialized as string
  isImage: boolean;
  isVideo: boolean;
  isFavorite: boolean;
  folderId: string | null;
  thumbnailFileId: string | null;
  width: number | null;
  height: number | null;
  createdAt: string;
  dateTaken: string | null;
  tags: { id: string; name: string }[];
}

export interface FolderItem {
  id: string;
  name: string;
  parentId: string | null;
  createdAt: string;
  _count?: { files: number; children: number };
}

export interface UploadProgress {
  id: string;
  filename: string;
  size: number;
  progress: number; // 0-100
  status: "queued" | "uploading" | "processing" | "done" | "error";
  error?: string;
}

export interface SearchParams {
  q?: string;
  type?: string;
  tags?: string[];
  dateFrom?: string;
  dateTo?: string;
  folderId?: string;
}
