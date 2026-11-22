"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import {
  type NewPayment,
  type Payment,
  samplePayments,
} from "@/components/payments/payment-data";

type PaymentContextValue = {
  payments: Payment[];
  addPayment: (payment: NewPayment) => void;
};

const PaymentContext = createContext<PaymentContextValue | null>(null);

function getNextPaymentId(payments: Payment[]) {
  const highestId = payments.reduce((highest, payment) => {
    const numericId = Number(payment.id.replace(/^PMT-/, ""));
    return Number.isFinite(numericId) ? Math.max(highest, numericId) : highest;
  }, 1000);

  return `PMT-${highestId + 1}`;
}

export function PaymentProvider({ children }: { children: ReactNode }) {
  const [payments, setPayments] = useState(samplePayments);

  function addPayment(newPayment: NewPayment) {
    setPayments((currentPayments) => [
      {
        ...newPayment,
        id: getNextPaymentId(currentPayments),
        status: "Pending",
      },
      ...currentPayments,
    ]);
  }

  return (
    <PaymentContext.Provider value={{ payments, addPayment }}>
      {children}
    </PaymentContext.Provider>
  );
}

export function usePayments() {
  const context = useContext(PaymentContext);
  if (!context) {
    throw new Error("usePayments must be used within a PaymentProvider.");
  }

  return context;
}
