import { BalanceCard } from "@/components/home/BalanceCard";
import { ServicesSection } from "@/components/home/ServicesSection";
import { AnnouncementBanner } from "@/components/home/AnnouncementBanner";
import { userBalance, services, announcement } from "@/data/mock";

export default function HomePage() {
  return (
    <div className="max-w-md mx-auto">
      <BalanceCard balance={userBalance} />
      <ServicesSection services={services} />
      <AnnouncementBanner announcement={announcement} />
    </div>
  );
}
