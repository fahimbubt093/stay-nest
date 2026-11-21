import type { PaymentStatus } from "@/src/components/payments/payment-data";

type PaymentStatusBadgeProps = {
  status: PaymentStatus;
};

const statusStyles: Record<PaymentStatus, string> = {
  Completed: "bg-emerald-50 text-emerald-700 ring-emerald-600/20",
  Pending: "bg-amber-50 text-amber-700 ring-amber-600/20",
  Failed: "bg-rose-50 text-rose-700 ring-rose-600/20",
};

export function PaymentStatusBadge({ status }: PaymentStatusBadgeProps) {
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
