"use client";

import { User as UserIcon } from "lucide-react";
import { useGetMeQuery } from "@/store/services/api";
import { getGreeting } from "@/lib/utils/greeting";
import { getFlagEmoji } from "@/lib/utils/country";

function formatAmount(balance: string): string {
  return parseFloat(balance).toLocaleString("en-US", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
}

export function ProfileHeader() {
  const { data: meData, isLoading } = useGetMeQuery();

  if (isLoading) {
    return (
      <div className="card bg-base-100 shadow-sm">
        <div className="card-body">
          <div className="flex items-center gap-4">
            <div className="skeleton w-16 h-16 rounded-full" />
            <div className="flex-1 space-y-2">
              <div className="skeleton h-5 w-32" />
              <div className="skeleton h-4 w-24" />
              <div className="skeleton h-4 w-20" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  const user = meData?.data;
  if (!user) return null;

  // Find the primary (is_based) balance
  const primaryBalance = user.balances?.find((b) => b.is_based);

  // Construct display name from first_name and last_name
  const displayName =
    `${user.first_name || ""} ${user.last_name || ""}`.trim() || user.email;

  return (
    <div className="card bg-base-100 shadow-sm">
      <div className="card-body">
        <div className="flex items-center gap-4">
          <div className="avatar placeholder">
            <div className="bg-primary text-primary-content rounded-full w-16">
              <UserIcon size={32} />
            </div>
          </div>
          <div className="flex-1">
            <h2 className="text-lg font-semibold text-base-content">
              {displayName}
            </h2>
            {primaryBalance && (
              <p className="text-sm text-base-content/60">
                {getFlagEmoji(primaryBalance.country_code)}{" "}
                {formatAmount(primaryBalance.balance)} BizCoins
              </p>
            )}
            <p className="text-sm text-primary">{getGreeting()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
