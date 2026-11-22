"use client";

import { useState, type FormEvent } from "react";
import type {
  Booking,
  BookingStatus,
  NewBooking,
} from "@/components/bookings/booking-data";
import type { Room } from "@/components/rooms/room-data";

type NewBookingFormProps = {
  initialBooking?: Booking;
  onCancel: () => void;
  onSave: (booking: NewBooking) => void;
  rooms: Room[];
};

const fieldClassName =
  "mt-1.5 h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10";

export function NewBookingForm({
  initialBooking,
  onCancel,
  onSave,
  rooms,
}: NewBookingFormProps) {
  const selectableRooms = rooms.filter(
    (room) =>
      room.status === "Available" ||
      room.roomNumber === initialBooking?.roomNumber,
  );
  const bookingStatuses: BookingStatus[] =
    initialBooking?.status === "Cancelled"
      ? ["Cancelled"]
      : ["Pending", "Confirmed"];
  const [customerName, setCustomerName] = useState(
    initialBooking?.customerName ?? "",
  );
  const [customerNameError, setCustomerNameError] = useState("");
  const [phone, setPhone] = useState(initialBooking?.phone ?? "");
  const [phoneError, setPhoneError] = useState("");
  const [roomNumber, setRoomNumber] = useState(
    initialBooking?.roomNumber ?? selectableRooms[0]?.roomNumber ?? "",
  );
  const [checkIn, setCheckIn] = useState(initialBooking?.checkIn ?? "");
  const [checkOut, setCheckOut] = useState(initialBooking?.checkOut ?? "");
  const [numberOfGuests, setNumberOfGuests] = useState(
    String(initialBooking?.numberOfGuests ?? 1),
  );
  const [status, setStatus] = useState<BookingStatus>(
    initialBooking?.status ?? "Pending",
  );
  const [dateError, setDateError] = useState("");
  const selectedRoom = selectableRooms.find(
    (room) => room.roomNumber === roomNumber,
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const trimmedCustomerName = customerName.trim();
    if (!trimmedCustomerName) {
      setCustomerNameError("Enter the customer name.");
      return;
    }

    const phoneDigits = phone.replace(/\D/g, "");
    if (phoneDigits.length < 7 || phoneDigits.length > 15) {
      setPhoneError("Enter a valid phone number.");
      return;
    }

    if (!checkIn || !checkOut || checkOut <= checkIn) {
      setDateError("Choose a check-out date after check-in.");
      return;
    }

    setCustomerNameError("");
    setPhoneError("");
    setDateError("");
    onSave({
      customerName: trimmedCustomerName,
      phone: phone.trim(),
      roomNumber,
      checkIn,
      checkOut,
      numberOfGuests: Number(numberOfGuests),
      status,
    });
  }

  return (
    <form
      className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6"
      onSubmit={handleSubmit}
    >
      <div className="mb-6">
        <h2 className="text-lg font-semibold text-slate-900">
          {initialBooking ? "Edit Booking" : "New Booking"}
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          {initialBooking
            ? "Update the guest and stay details."
            : "Enter the guest and stay details."}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2">
        <div>
          <label
            className="text-sm font-medium text-slate-700"
            htmlFor="booking-customer"
          >
            Customer Name
          </label>
          <input
            autoComplete="name"
            className={fieldClassName}
            id="booking-customer"
            onChange={(event) => {
              setCustomerName(event.target.value);
              setCustomerNameError("");
            }}
            placeholder="Guest full name"
            required
            value={customerName}
          />
          {customerNameError && (
            <p className="mt-1.5 text-xs text-rose-600" role="alert">
              {customerNameError}
            </p>
          )}
        </div>

        <div>
          <label
            className="text-sm font-medium text-slate-700"
            htmlFor="booking-phone"
          >
            Phone
          </label>
          <input
            autoComplete="tel"
            className={fieldClassName}
            id="booking-phone"
            maxLength={20}
            onChange={(event) => {
              setPhone(event.target.value);
              setPhoneError("");
            }}
            pattern="[0-9+() -]{7,20}"
            placeholder="+880 1XXX-XXXXXX"
            required
            title="Enter a phone number using digits, spaces, +, parentheses, or hyphens."
            type="tel"
            value={phone}
          />
          {phoneError && (
            <p className="mt-1.5 text-xs text-rose-600" role="alert">
              {phoneError}
            </p>
          )}
        </div>

        <div>
          <label
            className="text-sm font-medium text-slate-700"
            htmlFor="booking-room"
          >
            Room
          </label>
          <select
            className={fieldClassName}
            id="booking-room"
            onChange={(event) => {
              const nextRoom = selectableRooms.find(
                (room) => room.roomNumber === event.target.value,
              );

              if (nextRoom) {
                setRoomNumber(nextRoom.roomNumber);
                setNumberOfGuests("1");
              }
            }}
            required
            value={roomNumber}
          >
            {selectableRooms.length === 0 ? (
              <option value="">No available rooms</option>
            ) : (
              selectableRooms.map((room) => (
                <option key={room.roomNumber} value={room.roomNumber}>
                  Room {room.roomNumber}
                  {room.status !== "Available" ? " (current booking)" : ""}
                </option>
              ))
            )}
          </select>
          {selectableRooms.length === 0 && (
            <p className="mt-1.5 text-xs text-amber-700">
              There are no available rooms to book right now.
            </p>
          )}
        </div>

        <div>
          <label
            className="text-sm font-medium text-slate-700"
            htmlFor="booking-status"
          >
            Booking Status
          </label>
          <select
            className={fieldClassName}
            disabled={initialBooking?.status === "Cancelled"}
            id="booking-status"
            onChange={(event) => {
              const selectedStatus = bookingStatuses.find(
                (bookingStatus) => bookingStatus === event.target.value,
              );

              if (selectedStatus) {
                setStatus(selectedStatus);
              }
            }}
            value={status}
          >
            {bookingStatuses.map((bookingStatus) => (
              <option key={bookingStatus} value={bookingStatus}>
                {bookingStatus}
              </option>
            ))}
          </select>
        </div>

        <div>
          <label
            className="text-sm font-medium text-slate-700"
            htmlFor="booking-check-in"
          >
            Check-in Date
          </label>
          <input
            className={fieldClassName}
            id="booking-check-in"
            onChange={(event) => {
              setCheckIn(event.target.value);
              setDateError("");
            }}
            required
            type="date"
            value={checkIn}
          />
        </div>

        <div>
          <label
            className="text-sm font-medium text-slate-700"
            htmlFor="booking-check-out"
          >
            Check-out Date
          </label>
          <input
            className={fieldClassName}
            id="booking-check-out"
            min={checkIn || undefined}
            onChange={(event) => {
              setCheckOut(event.target.value);
              setDateError("");
            }}
            required
            type="date"
            value={checkOut}
          />
        </div>

        <div className="sm:col-span-2">
          <label
            className="text-sm font-medium text-slate-700"
            htmlFor="booking-guests"
          >
            Number of Guests
          </label>
          <input
            className={fieldClassName}
            id="booking-guests"
            max={selectedRoom?.capacity}
            min="1"
            onChange={(event) => setNumberOfGuests(event.target.value)}
            required
            step="1"
            type="number"
            value={numberOfGuests}
          />
          {selectedRoom && (
            <p className="mt-1.5 text-xs text-slate-500">
              Capacity: {selectedRoom.capacity}{" "}
              {selectedRoom.capacity === 1 ? "guest" : "guests"}
            </p>
          )}
        </div>
      </div>
      {dateError && (
        <p className="mt-3 text-sm text-rose-600" role="alert">
          {dateError}
        </p>
      )}

      <div className="mt-7 flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
        <button
          className="min-h-11 rounded-xl border border-slate-200 px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          onClick={onCancel}
          type="button"
        >
          Cancel
        </button>
        <button
          className="min-h-11 rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white shadow-sm shadow-blue-900/15 transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
          disabled={selectableRooms.length === 0}
          type="submit"
        >
          {initialBooking ? "Update Booking" : "Save Booking"}
        </button>
      </div>
    </form>
  );
}
