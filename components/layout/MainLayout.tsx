import { Header } from "./Header";
import { BottomNavigation } from "./BottomNavigation";

interface MainLayoutProps {
  children: React.ReactNode;
}

export function MainLayout({ children }: MainLayoutProps) {
  return (
    <div className="min-h-screen bg-base-200 flex flex-col">
      <Header />
      <main className="flex-1 px-4 pb-20 overflow-y-auto">{children}</main>
      <BottomNavigation />
    </div>
  );
}
