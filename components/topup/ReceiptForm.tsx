"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileUpload } from "./FileUpload";
import { topupReceiptSchema, type TopupReceiptInput } from "@/lib/validations/topup";

export function ReceiptForm() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | undefined>();
  const [isSubmitting, setIsSubmitting] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<TopupReceiptInput>({
    resolver: zodResolver(topupReceiptSchema),
  });

  const onSubmit = async (data: TopupReceiptInput) => {
    if (!file) {
      setFileError("Please upload a receipt");
      return;
    }

    setIsSubmitting(true);

    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 1000));

    // Store submission data in session for confirmation page
    sessionStorage.setItem(
      "topupSubmission",
      JSON.stringify({
        fileName: file.name,
        amount: data.amount,
        reference: data.reference,
        notes: data.notes,
        submittedAt: new Date().toISOString(),
      })
    );

    router.push("/topup/confirmation");
  };

  const handleFileChange = (newFile: File | null) => {
    setFile(newFile);
    if (newFile) {
      setFileError(undefined);
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="label">
          <span className="label-text font-medium">
            Receipt <span className="text-error">*</span>
          </span>
        </label>
        <FileUpload value={file} onChange={handleFileChange} error={fileError} />
      </div>

      <div>
        <label className="label">
          <span className="label-text font-medium">
            Amount <span className="text-error">*</span>
          </span>
        </label>
        <label className="input input-bordered flex items-center gap-2 w-full">
          <span className="text-base-content/60">$</span>
          <input
            type="text"
            inputMode="decimal"
            placeholder="0.00"
            className={`grow ${errors.amount ? "text-error" : ""}`}
            {...register("amount")}
          />
        </label>
        {errors.amount && (
          <p className="text-error text-sm mt-1">{errors.amount.message}</p>
        )}
      </div>

      <div>
        <label className="label">
          <span className="label-text font-medium">Reference</span>
        </label>
        <input
          type="text"
          placeholder="Transaction reference (optional)"
          className="input input-bordered w-full"
          {...register("reference")}
        />
      </div>

      <div>
        <label className="label">
          <span className="label-text font-medium">Notes</span>
        </label>
        <textarea
          placeholder="Additional notes (optional)"
          className="textarea textarea-bordered w-full"
          rows={3}
          {...register("notes")}
        />
      </div>

      <button
        type="submit"
        disabled={isSubmitting}
        className="btn btn-primary w-full"
      >
        {isSubmitting ? (
          <>
            <span className="loading loading-spinner loading-sm" />
            Uploading...
          </>
        ) : (
          "Upload Receipt"
        )}
      </button>
    </form>
  );
}
