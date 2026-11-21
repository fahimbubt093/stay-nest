"use client";

import { useState } from "react";
import { BookingPageHeader } from "@/src/components/bookings/BookingPageHeader";
import { BookingFormDialog } from "@/src/components/bookings/BookingFormDialog";
import { BookingsTable } from "@/src/components/bookings/BookingsTable";
import { useBookings } from "@/src/components/bookings/BookingProvider";
import type { NewBooking } from "@/src/components/bookings/booking-data";
import { sampleRooms } from "@/src/components/rooms/room-data";

export function BookingManagement() {
  const [isAddingBooking, setIsAddingBooking] = useState(false);
  const { addBooking, bookings } = useBookings();

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
          rooms={sampleRooms}
        />
      )}
    </>
  );
}
