"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { PaymentStatusBadge } from "@/components/payments/PaymentStatusBadge";
import {
  formatPaymentAmount,
  formatPaymentDate,
  type Payment,
  type PaymentStatus,
} from "@/components/payments/payment-data";

type PaymentsTableProps = {
  payments: Payment[];
};

const statusOptions: Array<"All statuses" | PaymentStatus> = [
  "All statuses",
  "Completed",
  "Pending",
  "Failed",
];

export function PaymentsTable({ payments }: PaymentsTableProps) {
  const [search, setSearch] = useState("");
  const [statusFilter, setStatusFilter] =
    useState<(typeof statusOptions)[number]>("All statuses");

  const filteredPayments = useMemo(() => {
    const query = search.trim().toLowerCase();

    return payments.filter((payment) => {
      const matchesSearch = [
        payment.id,
        payment.customerName,
        payment.bookingId,
        payment.paymentMethod,
      ]
        .join(" ")
        .toLowerCase()
        .includes(query);
      const matchesStatus =
        statusFilter === "All statuses" || payment.status === statusFilter;

      return matchesSearch && matchesStatus;
    });
  }, [payments, search, statusFilter]);

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
      <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:p-6 lg:flex-row lg:items-center lg:justify-between">
        <div>
          <h2 className="text-lg font-semibold text-slate-900">
            All Payments
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            {filteredPayments.length} of {payments.length} payments
          </p>
        </div>

        <div className="grid gap-3 sm:grid-cols-[minmax(14rem,1fr)_12rem] lg:w-auto lg:min-w-[27rem]">
          <label className="relative block">
            <span className="sr-only">Search payments</span>
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
              placeholder="Search ID, customer, or booking"
              type="search"
              value={search}
            />
          </label>

          <label>
            <span className="sr-only">Filter payments by status</span>
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
        aria-label="Payments list"
        className="overflow-x-auto"
        role="region"
        tabIndex={0}
      >
        <table className="w-full min-w-[1100px] text-left text-sm">
          <thead className="bg-slate-50/80 text-xs uppercase tracking-wider text-slate-500">
            <tr>
              <th className="px-5 py-3.5 font-semibold sm:px-6" scope="col">
                Payment ID
              </th>
              <th className="px-5 py-3.5 font-semibold sm:px-6" scope="col">
                Customer
              </th>
              <th className="px-5 py-3.5 font-semibold sm:px-6" scope="col">
                Booking ID
              </th>
              <th className="px-5 py-3.5 font-semibold sm:px-6" scope="col">
                Amount
              </th>
              <th className="px-5 py-3.5 font-semibold sm:px-6" scope="col">
                Payment Method
              </th>
              <th className="px-5 py-3.5 font-semibold sm:px-6" scope="col">
                Date
              </th>
              <th className="px-5 py-3.5 font-semibold sm:px-6" scope="col">
                Status
              </th>
              <th
                className="px-5 py-3.5 text-right font-semibold sm:px-6"
                scope="col"
              >
                Action
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100">
            {filteredPayments.length > 0 ? (
              filteredPayments.map((payment) => (
                <tr
                  className="text-slate-600 transition-colors hover:bg-slate-50/70"
                  key={payment.id}
                >
                  <th
                    className="whitespace-nowrap px-5 py-4 text-left font-semibold text-slate-800 sm:px-6"
                    scope="row"
                  >
                    {payment.id}
                  </th>
                  <td className="whitespace-nowrap px-5 py-4 font-medium text-slate-800 sm:px-6">
                    {payment.customerName}
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 sm:px-6">
                    {payment.bookingId}
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 font-medium text-slate-800 sm:px-6">
                    {formatPaymentAmount(payment.amount)}
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 sm:px-6">
                    {payment.paymentMethod}
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 sm:px-6">
                    {formatPaymentDate(payment.date)}
                  </td>
                  <td className="px-5 py-4 sm:px-6">
                    <PaymentStatusBadge status={payment.status} />
                  </td>
                  <td className="px-5 py-4 text-right sm:px-6">
                    <Link
                      className="inline-flex min-h-9 items-center justify-center rounded-lg border border-blue-100 bg-blue-50 px-3 text-sm font-semibold text-blue-700 transition hover:border-blue-200 hover:bg-blue-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                      href={`/frontend/payments/${encodeURIComponent(payment.id)}`}
                    >
                      View Details
                    </Link>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td
                  className="px-5 py-12 text-center text-sm text-slate-500 sm:px-6"
                  colSpan={8}
                >
                  No payments match your search and status filter.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
}
