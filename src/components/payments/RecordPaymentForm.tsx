"use client";

import { useState, type FormEvent } from "react";
import { sampleBookings } from "@/components/bookings/booking-data";
import { sampleCustomers } from "@/components/customers/customer-data";
import type {
  NewPayment,
  PaymentMethod,
} from "@/components/payments/payment-data";

type RecordPaymentFormProps = {
  onCancel: () => void;
  onSave: (payment: NewPayment) => void;
};

type PaymentFormErrors = Partial<
  Record<"bookingId" | "customerId" | "amount" | "paymentMethod" | "date", string>
>;

const fieldClassName =
  "mt-1.5 h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10";
const paymentMethods: PaymentMethod[] = ["Cash", "Card", "Bank Transfer"];

export function RecordPaymentForm({
  onCancel,
  onSave,
}: RecordPaymentFormProps) {
  const [customerId, setCustomerId] = useState(sampleCustomers[0]?.id ?? "");
  const [bookingId, setBookingId] = useState(
    sampleCustomers[0]?.bookingIds[0] ?? "",
  );
  const [amount, setAmount] = useState("");
  const [paymentMethod, setPaymentMethod] = useState<PaymentMethod>("Card");
  const [date, setDate] = useState("");
  const [errors, setErrors] = useState<PaymentFormErrors>({});

  const selectedCustomer = sampleCustomers.find(
    (customer) => customer.id === customerId,
  );
  const availableBookings = sampleBookings.filter((booking) =>
    selectedCustomer?.bookingIds.includes(booking.id),
  );

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const selectedBooking = availableBookings.find(
      (booking) => booking.id === bookingId,
    );
    const parsedAmount = Number(amount);
    const nextErrors: PaymentFormErrors = {};

    if (!selectedCustomer) {
      nextErrors.customerId = "Select a customer.";
    }
    if (!selectedBooking) {
      nextErrors.bookingId = "Select a booking for this customer.";
    }
    if (!amount.trim() || !Number.isFinite(parsedAmount) || parsedAmount <= 0) {
      nextErrors.amount = "Enter a payment amount greater than zero.";
    }
    if (!paymentMethods.includes(paymentMethod)) {
      nextErrors.paymentMethod = "Select a payment method.";
    }
    if (!date) {
      nextErrors.date = "Select a payment date.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    if (!selectedCustomer || !selectedBooking) {
      return;
    }

    onSave({
      customerId: selectedCustomer.id,
      customerName: selectedCustomer.name,
      bookingId: selectedBooking.id,
      amount: parsedAmount,
      paymentMethod,
      date,
    });
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/40 p-4">
      <section
        aria-labelledby="record-payment-title"
        aria-modal="true"
        className="my-auto w-full max-w-2xl rounded-2xl border border-slate-100 bg-white p-5 shadow-xl sm:p-6"
        role="dialog"
      >
        <form noValidate onSubmit={handleSubmit}>
          <div className="mb-6">
            <h2
              className="text-lg font-semibold text-slate-900"
              id="record-payment-title"
            >
              Record a Payment
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              Enter the booking and payment details below.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2">
            <div>
              <label
                className="text-sm font-medium text-slate-700"
                htmlFor="payment-customer"
              >
                Customer
              </label>
              <select
                aria-describedby={
                  errors.customerId ? "payment-customer-error" : undefined
                }
                aria-invalid={Boolean(errors.customerId)}
                className={fieldClassName}
                id="payment-customer"
                onChange={(event) => {
                  const nextCustomer = sampleCustomers.find(
                    (customer) => customer.id === event.target.value,
                  );
                  setCustomerId(nextCustomer?.id ?? "");
                  setBookingId(nextCustomer?.bookingIds[0] ?? "");
                  setErrors((current) => ({
                    ...current,
                    customerId: undefined,
                    bookingId: undefined,
                  }));
                }}
                required
                value={customerId}
              >
                <option disabled value="">
                  Select a customer
                </option>
                {sampleCustomers.map((customer) => (
                  <option key={customer.id} value={customer.id}>
                    {customer.name}
                  </option>
                ))}
              </select>
              {errors.customerId && (
                <p
                  className="mt-1.5 text-xs text-rose-600"
                  id="payment-customer-error"
                  role="alert"
                >
                  {errors.customerId}
                </p>
              )}
            </div>

            <div>
              <label
                className="text-sm font-medium text-slate-700"
                htmlFor="payment-booking"
              >
                Booking ID
              </label>
              <select
                aria-describedby={
                  errors.bookingId ? "payment-booking-error" : undefined
                }
                aria-invalid={Boolean(errors.bookingId)}
                className={fieldClassName}
                id="payment-booking"
                onChange={(event) => {
                  setBookingId(event.target.value);
                  setErrors((current) => ({
                    ...current,
                    bookingId: undefined,
                  }));
                }}
                required
                value={bookingId}
              >
                {availableBookings.length === 0 ? (
                  <option value="">No bookings available</option>
                ) : (
                  availableBookings.map((booking) => (
                    <option key={booking.id} value={booking.id}>
                      {booking.id} - Room {booking.roomNumber}
                    </option>
                  ))
                )}
              </select>
              {errors.bookingId && (
                <p
                  className="mt-1.5 text-xs text-rose-600"
                  id="payment-booking-error"
                  role="alert"
                >
                  {errors.bookingId}
                </p>
              )}
            </div>

            <div>
              <label
                className="text-sm font-medium text-slate-700"
                htmlFor="payment-amount"
              >
                Amount (USD)
              </label>
              <input
                aria-describedby={
                  errors.amount ? "payment-amount-error" : undefined
                }
                aria-invalid={Boolean(errors.amount)}
                className={fieldClassName}
                id="payment-amount"
                min="0.01"
                onChange={(event) => {
                  setAmount(event.target.value);
                  setErrors((current) => ({ ...current, amount: undefined }));
                }}
                placeholder="e.g. 240.00"
                required
                step="0.01"
                type="number"
                value={amount}
              />
              {errors.amount && (
                <p
                  className="mt-1.5 text-xs text-rose-600"
                  id="payment-amount-error"
                  role="alert"
                >
                  {errors.amount}
                </p>
              )}
            </div>

            <div>
              <label
                className="text-sm font-medium text-slate-700"
                htmlFor="payment-method"
              >
                Payment Method
              </label>
              <select
                aria-describedby={
                  errors.paymentMethod ? "payment-method-error" : undefined
                }
                aria-invalid={Boolean(errors.paymentMethod)}
                className={fieldClassName}
                id="payment-method"
                onChange={(event) => {
                  const selectedMethod = paymentMethods.find(
                    (method) => method === event.target.value,
                  );
                  if (selectedMethod) {
                    setPaymentMethod(selectedMethod);
                    setErrors((current) => ({
                      ...current,
                      paymentMethod: undefined,
                    }));
                  }
                }}
                required
                value={paymentMethod}
              >
                {paymentMethods.map((method) => (
                  <option key={method} value={method}>
                    {method}
                  </option>
                ))}
              </select>
              {errors.paymentMethod && (
                <p
                  className="mt-1.5 text-xs text-rose-600"
                  id="payment-method-error"
                  role="alert"
                >
                  {errors.paymentMethod}
                </p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label
                className="text-sm font-medium text-slate-700"
                htmlFor="payment-date"
              >
                Payment Date
              </label>
              <input
                aria-describedby={errors.date ? "payment-date-error" : undefined}
                aria-invalid={Boolean(errors.date)}
                className={fieldClassName}
                id="payment-date"
                onChange={(event) => {
                  setDate(event.target.value);
                  setErrors((current) => ({ ...current, date: undefined }));
                }}
                required
                type="date"
                value={date}
              />
              {errors.date && (
                <p
                  className="mt-1.5 text-xs text-rose-600"
                  id="payment-date-error"
                  role="alert"
                >
                  {errors.date}
                </p>
              )}
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
              Save Payment
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
