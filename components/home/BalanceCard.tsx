import Link from "next/link";
import { Plus } from "lucide-react";
import type { UserBalance } from "@/types";
import { getFlagEmoji } from "@/lib/utils/country";

interface BalanceCardProps {
  balance: UserBalance;
}

function formatAmount(balance: string): string {
  return parseFloat(balance).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function BalanceCard({ balance }: BalanceCardProps) {
  const flag = getFlagEmoji(balance.country_code);
  const formattedAmount = formatAmount(balance.balance);

  return (
    <div className="card bg-gradient-to-br from-burgundy via-rose-dark to-rose-light text-white shadow-xl overflow-hidden relative">
      <div className="card-body p-5">
        <div className="flex justify-between items-start">
          <h2 className="card-title text-lg font-semibold">
            <span className="mr-1">{flag}</span>
            {balance.country_code}
          </h2>
          {balance.is_based && (
            <span className="badge bg-white/20 border-0 text-white text-xs">
              Primary
            </span>
          )}
        </div>

        <div className="mt-4">
          <p className="text-sm text-white/80">Available Balance</p>
          <p className="text-4xl font-bold mt-1">{formattedAmount}</p>
          <p className="text-sm font-medium">BizCoins</p>
        </div>

        <div className="mt-4">
          <Link
            href="/topup"
            className="btn btn-sm bg-white/20 border-0 text-white hover:bg-white/30"
          >
            <Plus size={16} />
            Topup
          </Link>
        </div>

        {/* Decorative B watermark */}
        <div className="absolute -right-4 -bottom-4 text-[140px] font-bold text-white/10 select-none pointer-events-none leading-none">
          B
        </div>
      </div>
    </div>
  );
}
