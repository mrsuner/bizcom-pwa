import Link from "next/link";
import { CreditCard, Receipt, ChevronRight } from "lucide-react";

interface PaymentMethod {
  id: string;
  icon: React.ReactNode;
  title: string;
  description: string;
  href?: string;
  disabled?: boolean;
  badge?: string;
}

const paymentMethods: PaymentMethod[] = [
  {
    id: "online",
    icon: <CreditCard size={24} />,
    title: "Online Payment",
    description: "Pay via card or e-wallet",
    disabled: true,
    badge: "Coming Soon",
  },
  {
    id: "offline",
    icon: <Receipt size={24} />,
    title: "Offline Payment",
    description: "Upload bank transfer receipt",
    href: "/topup/offline",
  },
];

export function MethodSelector() {
  return (
    <div className="space-y-3">
      {paymentMethods.map((method) => {
        const content = (
          <div
            className={`card bg-base-100 shadow-sm border border-base-300 ${
              method.disabled ? "opacity-60" : "hover:shadow-md transition-shadow"
            }`}
          >
            <div className="card-body p-4">
              <div className="flex items-center gap-4">
                <div className="text-primary">{method.icon}</div>
                <div className="flex-1">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-base-content">
                      {method.title}
                    </h3>
                    {method.badge && (
                      <span className="badge badge-sm badge-ghost">
                        {method.badge}
                      </span>
                    )}
                  </div>
                  <p className="text-sm text-base-content/60">
                    {method.description}
                  </p>
                </div>
                {!method.disabled && (
                  <ChevronRight size={20} className="text-base-content/40" />
                )}
              </div>
            </div>
          </div>
        );

        if (method.disabled) {
          return <div key={method.id}>{content}</div>;
        }

        return (
          <Link key={method.id} href={method.href!}>
            {content}
          </Link>
        );
      })}
    </div>
  );
}
