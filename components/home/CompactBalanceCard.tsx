import type { UserBalance } from "@/types";
import { getFlagEmoji } from "@/lib/utils/country";

interface CompactBalanceCardProps {
  balance: UserBalance;
}

function formatAmount(balance: string): string {
  return parseFloat(balance).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function CompactBalanceCard({ balance }: CompactBalanceCardProps) {
  const flag = getFlagEmoji(balance.country_code);
  const formattedAmount = formatAmount(balance.balance);

  return (
    <div className="card bg-base-100 shadow-sm min-w-[140px] flex-shrink-0 snap-start">
      <div className="card-body p-3">
        <div className="flex items-center gap-2">
          <span className="text-lg">{flag}</span>
          <span className="font-medium text-sm text-base-content/80">
            {balance.country_code}
          </span>
        </div>
        <p className="font-semibold text-base mt-1">{formattedAmount}</p>
        <p className="text-xs text-base-content/60">BizCoins</p>
      </div>
    </div>
  );
}
