"use client";

import { useMutation, useQuery } from "@apollo/client/react";
import { useAtom } from "jotai";
import { useCallback } from "react";
import { CP_PAYMENTS } from "@/graphql/ecommerce/queries/payment";
import {
  INVOICE_CREATE,
  INVOICES_CHECK,
  PAYMENT_TRANSACTIONS_ADD,
} from "@/graphql/ecommerce/mutations/payment";
import {
  paymentsAtom,
  selectedPaymentAtom,
  invoiceAtom,
} from "@/store/payment.store";

export function usePayments() {
  const { data, loading, error } = useQuery(CP_PAYMENTS, {
    variables: { status: "active" },
    fetchPolicy: "cache-and-network",
  });

  return {
    payments: (data as any)?.cpPayments || [],
    loading,
    error,
  };
}

export function useCreateInvoice() {
  const [createMutation, { loading, error }] = useMutation(INVOICE_CREATE);
  const [, setInvoice] = useAtom(invoiceAtom);

  const createInvoice = useCallback(
    async (params: {
      paymentIds: string[];
      amount: number;
      description?: string;
      contentType?: string;
      contentTypeId?: string;
      customerId?: string;
      customerType?: string;
    }) => {
      const { data } = await createMutation({
        variables: {
          input: {
            amount: params.amount,
            paymentIds: params.paymentIds,
            description: params.description || "",
            contentType: params.contentType || "pos:orders",
            contentTypeId: params.contentTypeId,
            customerId: params.customerId || "empty",
            customerType: params.customerType || "visitor",
            data: {},
          },
        },
      });

      const invoice = (data as any)?.invoiceCreate;
      if (invoice) setInvoice(invoice);
      return { success: !!invoice, invoice };
    },
    [createMutation, setInvoice]
  );

  return { createInvoice, loading, error };
}

export function useCheckInvoice() {
  const [checkMutation, { loading, error }] = useMutation(INVOICES_CHECK);

  const checkInvoice = useCallback(
    async (invoiceId: string) => {
      const { data } = await checkMutation({ variables: { id: invoiceId } });
      return (data as any)?.invoicesCheck ?? null;
    },
    [checkMutation]
  );

  return { loading, error, checkInvoice };
}

export function useAddPaymentTransaction() {
  const [addMutation, { loading, error }] = useMutation(
    PAYMENT_TRANSACTIONS_ADD
  );

  const addTransaction = useCallback(
    async (params: {
      invoiceId: string;
      paymentId: string;
      paymentKind?: string;
      amount?: number;
      details?: Record<string, unknown>;
    }) => {
      const { data } = await addMutation({
        variables: {
          input: {
            invoiceId: params.invoiceId,
            paymentId: params.paymentId,
            paymentKind: params.paymentKind,
            amount: params.amount,
            details: params.details,
          },
        },
      });

      const transaction = (data as any)?.paymentTransactionsAdd;
      return { success: !!transaction, transaction };
    },
    [addMutation]
  );

  return { addTransaction, loading, error };
}
