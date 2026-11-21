export type PaymentStatus = "Completed" | "Pending" | "Failed";
export type PaymentMethod = "Cash" | "Card" | "Bank Transfer";

export type Payment = {
  id: string;
  customerId: string;
  customerName: string;
  bookingId: string;
  amount: number;
  paymentMethod: PaymentMethod;
  date: string;
  status: PaymentStatus;
};

export type NewPayment = Omit<Payment, "id" | "status">;

const paymentDateFormatter = new Intl.DateTimeFormat("en-US", {
  month: "short",
  day: "numeric",
  year: "numeric",
  timeZone: "UTC",
});

const paymentAmountFormatter = new Intl.NumberFormat("en-US", {
  style: "currency",
  currency: "USD",
});

export function formatPaymentDate(date: string) {
  return paymentDateFormatter.format(new Date(`${date}T00:00:00Z`));
}

export function formatPaymentAmount(amount: number) {
  return paymentAmountFormatter.format(amount);
}

export const samplePayments: Payment[] = [
  {
    id: "PMT-1001",
    customerId: "CUS-1001",
    customerName: "Rahim Ahmed",
    bookingId: "BK-1001",
    amount: 240,
    paymentMethod: "Card",
    date: "2026-11-18",
    status: "Completed",
  },
  {
    id: "PMT-1002",
    customerId: "CUS-1002",
    customerName: "Karim Hasan",
    bookingId: "BK-1002",
    amount: 180,
    paymentMethod: "Cash",
    date: "2026-11-19",
    status: "Pending",
  },
  {
    id: "PMT-1003",
    customerId: "CUS-1003",
    customerName: "Nusrat Jahan",
    bookingId: "BK-1003",
    amount: 320,
    paymentMethod: "Bank Transfer",
    date: "2026-11-19",
    status: "Completed",
  },
  {
    id: "PMT-1004",
    customerId: "CUS-1004",
    customerName: "Farhan Chowdhury",
    bookingId: "BK-1004",
    amount: 200,
    paymentMethod: "Card",
    date: "2026-11-20",
    status: "Failed",
  },
  {
    id: "PMT-1005",
    customerId: "CUS-1005",
    customerName: "Ayesha Rahman",
    bookingId: "BK-1005",
    amount: 275,
    paymentMethod: "Bank Transfer",
    date: "2026-11-21",
    status: "Completed",
  },
];
