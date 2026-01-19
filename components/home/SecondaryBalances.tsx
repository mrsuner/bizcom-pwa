import type { UserBalance } from "@/types";
import { CompactBalanceCard } from "./CompactBalanceCard";

interface SecondaryBalancesProps {
  balances: UserBalance[];
}

export function SecondaryBalances({ balances }: SecondaryBalancesProps) {
  if (balances.length === 0) {
    return null;
  }

  return (
    <div className="flex gap-3 overflow-x-auto mt-4 pb-1 hide-scrollbar snap-x snap-mandatory">
      {balances.map((balance) => (
        <CompactBalanceCard key={balance.id} balance={balance} />
      ))}
    </div>
  );
}
