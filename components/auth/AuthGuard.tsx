"use client";

import { useEffect } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/lib/hooks/useAuth";

interface AuthGuardProps {
  children: React.ReactNode;
}

export function AuthGuard({ children }: AuthGuardProps) {
  const router = useRouter();
  const { isLoggedIn, isLoading } = useAuth();

  useEffect(() => {
    // Wait for auth initialization to complete
    if (!isLoading && !isLoggedIn) {
      router.replace("/signin");
    }
  }, [isLoggedIn, isLoading, router]);

  // Show loading state while checking auth
  if (isLoading) {
    return (
      <div className="max-w-md mx-auto">
        <div className="flex flex-col items-center justify-center min-h-[200px] gap-4">
          <span className="loading loading-spinner loading-lg text-primary" />
          <p className="text-base-content/60">Loading...</p>
        </div>
      </div>
    );
  }

  // Don't render children if not authenticated
  if (!isLoggedIn) {
    return null;
  }

  return <>{children}</>;
}
