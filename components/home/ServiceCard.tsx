import Link from "next/link";
import {
  Building2,
  BookOpen,
  Users,
  BarChart3,
  ShieldCheck,
  Megaphone,
  TrendingUp,
  DollarSign,
  Heart,
  type LucideIcon,
} from "lucide-react";
import type { Service } from "@/types";

const iconMap: Record<string, LucideIcon> = {
  Building2,
  BookOpen,
  Users,
  BarChart3,
  ShieldCheck,
  Megaphone,
  TrendingUp,
  DollarSign,
  Heart,
};

interface ServiceCardProps {
  service: Service;
}

export function ServiceCard({ service }: ServiceCardProps) {
  const Icon = iconMap[service.icon] || Building2;

  return (
    <Link
      href={service.href}
      className="card bg-base-100 shadow-sm hover:shadow-md transition-shadow"
    >
      <div className="card-body items-center justify-center p-4 gap-2">
        <Icon size={28} className="text-primary" />
        <span className="text-xs text-center font-medium text-base-content">
          {service.name}
        </span>
      </div>
    </Link>
  );
}
