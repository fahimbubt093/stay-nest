import { Suspense } from "react";
import { CustomerDetails } from "@/components/customers/CustomerDetails";
import { sampleCustomers } from "@/components/customers/customer-data";
import { DashboardMobileNavigation } from "@/components/dashboard/dashboard-mobile-navigation";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";

export function generateStaticParams() {
  return sampleCustomers.map((customer) => ({ id: customer.id }));
}

async function CustomerDetailsContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <CustomerDetails customerId={id} />;
}

export default function CustomerDetailsPage(
  props: PageProps<"/dashboard/customers/[id]">,
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
                Loading customer details...
              </div>
            }
          >
            <CustomerDetailsContent params={props.params} />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
