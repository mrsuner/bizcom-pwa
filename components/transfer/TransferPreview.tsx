"use client";

import { ArrowRight } from "lucide-react";
import { currencyMap } from "@/lib/constants/currencies";

interface TransferPreviewProps {
  fromCurrency: string;
  toCurrency: string;
  amount: string;
}

export function TransferPreview({
  fromCurrency,
  toCurrency,
  amount,
}: TransferPreviewProps) {
  const parsedAmount = parseFloat(amount);
  const isValidAmount = !isNaN(parsedAmount) && parsedAmount > 0;

  if (!fromCurrency || !toCurrency || !isValidAmount) {
    return null;
  }

  const fromCurrencyData = currencyMap[fromCurrency];
  const toCurrencyData = currencyMap[toCurrency];

  if (!fromCurrencyData || !toCurrencyData) {
    return null;
  }

  const formattedAmount = parsedAmount.toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });

  return (
    <div className="card bg-base-200">
      <div className="card-body p-4">
        <h3 className="font-medium text-sm text-base-content/60 mb-2">
          Conversion Preview
        </h3>
        <div className="flex items-center justify-center gap-3">
          <div className="text-center">
            <span className="text-2xl">{fromCurrencyData.flag}</span>
            <p className="font-semibold">{formattedAmount}</p>
            <p className="text-sm text-base-content/60">{fromCurrency}</p>
          </div>
          <ArrowRight className="text-primary" size={24} />
          <div className="text-center">
            <span className="text-2xl">{toCurrencyData.flag}</span>
            <p className="font-semibold">{formattedAmount}</p>
            <p className="text-sm text-base-content/60">{toCurrency}</p>
          </div>
        </div>
        <p className="text-xs text-center text-base-content/50 mt-2">
          Rate: 1:1
        </p>
      </div>
    </div>
  );
}
