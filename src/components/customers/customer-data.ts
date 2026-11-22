import { sampleBookings } from "@/components/bookings/booking-data";

export type Customer = {
  id: string;
  name: string;
  phone: string;
  email: string;
  address: string;
  bookingIds: string[];
};

export type NewCustomer = Omit<Customer, "id" | "bookingIds">;

export const sampleCustomers: Customer[] = [
  {
    id: "CUS-1001",
    name: "Rahim Ahmed",
    phone: "+880 1712-345678",
    email: "rahim.ahmed@example.com",
    address: "12 Lake Road, Dhanmondi, Dhaka",
    bookingIds: ["BK-1001"],
  },
  {
    id: "CUS-1002",
    name: "Karim Hasan",
    phone: "+880 1812-456789",
    email: "karim.hasan@example.com",
    address: "24 Station Road, Sylhet",
    bookingIds: ["BK-1002"],
  },
  {
    id: "CUS-1003",
    name: "Nusrat Jahan",
    phone: "+880 1912-567890",
    email: "nusrat.jahan@example.com",
    address: "8 College Street, Chattogram",
    bookingIds: ["BK-1003"],
  },
  {
    id: "CUS-1004",
    name: "Farhan Chowdhury",
    phone: "+880 1612-678901",
    email: "farhan.chowdhury@example.com",
    address: "31 New Market Road, Rajshahi",
    bookingIds: ["BK-1004"],
  },
  {
    id: "CUS-1005",
    name: "Ayesha Rahman",
    phone: "+880 1512-789012",
    email: "ayesha.rahman@example.com",
    address: "5 Central Road, Khulna",
    bookingIds: ["BK-1005"],
  },
];

export function customerHasActiveBookings(
  customer: Pick<Customer, "bookingIds">,
) {
  const activeBookingIds = new Set(
    sampleBookings
      .filter((booking) => booking.status !== "Cancelled")
      .map((booking) => booking.id),
  );

  return customer.bookingIds.some((bookingId) =>
    activeBookingIds.has(bookingId),
  );
}
