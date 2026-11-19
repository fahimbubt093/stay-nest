const stats = [
  { title: "Total Rooms", value: 50, icon: "🛏️" },
  { title: "Available Rooms", value: 32, icon: "🏨" },
  { title: "Booked Rooms", value: 18, icon: "🔑" },
  { title: "Total Customers", value: 120, icon: "👥" },
];

const bookings = [
  {
    name: "Rahim Ahmed",
    room: "Room 101",
    date: "19 Nov 2026",
    status: "Confirmed",
  },
  {
    name: "Karim Hasan",
    room: "Room 102",
    date: "19 Nov 2026",
    status: "Pending",
  },
  {
    name: "Nusrat Jahan",
    room: "Room 103",
    date: "20 Nov 2026",
    status: "Confirmed",
  },
];

export default function Home() {
  return (
    <div className="flex min-h-screen w-full bg-gray-100">
      {/* Sidebar */}
      <aside className="hidden w-64 flex-shrink-0 bg-slate-900 p-6 text-white md:block">
        <h1 className="text-2xl font-bold mb-10">
          Hotel<span className="text-blue-400">Pro</span>
        </h1>

        <nav className="space-y-3">
          <p className="bg-blue-600 p-3 rounded-lg">Dashboard</p>

          <p className="p-3 text-gray-300">Rooms</p>
          <p className="p-3 text-gray-300">Bookings</p>
          <p className="p-3 text-gray-300">Customers</p>
          <p className="p-3 text-gray-300">Payments</p>
          <p className="p-3 text-gray-300">Settings</p>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="min-w-0 flex-1 p-4 sm:p-6 lg:p-8">
        <div className="mb-5 flex items-center justify-between md:hidden">
          <h1 className="text-xl font-bold text-slate-900">
            Hotel<span className="text-blue-400">Pro</span>
          </h1>

          <details className="group">
            <summary
              aria-label="Toggle navigation menu"
              className="relative z-50 flex h-10 w-10 cursor-pointer list-none items-center justify-center rounded-lg bg-slate-900 text-white [&::-webkit-details-marker]:hidden"
            >
              <span className="flex flex-col gap-1" aria-hidden="true">
                <span className="h-0.5 w-5 bg-white" />
                <span className="h-0.5 w-5 bg-white" />
                <span className="h-0.5 w-5 bg-white" />
              </span>
            </summary>

            <div className="fixed inset-0 z-30 bg-black/30" />
            <aside className="fixed inset-y-0 left-0 z-40 w-64 bg-slate-900 p-6 pt-16 text-white shadow-xl">
              <nav className="space-y-3">
                <p className="rounded-lg bg-blue-600 p-3">Dashboard</p>
                <p className="p-3 text-gray-300">Rooms</p>
                <p className="p-3 text-gray-300">Bookings</p>
                <p className="p-3 text-gray-300">Customers</p>
                <p className="p-3 text-gray-300">Payments</p>
                <p className="p-3 text-gray-300">Settings</p>
              </nav>
            </aside>
          </details>
        </div>

        {/* Header */}
        <div className="mb-6 flex flex-col gap-4 sm:mb-8 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 sm:text-3xl">
              Dashboard
            </h2>
            <p className="mt-1 text-sm text-gray-500 sm:text-base">
              Welcome to Hotel Management System
            </p>
          </div>

          <button className="w-full rounded-lg bg-blue-600 px-5 py-2.5 text-sm text-white sm:w-auto sm:text-base">
            + New Booking
          </button>
        </div>

        {/* Statistics */}
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-4 lg:gap-5">
          {stats.map((item) => (
            <div
              key={item.title}
              className="rounded-xl bg-white p-4 shadow-sm sm:p-6"
            >
              <div className="mb-2 text-2xl sm:mb-3 sm:text-3xl">
                {item.icon}
              </div>

              <p className="text-sm text-gray-500 sm:text-base">{item.title}</p>

              <h3 className="mt-1 text-2xl font-bold text-gray-800 sm:mt-2 sm:text-3xl">
                {item.value}
              </h3>
            </div>
          ))}
        </div>

        {/* Recent Bookings */}
        <div className="mt-6 rounded-xl bg-white p-4 shadow-sm sm:mt-8 sm:p-6">
          <h3 className="mb-4 text-lg font-bold text-gray-800 sm:mb-5 sm:text-xl">
            Recent Bookings
          </h3>

          <div className="w-full overflow-x-auto">
            <table className="w-full min-w-[560px] text-left text-sm sm:text-base">
              <thead>
                <tr className="border-b text-gray-500">
                  <th className="p-3">Customer</th>
                  <th className="p-3">Room</th>
                  <th className="p-3">Date</th>
                  <th className="p-3">Status</th>
                </tr>
              </thead>

              <tbody>
                {bookings.map((booking, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-3 font-medium">{booking.name}</td>

                    <td className="p-3">{booking.room}</td>

                    <td className="p-3">{booking.date}</td>

                    <td className="p-3">
                      <span
                        className={`whitespace-nowrap rounded-full px-3 py-1 text-sm ${
                          booking.status === "Confirmed"
                            ? "bg-green-100 text-green-700"
                            : "bg-yellow-100 text-yellow-700"
                        }`}
                      >
                        {booking.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
}
