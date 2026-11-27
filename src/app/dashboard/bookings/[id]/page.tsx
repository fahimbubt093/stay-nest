import { Suspense } from "react";
import { DashboardMobileNavigation } from "@/components/dashboard/dashboard-mobile-navigation";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { BookingDetails } from "@/components/bookings/BookingDetails";
import { sampleBookings } from "@/components/bookings/booking-data";

export function generateStaticParams() {
  return sampleBookings.map((booking) => ({ id: booking.id }));
}

async function BookingDetailsContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  return <BookingDetails key={id} bookingId={id} />;
}

export default function BookingDetailsPage(
  props: PageProps<"/dashboard/bookings/[id]">,
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
                Loading booking details...
              </div>
            }
          >
            <BookingDetailsContent params={props.params} />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
