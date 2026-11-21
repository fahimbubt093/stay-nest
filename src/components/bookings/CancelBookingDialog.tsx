import type { Booking } from "@/src/components/bookings/booking-data";

type CancelBookingDialogProps = {
  booking: Booking;
  onCancel: () => void;
  onConfirm: () => void;
};

export function CancelBookingDialog({
  booking,
  onCancel,
  onConfirm,
}: CancelBookingDialogProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">
      <section
        aria-describedby="cancel-booking-description"
        aria-labelledby="cancel-booking-title"
        aria-modal="true"
        className="w-full max-w-md rounded-2xl border border-slate-100 bg-white p-6 shadow-xl"
        role="alertdialog"
      >
        <h2
          className="text-lg font-semibold text-slate-900"
          id="cancel-booking-title"
        >
          Cancel booking {booking.id}?
        </h2>
        <p
          className="mt-2 text-sm leading-6 text-slate-500"
          id="cancel-booking-description"
        >
          This will mark the reservation as cancelled. You can still view its
          details later.
        </p>
        <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
          <button
            className="min-h-11 rounded-xl border border-slate-200 px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            onClick={onCancel}
            type="button"
          >
            Keep Booking
          </button>
          <button
            className="min-h-11 rounded-xl bg-rose-600 px-5 text-sm font-semibold text-white transition hover:bg-rose-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
            onClick={onConfirm}
            type="button"
          >
            Confirm Cancellation
          </button>
        </div>
      </section>
    </div>
  );
}
