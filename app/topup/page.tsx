import { MethodSelector } from "@/components/topup/MethodSelector";

export default function TopupPage() {
  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-base-content mb-2">Topup</h1>
      <p className="text-base-content/60 mb-6">Choose your preferred payment method</p>

      <MethodSelector />
    </div>
  );
}
