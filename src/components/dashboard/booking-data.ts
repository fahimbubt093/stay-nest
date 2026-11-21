export type BookingStatus = "Confirmed" | "Pending";

export type Booking = {
  name: string;
  room: string;
  date: string;
  status: BookingStatus;
};

export const sampleBookings: Booking[] = [
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
