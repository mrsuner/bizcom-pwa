import { Gift } from "lucide-react";

export default function VoucherPage() {
  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-base-content mb-4">Vouchers</h1>
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body items-center text-center">
          <Gift size={48} className="text-primary mb-2" />
          <p className="text-base-content/80">
            No vouchers available at the moment.
          </p>
          <p className="text-sm text-base-content/60">
            Check back later for exclusive offers!
          </p>
        </div>
      </div>
    </div>
  );
}
