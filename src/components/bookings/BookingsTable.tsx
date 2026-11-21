"use client";

import { useMemo, useState } from "react";
import {
  type Booking,
  type BookingStatus,
  formatBookingDate,
} from "@/src/components/bookings/booking-data";
import { BookingStatusBadge } from "@/src/components/bookings/BookingStatusBadge";
import Link from "next/link";

type BookingsTableProps = {
  bookings: Booking[];
};

const statusOptions: Array<"All statuses" | BookingStatus> = [
  "All statuses",
  "Confirmed",
  "Pending",
  "Cancelled",
];

export function BookingsTable({ bookings }: BookingsTableProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<(typeof statusOptions)[number]>("All statuses");

  const filteredBookings = useMemo(() => {
    const query = search.trim().toLowerCase();

    return bookings.filter((booking) => {
      const matchesSearch =
        booking.id.toLowerCase().includes(query) ||
        booking.customerName.toLowerCase().includes(query) ||
        booking.roomNumber.toLowerCase().includes(query);
      const matchesStatus =
        statusFilter === "All statuses" || booking.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [bookings, search, statusFilter]);

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
      <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            All Bookings
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            {filteredBookings.length} of {bookings.length} bookings
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-[minmax(14rem,1fr)_12rem] lg:w-auto lg:min-w-[27rem]">
          <label className="relative block">
            <span className="sr-only">Search bookings</span>
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
              placeholder="Search ID, customer, or room"
              type="search"
              value={search}
            />
          </label>

          <label>
            <span className="sr-only">Filter bookings by status</span>
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
        aria-label="Bookings list"
        className="overflow-x-auto"
        role="region"
        tabIndex={0}
      >
        <table className="w-full min-w-[900px] text-left text-sm">
          <thead className="bg-slate-50/80 text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-5 py-3.5 font-semibold sm:px-6" scope="col">
                Booking ID
              </th>
              <th className="px-5 py-3.5 font-semibold sm:px-6" scope="col">
                Customer Name
              </th>
              <th className="px-5 py-3.5 font-semibold sm:px-6" scope="col">
                Room Number
              </th>
              <th className="px-5 py-3.5 font-semibold sm:px-6" scope="col">
                Check-in
              </th>
              <th className="px-5 py-3.5 font-semibold sm:px-6" scope="col">
                Check-out
              </th>
              <th className="px-5 py-3.5 font-semibold sm:px-6" scope="col">
                Status
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredBookings.length > 0 ? (
              filteredBookings.map((booking) => (
                <tr
                  className="text-slate-600 transition-colors hover:bg-slate-50/70"
                  key={booking.id}
                >
                  <th
                    className="whitespace-nowrap px-5 py-4 text-left font-semibold text-slate-800 sm:px-6"
                    scope="row"
                  >
                    <Link
                      className="rounded-sm text-blue-700 hover:text-blue-800 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                      href={`/bookings/${encodeURIComponent(booking.id)}`}
                    >
                      {booking.id}
                    </Link>
                  </th>
                  <td className="whitespace-nowrap px-5 py-4 font-medium text-slate-800 sm:px-6">
                    {booking.customerName}
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 sm:px-6">
                    Room {booking.roomNumber}
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 sm:px-6">
                    {formatBookingDate(booking.checkIn)}
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 sm:px-6">
                    {formatBookingDate(booking.checkOut)}
                  </td>
                  <td className="px-5 py-4 sm:px-6">
                    <BookingStatusBadge status={booking.status} />
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  className="px-5 py-12 text-center text-sm text-slate-500 sm:px-6"
                  colSpan={6}
                >
                  No bookings match your search and status filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
