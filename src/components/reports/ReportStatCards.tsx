import { formatReportCurrency } from "@/components/reports/report-data";

type ReportStatCardsProps = {
  totalRevenue: number;
  totalBookings: number;
  occupancyRate: number;
};

export function ReportStatCards({
  totalRevenue,
  totalBookings,
  occupancyRate,
}: ReportStatCardsProps) {
  const cards = [
    {
      label: "Total Revenue",
      value: formatReportCurrency(totalRevenue),
      description: "For selected date range",
      icon: "M12 2v20m5-15.5C17 4.6 14.8 3.5 12 3.5s-5 1.3-5 3.5 2.2 3.3 5 3.8 5 1.7 5 4-2.2 3.7-5 3.7-5-1.1-5-3",
      iconStyle: "bg-emerald-50 text-emerald-600",
    },
    {
      label: "Total Bookings",
      value: totalBookings.toLocaleString("en-US"),
      description: "Created during selected dates",
      icon: "M8 2v4m8-4v4M3 10h18M5 4h14a2 2 0 0 1 2 2v14H3V6a2 2 0 0 1 2-2Z",
      iconStyle: "bg-blue-50 text-blue-600",
    },
    {
      label: "Occupancy Rate",
      value: `${occupancyRate.toFixed(1)}%`,
      description: "Average for selected dates",
      icon: "M3 20h18M5 16l4-5 4 3 6-8",
      iconStyle: "bg-violet-50 text-violet-600",
    },
  ];

  return (
    <section
      aria-label="Key performance indicators"
      className="mb-6 grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-3"
    >
      {cards.map((card) => (
        <article
          className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6"
          key={card.label}
        >
          <div className="flex items-start justify-between gap-4">
            <div>
              <p className="text-sm font-medium text-slate-500">{card.label}</p>
              <p className="mt-2 text-2xl font-bold tracking-tight text-slate-900">
                {card.value}
              </p>
              <p className="mt-1 text-xs text-slate-500">{card.description}</p>
            </div>
            <span
              aria-hidden="true"
              className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${card.iconStyle}`}
            >
              <svg
                className="h-5 w-5"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                strokeWidth="1.8"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d={card.icon}
                />
              </svg>
            </span>
          </div>
        </article>
      ))}
    </section>
  );
}
