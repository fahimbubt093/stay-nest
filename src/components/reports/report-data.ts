import type { BookingStatus } from "@/src/components/bookings/booking-data";

export type RevenueEntry = {
  date: string;
  amount: number;
};

export type BookingReportEntry = {
  id: string;
  date: string;
  status: BookingStatus;
};

export type OccupancySnapshot = {
  date: string;
  occupiedRooms: number;
  totalRooms: number;
};

export type MonthlyRevenue = {
  month: string;
  label: string;
  revenue: number;
};

export type BookingStatusCount = {
  status: BookingStatus;
  count: number;
};

export const reportStartDate = "2026-01-01";
export const reportEndDate = "2026-11-22";

const reportCurrencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  maximumFractionDigits: 0,
});

export function formatReportCurrency(amount: number) {
  return reportCurrencyFormatter.format(amount);
}

export const revenueEntries: RevenueEntry[] = [
  { date: "2026-01-05", amount: 12600 },
  { date: "2026-01-20", amount: 13500 },
  { date: "2026-02-05", amount: 13200 },
  { date: "2026-02-20", amount: 12800 },
  { date: "2026-03-05", amount: 14100 },
  { date: "2026-03-20", amount: 13900 },
  { date: "2026-04-05", amount: 15100 },
  { date: "2026-04-20", amount: 15500 },
  { date: "2026-05-05", amount: 16200 },
  { date: "2026-05-20", amount: 16500 },
  { date: "2026-06-05", amount: 17800 },
  { date: "2026-06-20", amount: 18000 },
  { date: "2026-07-05", amount: 18700 },
  { date: "2026-07-20", amount: 19000 },
  { date: "2026-08-05", amount: 19800 },
  { date: "2026-08-20", amount: 20200 },
  { date: "2026-09-05", amount: 21400 },
  { date: "2026-09-20", amount: 21800 },
  { date: "2026-10-05", amount: 22000 },
  { date: "2026-10-20", amount: 22500 },
  { date: "2026-11-05", amount: 23100 },
  { date: "2026-11-20", amount: 23700 },
];

export const bookingReportEntries: BookingReportEntry[] = [
  { id: "RPT-BK-001", date: "2026-01-05", status: "Confirmed" },
  { id: "RPT-BK-002", date: "2026-01-20", status: "Pending" },
  { id: "RPT-BK-003", date: "2026-02-05", status: "Confirmed" },
  { id: "RPT-BK-004", date: "2026-02-20", status: "Confirmed" },
  { id: "RPT-BK-005", date: "2026-03-05", status: "Pending" },
  { id: "RPT-BK-006", date: "2026-03-20", status: "Cancelled" },
  { id: "RPT-BK-007", date: "2026-04-05", status: "Confirmed" },
  { id: "RPT-BK-008", date: "2026-04-20", status: "Pending" },
  { id: "RPT-BK-009", date: "2026-05-05", status: "Confirmed" },
  { id: "RPT-BK-010", date: "2026-05-20", status: "Confirmed" },
  { id: "RPT-BK-011", date: "2026-06-05", status: "Pending" },
  { id: "RPT-BK-012", date: "2026-06-20", status: "Confirmed" },
  { id: "RPT-BK-013", date: "2026-07-05", status: "Cancelled" },
  { id: "RPT-BK-014", date: "2026-07-20", status: "Confirmed" },
  { id: "RPT-BK-015", date: "2026-08-05", status: "Confirmed" },
  { id: "RPT-BK-016", date: "2026-08-20", status: "Pending" },
  { id: "RPT-BK-017", date: "2026-09-05", status: "Confirmed" },
  { id: "RPT-BK-018", date: "2026-09-20", status: "Pending" },
  { id: "RPT-BK-019", date: "2026-10-05", status: "Confirmed" },
  { id: "RPT-BK-020", date: "2026-10-20", status: "Confirmed" },
  { id: "RPT-BK-021", date: "2026-11-05", status: "Pending" },
  { id: "RPT-BK-022", date: "2026-11-20", status: "Confirmed" },
];

export const occupancySnapshots: OccupancySnapshot[] = [
  { date: "2026-01-15", occupiedRooms: 42, totalRooms: 60 },
  { date: "2026-02-15", occupiedRooms: 44, totalRooms: 60 },
  { date: "2026-03-15", occupiedRooms: 47, totalRooms: 60 },
  { date: "2026-04-15", occupiedRooms: 49, totalRooms: 60 },
  { date: "2026-05-15", occupiedRooms: 52, totalRooms: 60 },
  { date: "2026-06-15", occupiedRooms: 54, totalRooms: 60 },
  { date: "2026-07-15", occupiedRooms: 55, totalRooms: 60 },
  { date: "2026-08-15", occupiedRooms: 53, totalRooms: 60 },
  { date: "2026-09-15", occupiedRooms: 56, totalRooms: 60 },
  { date: "2026-10-15", occupiedRooms: 57, totalRooms: 60 },
  { date: "2026-11-15", occupiedRooms: 58, totalRooms: 60 },
];

export const bookingStatuses: BookingStatus[] = [
  "Confirmed",
  "Pending",
  "Cancelled",
];
