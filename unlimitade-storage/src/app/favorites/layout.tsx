import { Sidebar } from "@/components/layout/sidebar";
import { UploadProgress } from "@/components/upload/upload-progress";

export default function FavoritesLayout({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex h-screen bg-gray-50 dark:bg-gray-950">
      <Sidebar />
      <main className="flex-1 flex flex-col overflow-hidden">{children}</main>
      <UploadProgress />
    </div>
  );
}
