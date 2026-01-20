"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { CheckCircle, ArrowRight } from "lucide-react";
import { currencyMap } from "@/lib/constants/currencies";

interface TransferResult {
  fromCurrency: string;
  toCurrency: string;
  amount: string;
  fromPreviousBalance: string;
  fromNewBalance: string;
  toPreviousBalance: string;
  toNewBalance: string;
  transferredAt: string;
}

// Cache the result to avoid re-reading from sessionStorage
let cachedResult: TransferResult | null = null;
let hasRead = false;

function subscribe() {
  // No-op subscription since sessionStorage doesn't emit events
  return () => {};
}

function getSnapshot(): TransferResult | null {
  if (typeof window === "undefined") {
    return null;
  }
  if (!hasRead) {
    const stored = sessionStorage.getItem("transferResult");
    if (stored) {
      cachedResult = JSON.parse(stored);
      sessionStorage.removeItem("transferResult");
    }
    hasRead = true;
  }
  return cachedResult;
}

function getServerSnapshot(): TransferResult | null {
  return null;
}

export function TransferConfirmationCard() {
  const result = useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);

  const formatAmount = (amount: string) => {
    return parseFloat(amount).toLocaleString("en-US", {
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const fromCurrency = result ? currencyMap[result.fromCurrency] : null;
  const toCurrency = result ? currencyMap[result.toCurrency] : null;

  return (
    <div className="card bg-base-100 shadow-sm">
      <div className="card-body items-center text-center py-10">
        <div className="w-16 h-16 rounded-full bg-success/10 flex items-center justify-center mb-4">
          <CheckCircle size={40} className="text-success" />
        </div>

        <h2 className="card-title text-xl">Transfer Complete</h2>

        {result && fromCurrency && toCurrency ? (
          <>
            <div className="flex items-center justify-center gap-4 my-4">
              <div className="text-center">
                <span className="text-3xl">{fromCurrency.flag}</span>
                <p className="font-bold text-lg">{formatAmount(result.amount)}</p>
                <p className="text-sm text-base-content/60">
                  {result.fromCurrency}
                </p>
              </div>
              <ArrowRight className="text-primary" size={28} />
              <div className="text-center">
                <span className="text-3xl">{toCurrency.flag}</span>
                <p className="font-bold text-lg">{formatAmount(result.amount)}</p>
                <p className="text-sm text-base-content/60">
                  {result.toCurrency}
                </p>
              </div>
            </div>

            <div className="divider my-2" />

            <div className="w-full text-left space-y-2 text-sm">
              <div className="flex justify-between">
                <span className="text-base-content/60">
                  {result.fromCurrency} Balance
                </span>
                <span>
                  {formatAmount(result.fromPreviousBalance)} &rarr;{" "}
                  <span className="font-medium">
                    {formatAmount(result.fromNewBalance)}
                  </span>
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-base-content/60">
                  {result.toCurrency} Balance
                </span>
                <span>
                  {formatAmount(result.toPreviousBalance)} &rarr;{" "}
                  <span className="font-medium">
                    {formatAmount(result.toNewBalance)}
                  </span>
                </span>
              </div>
            </div>
          </>
        ) : (
          <p className="text-base-content/60 mt-2 max-w-xs">
            Your BizCoins have been successfully converted.
          </p>
        )}

        <div className="card-actions mt-6">
          <Link href="/" className="btn btn-primary">
            Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
