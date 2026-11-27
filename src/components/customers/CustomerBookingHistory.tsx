import Link from "next/link";
import { BookingStatusBadge } from "@/components/bookings/BookingStatusBadge";
import {
  formatBookingDate,
  sampleBookings,
} from "@/components/bookings/booking-data";
import type { Customer } from "@/components/customers/customer-data";

type CustomerBookingHistoryProps = {
  customer: Customer;
};

export function CustomerBookingHistory({
  customer,
}: CustomerBookingHistoryProps) {
  const bookings = sampleBookings.filter((booking) =>
    customer.bookingIds.includes(booking.id),
  );

  return (
    <section className="mt-6 overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
      <div className="border-b border-slate-100 p-5 sm:p-6">
        <h2 className="text-lg font-semibold text-slate-900">Booking History</h2>
        <p className="mt-1 text-sm text-slate-500">
          {bookings.length} {bookings.length === 1 ? "booking" : "bookings"}{" "}
          found for this customer
        </p>
      </div>

      <div
        aria-label="Customer booking history"
        className="overflow-x-auto"
        role="region"
        tabIndex={0}
      >
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-slate-50/80 text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-5 py-3.5 font-semibold sm:px-6" scope="col">
                Booking ID
              </th>
              <th className="px-5 py-3.5 font-semibold sm:px-6" scope="col">
                Room
              </th>
              <th className="px-5 py-3.5 font-semibold sm:px-6" scope="col">
                Check-in
              </th>
              <th className="px-5 py-3.5 font-semibold sm:px-6" scope="col">
                Check-out
              </th>
              <th className="px-5 py-3.5 font-semibold sm:px-6" scope="col">
                Guests
              </th>
              <th className="px-5 py-3.5 font-semibold sm:px-6" scope="col">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {bookings.length > 0 ? (
              bookings.map((booking) => (
                <tr
                  className="text-slate-600 transition-colors hover:bg-slate-50/70"
                  key={booking.id}
                >
                  <th
                    className="whitespace-nowrap px-5 py-4 text-left font-semibold sm:px-6"
                    scope="row"
                  >
                    <Link
                      className="rounded-sm text-blue-700 hover:text-blue-800 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                      href={`/dashboard/bookings/${encodeURIComponent(booking.id)}`}
                    >
                      {booking.id}
                    </Link>
                  </th>
                  <td className="whitespace-nowrap px-5 py-4 sm:px-6">
                    Room {booking.roomNumber}
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 sm:px-6">
                    {formatBookingDate(booking.checkIn)}
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 sm:px-6">
                    {formatBookingDate(booking.checkOut)}
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 sm:px-6">
                    {booking.numberOfGuests}
                  </td>
                  <td className="px-5 py-4 sm:px-6">
                    <BookingStatusBadge status={booking.status} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  className="px-5 py-10 text-center text-sm text-slate-500 sm:px-6"
                  colSpan={6}
                >
                  No booking history is available for this customer.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
