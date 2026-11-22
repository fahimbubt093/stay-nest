import { Suspense } from "react";
import Link from "next/link";
import { DateDisplay } from "@/components/dashboard/date-display";

export function DashboardHeader() {
  return (
    <header className="mb-8 flex flex-col gap-5 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
      <div>
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
          Dashboard overview
        </p>
        <h2 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Welcome back
        </h2>
        <p className="mt-2 text-sm text-slate-500 sm:text-base">
          Here&apos;s what&apos;s happening at your hotel today.
        </p>
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
        <div className="flex min-h-11 items-center gap-2.5 rounded-xl border border-slate-200 bg-white px-4 text-sm font-medium text-slate-600 shadow-sm">
          <svg
            aria-hidden="true"
            className="h-4 w-4 text-slate-400"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth="1.8"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8 2v4m8-4v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14H3V6a2 2 0 0 1 2-2Z"
            />
          </svg>
          <Suspense fallback={<span>Today</span>}>
            <DateDisplay />
          </Suspense>
        </div>
        <Link
          href="/frontend/bookings"
          className="inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white shadow-sm shadow-blue-900/15 transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 sm:w-auto"
        >
          + New Booking
        </Link>
      </div>
    </header>
  );
}
