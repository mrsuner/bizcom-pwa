import type { Payment } from "@/types";

interface PaymentCardProps {
  payment: Payment;
}

const statusBadgeClass: Record<Payment["status"], string> = {
  open: "badge-info",
  pending: "badge-warning",
  paid: "badge-success",
  confirmed: "badge-success",
  cancelled: "badge-error",
};

const statusLabel: Record<Payment["status"], string> = {
  open: "Open",
  pending: "Pending",
  paid: "Paid",
  confirmed: "Confirmed",
  cancelled: "Cancelled",
};

export function PaymentCard({ payment }: PaymentCardProps) {
  const date = new Date(payment.created_at).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

  const formattedAmount = new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: payment.currency,
  }).format(parseFloat(payment.amount));

  return (
    <div className="card bg-base-100 shadow-sm">
      <div className="card-body p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <p className="text-sm text-base-content/60">
              Invoice #{payment.reference_number || "N/A"}
            </p>
            <p className="text-lg font-semibold text-base-content mt-1">
              {formattedAmount}
            </p>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <span className={`badge badge-sm ${statusBadgeClass[payment.status]}`}>
            {statusLabel[payment.status]}
          </span>
          <span className="text-xs text-base-content/40">{date}</span>
        </div>
      </div>
    </div>
  );
}
