import { FileText, Image } from "lucide-react";
import type { UserFile } from "@/types";

interface FileCardProps {
  file: UserFile;
}

function formatFileSize(bytes: number): string {
  if (bytes < 1024) return `${bytes} B`;
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} KB`;
  return `${(bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function getFileTypeLabel(mimeType: string): string {
  if (mimeType.startsWith("image/")) return "Image";
  if (mimeType === "application/pdf") return "PDF";
  if (mimeType.includes("word")) return "Word";
  if (mimeType.includes("excel") || mimeType.includes("spreadsheet")) return "Excel";
  return "File";
}

export function FileCard({ file }: FileCardProps) {
  const date = new Date(file.created_at).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

  const isImage = file.mime_type.startsWith("image/");
  const Icon = isImage ? Image : FileText;
  const typeLabel = getFileTypeLabel(file.mime_type);
  const sizeLabel = formatFileSize(file.size);

  return (
    <div className="card bg-base-100 shadow-sm">
      <div className="card-body p-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-lg bg-base-200 flex items-center justify-center flex-shrink-0">
            <Icon size={20} className="text-base-content/60" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-medium text-base-content truncate">
              {file.client_filename}
            </h3>
            <p className="text-sm text-base-content/60 mt-1">
              {typeLabel} &bull; {sizeLabel}
            </p>
            <p className="text-xs text-base-content/40 mt-1">
              Uploaded {date}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
