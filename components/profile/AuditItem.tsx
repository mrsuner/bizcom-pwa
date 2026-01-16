import { ArrowUpCircle, ArrowDownCircle } from "lucide-react";
import type { BalanceAudit } from "@/types";

interface AuditItemProps {
  audit: BalanceAudit;
}

export function AuditItem({ audit }: AuditItemProps) {
  const isCredit = audit.type === "credit";
  const Icon = isCredit ? ArrowUpCircle : ArrowDownCircle;
  const colorClass = isCredit ? "text-success" : "text-error";
  const sign = isCredit ? "+" : "-";

  const date = new Date(audit.created_at).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  return (
    <div className="card bg-base-100 shadow-sm">
      <div className="card-body p-4">
        <div className="flex items-center gap-3">
          <Icon size={24} className={colorClass} />
          <div className="flex-1 min-w-0">
            <p className="font-medium text-base-content">
              {audit.description || (isCredit ? "Credit" : "Debit")}
            </p>
            <p className="text-xs text-base-content/40">{date}</p>
          </div>
          <p className={`font-semibold ${colorClass}`}>
            {sign}{audit.amount.toLocaleString()} BizCoins
          </p>
        </div>
      </div>
    </div>
  );
}
