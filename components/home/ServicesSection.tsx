import { ServiceCard } from "./ServiceCard";
import type { Service } from "@/types";

interface ServicesSectionProps {
  services: Service[];
}

export function ServicesSection({ services }: ServicesSectionProps) {
  return (
    <section className="mt-6">
      <h2 className="text-lg font-semibold text-base-content mb-4">
        Business Services
      </h2>
      <div className="grid grid-cols-3 gap-3">
        {services.map((service) => (
          <ServiceCard key={service.id} service={service} />
        ))}
      </div>
    </section>
  );
}
