"use client";

import { useEffect, type ReactNode } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/AuthProvider";

function AuthMessage({
  children,
  action,
}: {
  children: ReactNode;
  action?: ReactNode;
}) {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-4 text-slate-900">
      <section className="w-full max-w-md rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm sm:p-8">
        <p className="text-xl font-bold tracking-tight">
          Hotel<span className="text-blue-600">Pro</span>
        </p>
        <div className="mt-5 text-sm leading-6 text-slate-600">{children}</div>
        {action && <div className="mt-5">{action}</div>}
      </section>
    </main>
  );
}

export function ProtectedDashboard({ children }: { children: ReactNode }) {
  const { status, error, reload } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (status === "unauthenticated") {
      router.replace("/login");
    }
  }, [router, status]);

  if (status === "error") {
    return (
      <AuthMessage
        action={
          <button
            className="min-h-11 rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            onClick={() => void reload()}
            type="button"
          >
            Try again
          </button>
        }
      >
        {error ?? "The demo session could not be checked."}
      </AuthMessage>
    );
  }

  if (status !== "authenticated") {
    return (
      <AuthMessage>
        <p role="status">Checking your demo session…</p>
      </AuthMessage>
    );
  }

  return children;
}
