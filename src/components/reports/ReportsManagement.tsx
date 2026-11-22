"use client";

import { useMemo, useState } from "react";
import { BookingStatusStats } from "@/components/reports/BookingStatusStats";
import { DateRangeFilter } from "@/components/reports/DateRangeFilter";
import { MonthlyRevenueChart } from "@/components/reports/MonthlyRevenueChart";
import { ReportStatCards } from "@/components/reports/ReportStatCards";
import {
  bookingReportEntries,
  bookingStatuses,
  occupancySnapshots,
  reportEndDate,
  reportStartDate,
  revenueEntries,
} from "@/components/reports/report-data";

export function ReportsManagement() {
  const [startDate, setStartDate] = useState(reportStartDate);
  const [endDate, setEndDate] = useState(reportEndDate);

  const report = useMemo(() => {
    const isValidRange = !startDate || !endDate || startDate <= endDate;
    const isWithinRange = (date: string) =>
      isValidRange &&
      (!startDate || date >= startDate) &&
      (!endDate || date <= endDate);

    const selectedRevenue = revenueEntries.filter((entry) =>
      isWithinRange(entry.date),
    );
    const selectedBookings = bookingReportEntries.filter((booking) =>
      isWithinRange(booking.date),
    );
    const selectedOccupancy = occupancySnapshots.filter((snapshot) =>
      isWithinRange(snapshot.date),
    );
    const revenueByMonth = new Map<string, number>();

    for (const entry of selectedRevenue) {
      const month = entry.date.slice(0, 7);
      revenueByMonth.set(
        month,
        (revenueByMonth.get(month) ?? 0) + entry.amount,
      );
    }

    const monthlyRevenue = Array.from(revenueByMonth.entries())
      .sort(([firstMonth], [secondMonth]) =>
        firstMonth.localeCompare(secondMonth),
      )
      .map(([month, revenue]) => ({
        month,
        label: new Intl.DateTimeFormat("en-US", {
          month: "short",
          timeZone: "UTC",
        }).format(new Date(`${month}-01T00:00:00Z`)),
        revenue,
      }));

    const bookingStatusCounts = bookingStatuses.map((status) => ({
      status,
      count: selectedBookings.filter((booking) => booking.status === status)
        .length,
    }));
    const occupiedRooms = selectedOccupancy.reduce(
      (total, snapshot) => total + snapshot.occupiedRooms,
      0,
    );
    const availableRooms = selectedOccupancy.reduce(
      (total, snapshot) => total + snapshot.totalRooms,
      0,
    );

    return {
      totalRevenue: selectedRevenue.reduce(
        (total, entry) => total + entry.amount,
        0,
      ),
      totalBookings: selectedBookings.length,
      occupancyRate:
        availableRooms > 0 ? (occupiedRooms / availableRooms) * 100 : 0,
      monthlyRevenue,
      bookingStatusCounts,
      isValidRange,
    };
  }, [startDate, endDate]);

  return (
    <>
      <header className="mb-8 sm:mb-10">
        <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
          Hotel operations
        </p>
        <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
          Reports &amp; Analytics
        </h1>
        <p className="mt-2 text-sm text-slate-500 sm:text-base">
          Track revenue, bookings, and room occupancy.
        </p>
      </header>

      <DateRangeFilter
        endDate={endDate}
        onEndDateChange={setEndDate}
        onReset={() => {
          setStartDate(reportStartDate);
          setEndDate(reportEndDate);
        }}
        onStartDateChange={setStartDate}
        startDate={startDate}
      />

      {!report.isValidRange && (
        <p className="mb-5 rounded-xl border border-rose-200 bg-rose-50 px-4 py-3 text-sm text-rose-700">
          The end date must be on or after the start date.
        </p>
      )}

      <ReportStatCards
        occupancyRate={report.occupancyRate}
        totalBookings={report.totalBookings}
        totalRevenue={report.totalRevenue}
      />

      <div className="grid grid-cols-1 gap-6 xl:grid-cols-[minmax(0,1.7fr)_minmax(18rem,1fr)]">
        <MonthlyRevenueChart monthlyRevenue={report.monthlyRevenue} />
        <BookingStatusStats bookingStatusCounts={report.bookingStatusCounts} />
      </div>
    </>
  );
}
