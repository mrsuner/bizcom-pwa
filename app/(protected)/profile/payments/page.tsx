"use client";

import { PageHeader } from "@/components/profile/PageHeader";
import { PaymentCard } from "@/components/profile/PaymentCard";
import { useGetMyPaymentsQuery } from "@/store/services/api";
import { CreditCard, RefreshCw } from "lucide-react";

function PaymentCardSkeleton() {
  return (
    <div className="card bg-base-100 shadow-sm animate-pulse">
      <div className="card-body p-4">
        <div className="flex items-start justify-between">
          <div className="flex-1 min-w-0">
            <div className="h-4 bg-base-300 rounded w-24 mb-2"></div>
            <div className="h-6 bg-base-300 rounded w-32"></div>
          </div>
        </div>
        <div className="flex items-center gap-2 mt-2">
          <div className="h-5 bg-base-300 rounded w-16"></div>
          <div className="h-4 bg-base-300 rounded w-20"></div>
        </div>
      </div>
    </div>
  );
}

export default function PaymentsPage() {
  const { data, isLoading, isError, refetch } = useGetMyPaymentsQuery();

  const payments = data?.data ?? [];

  return (
    <div className="max-w-md mx-auto">
      <PageHeader title="Payments" />

      {isLoading ? (
        <div className="space-y-3">
          <PaymentCardSkeleton />
          <PaymentCardSkeleton />
          <PaymentCardSkeleton />
        </div>
      ) : isError ? (
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body items-center text-center py-10">
            <div className="w-16 h-16 rounded-full bg-error/10 flex items-center justify-center mb-4">
              <CreditCard size={32} className="text-error" />
            </div>
            <p className="text-base-content/60 mb-4">Failed to load payments</p>
            <button
              onClick={() => refetch()}
              className="btn btn-primary btn-sm gap-2"
            >
              <RefreshCw size={16} />
              Retry
            </button>
          </div>
        </div>
      ) : payments.length > 0 ? (
        <div className="space-y-3">
          {payments.map((payment) => (
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
