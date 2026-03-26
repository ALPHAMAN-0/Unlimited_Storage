"use client";

import { Suspense, useState, useEffect, useCallback } from "react";
import { useSearchParams } from "next/navigation";
import { Search as SearchIcon } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { FileCard } from "@/components/files/file-card";
import { FilePreview } from "@/components/files/file-preview";
import type { FileItem } from "@/types";

export default function SearchPage() {
  return (
    <Suspense fallback={<div className="flex items-center justify-center py-20 text-gray-400">Loading...</div>}>
      <SearchContent />
    </Suspense>
  );
}

function SearchContent() {
  const searchParams = useSearchParams();
  const initialQuery = searchParams.get("q") || "";
  const [query, setQuery] = useState(initialQuery);
  const [typeFilter, setTypeFilter] = useState<string>("");
  const [results, setResults] = useState<FileItem[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const [previewFile, setPreviewFile] = useState<FileItem | null>(null);

  const doSearch = useCallback(async (q: string, type: string) => {
    if (!q && !type) {
      setResults([]);
      return;
    }

    setIsSearching(true);
    const params = new URLSearchParams();
    if (q) params.set("q", q);
    if (type) params.set("type", type);

    try {
      const res = await fetch(`/api/search?${params.toString()}`);
      const data = await res.json();
      setResults(data.files || []);
    } catch {
      console.error("Search failed");
    } finally {
      setIsSearching(false);
    }
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      doSearch(query, typeFilter);
    }, 300);
    return () => clearTimeout(timer);
  }, [query, typeFilter, doSearch]);

  const handleToggleFavorite = async (fileId: string, isFavorite: boolean) => {
    await fetch(`/api/files/${fileId}`, {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ isFavorite }),
    });
    doSearch(query, typeFilter);
  };

  const handleDeleteFile = async (fileId: string) => {
    await fetch(`/api/files/${fileId}`, { method: "DELETE" });
    doSearch(query, typeFilter);
  };

  const typeFilters = [
    { value: "", label: "All" },
    { value: "image", label: "Images" },
    { value: "video", label: "Videos" },
    { value: "audio", label: "Audio" },
    { value: "application/pdf", label: "PDFs" },
  ];

  return (
    <>
      <header className="border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 px-6 py-4 space-y-4">
        <div className="relative max-w-2xl">
          <SearchIcon className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
          <Input
            placeholder="Search files by name..."
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="pl-11 text-lg h-12"
            autoFocus
          />
        </div>

        <div className="flex gap-2">
          {typeFilters.map((f) => (
            <Button
              key={f.value}
              variant={typeFilter === f.value ? "default" : "outline"}
              size="sm"
              onClick={() => setTypeFilter(f.value)}
            >
              {f.label}
            </Button>
          ))}
        </div>
      </header>

      <div className="flex-1 overflow-y-auto">
        {isSearching ? (
          <div className="flex items-center justify-center py-20 text-gray-400">
            <p>Searching...</p>
          </div>
        ) : results.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-20 text-gray-400">
            <SearchIcon className="w-16 h-16 mb-4" />
            <p className="text-lg font-medium">
              {query ? "No results found" : "Search your files"}
            </p>
            <p className="text-sm">
              {query
                ? "Try different keywords"
                : "Type to search by file name"}
            </p>
          </div>
        ) : (
          <div className="p-6">
            <p className="text-sm text-gray-500 mb-4">
              {results.length} result{results.length !== 1 ? "s" : ""}
            </p>
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 xl:grid-cols-6 gap-3">
              {results.map((file) => (
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
          files={results}
          onClose={() => setPreviewFile(null)}
          onNavigate={setPreviewFile}
          onToggleFavorite={handleToggleFavorite}
        />
      )}
    </>
  );
}
