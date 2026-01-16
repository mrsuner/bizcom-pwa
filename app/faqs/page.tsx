import { PageHeader } from "@/components/profile/PageHeader";
import { FAQItem } from "@/components/profile/FAQItem";
import { mockFaqs } from "@/data/mock";
import { HelpCircle } from "lucide-react";

export default function FAQsPage() {
  return (
    <div className="max-w-md mx-auto">
      <PageHeader title="FAQs" backHref="/profile" />

      {mockFaqs.length > 0 ? (
        <div className="space-y-2">
          {mockFaqs.map((faq) => (
            <FAQItem key={faq.id} faq={faq} />
          ))}
        </div>
      ) : (
        <div className="card bg-base-100 shadow-sm">
          <div className="card-body items-center text-center py-10">
            <div className="w-16 h-16 rounded-full bg-base-200 flex items-center justify-center mb-4">
              <HelpCircle size={32} className="text-base-content/40" />
            </div>
            <p className="text-base-content/60">No FAQs available</p>
          </div>
        </div>
      )}
    </div>
  );
}
