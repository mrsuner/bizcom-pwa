"use client";

import { LogOut } from "lucide-react";
import { useAppDispatch } from "@/store/hooks";
import { logout } from "@/store/slices/authSlice";

export function LogoutButton() {
  const dispatch = useAppDispatch();

  const handleLogout = () => {
    dispatch(logout());
  };

  return (
    <button
      onClick={handleLogout}
      className="card bg-base-100 shadow-sm w-full"
    >
      <div className="card-body p-4 flex-row items-center gap-3">
        <LogOut size={20} className="text-error" />
        <span className="text-error">Logout</span>
      </div>
    </button>
  );
}
