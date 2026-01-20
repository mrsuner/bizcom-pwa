import { TransferForm } from "@/components/transfer/TransferForm";

export default function TransferPage() {
  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-base-content mb-2">Transfer</h1>
      <p className="text-base-content/60 mb-6">
        Convert BizCoins between currencies
      </p>
      <TransferForm />
    </div>
  );
}
