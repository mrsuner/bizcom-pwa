"use client";

import { BalanceCard } from "@/components/home/BalanceCard";
import { GuestCard } from "@/components/home/GuestCard";
import { SecondaryBalances } from "@/components/home/SecondaryBalances";
import { ServicesSection } from "@/components/home/ServicesSection";
import { AnnouncementBanner } from "@/components/home/AnnouncementBanner";
import { useAuth } from "@/lib/hooks/useAuth";
import { useGetMeQuery, useGetAnnouncementsQuery } from "@/store/services/api";
import { services, mockBalances } from "@/data/mock";
import type { UserBalance } from "@/types";

// Default balance to show when no balance data is available
const defaultBalance: UserBalance = {
  id: 0,
  user_id: 0,
  balance: "0.00",
  is_based: true,
  country_code: "SGP",
  currency_code: "SGD",
  created_at: "",
  updated_at: "",
};

export default function HomePage() {
  const { isLoggedIn, isLoading: authLoading } = useAuth();
  const { data, isLoading: dataLoading } = useGetMeQuery(undefined, {
    skip: !isLoggedIn,
  });
  const { data: announcementsData, isLoading: announcementsLoading } = useGetAnnouncementsQuery({
    per_page: 2,
  });

  // Use API data or fall back to mock data when logged in
  const balances: UserBalance[] = data?.data?.balances ?? mockBalances;
  const announcements = announcementsData?.data ?? [];

  // Split balances into primary and secondary
  // If no balances exist, use defaultBalance
  const primaryBalance =
    balances.find((b) => b.is_based) ?? balances[0] ?? defaultBalance;
  const secondaryBalances = balances.filter((b) => !b.is_based);

  const isLoading = authLoading || (isLoggedIn && dataLoading);

  if (isLoading) {
    return (
      <div className="max-w-md mx-auto">
        <div className="card bg-gradient-to-br from-burgundy via-rose-dark to-rose-light h-[180px] animate-pulse" />
        <div className="mt-6 grid grid-cols-3 gap-4">
          {[...Array(6)].map((_, i) => (
            <div key={i} className="h-20 bg-base-200 rounded-lg animate-pulse" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto">
      {isLoggedIn ? (
        <>
          <BalanceCard balance={primaryBalance} />
          <SecondaryBalances balances={secondaryBalances} />
        </>
      ) : (
        <GuestCard />
      )}
      <ServicesSection services={services} />
      <AnnouncementBanner announcements={announcements} isLoading={announcementsLoading} />
    </div>
  );
}
