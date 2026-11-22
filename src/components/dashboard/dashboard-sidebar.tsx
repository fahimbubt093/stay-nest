import { DashboardNavigation } from "@/components/dashboard/dashboard-navigation";

export function DashboardSidebar() {
  return (
    <aside className="hidden w-64 shrink-0 bg-slate-950 px-5 py-7 text-white md:block">
      <h1 className="mb-12 px-3 text-2xl font-bold tracking-tight">
        Hotel<span className="text-blue-400">Pro</span>
      </h1>
      <p className="mb-3 px-3 text-xs font-semibold uppercase tracking-widest text-slate-500">
        Workspace
      </p>
      <DashboardNavigation />
    </aside>
  );
}
