"use client";

import useSWR from "swr";
import type { FileItem, FolderItem } from "@/types";

const fetcher = (url: string) => fetch(url).then((r) => r.json());

export function useFiles(folderId?: string | null) {
  const params = new URLSearchParams();
  if (folderId) params.set("folderId", folderId);

  const { data, error, isLoading, mutate } = useSWR<{
    files: FileItem[];
    folders: FolderItem[];
  }>(`/api/files?${params.toString()}`, fetcher);

  return {
    files: data?.files || [],
    folders: data?.folders || [],
    isLoading,
    error,
    mutate,
  };
}

export function usePhotos() {
  const { data, error, isLoading, mutate } = useSWR<{
    photos: FileItem[];
  }>("/api/files?photosOnly=true", fetcher);

  return {
    photos: data?.photos || [],
    isLoading,
    error,
    mutate,
  };
}

export function useFavorites() {
  const { data, error, isLoading, mutate } = useSWR<{
    files: FileItem[];
  }>("/api/files?favoritesOnly=true", fetcher);

  return {
    files: data?.files || [],
    isLoading,
    error,
    mutate,
  };
}
