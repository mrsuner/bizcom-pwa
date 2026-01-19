"use client";

import { Provider } from "react-redux";
import { store } from "./index";
import { AuthInitializer } from "@/components/auth/AuthInitializer";

interface ProvidersProps {
  children: React.ReactNode;
}

export function Providers({ children }: ProvidersProps) {
  return (
    <Provider store={store}>
      <AuthInitializer>{children}</AuthInitializer>
    </Provider>
  );
}
