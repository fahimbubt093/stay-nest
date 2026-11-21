import {
  sampleBookings,
  type Booking,
} from "@/src/components/dashboard/booking-data";
import { BookingStatusBadge } from "@/src/components/bookings/BookingStatusBadge";

type RecentBookingsProps = {
  bookings?: Booking[];
};

export function RecentBookings({
  bookings = sampleBookings,
}: RecentBookingsProps) {
  return (
    <section className="mt-8 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm sm:mt-10">
      <div className="border-b border-slate-100 px-5 py-5 sm:px-6">
        <h2 className="text-lg font-semibold text-slate-900">
          Recent Bookings
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          A quick look at your latest reservations
        </p>
      </div>

      <div
        aria-label="Recent bookings"
        className="w-full overflow-x-auto"
        role="region"
        tabIndex={0}
      >
        <table className="w-full min-w-[560px] text-left text-sm">
          <thead className="bg-slate-50/80 text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-5 py-3.5 font-semibold sm:px-6" scope="col">
                Customer
              </th>
              <th className="px-5 py-3.5 font-semibold sm:px-6" scope="col">
                Room
              </th>
              <th className="px-5 py-3.5 font-semibold sm:px-6" scope="col">
                Date
              </th>
              <th className="px-5 py-3.5 font-semibold sm:px-6" scope="col">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {bookings.map((booking) => (
              <tr key={`${booking.name}-${booking.room}`} className="text-slate-600">
                <th
                  className="whitespace-nowrap px-5 py-4 text-left font-medium text-slate-800 sm:px-6"
                  scope="row"
                >
                  {booking.name}
                </th>
                <td className="whitespace-nowrap px-5 py-4 sm:px-6">
                  {booking.room}
                </td>
                <td className="whitespace-nowrap px-5 py-4 sm:px-6">
                  {booking.date}
                </td>
                <td className="px-5 py-4 sm:px-6">
                  <BookingStatusBadge status={booking.status} />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
