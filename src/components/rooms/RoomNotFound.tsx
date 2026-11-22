import Link from "next/link";

export function RoomNotFound() {
  return (
    <main className="flex min-h-screen items-center justify-center bg-slate-50 p-4 text-slate-900">
      <section className="w-full max-w-lg rounded-2xl border border-slate-100 bg-white p-6 text-center shadow-sm sm:p-8">
        <p className="text-sm font-semibold uppercase tracking-[0.18em] text-blue-600">
          Room not found
        </p>
        <h1 className="mt-3 text-2xl font-bold tracking-tight text-slate-900">
          We couldn&apos;t find that room
        </h1>
        <p className="mt-2 text-sm leading-6 text-slate-500">
          The room ID may be invalid or the room may no longer be available.
        </p>
        <Link
          className="mt-6 inline-flex min-h-11 items-center justify-center rounded-xl bg-blue-600 px-5 text-sm font-semibold text-white shadow-sm shadow-blue-900/15 transition hover:bg-blue-700 focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-blue-600"
          href="/frontend/rooms"
        >
          Back to Rooms
        </Link>
      </section>
    </main>
  );
}
