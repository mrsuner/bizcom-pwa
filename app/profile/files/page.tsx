import { PageHeader } from "@/components/profile/PageHeader";
import { FileCard } from "@/components/profile/FileCard";
import { mockFiles } from "@/data/mock";
import { FolderOpen } from "lucide-react";

export default function FilesPage() {
  return (
    <div className="max-w-md mx-auto">
      <PageHeader title="Files" />

      {mockFiles.length > 0 ? (
        <div className="space-y-3">
          {mockFiles.map((file) => (
            <FileCard key={file.id} file={file} />
          ))}
        </div>
      ) : (
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body items-center text-center py-10">
            <div className="w-16 h-16 rounded-full bg-base-200 flex items-center justify-center mb-4">
              <FolderOpen size={32} className="text-base-content/40" />
            </div>
            <p className="text-base-content/60">No files uploaded yet</p>
          </div>
        </div>
      )}
    </div>
  );
}
