"use client";

import { useState, type FormEvent } from "react";
import type { Room, RoomStatus } from "@/src/components/rooms/room-data";

export type NewRoom = Room;

type AddRoomFormProps = {
  existingRoomNumbers?: string[];
  initialRoom?: Room;
  onCancel: () => void;
  roomNumberReadOnly?: boolean;
  onSave: (room: NewRoom) => void;
};

const fieldClassName =
  "mt-1.5 h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10 invalid:border-rose-300";

const roomStatuses: RoomStatus[] = ["Available", "Booked", "Maintenance"];

export function AddRoomForm({
  existingRoomNumbers = [],
  initialRoom,
  onCancel,
  roomNumberReadOnly = false,
  onSave,
}: AddRoomFormProps) {
  const [roomNumber, setRoomNumber] = useState(initialRoom?.roomNumber ?? "");
  const [roomNumberError, setRoomNumberError] = useState("");
  const [roomType, setRoomType] = useState(initialRoom?.roomType ?? "");
  const [price, setPrice] = useState(
    initialRoom ? String(initialRoom.price) : "",
  );
  const [capacity, setCapacity] = useState(
    initialRoom ? String(initialRoom.capacity) : "",
  );
  const [status, setStatus] = useState<RoomStatus>(
    initialRoom?.status ?? "Available",
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const normalizedRoomNumber = roomNumber.trim();
    if (!normalizedRoomNumber) {
      setRoomNumberError("Enter a room number.");
      return;
    }

    const duplicateRoomNumber = existingRoomNumbers.some(
      (existingRoomNumber) =>
        existingRoomNumber.trim().toLowerCase() ===
        normalizedRoomNumber.toLowerCase(),
    );
    if (duplicateRoomNumber) {
      setRoomNumberError("This room number is already in use.");
      return;
    }

    setRoomNumberError("");
    onSave({
      roomNumber: normalizedRoomNumber,
      roomType,
      price: Number(price),
      capacity: Number(capacity),
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
          {initialRoom ? "Edit room" : "Add a room"}
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          {initialRoom
            ? "Update the room details below."
            : "Enter the room details below."}
        </p>
      </div>

      <div className="grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2">
        <div>
          <label
            className="text-sm font-medium text-slate-700"
            htmlFor="room-number"
          >
            Room Number
          </label>
          <input
            autoComplete="off"
            className={`${fieldClassName} read-only:bg-slate-50 read-only:text-slate-500`}
            id="room-number"
            maxLength={12}
            onChange={(event) => {
              setRoomNumber(event.target.value);
              setRoomNumberError("");
            }}
            pattern="[A-Za-z0-9-]+"
            placeholder="e.g. 101"
            readOnly={roomNumberReadOnly}
            required
            title="Use letters, numbers, and hyphens only."
            value={roomNumber}
          />
          {roomNumberError && (
            <p className="mt-1.5 text-xs text-rose-600" role="alert">
              {roomNumberError}
            </p>
          )}
        </div>

        <div>
          <label
            className="text-sm font-medium text-slate-700"
            htmlFor="room-type"
          >
            Room Type
          </label>
          <select
            className={fieldClassName}
            id="room-type"
            onChange={(event) => setRoomType(event.target.value)}
            required
            value={roomType}
          >
            <option disabled value="">
              Select a room type
            </option>
            <option value="Standard Queen">Standard Queen</option>
            <option value="Deluxe King">Deluxe King</option>
            <option value="Deluxe Twin">Deluxe Twin</option>
            <option value="Executive Suite">Executive Suite</option>
          </select>
        </div>

        <div>
          <label
            className="text-sm font-medium text-slate-700"
            htmlFor="room-price"
          >
            Price per Night (USD)
          </label>
          <input
            className={fieldClassName}
            id="room-price"
            min="0.01"
            onChange={(event) => setPrice(event.target.value)}
            placeholder="e.g. 120"
            required
            step="0.01"
            type="number"
            value={price}
          />
        </div>

        <div>
          <label
            className="text-sm font-medium text-slate-700"
            htmlFor="room-capacity"
          >
            Capacity (guests)
          </label>
          <input
            className={fieldClassName}
            id="room-capacity"
            min="1"
            onChange={(event) => setCapacity(event.target.value)}
            placeholder="e.g. 2"
            required
            step="1"
            type="number"
            value={capacity}
          />
        </div>

        <div className="sm:col-span-2">
          <label
            className="text-sm font-medium text-slate-700"
            htmlFor="room-status"
          >
            Status
          </label>
          <select
            className={fieldClassName}
            id="room-status"
            onChange={(event) => {
              const selectedStatus = roomStatuses.find(
                (roomStatus) => roomStatus === event.target.value,
              );

              if (selectedStatus) {
                setStatus(selectedStatus);
              }
            }}
            value={status}
          >
            {roomStatuses.map((roomStatus) => (
              <option key={roomStatus} value={roomStatus}>
                {roomStatus}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className="mt-7 flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
        <button
          className="min-h-11 rounded-xl border border-slate-200 px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          onClick={onCancel}
          type="button"
        >
          Cancel
        </button>
        <button
          className="min-h-11 rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white shadow-sm shadow-blue-900/15 transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          type="submit"
        >
          {initialRoom ? "Update Room" : "Save Room"}
        </button>
      </div>
    </form>
  );
}
