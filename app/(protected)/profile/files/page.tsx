"use client";

import { useState } from "react";
import { PageHeader } from "@/components/profile/PageHeader";
import { FileCard } from "@/components/profile/FileCard";
import { FileUploadModal } from "@/components/profile/FileUploadModal";
import { useGetMyFilesQuery } from "@/store/services/api";
import { FolderOpen, Plus, RefreshCw } from "lucide-react";

export default function FilesPage() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data, isLoading, isError, refetch } = useGetMyFilesQuery();

  const files = data?.data?.files ?? [];

  const handleUploadSuccess = () => {
    setIsModalOpen(false);
    refetch();
  };

  return (
    <div className="max-w-md mx-auto">
      <PageHeader
        title="Files"
        action={
          <button
            type="button"
            className="btn btn-primary btn-sm"
            onClick={() => setIsModalOpen(true)}
          >
            <Plus size={16} />
            Upload
          </button>
        }
      />

      {isLoading ? (
        <div className="space-y-3">
          {[1, 2, 3].map((i) => (
            <div key={i} className="card bg-base-100 shadow-sm">
              <div className="card-body p-4">
                <div className="flex items-start gap-3">
                  <div className="skeleton w-10 h-10 rounded-lg"></div>
                  <div className="flex-1">
                    <div className="skeleton h-4 w-3/4 mb-2"></div>
                    <div className="skeleton h-3 w-1/2 mb-1"></div>
                    <div className="skeleton h-3 w-1/3"></div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      ) : isError ? (
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body items-center text-center py-10">
            <p className="text-error mb-4">Failed to load files</p>
            <button
              type="button"
              className="btn btn-primary btn-sm"
              onClick={() => refetch()}
            >
              <RefreshCw size={16} />
              Retry
            </button>
          </div>
        </div>
      ) : files.length > 0 ? (
        <div className="space-y-3">
          {files.map((file) => (
            <FileCard key={file.id} file={file} onDeleted={refetch} />
          ))}
        </div>
      ) : (
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body items-center text-center py-10">
            <div className="w-16 h-16 rounded-full bg-base-200 flex items-center justify-center mb-4">
              <FolderOpen size={32} className="text-base-content/40" />
            </div>
            <p className="text-base-content/60">No files uploaded yet</p>
            <button
              type="button"
              className="btn btn-primary btn-sm mt-4"
              onClick={() => setIsModalOpen(true)}
            >
              <Plus size={16} />
              Upload your first file
            </button>
          </div>
        </div>
      )}

      <FileUploadModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={handleUploadSuccess}
      />
    </div>
  );
}
