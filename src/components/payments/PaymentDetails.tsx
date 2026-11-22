"use client";

import Link from "next/link";
import { usePayments } from "@/components/payments/PaymentProvider";
import { PaymentStatusBadge } from "@/components/payments/PaymentStatusBadge";
import {
  formatPaymentAmount,
  formatPaymentDate,
} from "@/components/payments/payment-data";

type PaymentDetailsProps = {
  paymentId: string;
};

export function PaymentDetails({ paymentId }: PaymentDetailsProps) {
  const { payments } = usePayments();
  const payment = payments.find((item) => item.id === paymentId);

  if (!payment) {
    return (
      <section className="rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm sm:p-8">
        <h1 className="text-xl font-semibold text-slate-900">
          Payment not found
        </h1>
        <Link
          className="mt-5 inline-flex min-h-11 items-center rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          href="/frontend/payments"
        >
          Back to Payments
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
            Payment Details
          </h1>
          <p className="mt-2 text-sm text-slate-500 sm:text-base">
            Transaction information for payment {payment.id}.
          </p>
        </div>
        <Link
          className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          href="/frontend/payments"
        >
          Back to Payments
        </Link>
      </header>

      <section
        aria-labelledby="payment-information-heading"
        className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-7"
      >
        <div className="mb-6 flex flex-col gap-3 border-b border-slate-100 pb-5 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-medium text-blue-600">{payment.id}</p>
            <h2
              className="mt-1 text-lg font-semibold text-slate-900"
              id="payment-information-heading"
            >
              Transaction Information
            </h2>
          </div>
          <PaymentStatusBadge status={payment.status} />
        </div>

        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4 sm:p-5">
            <dt className="text-sm font-medium text-slate-500">Payment ID</dt>
            <dd className="mt-2 text-base font-semibold text-slate-900">
              {payment.id}
            </dd>
          </div>
          <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4 sm:p-5">
            <dt className="text-sm font-medium text-slate-500">Customer</dt>
            <dd className="mt-2 text-base font-semibold text-slate-900">
              {payment.customerName}
            </dd>
            <Link
              className="mt-2 inline-flex text-sm font-semibold text-blue-700 hover:text-blue-800 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              href={`/frontend/customers/${encodeURIComponent(payment.customerId)}`}
            >
              View Customer
            </Link>
          </div>
          <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4 sm:p-5">
            <dt className="text-sm font-medium text-slate-500">Booking ID</dt>
            <dd className="mt-2 text-base font-semibold text-slate-900">
              {payment.bookingId}
            </dd>
            <Link
              className="mt-2 inline-flex text-sm font-semibold text-blue-700 hover:text-blue-800 hover:underline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              href={`/frontend/bookings/${encodeURIComponent(payment.bookingId)}`}
            >
              View Booking
            </Link>
          </div>
          <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4 sm:p-5">
            <dt className="text-sm font-medium text-slate-500">Amount</dt>
            <dd className="mt-2 text-base font-semibold text-slate-900">
              {formatPaymentAmount(payment.amount)}
            </dd>
          </div>
          <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4 sm:p-5">
            <dt className="text-sm font-medium text-slate-500">
              Payment Method
            </dt>
            <dd className="mt-2 text-base font-semibold text-slate-900">
              {payment.paymentMethod}
            </dd>
          </div>
          <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4 sm:p-5">
            <dt className="text-sm font-medium text-slate-500">Date</dt>
            <dd className="mt-2 text-base font-semibold text-slate-900">
              {formatPaymentDate(payment.date)}
            </dd>
          </div>
          <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4 sm:p-5">
            <dt className="text-sm font-medium text-slate-500">Status</dt>
            <dd className="mt-2">
              <PaymentStatusBadge status={payment.status} />
            </dd>
          </div>
        </dl>
      </section>
    </>
  );
}
