"use client";

import { useState, useRef, useEffect } from "react";
import { X } from "lucide-react";
import { FileUpload } from "@/components/topup/FileUpload";
import { useUploadFileMutation } from "@/store/services/api";

interface FileUploadModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSuccess: () => void;
}

export function FileUploadModal({
  isOpen,
  onClose,
  onSuccess,
}: FileUploadModalProps) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const [file, setFile] = useState<File | null>(null);
  const [error, setError] = useState<string | null>(null);

  const [uploadFile, { isLoading }] = useUploadFileMutation();

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;

    if (isOpen) {
      dialog.showModal();
    } else {
      dialog.close();
    }
  }, [isOpen]);

  const handleClose = () => {
    setFile(null);
    setError(null);
    onClose();
  };

  const handleUpload = async () => {
    if (!file) {
      setError("Please select a file to upload.");
      return;
    }

    setError(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      await uploadFile(formData).unwrap();
      setFile(null);
      onSuccess();
    } catch (err) {
      const message =
        err && typeof err === "object" && "data" in err
          ? (err as { data?: { meta?: { message?: string } } }).data?.meta
              ?.message || "Upload failed. Please try again."
          : "Upload failed. Please try again.";
      setError(message);
    }
  };

  return (
    <dialog
      ref={dialogRef}
      className="modal modal-bottom sm:modal-middle"
      onClose={handleClose}
    >
      <div className="modal-box">
        <div className="flex items-center justify-between mb-4">
          <h3 className="font-bold text-lg">Upload File</h3>
          <button
            type="button"
            className="btn btn-sm btn-circle btn-ghost"
            onClick={handleClose}
          >
            <X size={20} />
          </button>
        </div>

        <FileUpload value={file} onChange={setFile} error={error ?? undefined} />

        {error && !file && (
          <p className="text-error text-sm mt-2">{error}</p>
        )}

        <div className="modal-action">
          <button
            type="button"
            className="btn btn-ghost"
            onClick={handleClose}
            disabled={isLoading}
          >
            Cancel
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={handleUpload}
            disabled={!file || isLoading}
          >
            {isLoading ? (
              <>
                <span className="loading loading-spinner loading-sm"></span>
                Uploading...
              </>
            ) : (
              "Upload"
            )}
          </button>
        </div>
      </div>
      <form method="dialog" className="modal-backdrop">
        <button type="button" onClick={handleClose}>
          close
        </button>
      </form>
    </dialog>
  );
}
