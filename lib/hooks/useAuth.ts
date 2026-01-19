import { useAppSelector } from "@/store/hooks";

export function useAuth() {
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn);
  const user = useAppSelector((state) => state.auth.user);
  const isLoading = useAppSelector((state) => state.auth.isLoading);

  return { isLoggedIn, user, isLoading };
}
