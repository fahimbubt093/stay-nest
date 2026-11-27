type DateRangeFilterProps = {
  startDate: string;
  endDate: string;
  onStartDateChange: (date: string) => void;
  onEndDateChange: (date: string) => void;
  onReset: () => void;
  heading?: string;
  description?: string;
  headingId?: string;
};

const fieldClassName =
  "mt-1.5 h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-900 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10";

export function DateRangeFilter({
  startDate,
  endDate,
  onStartDateChange,
  onEndDateChange,
  onReset,
  heading = "Date Range",
  description = "Filter report metrics by booking and revenue dates.",
  headingId = "report-date-range-heading",
}: DateRangeFilterProps) {
  return (
    <section
      aria-labelledby={headingId}
      className="mb-6 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <h2
            className="text-base font-semibold text-slate-900"
            id={headingId}
          >
            {heading}
          </h2>
          <p className="mt-1 text-sm text-slate-500">
            {description}
          </p>
        </div>
        <div className="grid grid-cols-1 gap-3 lg:grid-cols-[minmax(10rem,1fr)_minmax(10rem,1fr)_auto] lg:items-end">
          <label className="text-sm font-medium text-slate-700">
            From
            <input
              className={fieldClassName}
              max={endDate || undefined}
              onChange={(event) => onStartDateChange(event.target.value)}
              type="date"
              value={startDate}
            />
          </label>
          <label className="text-sm font-medium text-slate-700">
            To
            <input
              className={fieldClassName}
              min={startDate || undefined}
              onChange={(event) => onEndDateChange(event.target.value)}
              type="date"
              value={endDate}
            />
          </label>
          <button
            className="min-h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            onClick={onReset}
            type="button"
          >
            Reset Range
          </button>
        </div>
      </div>
    </section>
  );
}
