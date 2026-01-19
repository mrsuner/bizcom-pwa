import { ReceiptForm } from "@/components/topup/ReceiptForm";

export default function OfflineTopupPage() {
  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-base-content mb-2">Upload Receipt</h1>
      <p className="text-base-content/60 mb-6">
        Upload your bank transfer receipt for verification
      </p>

      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <ReceiptForm />
        </div>
      </div>
    </div>
  );
}
