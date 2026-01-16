"use client";

import Link from "next/link";
import {
  User,
  Building2,
  CreditCard,
  Wallet,
  FolderOpen,
  HelpCircle,
  ChevronRight,
} from "lucide-react";
import type { ProfileMenuItem } from "@/types";

interface ProfileMenuProps {
  items: ProfileMenuItem[];
}

const iconComponents: Record<string, typeof User> = {
  User,
  Building2,
  CreditCard,
  Wallet,
  FolderOpen,
  HelpCircle,
};

export function ProfileMenu({ items }: ProfileMenuProps) {
  return (
    <div className="card bg-base-100 shadow-sm">
      <div className="card-body p-0">
        <ul className="divide-y divide-base-200">
          {items.map((item) => {
            const Icon = iconComponents[item.icon] || User;

            return (
              <li key={item.id}>
                <Link
                  href={item.href}
                  className="flex items-center gap-3 p-4 hover:bg-base-200 transition-colors"
                >
                  <Icon size={20} className="text-base-content/60" />
                  <span className="flex-1 text-base-content">{item.label}</span>
                  <ChevronRight size={16} className="text-base-content/40" />
                </Link>
              </li>
            );
          })}
        </ul>
      </div>
    </div>
  );
}
