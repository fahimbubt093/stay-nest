"use client";

import { useState, type FormEvent } from "react";
import type {
  AuthUser,
  UpdatedDemoUser,
  UserRole,
} from "@/lib/auth/types";

type UserFormDialogProps = {
  initialUser?: AuthUser;
  onCancel: () => void;
  onSave: (user: UpdatedDemoUser) => Promise<void>;
};

const fieldClassName =
  "mt-1.5 h-11 w-full rounded-xl border border-slate-200 bg-white px-3.5 text-sm text-slate-900 outline-none transition placeholder:text-slate-400 focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10";
const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const roles: UserRole[] = ["Admin", "Staff"];

export function UserFormDialog({
  initialUser,
  onCancel,
  onSave,
}: UserFormDialogProps) {
  const [fullName, setFullName] = useState(initialUser?.fullName ?? "");
  const [email, setEmail] = useState(initialUser?.email ?? "");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [role, setRole] = useState<UserRole>(initialUser?.role ?? "Staff");
  const [formError, setFormError] = useState("");
  const [isSaving, setIsSaving] = useState(false);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setFormError("");

    if (!fullName.trim()) {
      setFormError("Enter the user's full name.");
      return;
    }
    if (!emailPattern.test(email.trim())) {
      setFormError("Enter a valid email address.");
      return;
    }
    if (!initialUser && password.length < 8) {
      setFormError("Use a password with at least 8 characters.");
      return;
    }
    if (password || confirmPassword) {
      if (password.length < 8) {
        setFormError("Use a password with at least 8 characters.");
        return;
      }
      if (password !== confirmPassword) {
        setFormError("The password and confirmation do not match.");
        return;
      }
    }

    setIsSaving(true);
    try {
      await onSave({
        fullName: fullName.trim(),
        email: email.trim(),
        role,
        ...(password ? { password } : {}),
      });
    } catch (error) {
      setFormError(
        error instanceof Error
          ? error.message
          : "The user could not be saved. Try again.",
      );
    } finally {
      setIsSaving(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-slate-950/40 p-4">
      <section
        aria-labelledby="user-form-title"
        aria-modal="true"
        className="my-auto w-full max-w-2xl rounded-2xl border border-slate-100 bg-white p-5 shadow-xl sm:p-6"
        role="dialog"
      >
        <form noValidate onSubmit={handleSubmit}>
          <div className="mb-6">
            <h2
              className="text-lg font-semibold text-slate-900"
              id="user-form-title"
            >
              {initialUser ? "Edit User" : "Create New User"}
            </h2>
            <p className="mt-1 text-sm text-slate-500">
              {initialUser
                ? "Update this browser-only demo account."
                : "Add an Admin or Staff demo account for this browser."}
            </p>
          </div>

          <div className="grid grid-cols-1 gap-x-5 gap-y-4 sm:grid-cols-2">
            <div>
              <label
                className="text-sm font-medium text-slate-700"
                htmlFor="user-full-name"
              >
                Full Name
              </label>
              <input
                autoComplete="name"
                className={fieldClassName}
                id="user-full-name"
                onChange={(event) => setFullName(event.target.value)}
                required
                value={fullName}
              />
            </div>
            <div>
              <label
                className="text-sm font-medium text-slate-700"
                htmlFor="user-email"
              >
                Email
              </label>
              <input
                autoComplete="email"
                className={fieldClassName}
                id="user-email"
                onChange={(event) => setEmail(event.target.value)}
                required
                type="email"
                value={email}
              />
            </div>
            <div>
              <label
                className="text-sm font-medium text-slate-700"
                htmlFor="user-password"
              >
                Password{initialUser ? " (optional)" : ""}
              </label>
              <input
                autoComplete="new-password"
                className={fieldClassName}
                id="user-password"
                minLength={8}
                onChange={(event) => setPassword(event.target.value)}
                required={!initialUser}
                type="password"
                value={password}
              />
            </div>
            <div>
              <label
                className="text-sm font-medium text-slate-700"
                htmlFor="user-confirm-password"
              >
                Confirm Password{initialUser ? " (optional)" : ""}
              </label>
              <input
                autoComplete="new-password"
                className={fieldClassName}
                id="user-confirm-password"
                minLength={8}
                onChange={(event) => setConfirmPassword(event.target.value)}
                required={!initialUser}
                type="password"
                value={confirmPassword}
              />
            </div>
            <div className="sm:col-span-2">
              <label
                className="text-sm font-medium text-slate-700"
                htmlFor="user-role"
              >
                Role
              </label>
              <select
                className={fieldClassName}
                id="user-role"
                onChange={(event) => {
                  const selectedRole = roles.find(
                    (item) => item === event.target.value,
                  );
                  if (selectedRole) {
                    setRole(selectedRole);
                  }
                }}
                value={role}
              >
                {roles.map((item) => (
                  <option key={item} value={item}>
                    {item}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {formError && (
            <p className="mt-4 text-sm text-rose-700" role="alert">
              {formError}
            </p>
          )}

          <div className="mt-7 flex flex-col-reverse gap-3 border-t border-slate-100 pt-5 sm:flex-row sm:justify-end">
            <button
              className="min-h-11 rounded-xl border border-slate-200 px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
              disabled={isSaving}
              onClick={onCancel}
              type="button"
            >
              Cancel
            </button>
            <button
              className="min-h-11 rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white shadow-sm shadow-blue-900/15 transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:opacity-60"
              disabled={isSaving}
              type="submit"
            >
              {isSaving
                ? "Saving…"
                : initialUser
                  ? "Save Changes"
                  : "Create User"}
            </button>
          </div>
        </form>
      </section>
    </div>
  );
}
