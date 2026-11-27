import { Suspense } from "react";
import { DashboardMobileNavigation } from "@/components/dashboard/dashboard-mobile-navigation";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { UserDetails } from "@/components/users/UserDetails";

async function UserDetailsContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <UserDetails userId={id} />;
}

export default function UserDetailsPage(
  props: PageProps<"/dashboard/users/[id]">,
) {
  return (
    <div className="flex min-h-screen w-full bg-slate-50 text-slate-900">
      <DashboardSidebar />
      <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-10">
        <div className="mx-auto max-w-7xl">
          <DashboardMobileNavigation />
          <Suspense
            fallback={
              <div className="rounded-2xl border border-slate-100 bg-white p-6 text-sm text-slate-500 shadow-sm">
                Loading user details...
              </div>
            }
          >
            <UserDetailsContent params={props.params} />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
