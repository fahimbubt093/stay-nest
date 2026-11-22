import {
  sampleRoomAvailability,
  type RoomAvailabilityData,
} from "@/components/dashboard/room-availability-data";

type RoomAvailabilityProps = {
  availability?: RoomAvailabilityData;
};

const statuses = [
  {
    key: "available",
    label: "Available",
    iconStyle: "bg-emerald-50 text-emerald-600",
    barStyle: "bg-emerald-500",
    icon: (
      <svg
        aria-hidden="true"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="m5 12 4 4L19 6"
        />
      </svg>
    ),
  },
  {
    key: "booked",
    label: "Booked",
    iconStyle: "bg-blue-50 text-blue-600",
    barStyle: "bg-blue-500",
    icon: (
      <svg
        aria-hidden="true"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M4 20V5a2 2 0 0 1 2-2h12a2 2 0 0 1 2 2v15M3 20h18M9 8h6M9 12h6"
        />
      </svg>
    ),
  },
  {
    key: "maintenance",
    label: "Maintenance",
    iconStyle: "bg-amber-50 text-amber-600",
    barStyle: "bg-amber-500",
    icon: (
      <svg
        aria-hidden="true"
        className="h-5 w-5"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
        strokeWidth="1.8"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          d="M14.7 6.3a4 4 0 0 0-5.4 5.4L4 17v3h3l5.3-5.3a4 4 0 0 0 5.4-5.4L15 12l-3-3 2.7-2.7Z"
        />
      </svg>
    ),
  },
] as const;

export function RoomAvailability({
  availability = sampleRoomAvailability,
}: RoomAvailabilityProps) {
  const totalRooms =
    availability.available + availability.booked + availability.maintenance;

  return (
    <section
      aria-labelledby="room-availability-heading"
      className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6"
    >
      <div className="mb-6">
        <h2
          className="text-lg font-semibold text-slate-900"
          id="room-availability-heading"
        >
          Room Availability
        </h2>
        <p className="mt-1 text-sm text-slate-500">
          Current status across your property
        </p>
      </div>

      <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
        {statuses.map((status) => {
          const count = availability[status.key];
          const percentage =
            totalRooms > 0 ? Math.round((count / totalRooms) * 100) : 0;

          return (
            <article
              className="rounded-xl border border-slate-100 bg-slate-50/60 p-4 sm:p-5"
              key={status.key}
            >
              <div className="mb-4 flex items-center justify-between gap-3">
                <div className="flex min-w-0 items-center gap-3">
                  <span
                    className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-xl ${status.iconStyle}`}
                  >
                    {status.icon}
                  </span>
                  <h3 className="truncate text-sm font-medium text-slate-600">
                    {status.label}
                  </h3>
                </div>
                <span className="text-2xl font-bold tracking-tight text-slate-900">
                  {count}
                </span>
              </div>
              <div
                aria-label={`${status.label} rooms`}
                aria-valuemax={100}
                aria-valuemin={0}
                aria-valuenow={percentage}
                className="h-2 overflow-hidden rounded-full bg-slate-200"
                role="progressbar"
              >
                <div
                  className={`h-full rounded-full transition-[width] duration-300 ${status.barStyle}`}
                  style={{ width: `${percentage}%` }}
                />
              </div>
              <p className="mt-2 text-xs text-slate-500">
                {percentage}% of rooms
              </p>
            </article>
          );
        })}
      </div>
    </section>
  );
}
