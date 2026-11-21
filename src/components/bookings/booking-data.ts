export type BookingStatus = "Confirmed" | "Pending" | "Cancelled";

export type Booking = {
  id: string;
  customerName: string;
  phone: string;
  roomNumber: string;
  checkIn: string;
  checkOut: string;
  numberOfGuests: number;
  status: BookingStatus;
};

export type NewBooking = Omit<Booking, "id">;

const bookingDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

export function formatBookingDate(date: string) {
  return bookingDateFormatter.format(new Date(`${date}T00:00:00Z`));
}

export const sampleBookings: Booking[] = [
  {
    id: "BK-1001",
    customerName: "Rahim Ahmed",
    phone: "+880 1712-345678",
    roomNumber: "101",
    checkIn: "2026-11-19",
    checkOut: "2026-11-22",
    numberOfGuests: 2,
    status: "Confirmed",
  },
  {
    id: "BK-1002",
    customerName: "Karim Hasan",
    phone: "+880 1812-456789",
    roomNumber: "102",
    checkIn: "2026-11-19",
    checkOut: "2026-11-23",
    numberOfGuests: 1,
    status: "Pending",
  },
  {
    id: "BK-1003",
    customerName: "Nusrat Jahan",
    phone: "+880 1912-567890",
    roomNumber: "103",
    checkIn: "2026-11-20",
    checkOut: "2026-11-24",
    numberOfGuests: 2,
    status: "Confirmed",
  },
  {
    id: "BK-1004",
    customerName: "Farhan Chowdhury",
    phone: "+880 1612-678901",
    roomNumber: "201",
    checkIn: "2026-11-21",
    checkOut: "2026-11-25",
    numberOfGuests: 2,
    status: "Pending",
  },
  {
    id: "BK-1005",
    customerName: "Ayesha Rahman",
    phone: "+880 1512-789012",
    roomNumber: "202",
    checkIn: "2026-11-22",
    checkOut: "2026-11-26",
    numberOfGuests: 2,
    status: "Confirmed",
  },
];
