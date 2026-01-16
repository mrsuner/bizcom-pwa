"use client";

import { User as UserIcon } from "lucide-react";
import { useAppSelector } from "@/store/hooks";
import { userBalance } from "@/data/mock";
import { getGreeting } from "@/lib/utils/greeting";

export function ProfileHeader() {
  const user = useAppSelector((state) => state.auth.user);

  if (!user) return null;

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
              {user.name}
            </h2>
            <p className="text-sm text-base-content/60">
              {userBalance.bizCoins.toLocaleString()} BizCoins
            </p>
            <p className="text-sm text-primary">{getGreeting()}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
