import type { ReactNode } from "react";
import { BookingProvider } from "@/src/components/bookings/BookingProvider";

export default function BookingsLayout({ children }: { children: ReactNode }) {
  return <BookingProvider>{children}</BookingProvider>;
}
