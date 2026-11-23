"use client";

import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useState } from "react";
import { useAuth } from "@/components/auth/AuthProvider";

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
  const router = useRouter();
  const { user, logout } = useAuth();
  const [logoutError, setLogoutError] = useState("");
  const visibleNavigationItems =
    user?.role === "Admin"
      ? [
          ...navigationItems,
          { label: "Users", href: "/frontend/users" },
        ]
      : navigationItems;

  async function handleLogout() {
    setLogoutError("");
    try {
      await logout();
      onNavigate?.();
      router.replace("/login");
    } catch (error) {
      setLogoutError(
        error instanceof Error
          ? error.message
          : "You could not be signed out. Try again.",
      );
    }
  }

  return (
    <nav aria-label="Main navigation">
      <div className="space-y-1.5">
        {visibleNavigationItems.map((item) => {
          const isActive =
            pathname === item.href || pathname.startsWith(`${item.href}/`);

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
      </div>

      <div className="mt-8 border-t border-slate-800 pt-5">
        <p className="truncate px-3 text-sm font-semibold text-white">
          {user?.fullName}
        </p>
        <p className="truncate px-3 pt-1 text-xs text-slate-400">
          {user?.role}
        </p>
        {logoutError && (
          <p className="mt-3 px-3 text-xs leading-5 text-rose-300" role="alert">
            {logoutError}
          </p>
        )}
        <button
          className="mt-3 w-full rounded-xl px-4 py-3 text-left text-sm font-medium text-slate-300 transition hover:bg-slate-800 hover:text-white focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-400"
          onClick={() => void handleLogout()}
          type="button"
        >
          Log out
        </button>
      </div>
    </nav>
  );
}
