"use client";

import Link from "next/link";
import { Folder, MoreVertical, Edit3, Trash2 } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import type { FolderItem } from "@/types";

interface FolderCardProps {
  folder: FolderItem;
  onRename?: (folderId: string, currentName: string) => void;
  onDelete?: (folderId: string) => void;
}

export function FolderCard({ folder, onRename, onDelete }: FolderCardProps) {
  return (
    <div className="group relative">
      <Link
        href={`/drive/${folder.id}`}
        className="flex items-center gap-3 bg-white dark:bg-gray-900 border border-gray-200 dark:border-gray-800 rounded-xl p-3 hover:shadow-md hover:border-blue-200 dark:hover:border-blue-800 transition-all"
      >
        <div className="p-2 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
          <Folder className="w-6 h-6 text-blue-500" />
        </div>
        <div className="flex-1 min-w-0">
          <p className="text-sm font-medium truncate text-gray-900 dark:text-white">
            {folder.name}
          </p>
          {folder._count && (
            <p className="text-xs text-gray-500">
              {folder._count.files} files, {folder._count.children} folders
            </p>
          )}
        </div>
      </Link>

      <div className="absolute top-2 right-2 opacity-0 group-hover:opacity-100 transition-opacity">
        <DropdownMenu>
          <DropdownMenuTrigger className="p-1 rounded-full bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
            <MoreVertical className="w-4 h-4 text-gray-600" />
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuItem onClick={() => onRename?.(folder.id, folder.name)}>
              <Edit3 className="w-4 h-4 mr-2" /> Rename
            </DropdownMenuItem>
            <DropdownMenuItem
              className="text-red-600"
              onClick={() => onDelete?.(folder.id)}
            >
              <Trash2 className="w-4 h-4 mr-2" /> Delete
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
    </div>
  );
}
