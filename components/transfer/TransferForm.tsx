"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { CurrencySelect } from "./CurrencySelect";
import { TransferPreview } from "./TransferPreview";
import { transferSchema, type TransferInput } from "@/lib/validations/transfer";
import {
  useGetMeQuery,
  useConvertBalanceMutation,
} from "@/store/services/api";

// Helper to extract error message from API error
function getErrorMessage(error: unknown): string {
  if (
    typeof error === "object" &&
    error !== null &&
    "data" in error &&
    typeof (error as { data?: unknown }).data === "object" &&
    (error as { data?: { meta?: { message?: string } } }).data?.meta?.message
  ) {
    return (error as { data: { meta: { message: string } } }).data.meta.message;
  }
  if (
    typeof error === "object" &&
    error !== null &&
    "message" in error &&
    typeof (error as { message?: unknown }).message === "string"
  ) {
    return (error as { message: string }).message;
  }
  return "An unexpected error occurred. Please try again.";
}

export function TransferForm() {
  const router = useRouter();
  const { data: meData, isLoading: isLoadingMe } = useGetMeQuery();
  const [convertBalance, { isLoading: isConverting }] =
    useConvertBalanceMutation();
  const [submitError, setSubmitError] = useState<string | undefined>();

  const balances = meData?.data?.balances ?? [];

  const {
    register,
    handleSubmit,
    control,
    watch,
    setValue,
    formState: { errors },
  } = useForm<TransferInput>({
    resolver: zodResolver(transferSchema),
    defaultValues: {
      from_currency: "",
      to_currency: "",
      amount: "",
    },
  });

  const fromCurrency = watch("from_currency");
  const toCurrency = watch("to_currency");
  const amount = watch("amount");

  // Get the balance for the selected from_currency
  const fromBalance = balances.find((b) => b.currency_code === fromCurrency);
  const maxAmount = fromBalance ? parseFloat(fromBalance.balance) : 0;

  // Reset to_currency if it matches from_currency
  useEffect(() => {
    if (fromCurrency && toCurrency && fromCurrency === toCurrency) {
      setValue("to_currency", "");
    }
  }, [fromCurrency, toCurrency, setValue]);

  const onSubmit = async (data: TransferInput) => {
    setSubmitError(undefined);

    // Client-side validation for insufficient balance
    const numAmount = parseFloat(data.amount);
    if (numAmount > maxAmount) {
      setSubmitError(
        `Insufficient balance. Maximum available: ${maxAmount.toLocaleString("en-US", {
          minimumFractionDigits: 2,
          maximumFractionDigits: 2,
        })} BizCoins`
      );
      return;
    }

    try {
      const result = await convertBalance(data).unwrap();

      // Store transfer data in session for confirmation page
      sessionStorage.setItem(
        "transferResult",
        JSON.stringify({
          fromCurrency: data.from_currency,
          toCurrency: data.to_currency,
          amount: data.amount,
          fromPreviousBalance: result.data?.from_balance.previous_balance,
          fromNewBalance: result.data?.from_balance.new_balance,
          toPreviousBalance: result.data?.to_balance.previous_balance,
          toNewBalance: result.data?.to_balance.new_balance,
          transferredAt: new Date().toISOString(),
        })
      );

      router.push("/transfer/confirmation");
    } catch (error) {
      setSubmitError(getErrorMessage(error));
    }
  };

  const handleMaxClick = () => {
    if (maxAmount > 0) {
      setValue("amount", maxAmount.toString());
    }
  };

  if (isLoadingMe) {
    return (
      <div className="flex justify-center py-8">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  if (balances.length === 0) {
    return (
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body text-center">
          <p className="text-base-content/60">
            You don&apos;t have any BizCoin balance yet.
          </p>
          <p className="text-base-content/60">
            Please topup first to use the transfer feature.
          </p>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
      <div>
        <label className="label" htmlFor="from_currency">
          <span className="label-text font-medium">
            From <span className="text-error">*</span>
          </span>
        </label>
        <Controller
          name="from_currency"
          control={control}
          render={({ field }) => (
            <CurrencySelect
              id="from_currency"
              value={field.value}
              onChange={field.onChange}
              balances={balances}
              showOnlyWithBalance
              error={errors.from_currency?.message}
            />
          )}
        />
      </div>

      <div>
        <label className="label" htmlFor="to_currency">
          <span className="label-text font-medium">
            To <span className="text-error">*</span>
          </span>
        </label>
        <Controller
          name="to_currency"
          control={control}
          render={({ field }) => (
            <CurrencySelect
              id="to_currency"
              value={field.value}
              onChange={field.onChange}
              balances={balances}
              excludeCurrency={fromCurrency}
              error={errors.to_currency?.message}
            />
          )}
        />
      </div>

      <div>
        <label className="label" htmlFor="amount">
          <span className="label-text font-medium">
            Amount <span className="text-error">*</span>
          </span>
        </label>
        <label className="input input-bordered flex items-center gap-2 w-full">
          <input
            id="amount"
            type="text"
            inputMode="decimal"
            placeholder="0.00"
            className={`grow ${errors.amount ? "text-error" : ""}`}
            {...register("amount")}
          />
          {fromCurrency && maxAmount > 0 && (
            <button
              type="button"
              onClick={handleMaxClick}
              className="btn btn-xs btn-ghost text-primary"
            >
              MAX
            </button>
          )}
        </label>
        {errors.amount && (
          <p className="text-error text-sm mt-1">{errors.amount.message}</p>
        )}
      </div>

      <TransferPreview
        fromCurrency={fromCurrency}
        toCurrency={toCurrency}
        amount={amount}
      />

      {submitError && (
        <div role="alert" className="alert alert-error">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6 shrink-0 stroke-current"
            fill="none"
            viewBox="0 0 24 24"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z"
            />
          </svg>
          <span>{submitError}</span>
        </div>
      )}

      <button
        type="submit"
        disabled={isConverting}
        className="btn btn-primary w-full"
      >
        {isConverting ? (
          <>
            <span className="loading loading-spinner loading-sm" />
            Processing...
          </>
        ) : (
          "Transfer"
        )}
      </button>
    </form>
  );
}
