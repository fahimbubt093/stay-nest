"use client";

import { useState } from "react";
import Link from "next/link";
import { RoomFormDialog } from "@/components/rooms/RoomFormDialog";
import { sampleRooms, type Room } from "@/components/rooms/room-data";
import { RoomStatusBadge } from "@/components/rooms/room-status-badge";

type RoomDetailsProps = {
  room: Room;
};

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function RoomDetails({ room: initialRoom }: RoomDetailsProps) {
  const [room, setRoom] = useState(initialRoom);
  const [isEditing, setIsEditing] = useState(false);

  function updateRoom(updatedRoom: Room) {
    setRoom(updatedRoom);
    setIsEditing(false);
  }

  return (
    <>
      <header className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
            Hotel operations
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Room {room.roomNumber}
          </h1>
          <p className="mt-2 text-sm text-slate-500 sm:text-base">
            View room information and availability.
          </p>
        </div>

        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            href="/frontend/rooms"
          >
            Back to Rooms
          </Link>
          <button
            className="min-h-11 rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white shadow-sm shadow-blue-900/15 transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            onClick={() => setIsEditing(true)}
            type="button"
          >
            Edit Room
          </button>
        </div>
      </header>

      <section
        aria-labelledby="room-information-heading"
        className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-7"
      >
        <div className="mb-6 border-b border-slate-100 pb-5">
          <h2
            className="text-lg font-semibold text-slate-900"
            id="room-information-heading"
          >
            Room Information
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            Room details and current nightly rate
          </p>
        </div>

        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4 sm:p-5">
            <dt className="text-sm font-medium text-slate-500">Room Number</dt>
            <dd className="mt-2 text-lg font-semibold text-slate-900">
              {room.roomNumber}
            </dd>
          </div>
          <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4 sm:p-5">
            <dt className="text-sm font-medium text-slate-500">Room Type</dt>
            <dd className="mt-2 text-lg font-semibold text-slate-900">
              {room.roomType}
            </dd>
          </div>
          <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4 sm:p-5">
            <dt className="text-sm font-medium text-slate-500">
              Price per Night
            </dt>
            <dd className="mt-2 text-lg font-semibold text-slate-900">
              {priceFormatter.format(room.price)}
            </dd>
          </div>
          <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4 sm:p-5">
            <dt className="text-sm font-medium text-slate-500">Capacity</dt>
            <dd className="mt-2 text-lg font-semibold text-slate-900">
              {room.capacity} {room.capacity === 1 ? "guest" : "guests"}
            </dd>
          </div>
          <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4 sm:p-5 sm:col-span-2">
            <dt className="text-sm font-medium text-slate-500">Status</dt>
            <dd className="mt-2">
              <RoomStatusBadge status={room.status} />
            </dd>
          </div>
        </dl>
      </section>

      {isEditing && (
        <RoomFormDialog
          key={room.roomNumber}
          existingRoomNumbers={sampleRooms
            .filter((sampleRoom) => sampleRoom.roomNumber !== room.roomNumber)
            .map((sampleRoom) => sampleRoom.roomNumber)}
          initialRoom={room}
          onCancel={() => setIsEditing(false)}
          roomNumberReadOnly
          onSave={updateRoom}
        />
      )}
    </>
  );
}
