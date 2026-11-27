import type { ReactNode } from "react";
import { CustomerProvider } from "@/components/customers/CustomerProvider";

export default function CustomersLayout({ children }: { children: ReactNode }) {
  return <CustomerProvider>{children}</CustomerProvider>;
}
