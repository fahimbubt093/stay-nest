"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/components/auth/AuthProvider";
import { DateRangeFilter } from "@/components/reports/DateRangeFilter";
import { UserFormDialog } from "@/components/users/UserFormDialog";
import type {
  AccountStatus,
  AuthUser,
  UpdatedDemoUser,
  UserRole,
} from "@/lib/auth/types";

const roleOptions: Array<"All roles" | UserRole> = [
  "All roles",
  "Admin",
  "Staff",
];
const statusOptions: Array<"All statuses" | AccountStatus> = [
  "All statuses",
  "Active",
  "Inactive",
];
const fieldClassName =
  "h-11 w-full rounded-xl border border-slate-200 bg-white px-3 text-sm text-slate-700 outline-none transition focus:border-blue-500 focus:ring-4 focus:ring-blue-500/10";

function getJoinDateKey(createdAt?: string): string | null {
  if (!createdAt) {
    return null;
  }

  const date = new Date(createdAt);
  return Number.isNaN(date.getTime()) ? null : date.toISOString().slice(0, 10);
}

function formatJoinDate(createdAt?: string): string {
  if (!createdAt) {
    return "Not available";
  }

  const date = new Date(createdAt);
  if (Number.isNaN(date.getTime())) {
    return "Not available";
  }

  return new Intl.DateTimeFormat("en-US", {
    dateStyle: "medium",
    timeZone: "UTC",
  }).format(date);
}

