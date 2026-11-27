"use client";

import { useState } from "react";
import Link from "next/link";
import { BookingFormDialog } from "@/components/bookings/BookingFormDialog";
import { BookingStatusBadge } from "@/components/bookings/BookingStatusBadge";
import { useBookings } from "@/components/bookings/BookingProvider";
import {
  formatBookingDate,
  type NewBooking,
} from "@/components/bookings/booking-data";
import { CancelBookingDialog } from "@/components/bookings/CancelBookingDialog";

type BookingDetailsProps = {
  bookingId: string;
};

export function BookingDetails({ bookingId }: BookingDetailsProps) {
  const { bookings, cancelBooking, rooms, updateBooking } = useBookings();
  const [isEditing, setIsEditing] = useState(false);
  const [isConfirmingCancellation, setIsConfirmingCancellation] =
    useState(false);
  const booking = bookings.find((item) => item.id === bookingId);

  function saveBooking(updatedBooking: NewBooking) {
    updateBooking(bookingId, updatedBooking);
    setIsEditing(false);
  }

  function confirmCancellation() {
    cancelBooking(bookingId);
    setIsConfirmingCancellation(false);
  }

  if (!booking) {
    return (
      <section className="rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm sm:p-8">
        <h1 className="text-xl font-semibold text-slate-900">
          Booking not found
        </h1>
        <Link
          className="mt-5 inline-flex min-h-11 items-center rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          href="/dashboard/bookings"
        >
          Back to Bookings
        </Link>
      </section>
    );
  }

  return (
    <>
      <header className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
            Hotel operations
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Booking {booking.id}
          </h1>
          <p className="mt-2 text-sm text-slate-500 sm:text-base">
            Guest reservation details and stay information.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <Link
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            href="/dashboard/bookings"
          >
            Back to Bookings
          </Link>
          <button
            className="min-h-11 rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white shadow-sm shadow-blue-900/15 transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            onClick={() => setIsEditing(true)}
            type="button"
          >
            Edit Booking
          </button>
          {booking.status !== "Cancelled" && (
            <button
              className="min-h-11 rounded-xl border border-rose-200 bg-white px-5 text-sm font-semibold text-rose-700 transition hover:bg-rose-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
              onClick={() => setIsConfirmingCancellation(true)}
              type="button"
            >
              Cancel Booking
            </button>
          )}
        </div>
      </header>

      <section
        aria-labelledby="booking-information-heading"
        className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-7"
      >
        <div className="mb-6 border-b border-slate-100 pb-5">
          <h2
            className="text-lg font-semibold text-slate-900"
            id="booking-information-heading"
          >
            Booking Information
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Reservation details for this guest stay
          </p>
        </div>

        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4 sm:p-5">
            <dt className="text-sm font-medium text-slate-500">Booking ID</dt>
            <dd className="mt-2 text-base font-semibold text-slate-900">
              {booking.id}
            </dd>
          </div>
          <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4 sm:p-5">
            <dt className="text-sm font-medium text-slate-500">
              Customer Name
            </dt>
            <dd className="mt-2 text-base font-semibold text-slate-900">
              {booking.customerName}
            </dd>
          </div>
          <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4 sm:p-5">
            <dt className="text-sm font-medium text-slate-500">Phone</dt>
            <dd className="mt-2 text-base font-semibold text-slate-900">
              {booking.phone}
            </dd>
          </div>
          <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4 sm:p-5">
            <dt className="text-sm font-medium text-slate-500">Room Number</dt>
            <dd className="mt-2 text-base font-semibold text-slate-900">
              Room {booking.roomNumber}
            </dd>
          </div>
          <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4 sm:p-5">
            <dt className="text-sm font-medium text-slate-500">Check-in</dt>
            <dd className="mt-2 text-base font-semibold text-slate-900">
              {formatBookingDate(booking.checkIn)}
            </dd>
          </div>
          <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4 sm:p-5">
            <dt className="text-sm font-medium text-slate-500">Check-out</dt>
            <dd className="mt-2 text-base font-semibold text-slate-900">
              {formatBookingDate(booking.checkOut)}
            </dd>
          </div>
          <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4 sm:p-5">
            <dt className="text-sm font-medium text-slate-500">Guests</dt>
            <dd className="mt-2 text-base font-semibold text-slate-900">
              {booking.numberOfGuests}{" "}
              {booking.numberOfGuests === 1 ? "guest" : "guests"}
            </dd>
          </div>
          <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4 sm:p-5">
            <dt className="text-sm font-medium text-slate-500">
              Booking Status
            </dt>
            <dd className="mt-2">
              <BookingStatusBadge status={booking.status} />
            </dd>
          </div>
        </dl>
      </section>

      {isEditing && (
        <BookingFormDialog
          key={booking.id}
          initialBooking={booking}
          onCancel={() => setIsEditing(false)}
          onSave={saveBooking}
          rooms={rooms}
        />
      )}

      {isConfirmingCancellation && (
        <CancelBookingDialog
          booking={booking}
          onCancel={() => setIsConfirmingCancellation(false)}
          onConfirm={confirmCancellation}
        />
      )}
    </>
  );
}
