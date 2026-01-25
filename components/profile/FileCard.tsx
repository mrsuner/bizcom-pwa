"use client";

import { useState } from "react";
import { FileText, Image, Trash2, Download, MoreVertical } from "lucide-react";
import {
  useDeleteFileMutation,
  useLazyGetFileDetailsQuery,
} from "@/store/services/api";
import type { UserFile } from "@/types";

interface FileCardProps {
  file: UserFile;
  onDeleted?: () => void;
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

export function FileCard({ file, onDeleted }: FileCardProps) {
  const [isDeleting, setIsDeleting] = useState(false);
  const [isDownloading, setIsDownloading] = useState(false);

  const [deleteFile] = useDeleteFileMutation();
  const [getFileDetails] = useLazyGetFileDetailsQuery();

  const date = new Date(file.created_at).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

  const isImage = file.mime_type.startsWith("image/");
  const Icon = isImage ? Image : FileText;
  const typeLabel = getFileTypeLabel(file.mime_type);
  const sizeLabel = formatFileSize(file.size);

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this file?")) return;

    setIsDeleting(true);
    try {
      await deleteFile(file.id).unwrap();
      onDeleted?.();
    } catch {
      alert("Failed to delete file. Please try again.");
    } finally {
      setIsDeleting(false);
    }
  };

  const handleDownload = async () => {
    setIsDownloading(true);
    try {
      const result = await getFileDetails(file.id).unwrap();
      const url = result.data?.file?.url;
      if (url) {
        window.open(url, "_blank");
      } else {
        alert("File URL not available.");
      }
    } catch {
      alert("Failed to get file URL. Please try again.");
    } finally {
      setIsDownloading(false);
    }
  };

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
          <div className="dropdown dropdown-end">
            <button
              type="button"
              tabIndex={0}
              className="btn btn-ghost btn-sm btn-circle"
            >
              <MoreVertical size={16} />
            </button>
            <ul
              tabIndex={0}
              className="dropdown-content menu bg-base-100 rounded-box z-10 w-40 p-2 shadow"
            >
              <li>
                <button
                  type="button"
                  onClick={handleDownload}
                  disabled={isDownloading}
                  className="flex items-center gap-2"
                >
                  {isDownloading ? (
                    <span className="loading loading-spinner loading-xs"></span>
                  ) : (
                    <Download size={16} />
                  )}
                  View
                </button>
              </li>
              <li>
                <button
                  type="button"
                  onClick={handleDelete}
                  disabled={isDeleting}
                  className="flex items-center gap-2 text-error"
                >
                  {isDeleting ? (
                    <span className="loading loading-spinner loading-xs"></span>
                  ) : (
                    <Trash2 size={16} />
                  )}
                  Delete
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
