"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import {
  type Booking,
  type NewBooking,
  sampleBookings,
} from "@/src/components/bookings/booking-data";

type BookingContextValue = {
  bookings: Booking[];
  addBooking: (booking: NewBooking) => void;
  updateBooking: (id: string, booking: NewBooking) => void;
  cancelBooking: (id: string) => void;
};

const BookingContext = createContext<BookingContextValue | null>(null);

function getNextBookingId(bookings: Booking[]) {
  const highestId = bookings.reduce((highest, booking) => {
    const numericId = Number(booking.id.replace(/^BK-/, ""));
    return Number.isFinite(numericId) ? Math.max(highest, numericId) : highest;
  }, 1000);

  return `BK-${highestId + 1}`;
}

export function BookingProvider({ children }: { children: ReactNode }) {
  const [bookings, setBookings] = useState(sampleBookings);

  function addBooking(newBooking: NewBooking) {
    setBookings((currentBookings) => [
      { ...newBooking, id: getNextBookingId(currentBookings) },
      ...currentBookings,
    ]);
  }

  function updateBooking(id: string, updatedBooking: NewBooking) {
    setBookings((currentBookings) =>
      currentBookings.map((booking) =>
        booking.id === id ? { ...updatedBooking, id } : booking,
      ),
    );
  }

  function cancelBooking(id: string) {
    setBookings((currentBookings) =>
      currentBookings.map((booking) =>
        booking.id === id ? { ...booking, status: "Cancelled" } : booking,
      ),
    );
  }

  return (
    <BookingContext.Provider
      value={{ bookings, addBooking, updateBooking, cancelBooking }}
    >
      {children}
    </BookingContext.Provider>
  );
}

export function useBookings() {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error("useBookings must be used within a BookingProvider.");
  }

  return context;
}
