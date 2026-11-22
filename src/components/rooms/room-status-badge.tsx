import type { RoomStatus } from "@/components/rooms/room-data";

type RoomStatusBadgeProps = {
  status: RoomStatus;
};

const statusStyles: Record<RoomStatus, string> = {
  Available: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  Booked: "bg-blue-50 text-blue-700 ring-blue-600/20",
  Maintenance: "bg-amber-50 text-amber-700 ring-amber-600/20",
};

export function RoomStatusBadge({ status }: RoomStatusBadgeProps) {
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ring-1 ring-inset ${statusStyles[status]}`}
    >
      <span
        aria-hidden="true"
        className="h-1.5 w-1.5 rounded-full bg-current"
      />
      {status}
    </span>
  );
}
