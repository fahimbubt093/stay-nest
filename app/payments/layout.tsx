import type { ReactNode } from "react";
import { PaymentProvider } from "@/src/components/payments/PaymentProvider";

export default function PaymentsLayout({ children }: { children: ReactNode }) {
  return <PaymentProvider>{children}</PaymentProvider>;
}
