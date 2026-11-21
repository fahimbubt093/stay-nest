"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import {
  customerHasActiveBookings,
  type Customer,
} from "@/src/components/customers/customer-data";
import { DeleteCustomerDialog } from "@/src/components/customers/DeleteCustomerDialog";
import { useCustomers } from "@/src/components/customers/CustomerProvider";

type CustomersTableProps = {
  customers: Customer[];
};

export function CustomersTable({ customers }: CustomersTableProps) {
  const { deleteCustomer } = useCustomers();
  const [search, setSearch] = useState("");
  const [customerToDelete, setCustomerToDelete] = useState<Customer | null>(
    null,
  );
  const [deleteError, setDeleteError] = useState("");

  const filteredCustomers = useMemo(() => {
    const query = search.trim().toLowerCase();

    return customers.filter((customer) =>
      [
        customer.id,
        customer.name,
        customer.phone,
        customer.email,
        customer.address,
      ]
        .join(" ")
        .toLowerCase()
        .includes(query),
    );
  }, [customers, search]);

  function confirmDeletion() {
    if (!customerToDelete) {
      return;
    }

    const result = deleteCustomer(customerToDelete.id);
    if (result !== "deleted") {
      setDeleteError(
        result === "active-bookings"
          ? "This customer cannot be deleted because they have active bookings."
          : "This customer is no longer in the list.",
      );
      return;
    }

    setCustomerToDelete(null);
    setDeleteError("");
  }

  return (
    <>
      <section className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-center sm:justify-between sm:p-6">
          <div>
            <h2 className="text-lg font-semibold text-slate-900">
              All Customers
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {filteredCustomers.length} of {customers.length} customers
            </p>
          </div>

          <label className="relative block w-full sm:max-w-sm">
            <span className="sr-only">Search customers</span>
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
              placeholder="Search ID, name, phone, or email"
              type="search"
              value={search}
            />
          </label>
        </div>

        <div
          aria-label="Customers list"
          className="overflow-x-auto"
          role="region"
          tabIndex={0}
        >
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead className="bg-slate-50/80 text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-5 py-3.5 font-semibold sm:px-6" scope="col">
                  Customer ID
                </th>
                <th className="px-5 py-3.5 font-semibold sm:px-6" scope="col">
                  Name
                </th>
                <th className="px-5 py-3.5 font-semibold sm:px-6" scope="col">
                  Phone
                </th>
                <th className="px-5 py-3.5 font-semibold sm:px-6" scope="col">
                  Email
                </th>
                <th
                  className="px-5 py-3.5 text-center font-semibold"
                  scope="col"
                >
                  Total Bookings
                </th>
                <th
                  className="px-5 py-3.5 text-right font-semibold sm:px-6"
                  scope="col"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredCustomers.length > 0 ? (
                filteredCustomers.map((customer) => {
                  const hasActiveBookings =
                    customerHasActiveBookings(customer);

                  return (
                    <tr
                      className="text-slate-600 transition-colors hover:bg-slate-50/70"
                      key={customer.id}
                    >
                      <th
                        className="whitespace-nowrap px-5 py-4 text-left font-semibold text-slate-800 sm:px-6"
                        scope="row"
                      >
                        {customer.id}
                      </th>
                      <td className="whitespace-nowrap px-5 py-4 font-medium text-slate-800 sm:px-6">
                        {customer.name}
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 sm:px-6">
                        {customer.phone}
                      </td>
                      <td className="whitespace-nowrap px-5 py-4 sm:px-6">
                        {customer.email}
                      </td>
                      <td className="px-5 py-4 text-center">
                        {customer.bookingIds.length}
                      </td>
                      <td className="px-5 py-4 sm:px-6">
                        <div className="flex items-center justify-end gap-2">
                          <Link
                            className="inline-flex min-h-9 items-center justify-center rounded-lg border border-blue-100 bg-blue-50 px-3 text-sm font-semibold text-blue-700 transition hover:border-blue-200 hover:bg-blue-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                            href={`/customers/${encodeURIComponent(customer.id)}`}
                          >
                            View Details
                          </Link>
                          <button
                            aria-label={`Delete ${customer.name}`}
                            className="inline-flex min-h-9 items-center justify-center rounded-lg border border-rose-200 bg-white px-3 text-sm font-semibold text-rose-700 transition hover:bg-rose-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600 disabled:cursor-not-allowed disabled:opacity-50"
                            disabled={hasActiveBookings}
                            onClick={() => {
                              setDeleteError("");
                              setCustomerToDelete(customer);
                            }}
                            title={
                              hasActiveBookings
                                ? "Customers with active bookings cannot be deleted."
                                : undefined
                            }
                            type="button"
                          >
                            Delete
                          </button>
                        </div>
                        {hasActiveBookings && (
                          <p className="mt-1 text-right text-xs text-amber-700">
                            Active booking
                          </p>
                        )}
                      </td>
                    </tr>
                  );
                })
              ) : (
                <tr>
                  <td
                    className="px-5 py-12 text-center text-sm text-slate-500 sm:px-6"
                    colSpan={6}
                  >
                    No customers match your search.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </section>
      {customerToDelete && (
        <DeleteCustomerDialog
          customer={customerToDelete}
          error={deleteError}
          onCancel={() => {
            setCustomerToDelete(null);
            setDeleteError("");
          }}
          onConfirm={confirmDeletion}
        />
      )}
    </>
  );
}
