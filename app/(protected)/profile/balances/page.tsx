import { PageHeader } from "@/components/profile/PageHeader";
import { BalanceDisplayCard } from "@/components/profile/BalanceDisplayCard";
import { AuditItem } from "@/components/profile/AuditItem";
import { userBalance, mockBalanceAudits } from "@/data/mock";
import { History } from "lucide-react";

export default function BalancesPage() {
  return (
    <div className="max-w-md mx-auto">
      <PageHeader title="Balances" />

      <div className="space-y-4">
        <BalanceDisplayCard balance={userBalance} />

        <div>
          <h2 className="text-lg font-semibold text-base-content mb-3">
            Transaction History
          </h2>

          {mockBalanceAudits.length > 0 ? (
            <div className="space-y-2">
              {mockBalanceAudits.map((audit) => (
                <AuditItem key={audit.id} audit={audit} />
              ))}
            </div>
          ) : (
            <div className="card bg-base-100 shadow-sm">
              <div className="card-body items-center text-center py-10">
                <div className="w-16 h-16 rounded-full bg-base-200 flex items-center justify-center mb-4">
                  <History size={32} className="text-base-content/40" />
                </div>
                <p className="text-base-content/60">No transactions yet</p>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
