import { Suspense } from "react";
import { notFound } from "next/navigation";
import { DashboardMobileNavigation } from "@/components/dashboard/dashboard-mobile-navigation";
import { DashboardSidebar } from "@/components/dashboard/dashboard-sidebar";
import { RoomDetails } from "@/components/rooms/RoomDetails";
import { sampleRooms } from "@/components/rooms/room-data";

export function generateStaticParams() {
  return sampleRooms.map((room) => ({ id: room.roomNumber }));
}

async function RoomDetailsContent({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const room = sampleRooms.find((item) => item.roomNumber === id);

  if (!room) {
    notFound();
  }

  return <RoomDetails key={room.roomNumber} room={room} />;
}

export default function RoomDetailsPage(
  props: PageProps<"/dashboard/rooms/[id]">,
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
                Loading room details...
              </div>
            }
          >
            <RoomDetailsContent params={props.params} />
          </Suspense>
        </div>
      </main>
    </div>
  );
}
