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
} from "@/components/bookings/booking-data";
import { type Room, sampleRooms } from "@/components/rooms/room-data";

type BookingContextValue = {
  bookings: Booking[];
  rooms: Room[];
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
  const [rooms, setRooms] = useState(sampleRooms);

  function addBooking(newBooking: NewBooking) {
    setBookings((currentBookings) => [
      { ...newBooking, id: getNextBookingId(currentBookings) },
      ...currentBookings,
    ]);
    if (newBooking.status !== "Cancelled") {
      setRooms((currentRooms) =>
        currentRooms.map((room) =>
          room.roomNumber === newBooking.roomNumber &&
          room.status === "Available"
            ? { ...room, status: "Booked" }
            : room,
        ),
      );
    }
  }

  function updateBooking(id: string, updatedBooking: NewBooking) {
    const previousBooking = bookings.find((booking) => booking.id === id);
    setBookings((currentBookings) =>
      currentBookings.map((booking) =>
        booking.id === id ? { ...updatedBooking, id } : booking,
      ),
    );

    if (!previousBooking) {
      return;
    }

    setRooms((currentRooms) =>
      currentRooms.map((room) => {
        if (
          updatedBooking.status !== "Cancelled" &&
          room.roomNumber === updatedBooking.roomNumber &&
          room.status === "Available"
        ) {
          return { ...room, status: "Booked" };
        }

        const previousRoomIsStillBooked = bookings.some(
          (booking) =>
            booking.id !== id &&
            booking.roomNumber === previousBooking.roomNumber &&
            booking.status !== "Cancelled",
        );
        if (
          room.roomNumber === previousBooking.roomNumber &&
          room.status === "Booked" &&
          !previousRoomIsStillBooked &&
          (updatedBooking.status === "Cancelled" ||
            updatedBooking.roomNumber !== previousBooking.roomNumber)
        ) {
          return { ...room, status: "Available" };
        }

        return room;
      }),
    );
  }

  function cancelBooking(id: string) {
    const bookingToCancel = bookings.find((booking) => booking.id === id);
    setBookings((currentBookings) =>
      currentBookings.map((booking) =>
        booking.id === id ? { ...booking, status: "Cancelled" } : booking,
      ),
    );

    if (!bookingToCancel || bookingToCancel.status === "Cancelled") {
      return;
    }

    const roomIsStillBooked = bookings.some(
      (booking) =>
        booking.id !== id &&
        booking.roomNumber === bookingToCancel.roomNumber &&
        booking.status !== "Cancelled",
    );
    if (!roomIsStillBooked) {
      setRooms((currentRooms) =>
        currentRooms.map((room) =>
          room.roomNumber === bookingToCancel.roomNumber &&
          room.status === "Booked"
            ? { ...room, status: "Available" }
            : room,
        ),
      );
    }
  }

  return (
    <BookingContext.Provider
      value={{ bookings, rooms, addBooking, updateBooking, cancelBooking }}
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
