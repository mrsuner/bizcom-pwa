import { PageHeader } from "@/components/profile/PageHeader";
import { CompanyCard } from "@/components/profile/CompanyCard";
import { mockCompanies } from "@/data/mock";
import { Building2 } from "lucide-react";

export default function CompaniesPage() {
  return (
    <div className="max-w-md mx-auto">
      <PageHeader title="Companies" />

      {mockCompanies.length > 0 ? (
        <div className="space-y-3">
          {mockCompanies.map((company) => (
            <CompanyCard key={company.id} company={company} />
          ))}
        </div>
      ) : (
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body items-center text-center py-10">
            <div className="w-16 h-16 rounded-full bg-base-200 flex items-center justify-center mb-4">
              <Building2 size={32} className="text-base-content/40" />
            </div>
            <p className="text-base-content/60">No companies yet</p>
          </div>
        </div>
      )}
    </div>
  );
}
