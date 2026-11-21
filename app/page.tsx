import { RoomAvailability } from "@/src/components/dashboard/RoomAvailability";
import { RecentBookings } from "@/src/components/dashboard/RecentBookings";
import { DashboardHeader as WelcomeHeader } from "@/src/components/dashboard/dashboard-header";
import { DashboardMobileNavigation } from "@/src/components/dashboard/dashboard-mobile-navigation";
import { DashboardSidebar } from "@/src/components/dashboard/dashboard-sidebar";
import { StatsOverview as StatsCards } from "@/src/components/dashboard/stats-overview";

export default function Home() {
  return (
    <div className="flex min-h-screen w-full bg-slate-50 text-slate-900">
      <DashboardSidebar />
      <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-10">
        <div className="mx-auto max-w-7xl">
          <DashboardMobileNavigation />
          <WelcomeHeader />
          <StatsCards />
          <div className="grid items-start gap-x-6 2xl:grid-cols-[minmax(0,1.7fr)_minmax(20rem,1fr)]">
            <RecentBookings />
            <div className="mt-8 sm:mt-10">
              <RoomAvailability />
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
