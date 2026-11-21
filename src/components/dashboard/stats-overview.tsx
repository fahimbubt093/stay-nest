import { StatCard } from "@/src/components/dashboard/stat-card";

const stats = [
  {
    title: "Total Rooms",
    value: 50,
    icon: (
      <svg
        aria-hidden="true"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.7"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M3 20v-8a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2v8M3 16h18M7 10V7a2 2 0 0 1 2-2h6a2 2 0 0 1 2 2v3M5 20v-4m14 4v-4"
        />
      </svg>
    ),
    iconStyle: "bg-blue-50 text-blue-600",
  },
  {
    title: "Available Rooms",
    value: 32,
    icon: (
      <svg
        aria-hidden="true"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.7"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 20V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v15M3 20h18M9 8h6M9 12h6"
        />
        <path strokeLinecap="round" strokeLinejoin="round" d="m9 16 2 2 4-4" />
      </svg>
    ),
    iconStyle: "bg-emerald-50 text-emerald-600",
  },
  {
    title: "Booked Rooms",
    value: 18,
    icon: (
      <svg
        aria-hidden="true"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.7"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 20V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v15M3 20h18M9 8h6M9 12h6"
        />
        <path strokeLinecap="round" strokeLinejoin="round" d="M10 16h4" />
      </svg>
    ),
    iconStyle: "bg-violet-50 text-violet-600",
  },
  {
    title: "Total Customers",
    value: 120,
    icon: (
      <svg
        aria-hidden="true"
        className="h-6 w-6"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.7"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M16 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2m8-13a4 4 0 1 1-8 0 4 4 0 0 1 8 0Zm4 2a4 4 0 0 1 0 8m2 3v-2a4 4 0 0 0-3-3.87"
        />
      </svg>
    ),
    iconStyle: "bg-amber-50 text-amber-600",
  },
];

export function StatsOverview() {
  return (
    <section aria-label="Hotel statistics">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-base font-semibold text-slate-800">At a glance</h3>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((stat) => (
          <StatCard key={stat.title} {...stat} />
        ))}
      </div>
    </section>
  );
}
