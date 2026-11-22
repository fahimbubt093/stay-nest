import {
  formatReportCurrency,
  type MonthlyRevenue,
} from "@/components/reports/report-data";

type MonthlyRevenueChartProps = {
  monthlyRevenue: MonthlyRevenue[];
};

const compactCurrencyFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
  notation: "compact",
  maximumFractionDigits: 0,
});

export function MonthlyRevenueChart({
  monthlyRevenue,
}: MonthlyRevenueChartProps) {
  const maximumRevenue = Math.max(
    1,
    ...monthlyRevenue.map((month) => month.revenue),
  );

  return (
    <section className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
      <div className="border-b border-slate-100 p-5 sm:p-6">
        <h2 className="text-lg font-semibold text-slate-900">
          Monthly Revenue
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Revenue by month for the selected date range.
        </p>
      </div>

      {monthlyRevenue.length > 0 ? (
        <div
          aria-label={`Monthly revenue chart: ${monthlyRevenue
            .map(
              (month) =>
                `${month.label} ${formatReportCurrency(month.revenue)}`,
            )
            .join(", ")}`}
          className="overflow-x-auto p-5 sm:p-6"
          role="img"
        >
          <div className="grid min-w-[660px] grid-flow-col auto-cols-fr items-end gap-3 border-b border-slate-200 pb-2 sm:gap-4">
            {monthlyRevenue.map((month) => {
              const height = Math.max(
                month.revenue > 0 ? 5 : 0,
                (month.revenue / maximumRevenue) * 100,
              );

              return (
                <div
                  className="flex h-56 min-w-0 flex-col items-center justify-end gap-2"
                  key={month.month}
                  title={`${month.label}: ${formatReportCurrency(month.revenue)}`}
                >
                  <span className="h-4 text-[10px] font-medium text-slate-500">
                    {compactCurrencyFormatter.format(month.revenue)}
                  </span>
                  <div className="flex h-40 w-full items-end rounded-t-lg bg-blue-50">
                    <div
                      className="w-full rounded-t-lg bg-blue-500 transition-[height]"
                      style={{ height: `${height}%` }}
                    />
                  </div>
                  <span className="text-xs font-medium text-slate-500">
                    {month.label}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      ) : (
        <p className="p-8 text-center text-sm text-slate-500">
          No revenue data is available for this date range.
        </p>
      )}
    </section>
  );
}
