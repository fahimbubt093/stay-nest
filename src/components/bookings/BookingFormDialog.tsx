"use client";

import { NewBookingForm } from "@/components/bookings/NewBookingForm";
import type {
  Booking,
  NewBooking,
} from "@/components/bookings/booking-data";
import type { Room } from "@/components/rooms/room-data";

type BookingFormDialogProps = {
  initialBooking?: Booking;
  onCancel: () => void;
  onSave: (booking: NewBooking) => void;
  rooms: Room[];
};

export function BookingFormDialog({
  initialBooking,
  onCancel,
  onSave,
  rooms,
}: BookingFormDialogProps) {
  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/40 p-4">
      <div
        aria-label={initialBooking ? `Edit booking ${initialBooking.id}` : "New booking"}
        aria-modal="true"
        className="my-auto w-full max-w-2xl"
        role="dialog"
      >
        <NewBookingForm
          initialBooking={initialBooking}
          onCancel={onCancel}
          onSave={onSave}
          rooms={rooms}
        />
      </div>
    </div>
  );
}
