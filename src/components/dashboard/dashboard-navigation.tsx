"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

const navigationItems = [
  { label: "Dashboard", href: "/frontend" },
  { label: "Rooms", href: "/frontend/rooms" },
  { label: "Bookings", href: "/frontend/bookings" },
  { label: "Customers", href: "/frontend/customers" },
  { label: "Payments", href: "/frontend/payments" },
  { label: "Reports", href: "/frontend/reports" },
  { label: "Settings", href: "/frontend/settings" },
];

type DashboardNavigationProps = {
  onNavigate?: () => void;
};

export function DashboardNavigation({
  onNavigate,
}: DashboardNavigationProps) {
  const pathname = usePathname();

  return (
    <nav aria-label="Main navigation" className="space-y-1.5">
      {navigationItems.map((item) => {
        const isActive =
          pathname === item.href ||
          (item.href !== "/" && pathname.startsWith(`${item.href}/`));

        return (
          <Link
            aria-current={isActive ? "page" : undefined}
            className={
              isActive
                ? "block rounded-xl bg-blue-600 px-4 py-3 text-sm font-medium text-white shadow-sm shadow-blue-950/30"
                : "block rounded-xl px-4 py-3 text-sm text-slate-300 transition hover:bg-slate-800 hover:text-white"
            }
            href={item.href}
            key={item.href}
            onClick={onNavigate}
          >
            {item.label}
          </Link>
        );
      })}
    </nav>
  );
}
