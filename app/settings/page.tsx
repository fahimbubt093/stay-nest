import { SettingsManagement } from "@/src/components/settings/SettingsManagement";
import { DashboardMobileNavigation } from "@/src/components/dashboard/dashboard-mobile-navigation";
import { DashboardSidebar } from "@/src/components/dashboard/dashboard-sidebar";

export default function SettingsPage() {
  return (
    <div className="flex min-h-screen w-full bg-slate-50 text-slate-900">
      <DashboardSidebar />
      <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-10">
        <div className="mx-auto max-w-7xl">
          <DashboardMobileNavigation />
          <SettingsManagement />
        </div>
      </main>
    </div>
  );
}
