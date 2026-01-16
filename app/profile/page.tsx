"use client";

import { useAppSelector } from "@/store/hooks";
import { AuthButtons } from "@/components/auth/AuthButtons";
import { ProfileHeader } from "@/components/profile/ProfileHeader";
import { SystemNotification } from "@/components/profile/SystemNotification";
import { ProfileMenu } from "@/components/profile/ProfileMenu";
import { LogoutButton } from "@/components/profile/LogoutButton";
import { profileMenuItems, mockNotifications } from "@/data/mock";

export default function ProfilePage() {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);

  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-base-content mb-4">Profile</h1>

      {isLoggedIn ? (
        <div className="space-y-4">
          <ProfileHeader />
          <SystemNotification notifications={mockNotifications} />
          <ProfileMenu items={profileMenuItems} />
          <LogoutButton />
        </div>
      ) : (
        <AuthButtons />
      )}
    </div>
  );
}
