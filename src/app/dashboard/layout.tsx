import type { ReactNode } from "react";
import { ProtectedDashboard } from "@/components/auth/ProtectedDashboard";

export default function FrontendLayout({
  children,
}: {
  children: ReactNode;
}) {
  return <ProtectedDashboard>{children}</ProtectedDashboard>;
}
