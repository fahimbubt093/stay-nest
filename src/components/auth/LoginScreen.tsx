"use client";

import { useEffect, useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/AuthProvider";
import { AuthError, DEFAULT_ADMIN_CREDENTIALS } from "@/lib/auth/auth-service";

const fieldClassName =
  "mt-1.5 h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10";
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

export function LoginScreen() {
  const { status, error: sessionError, login, reload } = useAuth();
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [formError, setFormError] = useState("");
  const [fieldError, setFieldError] = useState("");

  useEffect(() => {
    if (status === "authenticated") {
      router.replace("/frontend");
    }
  }, [router, status]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");
    setFieldError("");

    const normalizedEmail = email.trim();
    if (!emailPattern.test(normalizedEmail) || !password) {
      setFieldError("Enter a valid email address and password.");
      return;
    }

    setIsSubmitting(true);
    try {
      await login(normalizedEmail, password);
      router.replace("/frontend");
    } catch (loginError) {
      setFormError(
        loginError instanceof AuthError &&
          loginError.code === "invalid_credentials"
          ? "The email or password you entered is incorrect."
          : loginError instanceof Error
            ? loginError.message
            : "Login could not be completed. Try again.",
      );
    } finally {
      setIsSubmitting(false);
    }
  }

  if (status === "loading" || status === "authenticated") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 p-4 text-sm text-slate-500">
        <p role="status">
          {status === "authenticated"
            ? "Opening your dashboard…"
            : "Checking your demo session…"}
        </p>
      </main>
    );
  }

  if (status === "error") {
    return (
      <main className="flex min-h-screen items-center justify-center bg-slate-50 p-4">
        <section className="w-full max-w-md rounded-2xl border border-slate-100 bg-white p-6 shadow-sm sm:p-8">
          <h1 className="text-lg font-semibold text-slate-900">
            Demo sign-in is unavailable
          </h1>
          <p className="mt-2 text-sm leading-6 text-rose-700" role="alert">
            {sessionError}
          </p>
          <button
            className="mt-5 min-h-11 rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            onClick={() => void reload()}
            type="button"
          >
            Try again
          </button>
        </section>
      </main>
    );
  }

  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 px-4 py-10 text-slate-900">
      <div className="w-full max-w-md">
        <div className="mb-6 text-center">
          <p className="text-2xl font-bold tracking-tight">
            Hotel<span className="text-blue-600">Pro</span>
          </p>
          <p className="mt-2 text-sm text-slate-500">
            Sign in to your hotel workspace
          </p>
        </div>

        <section className="rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-8">
          <div className="mb-6">
            <h1 className="text-xl font-semibold text-slate-900">
              Welcome back
            </h1>
            <p className="mt-1.5 text-sm text-slate-500">
              Enter your demo account details to continue.
            </p>
          </div>

          <form noValidate onSubmit={handleSubmit}>
            <div className="space-y-4">
              <div>
                <label
                  className="text-sm font-medium text-slate-700"
                  htmlFor="login-email"
                >
                  Email
                </label>
                <input
                  autoComplete="username"
                  className={fieldClassName}
                  id="login-email"
                  onChange={(event) => {
                    setEmail(event.target.value);
                    setFieldError("");
                  }}
                  placeholder="name@example.com"
                  required
                  type="email"
                  value={email}
                />
              </div>

              <div>
                <label
                  className="text-sm font-medium text-slate-700"
                  htmlFor="login-password"
                >
                  Password
                </label>
                <div className="relative">
                  <input
                    autoComplete="current-password"
                    className={`${fieldClassName} pr-16`}
                    id="login-password"
                    onChange={(event) => {
                      setPassword(event.target.value);
                      setFieldError("");
                    }}
                    required
                    type={showPassword ? "text" : "password"}
                    value={password}
                  />
                  <button
                    aria-label={showPassword ? "Hide password" : "Show password"}
                    className="absolute inset-y-0 right-3 my-auto h-8 rounded-md px-2 text-xs font-semibold text-blue-700 hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                    onClick={() => setShowPassword((visible) => !visible)}
                    type="button"
                  >
                    {showPassword ? "Hide" : "Show"}
                  </button>
                </div>
              </div>
            </div>

            {(fieldError || formError) && (
              <p className="mt-4 text-sm text-rose-700" role="alert">
                {fieldError || formError}
              </p>
            )}

            <button
              className="mt-6 inline-flex min-h-11 w-full items-center justify-center rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white shadow-sm shadow-blue-900/15 transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isSubmitting}
              type="submit"
            >
              {isSubmitting ? "Signing in…" : "Sign in"}
            </button>
          </form>

          <aside className="mt-6 rounded-xl border border-blue-100 bg-blue-50/70 p-4">
            <h2 className="text-sm font-semibold text-slate-800">
              Demo access
            </h2>
            <dl className="mt-2 space-y-1 text-sm text-slate-600">
              <div className="flex flex-wrap gap-1">
                <dt className="font-medium">Email:</dt>
                <dd>{DEFAULT_ADMIN_CREDENTIALS.email}</dd>
              </div>
              <div className="flex flex-wrap gap-1">
                <dt className="font-medium">Password:</dt>
                <dd>{DEFAULT_ADMIN_CREDENTIALS.password}</dd>
              </div>
            </dl>
          </aside>
        </section>

        <p className="mt-4 text-center text-xs leading-5 text-slate-500">
          Demo-only authentication. Accounts and sessions are stored in this
          browser and are not suitable for production security.
        </p>
      </div>
    </main>
  );
}
