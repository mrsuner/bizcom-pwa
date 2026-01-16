"use client";

import { useRef, useState, useCallback } from "react";
import { Upload, X, FileText } from "lucide-react";

interface FileUploadProps {
  value: File | null;
  onChange: (file: File | null) => void;
  error?: string;
  accept?: string;
}

export function FileUpload({
  value,
  onChange,
  error,
  accept = "image/*,.pdf",
}: FileUploadProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const [isDragging, setIsDragging] = useState(false);

  const handleClick = () => {
    inputRef.current?.click();
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0] || null;
    onChange(file);
  };

  const handleDragOver = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  }, []);

  const handleDragLeave = useCallback((e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
  }, []);

  const handleDrop = useCallback(
    (e: React.DragEvent) => {
      e.preventDefault();
      setIsDragging(false);
      const file = e.dataTransfer.files?.[0] || null;
      if (file) {
        onChange(file);
      }
    },
    [onChange]
  );

  const handleRemove = () => {
    onChange(null);
    if (inputRef.current) {
      inputRef.current.value = "";
    }
  };

  return (
    <div>
      <input
        ref={inputRef}
        type="file"
        accept={accept}
        onChange={handleChange}
        className="hidden"
      />

      {value ? (
        <div className="border border-base-300 rounded-lg p-4 bg-base-100">
          <div className="flex items-center gap-3">
            <div className="text-primary">
              <FileText size={24} />
            </div>
            <div className="flex-1 min-w-0">
              <p className="text-sm font-medium text-base-content truncate">
                {value.name}
              </p>
              <p className="text-xs text-base-content/60">
                {(value.size / 1024).toFixed(1)} KB
              </p>
            </div>
            <button
              type="button"
              onClick={handleRemove}
              className="btn btn-ghost btn-sm btn-circle"
            >
              <X size={16} />
            </button>
          </div>
        </div>
      ) : (
        <div
          onClick={handleClick}
          onDragOver={handleDragOver}
          onDragLeave={handleDragLeave}
          onDrop={handleDrop}
          className={`border-2 border-dashed rounded-lg p-8 text-center cursor-pointer transition-colors ${
            isDragging
              ? "border-primary bg-primary/5"
              : error
                ? "border-error bg-error/5"
                : "border-base-300 hover:border-primary hover:bg-base-100"
          }`}
        >
          <Upload
            size={32}
            className={`mx-auto mb-2 ${
              isDragging ? "text-primary" : "text-base-content/40"
            }`}
          />
          <p className="text-sm text-base-content/60">
            Drop file here or click to browse
          </p>
          <p className="text-xs text-base-content/40 mt-1">
            Supports images and PDF
          </p>
        </div>
      )}

      {error && <p className="text-error text-sm mt-1">{error}</p>}
    </div>
  );
}
