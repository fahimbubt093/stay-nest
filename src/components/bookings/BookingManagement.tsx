"use client";

import { useState } from "react";
import { BookingPageHeader } from "@/components/bookings/BookingPageHeader";
import { BookingFormDialog } from "@/components/bookings/BookingFormDialog";
import { BookingsTable } from "@/components/bookings/BookingsTable";
import { useBookings } from "@/components/bookings/BookingProvider";
import type { NewBooking } from "@/components/bookings/booking-data";

export function BookingManagement() {
  const [isAddingBooking, setIsAddingBooking] = useState(false);
  const { addBooking, bookings, rooms } = useBookings();

  return (
    <>
      <BookingPageHeader
        bookingCount={bookings.length}
        onNewBooking={() => setIsAddingBooking(true)}
      />
      <BookingsTable bookings={bookings} />

      {isAddingBooking && (
        <BookingFormDialog
          onCancel={() => setIsAddingBooking(false)}
          onSave={(newBooking: NewBooking) => {
            addBooking(newBooking);
            setIsAddingBooking(false);
          }}
          rooms={rooms}
        />
      )}
    </>
  );
}
