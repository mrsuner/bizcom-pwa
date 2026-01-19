import type { UserBalance } from "@/types";
import { getFlagEmoji } from "@/lib/utils/country";

interface BalanceDisplayCardProps {
  balance: UserBalance;
}

function formatAmount(balance: string): string {
  return parseFloat(balance).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function BalanceDisplayCard({ balance }: BalanceDisplayCardProps) {
  const flag = getFlagEmoji(balance.country_code);
  const formattedAmount = formatAmount(balance.balance);

  return (
    <div className="card bg-gradient-to-br from-burgundy via-rose-dark to-rose-light text-white">
      <div className="card-body items-center text-center py-6">
        <p className="text-sm text-white/80">Current Balance</p>
        <div className="flex items-center gap-2">
          <span className="text-2xl">{flag}</span>
          <span className="text-lg font-medium">{balance.country_code}</span>
        </div>
        <p className="text-4xl font-bold">{formattedAmount}</p>
        <p className="text-sm font-medium">BizCoins</p>
      </div>
    </div>
  );
}
