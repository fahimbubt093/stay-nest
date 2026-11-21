"use client";

import { useState } from "react";
import { AddCustomerForm } from "@/src/components/customers/AddCustomerForm";
import { CustomerPageHeader } from "@/src/components/customers/CustomerPageHeader";
import { useCustomers } from "@/src/components/customers/CustomerProvider";
import { CustomersTable } from "@/src/components/customers/CustomersTable";

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
