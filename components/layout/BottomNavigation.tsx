"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Home, Info, MousePointerClick, Gift, User, type LucideIcon } from "lucide-react";

const iconMap: Record<string, LucideIcon> = {
  Home,
  Info,
  MousePointerClick,
  Gift,
  User,
};

const navItems = [
  { href: "/", icon: "Home", label: "Home" },
  { href: "/about", icon: "Info", label: "About" },
  { href: "/services", icon: "MousePointerClick", label: "", isFab: true },
  { href: "/voucher", icon: "Gift", label: "Voucher" },
  { href: "/profile", icon: "User", label: "Profile" },
];

export function BottomNavigation() {
  const pathname = usePathname();

  return (
    <nav className="fixed bottom-0 left-0 right-0 bg-white border-t border-gray-200 z-50 pb-[env(safe-area-inset-bottom)]">
      <div className="flex items-center justify-around h-16 max-w-md mx-auto relative">
        {navItems.map((item) => {
          const Icon = iconMap[item.icon];
          const isActive = pathname === item.href;

          if (item.isFab) {
            return (
              <Link
                key={item.href}
                href={item.href}
                className="absolute left-1/2 -translate-x-1/2 -top-6 w-14 h-14 rounded-full bg-gradient-to-br from-burgundy to-primary-dark text-white shadow-lg flex items-center justify-center border-4 border-white"
              >
                <Icon size={24} />
              </Link>
            );
          }

          return (
            <Link
              key={item.href}
              href={item.href}
              className={`flex flex-col items-center justify-center gap-1 min-w-[60px] py-2 ${
                isActive ? "text-primary" : "text-gray-400"
              }`}
            >
              <Icon size={20} />
              <span className="text-xs">{item.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
