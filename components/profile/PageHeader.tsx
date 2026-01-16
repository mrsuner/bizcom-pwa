"use client";

import Link from "next/link";
import { ChevronLeft } from "lucide-react";

interface PageHeaderProps {
  title: string;
  backHref?: string;
}

export function PageHeader({ title, backHref = "/profile" }: PageHeaderProps) {
  return (
    <div className="flex items-center gap-3 mb-4">
      <Link
        href={backHref}
        className="btn btn-ghost btn-sm btn-circle"
      >
        <ChevronLeft size={24} />
      </Link>
      <h1 className="text-2xl font-bold text-base-content">{title}</h1>
    </div>
  );
}
