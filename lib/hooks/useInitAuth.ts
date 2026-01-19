"use client";

import { useEffect } from "react";
import { useAppDispatch } from "@/store/hooks";
import { useLazyGetMeQuery } from "@/store/services/api";
import { login, logout, setLoading } from "@/store/slices/authSlice";
import type { User } from "@/types";

export function useInitAuth() {
  const dispatch = useAppDispatch();
  const [getMe] = useLazyGetMeQuery();

  useEffect(() => {
    async function initAuth() {
      dispatch(setLoading(true));

      try {
        const result = await getMe().unwrap();

        if (result.data) {
          const user: User = {
            id: result.data.id,
            email: result.data.email,
            first_name: result.data.first_name,
            last_name: result.data.last_name,
            phone_number: result.data.phone_number,
            phone_dial_code: result.data.phone_dial_code,
            entity_id: result.data.entity_id,
            entity: result.data.entity,
            roles: result.data.roles,
            balances: result.data.balances,
          };

          dispatch(login({ user }));
        } else {
          dispatch(logout());
        }
      } catch {
        // Not authenticated or error - clear auth state
        dispatch(logout());
      }
    }

    initAuth();
  }, [dispatch, getMe]);
}
