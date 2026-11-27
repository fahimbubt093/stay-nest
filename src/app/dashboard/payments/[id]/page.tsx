import { Suspense } from "react";
import { PaymentDetails } from "@/components/payments/PaymentDetails";
import { samplePayments } from "@/components/payments/payment-data";
import { DashboardMobileNavigation } from "@/components/dashboard/dashboard-mobile-navigation";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";

export function generateStaticParams() {
  return samplePayments.map((payment) => ({ id: payment.id }));
}

async function PaymentDetailsContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <PaymentDetails paymentId={id} />;
}

export default function PaymentDetailsPage(
  props: PageProps<"/dashboard/payments/[id]">,
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
                Loading payment details...
              </div>
            }
          >
            <PaymentDetailsContent params={props.params} />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
