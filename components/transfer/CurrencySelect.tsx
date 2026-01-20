"use client";

import { currencies, currencyMap, type Currency } from "@/lib/constants/currencies";
import type { UserBalance } from "@/types";

interface CurrencySelectProps {
  id: string;
  value: string;
  onChange: (value: string) => void;
  balances?: UserBalance[];
  showOnlyWithBalance?: boolean;
  excludeCurrency?: string;
  error?: string;
}

export function CurrencySelect({
  id,
  value,
  onChange,
  balances = [],
  showOnlyWithBalance = false,
  excludeCurrency,
  error,
}: CurrencySelectProps) {
  // Create a map of currency code to balance
  const balanceMap = balances.reduce(
    (acc, balance) => {
      acc[balance.currency_code] = balance;
      return acc;
    },
    {} as Record<string, UserBalance>
  );

  // Filter currencies based on props
  let availableCurrencies: Currency[] = currencies;

  if (showOnlyWithBalance) {
    // Only show currencies that user has balance in
    availableCurrencies = currencies.filter(
      (currency) => balanceMap[currency.code]
    );
  }

  if (excludeCurrency) {
    availableCurrencies = availableCurrencies.filter(
      (currency) => currency.code !== excludeCurrency
    );
  }

  const selectedCurrency = currencyMap[value];

  return (
    <div>
      <select
        id={id}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className={`select select-bordered w-full ${error ? "select-error" : ""}`}
      >
        <option value="">Select currency</option>
        {availableCurrencies.map((currency) => {
          const balance = balanceMap[currency.code];
          const balanceText = balance
            ? ` (${parseFloat(balance.balance).toLocaleString("en-US", {
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })})`
            : "";

          return (
            <option key={currency.code} value={currency.code}>
              {currency.flag} {currency.code} - {currency.name}
              {balanceText}
            </option>
          );
        })}
      </select>
      {error && <p className="text-error text-sm mt-1">{error}</p>}
      {value && selectedCurrency && balanceMap[value] && (
        <p className="text-sm text-base-content/60 mt-1">
          Available: {parseFloat(balanceMap[value].balance).toLocaleString("en-US", {
            minimumFractionDigits: 2,
            maximumFractionDigits: 2,
          })}{" "}
          BizCoins
        </p>
      )}
    </div>
  );
}
