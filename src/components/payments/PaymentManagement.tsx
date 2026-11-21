"use client";

import { useState } from "react";
import { PaymentPageHeader } from "@/src/components/payments/PaymentPageHeader";
import { PaymentsTable } from "@/src/components/payments/PaymentsTable";
import { RecordPaymentForm } from "@/src/components/payments/RecordPaymentForm";
import { usePayments } from "@/src/components/payments/PaymentProvider";
import type { NewPayment } from "@/src/components/payments/payment-data";

export function PaymentManagement() {
  const { addPayment, payments } = usePayments();
  const [isRecordingPayment, setIsRecordingPayment] = useState(false);

  return (
    <>
      <PaymentPageHeader
        onRecordPayment={() => setIsRecordingPayment(true)}
        paymentCount={payments.length}
      />
      <PaymentsTable payments={payments} />
      {isRecordingPayment && (
        <RecordPaymentForm
          onCancel={() => setIsRecordingPayment(false)}
          onSave={(newPayment: NewPayment) => {
            addPayment(newPayment);
            setIsRecordingPayment(false);
          }}
        />
      )}
    </>
  );
}
