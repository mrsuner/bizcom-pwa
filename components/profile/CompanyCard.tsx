import { Building2 } from "lucide-react";
import type { Company } from "@/types";

interface CompanyCardProps {
  company: Company;
}

const statusBadgeClass: Record<Company["status"], string> = {
  ongoing: "badge-warning",
  completed: "badge-success",
};

export function CompanyCard({ company }: CompanyCardProps) {
  const date = new Date(company.created_at).toLocaleDateString("en-US", {
    month: "short",
    year: "numeric",
  });

  return (
    <div className="card bg-base-100 shadow-sm">
      <div className="card-body p-4">
        <div className="flex items-start gap-3">
          <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center flex-shrink-0">
            <Building2 size={20} className="text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <h3 className="font-semibold text-base-content truncate">
              {company.company_name}
            </h3>
            <p className="text-sm text-base-content/60">{company.service_name}</p>
            <div className="flex items-center gap-2 mt-2">
              <span className={`badge badge-sm ${statusBadgeClass[company.status]}`}>
                {company.status === "ongoing" ? "Ongoing" : "Completed"}
              </span>
              <span className="text-xs text-base-content/40">{date}</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
