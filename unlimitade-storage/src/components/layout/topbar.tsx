"use client";

import { useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { Search, Upload, FolderPlus } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

interface TopbarProps {
  onUpload?: (files: FileList) => void;
  onCreateFolder?: () => void;
  title?: string;
}

export function Topbar({ onUpload, onCreateFolder, title }: TopbarProps) {
  const [searchQuery, setSearchQuery] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);
  const router = useRouter();

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      router.push(`/search?q=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0 && onUpload) {
      onUpload(e.target.files);
      e.target.value = "";
    }
  };

  return (
    <header className="h-16 border-b border-gray-200 dark:border-gray-800 bg-white dark:bg-gray-900 flex items-center justify-between px-6 gap-4">
      {title && (
        <h1 className="text-lg font-semibold text-gray-900 dark:text-white whitespace-nowrap">
          {title}
        </h1>
      )}

      {/* Search */}
      <form onSubmit={handleSearch} className="flex-1 max-w-xl">
        <div className="relative">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-gray-400" />
          <Input
            placeholder="Search files..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="pl-10 bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
          />
        </div>
      </form>

      {/* Actions */}
      <div className="flex items-center gap-2">
        {onCreateFolder && (
          <Button variant="outline" size="sm" onClick={onCreateFolder}>
            <FolderPlus className="w-4 h-4 mr-2" />
            New Folder
          </Button>
        )}
        {onUpload && (
          <>
            <Button size="sm" onClick={() => fileInputRef.current?.click()}>
              <Upload className="w-4 h-4 mr-2" />
              Upload
            </Button>
            <input
              ref={fileInputRef}
              type="file"
              multiple
              className="hidden"
              onChange={handleFileSelect}
            />
          </>
        )}
      </div>
    </header>
  );
}
