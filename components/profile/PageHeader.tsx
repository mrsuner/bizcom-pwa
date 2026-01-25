"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";
import type { ReactNode } from "react";

interface PageHeaderProps {
  title: string;
  backHref?: string;
  action?: ReactNode;
}

export function PageHeader({ title, backHref = "/profile", action }: PageHeaderProps) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <Link
        href={backHref}
        className="btn btn-ghost btn-sm btn-circle"
      >
        <ChevronLeft size={24} />
      </Link>
      <h1 className="text-2xl font-bold text-base-content flex-1">{title}</h1>
      {action}
    </div>
  );
}
