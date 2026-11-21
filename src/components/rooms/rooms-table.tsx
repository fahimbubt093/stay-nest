"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  type Room,
  type RoomStatus,
} from "@/src/components/rooms/room-data";
import { RoomStatusBadge } from "@/src/components/rooms/room-status-badge";

type RoomsTableProps = {
  rooms: Room[];
  onDelete: (room: Room) => void;
  onEdit: (room: Room) => void;
};

const statusOptions: Array<"All statuses" | RoomStatus> = [
  "All statuses",
  "Available",
  "Booked",
  "Maintenance",
];

const priceFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function RoomsTable({ rooms, onDelete, onEdit }: RoomsTableProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<(typeof statusOptions)[number]>("All statuses");

  const filteredRooms = useMemo(() => {
    const query = search.trim().toLowerCase();

    return rooms.filter((room) => {
      const matchesSearch =
        room.roomNumber.toLowerCase().includes(query) ||
        room.roomType.toLowerCase().includes(query);
      const matchesStatus =
        statusFilter === "All statuses" || room.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [rooms, search, statusFilter]);

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
      <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">All Rooms</h2>
          <p className="mt-1 text-sm text-slate-500">
            {filteredRooms.length} of {rooms.length} rooms
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-[minmax(14rem,1fr)_12rem] lg:w-auto lg:min-w-[27rem]">
          <label className="relative block">
            <span className="sr-only">Search rooms</span>
            <svg
              aria-hidden="true"
              className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
              strokeWidth="1.8"
            >
              <circle cx="11" cy="11" r="7" />
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="m20 20-4-4"
              />
            </svg>
            <input
              className="h-11 w-full rounded-xl border border-slate-200 bg-white pl-10 pr-3 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              onChange={(event) => setSearch(event.target.value)}
              placeholder="Search by number or type"
              type="search"
              value={search}
            />
          </label>

          <label>
            <span className="sr-only">Filter rooms by status</span>
            <select
              className="h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10"
              onChange={(event) => {
                const selectedStatus = statusOptions.find(
                  (status) => status === event.target.value,
                );

                if (selectedStatus) {
                  setStatusFilter(selectedStatus);
                }
              }}
              value={statusFilter}
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </label>
        </div>
      </div>

      <div
        aria-label="Room list"
        className="overflow-x-auto"
        role="region"
        tabIndex={0}
      >
        <table className="w-full min-w-[760px] text-left text-sm">
          <thead className="bg-slate-50/80 text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-5 py-3.5 font-semibold sm:px-6" scope="col">
                Room Number
              </th>
              <th className="px-5 py-3.5 font-semibold sm:px-6" scope="col">
                Room Type
              </th>
              <th className="px-5 py-3.5 font-semibold sm:px-6" scope="col">
                Price
              </th>
              <th className="px-5 py-3.5 font-semibold sm:px-6" scope="col">
                Status
              </th>
              <th className="px-5 py-3.5 font-semibold sm:px-6" scope="col">
                Actions
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredRooms.length > 0 ? (
              filteredRooms.map((room) => (
                <tr
                  className="text-slate-600 transition-colors hover:bg-slate-50/70"
                  key={room.roomNumber}
                >
                  <th
                    className="whitespace-nowrap px-5 py-4 text-left font-semibold text-slate-800 sm:px-6"
                    scope="row"
                  >
                    <Link
                      className="rounded-sm text-blue-700 hover:text-blue-800 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                      href={`/rooms/${encodeURIComponent(room.roomNumber)}`}
                    >
                      {room.roomNumber}
                    </Link>
                  </th>
                  <td className="whitespace-nowrap px-5 py-4 sm:px-6">
                    {room.roomType}
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 font-medium text-slate-800 sm:px-6">
                    {priceFormatter.format(room.price)}
                    <span className="ml-1 font-normal text-slate-400">
                      / night
                    </span>
                  </td>
                  <td className="px-5 py-4 sm:px-6">
                    <RoomStatusBadge status={room.status} />
                  </td>
                  <td className="px-5 py-4 sm:px-6">
                    <div className="flex items-center gap-2">
                      <Link
                        aria-label={`View room ${room.roomNumber}`}
                        className="rounded-lg px-2.5 py-1.5 text-xs font-semibold text-slate-700 transition hover:bg-slate-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                        href={`/rooms/${encodeURIComponent(room.roomNumber)}`}
                      >
                        View
                      </Link>
                      <button
                        aria-label={`Edit room ${room.roomNumber}`}
                        className="rounded-lg px-2.5 py-1.5 text-xs font-semibold text-blue-700 transition hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                        onClick={() => onEdit(room)}
                        type="button"
                      >
                        Edit
                      </button>
                      <button
                        aria-label={`Delete room ${room.roomNumber}`}
                        className="rounded-lg px-2.5 py-1.5 text-xs font-semibold text-rose-700 transition hover:bg-rose-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600"
                        onClick={() => onDelete(room)}
                        type="button"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  className="px-5 py-12 text-center text-sm text-slate-500 sm:px-6"
                  colSpan={5}
                >
                  No rooms match your search and status filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
