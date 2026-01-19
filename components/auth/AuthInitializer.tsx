"use client";

import { useInitAuth } from "@/lib/hooks/useInitAuth";

interface AuthInitializerProps {
  children: React.ReactNode;
}

export function AuthInitializer({ children }: AuthInitializerProps) {
  useInitAuth();
  return <>{children}</>;
}
