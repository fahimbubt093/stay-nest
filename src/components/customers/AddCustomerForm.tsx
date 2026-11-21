"use client";

import { useState, type FormEvent } from "react";
import type {
  Customer,
  NewCustomer,
} from "@/src/components/customers/customer-data";

type AddCustomerFormProps = {
  initialCustomer?: Customer;
  onCancel: () => void;
  onSave: (customer: NewCustomer) => void;
};

type CustomerFormErrors = Partial<Record<keyof NewCustomer, string>>;

const fieldClassName =
  "mt-1.5 h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10";

export function AddCustomerForm({
  initialCustomer,
  onCancel,
  onSave,
}: AddCustomerFormProps) {
  const [name, setName] = useState(initialCustomer?.name ?? "");
  const [phone, setPhone] = useState(initialCustomer?.phone ?? "");
  const [email, setEmail] = useState(initialCustomer?.email ?? "");
  const [address, setAddress] = useState(initialCustomer?.address ?? "");
  const [errors, setErrors] = useState<CustomerFormErrors>({});

  function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const customer = {
      name: name.trim(),
      phone: phone.trim(),
      email: email.trim(),
      address: address.trim(),
    };
    const nextErrors: CustomerFormErrors = {};

    if (!customer.name) {
      nextErrors.name = "Enter the customer's full name.";
    }
    if (!customer.phone) {
      nextErrors.phone = "Enter a phone number.";
    }
    if (!customer.email) {
      nextErrors.email = "Enter an email address.";
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(customer.email)) {
      nextErrors.email = "Enter a valid email address.";
    }
    if (!customer.address) {
      nextErrors.address = "Enter an address.";
    }

    setErrors(nextErrors);
    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    onSave(customer);
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/40 p-4">
      <section
        aria-labelledby="add-customer-title"
        aria-modal="true"
        className="my-auto w-full max-w-2xl rounded-2xl border border-slate-100 bg-white p-5 shadow-xl sm:p-6"
        role="dialog"
      >
        <form noValidate onSubmit={handleSubmit}>
          <div className="mb-6">
            <h2
              className="text-lg font-semibold text-slate-900"
              id="add-customer-title"
            >
              {initialCustomer ? "Edit Customer" : "Add a Customer"}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {initialCustomer
                ? "Update the guest's contact details below."
                : "Enter the guest's contact details below."}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2">
            <div>
              <label
                className="text-sm font-medium text-slate-700"
                htmlFor="customer-name"
              >
                Full Name
              </label>
              <input
                autoComplete="name"
                aria-describedby={errors.name ? "customer-name-error" : undefined}
                aria-invalid={Boolean(errors.name)}
                className={fieldClassName}
                id="customer-name"
                onChange={(event) => {
                  setName(event.target.value);
                  setErrors((current) => ({ ...current, name: undefined }));
                }}
                placeholder="Guest full name"
                required
                value={name}
              />
              {errors.name && (
                <p
                  className="mt-1.5 text-xs text-rose-600"
                  id="customer-name-error"
                  role="alert"
                >
                  {errors.name}
                </p>
              )}
            </div>

            <div>
              <label
                className="text-sm font-medium text-slate-700"
                htmlFor="customer-phone"
              >
                Phone
              </label>
              <input
                autoComplete="tel"
                aria-describedby={
                  errors.phone ? "customer-phone-error" : undefined
                }
                aria-invalid={Boolean(errors.phone)}
                className={fieldClassName}
                id="customer-phone"
                onChange={(event) => {
                  setPhone(event.target.value);
                  setErrors((current) => ({ ...current, phone: undefined }));
                }}
                placeholder="+880 1XXX-XXXXXX"
                required
                type="tel"
                value={phone}
              />
              {errors.phone && (
                <p
                  className="mt-1.5 text-xs text-rose-600"
                  id="customer-phone-error"
                  role="alert"
                >
                  {errors.phone}
                </p>
              )}
            </div>

            <div>
              <label
                className="text-sm font-medium text-slate-700"
                htmlFor="customer-email"
              >
                Email
              </label>
              <input
                autoComplete="email"
                aria-describedby={
                  errors.email ? "customer-email-error" : undefined
                }
                aria-invalid={Boolean(errors.email)}
                className={fieldClassName}
                id="customer-email"
                onChange={(event) => {
                  setEmail(event.target.value);
                  setErrors((current) => ({ ...current, email: undefined }));
                }}
                placeholder="guest@example.com"
                required
                type="email"
                value={email}
              />
              {errors.email && (
                <p
                  className="mt-1.5 text-xs text-rose-600"
                  id="customer-email-error"
                  role="alert"
                >
                  {errors.email}
                </p>
              )}
            </div>

            <div className="sm:col-span-2">
              <label
                className="text-sm font-medium text-slate-700"
                htmlFor="customer-address"
              >
                Address
              </label>
              <textarea
                aria-describedby={
                  errors.address ? "customer-address-error" : undefined
                }
                aria-invalid={Boolean(errors.address)}
                className={`${fieldClassName} h-24 resize-y py-3`}
                id="customer-address"
                onChange={(event) => {
                  setAddress(event.target.value);
                  setErrors((current) => ({ ...current, address: undefined }));
                }}
                placeholder="Street, city, and region"
                required
                value={address}
              />
              {errors.address && (
                <p
                  className="mt-1.5 text-xs text-rose-600"
                  id="customer-address-error"
                  role="alert"
                >
                  {errors.address}
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
              {initialCustomer ? "Update Customer" : "Save Customer"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
