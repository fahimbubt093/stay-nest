import type { BookingStatusCount } from "@/src/components/reports/report-data";

type BookingStatusStatsProps = {
  bookingStatusCounts: BookingStatusCount[];
};

const statusStyles = {
  Confirmed: {
    bar: "bg-emerald-500",
    dot: "bg-emerald-500",
    text: "text-emerald-700",
  },
  Pending: {
    bar: "bg-amber-500",
    dot: "bg-amber-500",
    text: "text-amber-700",
  },
  Cancelled: {
    bar: "bg-rose-500",
    dot: "bg-rose-500",
    text: "text-rose-700",
  },
};

export function BookingStatusStats({
  bookingStatusCounts,
}: BookingStatusStatsProps) {
  const totalBookings = bookingStatusCounts.reduce(
    (total, item) => total + item.count,
    0,
  );

  return (
    <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6">
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900">
          Booking Statistics
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Status breakdown for the selected date range.
        </p>
      </div>

      <div className="space-y-5">
        {bookingStatusCounts.map((item) => {
          const percentage =
            totalBookings > 0 ? (item.count / totalBookings) * 100 : 0;
          const styles = statusStyles[item.status];

          return (
            <div key={item.status}>
              <div className="mb-2 flex items-center justify-between gap-3">
                <span className="flex items-center gap-2 text-sm font-medium text-slate-700">
                  <span
                    aria-hidden="true"
                    className={`h-2 w-2 rounded-full ${styles.dot}`}
                  />
                  {item.status}
                </span>
                <span className={`text-sm font-semibold ${styles.text}`}>
                  {item.count}
                </span>
              </div>
              <div
                aria-label={`${item.status}: ${item.count} of ${totalBookings} bookings`}
                className="h-2 overflow-hidden rounded-full bg-slate-100"
                role="img"
              >
                <div
                  className={`h-full rounded-full ${styles.bar}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
            </div>
          );
        })}
      </div>
      <p className="mt-6 border-t border-slate-100 pt-4 text-sm text-slate-500">
        {totalBookings} total bookings
      </p>
    </section>
  );
}
