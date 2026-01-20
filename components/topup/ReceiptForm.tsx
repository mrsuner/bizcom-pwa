"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FileUpload } from "./FileUpload";
import { topupReceiptSchema, type TopupReceiptInput } from "@/lib/validations/topup";
import { useUploadPaymentReceiptMutation } from "@/store/services/api";

// Helper to extract error message from API error
function getErrorMessage(error: unknown): string {
  if (
    typeof error === "object" &&
    error !== null &&
    "data" in error &&
    typeof (error as { data?: unknown }).data === "object" &&
    (error as { data?: { meta?: { message?: string } } }).data?.meta?.message
  ) {
    return (error as { data: { meta: { message: string } } }).data.meta.message;
  }
  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as { message?: unknown }).message === "string"
  ) {
    return (error as { message: string }).message;
  }
  return "An unexpected error occurred. Please try again.";
}

export function ReceiptForm() {
  const router = useRouter();
  const [file, setFile] = useState<File | null>(null);
  const [fileError, setFileError] = useState<string | undefined>();
  const [submitError, setSubmitError] = useState<string | undefined>();
  const [uploadReceipt, { isLoading }] = useUploadPaymentReceiptMutation();

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

    setSubmitError(undefined);

    // Build FormData with field mapping to backend
    const formData = new FormData();
    formData.append("file", file);
    formData.append("amount", data.amount);
    if (data.reference) {
      formData.append("reference_number", data.reference);
    }
    if (data.notes) {
      formData.append("notes", data.notes);
    }

    try {
      const result = await uploadReceipt(formData).unwrap();

      // Store submission data in session for confirmation page
      sessionStorage.setItem(
        "topupSubmission",
        JSON.stringify({
          paymentId: result.data?.payment_id,
          fileName: file.name,
          amount: data.amount,
          reference: data.reference,
          notes: data.notes,
          submittedAt: new Date().toISOString(),
        })
      );

      router.push("/topup/confirmation");
    } catch (error) {
      setSubmitError(getErrorMessage(error));
    }
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

      {submitError && (
        <div role="alert" className="alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{submitError}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={isLoading}
        className="btn btn-primary w-full"
      >
        {isLoading ? (
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
