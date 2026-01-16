import { ServicesSection } from "@/components/home/ServicesSection";
import { services } from "@/data/mock";

export default function ServicesPage() {
  return (
    <div className="max-w-md mx-auto">
      <h1 className="text-2xl font-bold text-base-content mb-4">All Services</h1>
      <ServicesSection services={services} />
    </div>
  );
}
