"use client";

import { useState } from "react";
import Link from "next/link";
import { AddCustomerForm } from "@/components/customers/AddCustomerForm";
import { CustomerBookingHistory } from "@/components/customers/CustomerBookingHistory";
import { useCustomers } from "@/components/customers/CustomerProvider";
import type { NewCustomer } from "@/components/customers/customer-data";

type CustomerDetailsProps = {
  customerId: string;
};

export function CustomerDetails({ customerId }: CustomerDetailsProps) {
  const { customers, updateCustomer } = useCustomers();
  const [isEditing, setIsEditing] = useState(false);
  const customer = customers.find((item) => item.id === customerId);

  function saveCustomer(updatedCustomer: NewCustomer) {
    updateCustomer(customerId, updatedCustomer);
    setIsEditing(false);
  }

  if (!customer) {
    return (
      <section className="rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm sm:p-8">
        <h1 className="text-xl font-semibold text-slate-900">
          Customer not found
        </h1>
        <Link
          className="mt-5 inline-flex min-h-11 items-center rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          href="/dashboard/customers"
        >
          Back to Customers
        </Link>
      </section>
    );
  }

  return (
    <>
      <header className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
            Hotel operations
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            Customer Details
          </h1>
          <p className="mt-2 text-sm text-slate-500 sm:text-base">
            Contact information and booking summary for this guest.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            href="/dashboard/customers"
          >
            Back to Customers
          </Link>
          <button
            className="min-h-11 rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white shadow-sm shadow-blue-900/15 transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            onClick={() => setIsEditing(true)}
            type="button"
          >
            Edit Customer
          </button>
        </div>
      </header>

      <section
        aria-labelledby="customer-information-heading"
        className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-7"
      >
        <div className="mb-6 border-b border-slate-100 pb-5">
          <p className="text-sm font-medium text-blue-600">{customer.id}</p>
          <h2
            className="mt-1 text-lg font-semibold text-slate-900"
            id="customer-information-heading"
          >
            {customer.name}
          </h2>
        </div>

        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4 sm:p-5">
            <dt className="text-sm font-medium text-slate-500">Customer ID</dt>
            <dd className="mt-2 text-base font-semibold text-slate-900">
              {customer.id}
            </dd>
          </div>
          <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4 sm:p-5">
            <dt className="text-sm font-medium text-slate-500">Name</dt>
            <dd className="mt-2 text-base font-semibold text-slate-900">
              {customer.name}
            </dd>
          </div>
          <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4 sm:p-5">
            <dt className="text-sm font-medium text-slate-500">Phone</dt>
            <dd className="mt-2 break-words text-base font-semibold text-slate-900">
              {customer.phone}
            </dd>
          </div>
          <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4 sm:p-5">
            <dt className="text-sm font-medium text-slate-500">Email</dt>
            <dd className="mt-2 break-words text-base font-semibold text-slate-900">
              {customer.email}
            </dd>
          </div>
          <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4 sm:p-5">
            <dt className="text-sm font-medium text-slate-500">Address</dt>
            <dd className="mt-2 break-words text-base font-semibold text-slate-900">
              {customer.address}
            </dd>
          </div>
          <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4 sm:p-5">
            <dt className="text-sm font-medium text-slate-500">
              Total Bookings
            </dt>
            <dd className="mt-2 text-base font-semibold text-slate-900">
              {customer.bookingIds.length}
            </dd>
          </div>
        </dl>
      </section>

      <CustomerBookingHistory customer={customer} />

      {isEditing && (
        <AddCustomerForm
          key={customer.id}
          initialCustomer={customer}
          onCancel={() => setIsEditing(false)}
          onSave={saveCustomer}
        />
      )}
    </>
  );
}
