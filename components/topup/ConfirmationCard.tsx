import Link from "next/link";
import { CheckCircle } from "lucide-react";

export function ConfirmationCard() {
  return (
    <div className="card bg-base-100 shadow-sm">
      <div className="card-body items-center text-center py-10">
        <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mb-4">
          <CheckCircle size={40} className="text-success" />
        </div>

        <h2 className="card-title text-xl">Receipt Submitted</h2>

        <p className="text-base-content/60 mt-2 max-w-xs">
          Your receipt will be reviewed by our admin team. BizCoins will be
          credited to your account once verified.
        </p>

        <div className="card-actions mt-6">
          <Link href="/" className="btn btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
