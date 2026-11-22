"use client";

import {
  createContext,
  useContext,
  useState,
  type ReactNode,
} from "react";
import {
  customerHasActiveBookings,
  type Customer,
  type NewCustomer,
  sampleCustomers,
} from "@/components/customers/customer-data";

type CustomerContextValue = {
  customers: Customer[];
  addCustomer: (customer: NewCustomer) => void;
  updateCustomer: (id: string, customer: NewCustomer) => void;
  deleteCustomer: (id: string) => DeleteCustomerResult;
};

export type DeleteCustomerResult =
  | "deleted"
  | "active-bookings"
  | "not-found";

const CustomerContext = createContext<CustomerContextValue | null>(null);

function getNextCustomerId(customers: Customer[]) {
  const highestId = customers.reduce((highest, customer) => {
    const numericId = Number(customer.id.replace(/^CUS-/, ""));
    return Number.isFinite(numericId) ? Math.max(highest, numericId) : highest;
  }, 1000);

  return `CUS-${highestId + 1}`;
}

export function CustomerProvider({ children }: { children: ReactNode }) {
  const [customers, setCustomers] = useState(sampleCustomers);

  function addCustomer(newCustomer: NewCustomer) {
    setCustomers((currentCustomers) => [
      {
        ...newCustomer,
        id: getNextCustomerId(currentCustomers),
        bookingIds: [],
      },
      ...currentCustomers,
    ]);
  }

  function updateCustomer(id: string, updatedCustomer: NewCustomer) {
    setCustomers((currentCustomers) =>
      currentCustomers.map((customer) =>
        customer.id === id ? { ...customer, ...updatedCustomer } : customer,
      ),
    );
  }

  function deleteCustomer(id: string) {
    const customer = customers.find((item) => item.id === id);
    if (!customer) {
      return "not-found";
    }
    if (customerHasActiveBookings(customer)) {
      return "active-bookings";
    }

    setCustomers((currentCustomers) =>
      currentCustomers.filter((item) => item.id !== id),
    );
    return "deleted";
  }

  return (
    <CustomerContext.Provider
      value={{ customers, addCustomer, updateCustomer, deleteCustomer }}
    >
      {children}
    </CustomerContext.Provider>
  );
}

export function useCustomers() {
  const context = useContext(CustomerContext);
  if (!context) {
    throw new Error("useCustomers must be used within a CustomerProvider.");
  }

  return context;
}
