type BookingPageHeaderProps = {
  bookingCount: number;
  onNewBooking: () => void;
};

export function BookingPageHeader({
  bookingCount,
  onNewBooking,
}: BookingPageHeaderProps) {
  return (
    <header className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
          Hotel operations
        </p>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Booking Management
        </h1>
        <p className="mt-2 text-sm text-slate-500 sm:text-base">
          Manage guest reservations and stay dates.
        </p>
      </div>
      <div className="flex items-center gap-3">
        <span className="inline-flex w-fit items-center rounded-full bg-white px-3 py-1.5 text-sm font-medium text-slate-600 shadow-sm ring-1 ring-slate-200">
          {bookingCount} bookings
        </span>
        <button
          className="inline-flex min-h-11 items-center gap-2 rounded-xl bg-blue-600 px-4 text-sm font-semibold text-white shadow-sm shadow-blue-900/15 transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          onClick={onNewBooking}
          type="button"
        >
          <span aria-hidden="true" className="text-lg leading-none">
            +
          </span>
          New Booking
        </button>
      </div>
    </header>
  );
}