export function UserManagement() {
  const { status, user, users, createUser, updateUser, deleteUser } = useAuth();
  const router = useRouter();
  const [isCreating, setIsCreating] = useState(false);
  const [userToEdit, setUserToEdit] = useState<AuthUser | null>(null);
  const [userToDelete, setUserToDelete] = useState<AuthUser | null>(null);
  const [deleteError, setDeleteError] = useState("");
  const [isDeleting, setIsDeleting] = useState(false);
  const [userIdSearch, setUserIdSearch] = useState("");
  const [roleFilter, setRoleFilter] =
    useState<(typeof roleOptions)[number]>("All roles");
  const [statusFilter, setStatusFilter] =
    useState<(typeof statusOptions)[number]>("All statuses");
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const filteredUsers = useMemo(() => {
    const query = userIdSearch.trim().toLowerCase();

    return users.filter((listedUser) => {
      const joinDate = getJoinDateKey(listedUser.createdAt);
      const matchesId = listedUser.id.toLowerCase().includes(query);
      const matchesRole =
        roleFilter === "All roles" || listedUser.role === roleFilter;
      const matchesStatus =
        statusFilter === "All statuses" ||
        listedUser.accountStatus === statusFilter;
      const matchesJoinDate =
        (!startDate && !endDate) ||
        (joinDate !== null &&
          (!startDate || joinDate >= startDate) &&
          (!endDate || joinDate <= endDate));

      return matchesId && matchesRole && matchesStatus && matchesJoinDate;
    });
  }, [endDate, roleFilter, startDate, statusFilter, userIdSearch, users]);

  useEffect(() => {
    if (status === "authenticated" && user?.role !== "Admin") {
      router.replace("/dashboard");
    }
  }, [router, status, user?.role]);

  async function saveNewUser(input: UpdatedDemoUser) {
    if (!input.password) {
      throw new Error("A password is required when creating a user.");
    }

    await createUser({ ...input, password: input.password });
    setIsCreating(false);
  }

  async function saveExistingUser(input: UpdatedDemoUser) {
    if (!userToEdit) {
      return;
    }

    await updateUser(userToEdit.id, input);
    setUserToEdit(null);
  }

  async function confirmDelete() {
    if (!userToDelete) {
      return;
    }

    setDeleteError("");
    setIsDeleting(true);
    try {
      await deleteUser(userToDelete.id);
      setUserToDelete(null);
    } catch (error) {
      setDeleteError(
        error instanceof Error
          ? error.message
          : "The user could not be deleted. Try again.",
      );
    } finally {
      setIsDeleting(false);
    }
  }

  if (status !== "authenticated" || !user) {
    return null;
  }

  if (user.role !== "Admin") {
    return (
      <p className="rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
        User management is available to Admin accounts only.
      </p>
    );
  }

  return (
    <>
      <header className="mb-8 flex flex-col gap-4 sm:mb-10 sm:flex-row sm:items-end sm:justify-between">
        <div>
          <p className="mb-2 text-xs font-semibold uppercase tracking-[0.18em] text-blue-600">
            Hotel operations
          </p>
          <h1 className="text-2xl font-bold tracking-tight text-slate-900 sm:text-3xl">
            User Management
          </h1>
          <p className="mt-2 text-sm text-slate-500 sm:text-base">
            Manage browser-only Admin and Staff demo accounts.
          </p>
        </div>
        <button
          className="inline-flex min-h-11 items-center justify-center rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white shadow-sm shadow-blue-900/15 transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          onClick={() => setIsCreating(true)}
          type="button"
        >
          + Create New User
        </button>
      </header>

      <section
        aria-label="Filter users"
        className="mb-6 rounded-2xl border border-slate-100 bg-white p-5 shadow-sm sm:p-6"
      >
        <div className="grid gap-3 sm:grid-cols-2 xl:grid-cols-[minmax(14rem,1.5fr)_minmax(10rem,1fr)_minmax(10rem,1fr)_auto]">
          <label>
            <span className="sr-only">Filter by User ID</span>
            <input
              className={fieldClassName}
              onChange={(event) => setUserIdSearch(event.target.value)}
              placeholder="Filter by User ID"
              type="search"
              value={userIdSearch}
            />
          </label>
          <label>
            <span className="sr-only">Filter users by role</span>
            <select
              className={fieldClassName}
              onChange={(event) => {
                const selectedRole = roleOptions.find(
                  (role) => role === event.target.value,
                );
                if (selectedRole) {
                  setRoleFilter(selectedRole);
                }
              }}
              value={roleFilter}
            >
              {roleOptions.map((role) => (
                <option key={role} value={role}>
                  {role}
                </option>
              ))}
            </select>
          </label>
          <label>
            <span className="sr-only">Filter users by account status</span>
            <select
              className={fieldClassName}
              onChange={(event) => {
                const selectedStatus = statusOptions.find(
                  (status) => status === event.target.value,
                );
                if (selectedStatus) {
                  setStatusFilter(selectedStatus);
                }
              }}
              value={statusFilter}
            >
              {statusOptions.map((status) => (
                <option key={status} value={status}>
                  {status}
                </option>
              ))}
            </select>
          </label>
          <button
            className="min-h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
            onClick={() => {
              setUserIdSearch("");
              setRoleFilter("All roles");
              setStatusFilter("All statuses");
              setStartDate("");
              setEndDate("");
            }}
            type="button"
          >
            Reset Filters
          </button>
        </div>
      </section>

      <DateRangeFilter
        description="Filter accounts by their actual creation date."
        endDate={endDate}
        heading="Join Date"
        headingId="user-join-date-heading"
        onEndDateChange={setEndDate}
        onReset={() => {
          setStartDate("");
          setEndDate("");
        }}
        onStartDateChange={setStartDate}
        startDate={startDate}
      />

      <section className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm">
        <div className="border-b border-slate-100 p-5 sm:p-6">
          <h2 className="text-lg font-semibold text-slate-900">All Users</h2>
          <p className="mt-1 text-sm text-slate-500">
            {filteredUsers.length} of {users.length} users
          </p>
        </div>
        <div
          aria-label="User list"
          className="overflow-x-auto"
          role="region"
          tabIndex={0}
        >
          <table className="w-full min-w-[1250px] text-left text-sm">
            <thead className="bg-slate-50/80 text-xs uppercase tracking-wider text-slate-500">
              <tr>
                <th className="px-5 py-3.5 font-semibold sm:px-6" scope="col">
                  User ID
                </th>
                <th className="px-5 py-3.5 font-semibold sm:px-6" scope="col">
                  Full Name
                </th>
                <th className="px-5 py-3.5 font-semibold sm:px-6" scope="col">
                  Email
                </th>
                <th className="px-5 py-3.5 font-semibold sm:px-6" scope="col">
                  Role
                </th>
                <th className="px-5 py-3.5 font-semibold sm:px-6" scope="col">
                  Join Date
                </th>
                <th className="px-5 py-3.5 font-semibold sm:px-6" scope="col">
                  Account Status
                </th>
                <th
                  className="px-5 py-3.5 text-right font-semibold sm:px-6"
                  scope="col"
                >
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {filteredUsers.length > 0 ? filteredUsers.map((listedUser) => (
                <tr className="text-slate-600" key={listedUser.id}>
                  <th
                    className="whitespace-nowrap px-5 py-4 text-left font-medium text-slate-800 sm:px-6"
                    scope="row"
                  >
                    {listedUser.id}
                  </th>
                  <td className="whitespace-nowrap px-5 py-4 font-medium text-slate-800 sm:px-6">
                    {listedUser.fullName}
                    {listedUser.isDefaultAdmin && (
                      <span className="ml-2 rounded-full bg-blue-50 px-2 py-1 text-xs font-medium text-blue-700">
                        Default
                      </span>
                    )}
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 sm:px-6">
                    {listedUser.email}
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 sm:px-6">
                    <span className="rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-700">
                      {listedUser.role}
                    </span>
                  </td>
                  <td className="whitespace-nowrap px-5 py-4 sm:px-6">
                    {formatJoinDate(listedUser.createdAt)}
                  </td>
                  <td className="px-5 py-4 sm:px-6">
                    <span
                      className={
                        listedUser.accountStatus === "Active"
                          ? "rounded-full bg-emerald-50 px-2.5 py-1 text-xs font-semibold text-emerald-700"
                          : "rounded-full bg-slate-100 px-2.5 py-1 text-xs font-semibold text-slate-600"
                      }
                    >
                      {listedUser.accountStatus}
                    </span>
                  </td>
                  <td className="px-5 py-4 sm:px-6">
                    <div className="flex items-center justify-end gap-1">
                      <Link
                        className="inline-flex min-h-9 items-center justify-center rounded-lg border border-blue-100 bg-blue-50 px-3 text-sm font-semibold text-blue-700 transition hover:border-blue-200 hover:bg-blue-100 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                        href={`/dashboard/users/${encodeURIComponent(listedUser.id)}`}
                      >
                        View Details
                      </Link>
                      <button
                        aria-label={`Edit ${listedUser.fullName}`}
                        className="min-h-9 rounded-lg px-3 text-sm font-semibold text-blue-700 transition hover:bg-blue-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600 disabled:cursor-not-allowed disabled:opacity-50"
                        disabled={listedUser.isDefaultAdmin}
                        onClick={() => setUserToEdit(listedUser)}
                        type="button"
                      >
                        Edit
                      </button>
                      <button
                        aria-label={`Delete ${listedUser.fullName}`}
                        className="min-h-9 rounded-lg px-3 text-sm font-semibold text-rose-700 transition hover:bg-rose-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600 disabled:cursor-not-allowed disabled:opacity-50"
                        disabled={listedUser.isDefaultAdmin}
                        onClick={() => {
                          setDeleteError("");
                          setUserToDelete(listedUser);
                        }}
                        type="button"
                      >
                        Delete
                      </button>
                    </div>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td
                    className="px-5 py-12 text-center text-sm text-slate-500 sm:px-6"
                    colSpan={7}
                  >
                    No users match the selected filters.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        <p className="border-t border-slate-100 px-5 py-4 text-xs leading-5 text-slate-500 sm:px-6">
          Demo users are saved only in this browser. The default admin account
          is protected from editing and deletion.
        </p>
      </section>

      {(isCreating || userToEdit) && (
        <UserFormDialog
          key={userToEdit?.id ?? "new-demo-user"}
          initialUser={userToEdit ?? undefined}
          onCancel={() => {
            setIsCreating(false);
            setUserToEdit(null);
          }}
          onSave={userToEdit ? saveExistingUser : saveNewUser}
        />
      )}

      {userToDelete && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-slate-950/40 p-4">
          <section
            aria-describedby="delete-user-description"
            aria-labelledby="delete-user-title"
            aria-modal="true"
            className="w-full max-w-md rounded-2xl border border-slate-100 bg-white p-6 shadow-xl"
            role="alertdialog"
          >
            <h2
              className="text-lg font-semibold text-slate-900"
              id="delete-user-title"
            >
              Delete {userToDelete.fullName}?
            </h2>
            <p
              className="mt-2 text-sm leading-6 text-slate-500"
              id="delete-user-description"
            >
              This removes the demo user from this browser. This action cannot
              be undone.
            </p>
            {deleteError && (
              <p className="mt-3 text-sm text-rose-700" role="alert">
                {deleteError}
              </p>
            )}
            <div className="mt-6 flex flex-col-reverse gap-3 sm:flex-row sm:justify-end">
              <button
                className="min-h-11 rounded-xl border border-slate-200 px-5 text-sm font-semibold text-slate-700 transition hover:bg-slate-50 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
                disabled={isDeleting}
                onClick={() => setUserToDelete(null)}
                type="button"
              >
                Cancel
              </button>
              <button
                className="min-h-11 rounded-xl bg-rose-600 px-5 text-sm font-semibold text-white transition hover:bg-rose-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-rose-600 disabled:cursor-not-allowed disabled:opacity-60"
                disabled={isDeleting}
                onClick={() => void confirmDelete()}
                type="button"
              >
                {isDeleting ? "Deleting…" : "Delete User"}
              </button>
            </div>
          </section>
        </div>
      )}
    </>
  );
}
