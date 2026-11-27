"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/AuthProvider";
import { UserFormDialog } from "@/components/users/UserFormDialog";
import {
  staffPerformanceMock,
  staffSalaryMock,
} from "@/components/users/user-details-mock-data";
import type {
  AccountStatus,
  AuthUser,
  UpdatedDemoUser,
} from "@/lib/auth/types";

type UserDetailsProps = {
  userId: string;
};

const moneyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 2,
});

function formatDate(value?: string): string {
  if (!value) {
    return "Not available";
  }

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) {
    return "Not available";
  }

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeZone: "UTC",
  }).format(date);
}

function getInitials(fullName: string): string {
  return fullName
    .trim()
    .split(/\s+/)
    .slice(0, 2)
    .map((part) => part.charAt(0).toUpperCase())
    .join("");
}

function UserNotFound() {
  return (
    <section className="rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm sm:p-8">
      <h1 className="text-xl font-semibold text-slate-900">User not found</h1>
      <Link
        className="mt-5 inline-flex min-h-11 items-center rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white shadow-sm transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
        href="/dashboard/users"
      >
        Back to User List
      </Link>
    </section>
  );
}

export function UserDetails({ userId }: UserDetailsProps) {
  const { status, user: currentUser, users, updateUser, changeAccountStatus } =
    useAuth();
  const router = useRouter();
  const [isEditing, setIsEditing] = useState(false);
  const [isChangingStatus, setIsChangingStatus] = useState(false);
  const [statusError, setStatusError] = useState("");

  useEffect(() => {
    if (status === "authenticated" && currentUser?.role !== "Admin") {
      router.replace("/dashboard");
    }
  }, [currentUser?.role, router, status]);

  const user = users.find((item) => item.id === userId);

  async function saveUser(input: UpdatedDemoUser) {
    await updateUser(userId, input);
    setIsEditing(false);
  }

  async function toggleAccountStatus(target: AuthUser) {
    if (target.isDefaultAdmin) {
      return;
    }

    const nextStatus: AccountStatus =
      target.accountStatus === "Active" ? "Inactive" : "Active";
    setStatusError("");
    setIsChangingStatus(true);
    try {
      await changeAccountStatus(target.id, nextStatus);
    } catch (error) {
      setStatusError(
        error instanceof Error
          ? error.message
          : "Account status could not be updated. Try again.",
      );
    } finally {
      setIsChangingStatus(false);
    }
  }

  if (status === "loading") {
    return (
      <div className="rounded-2xl border border-slate-100 bg-white p-6 text-sm text-slate-500 shadow-sm">
        Loading user details...
      </div>
    );
  }

  if (status === "error") {
    return (
      <section className="rounded-2xl border border-rose-200 bg-rose-50 p-6 text-sm text-rose-700">
        User data could not be loaded. Check browser storage and try again.
      </section>
    );
  }

  if (status !== "authenticated" || !currentUser) {
    return null;
  }

  if (currentUser.role !== "Admin") {
    return null;
  }

  if (!user) {
    return <UserNotFound />;
  }

  const information = [
    ["User ID", user.id],
    ["Full Name", user.fullName],
    ["Email", user.email],
    ["Phone Number", user.phone || "Not provided"],
    ["Role", user.role],
    ["Join Date", formatDate(user.createdAt)],
    ["Account Status", user.accountStatus],
    ["Profile Image", user.profileImageUrl ? "Available" : "Not provided"],
  ];

  return (
    <>
      <header className="mb-8 flex flex-col gap-4 sm:mb-10 lg:flex-row lg:items-end lg:justify-between">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
            Hotel operations
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            User Details
          </h1>
          <p className="mt-2 text-sm text-slate-500 sm:text-base">
            Account information and staff overview for {user.fullName}.
          </p>
        </div>
        <div className="flex flex-col gap-3 sm:flex-row">
          <Link
            className="inline-flex min-h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 shadow-sm transition hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            href="/dashboard/users"
          >
            Back to User List
          </Link>
          <button
            className="min-h-11 rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white shadow-sm shadow-blue-900/15 transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={user.isDefaultAdmin}
            onClick={() => setIsEditing(true)}
            title={
              user.isDefaultAdmin
                ? "The default admin account cannot be edited."
                : undefined
            }
            type="button"
          >
            Edit User
          </button>
          <button
            className="min-h-11 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
            disabled={user.isDefaultAdmin || isChangingStatus}
            onClick={() => void toggleAccountStatus(user)}
            title={
              user.isDefaultAdmin
                ? "The default admin account cannot be deactivated."
                : undefined
            }
            type="button"
          >
            {isChangingStatus
              ? "Updating Status..."
              : user.accountStatus === "Active"
                ? "Deactivate Account"
                : "Activate Account"}
          </button>
        </div>
      </header>

      {statusError && (
        <p
          className="mb-5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700"
          role="alert"
        >
          {statusError}
        </p>
      )}

      <section
        aria-labelledby="user-information-heading"
        className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-7"
      >
        <div className="mb-6 flex flex-col gap-4 border-b border-slate-100 pb-5 sm:flex-row sm:items-center">
          {user.profileImageUrl ? (
            <Image
              alt={`${user.fullName} profile`}
              className="h-20 w-20 rounded-full border border-slate-200 object-cover"
              height={80}
              src={user.profileImageUrl}
              unoptimized
              width={80}
            />
          ) : (
            <div
              aria-label={`${user.fullName} profile image not provided`}
              className="flex h-20 w-20 items-center justify-center rounded-full bg-blue-50 text-xl font-semibold text-blue-700"
              role="img"
            >
              {getInitials(user.fullName)}
            </div>
          )}
          <div>
            <p className="text-sm font-medium text-blue-600">{user.id}</p>
            <h2
              className="mt-1 text-lg font-semibold text-slate-900"
              id="user-information-heading"
            >
              Basic Information
            </h2>
          </div>
        </div>

        <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {information.map(([label, value]) => (
            <div
              className="rounded-xl border border-slate-100 bg-slate-50/60 p-4 sm:p-5"
              key={label}
            >
              <dt className="text-sm font-medium text-slate-500">{label}</dt>
              <dd className="mt-2 break-words text-base font-semibold text-slate-900">
                {label === "Account Status" ? (
                  <span
                    className={
                      user.accountStatus === "Active"
                        ? "rounded-full bg-emerald-50 px-2.5 py-1 text-sm font-semibold text-emerald-700"
                        : "rounded-full bg-slate-100 px-2.5 py-1 text-sm font-semibold text-slate-600"
                    }
                  >
                    {value}
                  </span>
                ) : (
                  value
                )}
              </dd>
            </div>
          ))}
        </dl>
        <p className="mt-5 text-xs leading-5 text-slate-500">
          Account status is informational in this demo and does not change sign-in access.
        </p>
      </section>

      {user.role === "Staff" && (
        <>
          <section
            aria-labelledby="staff-performance-heading"
            className="mt-6 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-7"
          >
            <div className="mb-6 border-b border-slate-100 pb-5">
              <h2
                className="text-lg font-semibold text-slate-900"
                id="staff-performance-heading"
              >
                Performance Overview
              </h2>
              <p className="mt-1 text-sm text-amber-700">
                Mock data only — not connected to booking or payment records.
              </p>
            </div>
            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4 sm:p-5">
                <dt className="text-sm font-medium text-slate-500">
                  Total Bookings Handled
                </dt>
                <dd className="mt-2 text-2xl font-semibold text-slate-900">
                  {staffPerformanceMock.totalBookingsHandled}
                </dd>
              </div>
              <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4 sm:p-5">
                <dt className="text-sm font-medium text-slate-500">
                  Total Sales Generated
                </dt>
                <dd className="mt-2 text-2xl font-semibold text-slate-900">
                  {moneyFormatter.format(
                    staffPerformanceMock.totalSalesGenerated,
                  )}
                </dd>
                <p className="mt-1 text-xs text-slate-500">Mock sales value</p>
              </div>
              <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4 sm:p-5">
                <dt className="text-sm font-medium text-slate-500">
                  Total Revenue Generated
                </dt>
                <dd className="mt-2 text-2xl font-semibold text-slate-900">
                  {moneyFormatter.format(
                    staffPerformanceMock.totalRevenueGenerated,
                  )}
                </dd>
                <p className="mt-1 text-xs text-slate-500">
                  Mock recognized revenue
                </p>
              </div>
              <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4 sm:p-5">
                <dt className="text-sm font-medium text-slate-500">
                  Completed Bookings
                </dt>
                <dd className="mt-2 text-2xl font-semibold text-slate-900">
                  {staffPerformanceMock.completedBookings}
                </dd>
              </div>
              <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4 sm:p-5">
                <dt className="text-sm font-medium text-slate-500">
                  Cancelled Bookings
                </dt>
                <dd className="mt-2 text-2xl font-semibold text-slate-900">
                  {staffPerformanceMock.cancelledBookings}
                </dd>
              </div>
              <div className="rounded-xl border border-blue-100 bg-blue-50/60 p-4 sm:p-5">
                <dt className="text-sm font-medium text-blue-700">
                  Performance Summary
                </dt>
                <dd className="mt-2 text-sm leading-6 text-slate-700">
                  {staffPerformanceMock.summary}
                </dd>
              </div>
            </dl>
          </section>

          <section
            aria-labelledby="salary-information-heading"
            className="mt-6 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-7"
          >
            <div className="mb-6 border-b border-slate-100 pb-5">
              <h2
                className="text-lg font-semibold text-slate-900"
                id="salary-information-heading"
              >
                Salary Information
              </h2>
              <p className="mt-1 text-sm text-amber-700">
                Dummy payroll data only — no payment system is connected.
              </p>
            </div>
            <dl className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3">
              <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4 sm:p-5">
                <dt className="text-sm font-medium text-slate-500">
                  Monthly Salary
                </dt>
                <dd className="mt-2 text-base font-semibold text-slate-900">
                  {moneyFormatter.format(staffSalaryMock.monthlySalary)}
                </dd>
              </div>
              <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4 sm:p-5">
                <dt className="text-sm font-medium text-slate-500">
                  Salary Type
                </dt>
                <dd className="mt-2 text-base font-semibold text-slate-900">
                  {staffSalaryMock.salaryType}
                </dd>
              </div>
              <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4 sm:p-5">
                <dt className="text-sm font-medium text-slate-500">
                  Last Payment Date
                </dt>
                <dd className="mt-2 text-base font-semibold text-slate-900">
                  {formatDate(staffSalaryMock.lastPaymentDate)}
                </dd>
              </div>
              <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4 sm:p-5">
                <dt className="text-sm font-medium text-slate-500">
                  Next Payment Date
                </dt>
                <dd className="mt-2 text-base font-semibold text-slate-900">
                  {formatDate(staffSalaryMock.nextPaymentDate)}
                </dd>
              </div>
              <div className="rounded-xl border border-slate-100 bg-slate-50/60 p-4 sm:p-5">
                <dt className="text-sm font-medium text-slate-500">
                  Payment Status
                </dt>
                <dd className="mt-2 text-base font-semibold text-slate-900">
                  {staffSalaryMock.paymentStatus}
                </dd>
              </div>
            </dl>
          </section>
        </>
      )}

      {isEditing && (
        <UserFormDialog
          initialUser={user}
          onCancel={() => setIsEditing(false)}
          onSave={saveUser}
        />
      )}
    </>
  );
}
