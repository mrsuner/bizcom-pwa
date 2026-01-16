interface BalanceDisplayCardProps {
  balance: number;
}

export function BalanceDisplayCard({ balance }: BalanceDisplayCardProps) {
  return (
    <div className="card bg-gradient-to-br from-burgundy via-rose-dark to-rose-light text-white">
      <div className="card-body items-center text-center py-6">
        <p className="text-sm text-white/80">Current Balance</p>
        <p className="text-4xl font-bold">{balance.toLocaleString()}</p>
        <p className="text-sm text-white/80">BizCoins</p>
      </div>
    </div>
  );
}
