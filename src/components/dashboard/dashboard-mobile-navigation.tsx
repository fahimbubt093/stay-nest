"use client";

import { useState } from "react";
import { DashboardNavigation } from "@/src/components/dashboard/dashboard-navigation";

export function DashboardMobileNavigation() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="mb-6 flex items-center justify-between md:hidden">
      <h1 className="text-xl font-bold tracking-tight text-slate-900">
        Hotel<span className="text-blue-600">Pro</span>
      </h1>

      <button
        aria-controls="mobile-dashboard-navigation"
        aria-expanded={isOpen}
        aria-label={isOpen ? "Close navigation menu" : "Open navigation menu"}
        className="relative z-50 flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl bg-slate-900 text-white"
        onClick={() => setIsOpen((open) => !open)}
        type="button"
      >
        <span className="flex flex-col gap-1" aria-hidden="true">
          <span
            className={`h-0.5 w-5 bg-white transition-transform ${
              isOpen ? "translate-y-1.5 rotate-45" : ""
            }`}
          />
          <span
            className={`h-0.5 w-5 bg-white transition-opacity ${
              isOpen ? "opacity-0" : ""
            }`}
          />
          <span
            className={`h-0.5 w-5 bg-white transition-transform ${
              isOpen ? "-translate-y-1.5 -rotate-45" : ""
            }`}
          />
        </span>
      </button>

      {isOpen && (
        <>
          <button
            aria-label="Close navigation menu"
            className="fixed inset-0 z-30 cursor-default bg-slate-950/40"
            onClick={() => setIsOpen(false)}
            type="button"
          />
          <aside
            className="fixed inset-y-0 left-0 z-40 w-64 bg-slate-950 p-6 pt-16 text-white shadow-2xl"
            id="mobile-dashboard-navigation"
          >
            <DashboardNavigation onNavigate={() => setIsOpen(false)} />
          </aside>
        </>
      )}
    </div>
  );
}
