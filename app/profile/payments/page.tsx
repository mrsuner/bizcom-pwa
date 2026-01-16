import { PageHeader } from "@/components/profile/PageHeader";
import { PaymentCard } from "@/components/profile/PaymentCard";
import { mockPayments } from "@/data/mock";
import { CreditCard } from "lucide-react";

export default function PaymentsPage() {
  return (
    <div className="max-w-md mx-auto">
      <PageHeader title="Payments" />

      {mockPayments.length > 0 ? (
        <div className="space-y-3">
          {mockPayments.map((payment) => (
            <PaymentCard key={payment.id} payment={payment} />
          ))}
        </div>
      ) : (
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body items-center text-center py-10">
            <div className="w-16 h-16 rounded-full bg-base-200 flex items-center justify-center mb-4">
              <CreditCard size={32} className="text-base-content/40" />
            </div>
            <p className="text-base-content/60">No payments yet</p>
          </div>
        </div>
      )}
    </div>
  );
}
