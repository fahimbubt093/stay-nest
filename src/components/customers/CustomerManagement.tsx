"use client";

import { useState } from "react";
import { AddCustomerForm } from "@/components/customers/AddCustomerForm";
import { CustomerPageHeader } from "@/components/customers/CustomerPageHeader";
import { useCustomers } from "@/components/customers/CustomerProvider";
import { CustomersTable } from "@/components/customers/CustomersTable";

export function CustomerManagement() {
  const { addCustomer, customers } = useCustomers();
  const [isAddingCustomer, setIsAddingCustomer] = useState(false);

  return (
    <>
      <CustomerPageHeader
        customerCount={customers.length}
        onAddCustomer={() => setIsAddingCustomer(true)}
      />
      <CustomersTable customers={customers} />
      {isAddingCustomer && (
        <AddCustomerForm
          onCancel={() => setIsAddingCustomer(false)}
          onSave={(newCustomer) => {
            addCustomer(newCustomer);
            setIsAddingCustomer(false);
          }}
        />
      )}
    </>
  );
}
