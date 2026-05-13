"use client";

import { useMutation, useQuery } from "@apollo/client/react";
import { useAtom } from "jotai";
import { useCallback } from "react";
import { CP_ORDERS_ADD, CP_ORDERS_CANCEL } from "@/graphql/ecommerce/mutations/order";
import { FULL_ORDERS, CP_ORDER_DETAIL } from "@/graphql/ecommerce/queries/order";
import { activeOrderAtom, orderLoadingAtom } from "@/store/order.store";
import { cartItemsAtom } from "@/store/cart.store";

export function useOrders(customerId?: string) {
  const { data, loading, error, refetch } = useQuery(FULL_ORDERS, {
    variables: { customerId, page: 1, perPage: 20 },
    skip: !customerId,
    fetchPolicy: "cache-and-network",
  });

  return {
    orders: (data as any)?.cpFullOrders || [],
    loading,
    error,
    refetch,
  };
}

export function useOrderDetail(orderId: string) {
  const { data, loading, error } = useQuery(CP_ORDER_DETAIL, {
    variables: { id: orderId, customerId: "" },
    skip: !orderId,
    fetchPolicy: "cache-and-network",
  });

  return {
    order: (data as any)?.cpOrderDetail || null,
    loading,
    error,
  };
}

export function useOrderCUD() {
  const [addMutation, { loading: addLoading }] = useMutation(CP_ORDERS_ADD);
  const [removeMutation, { loading: removeLoading }] = useMutation(CP_ORDERS_CANCEL);
  const [, setActiveOrder] = useAtom(activeOrderAtom);
  const [, setCartItems] = useAtom(cartItemsAtom);
  const [, setOrderLoading] = useAtom(orderLoadingAtom);

  const createOrder = useCallback(
    async (variables: {
      items: Array<{
        productId: string;
        count: number;
        unitPrice: number;
        discountAmount?: number;
        bonusCount?: number;
      }>;
      totalAmount: number;
      type: string;
      customerId?: string;
      customerType?: string;
      registerNumber?: string;
      billType?: string;
      deliveryInfo?: Record<string, unknown>;
    }) => {
      setOrderLoading(true);
      try {
        const calculatedTotal =
          variables.totalAmount > 0
            ? variables.totalAmount
            : variables.items.reduce(
                (sum, item) => sum + (item.unitPrice || 0) * (item.count || 1),
                0
              );

        const { data } = await addMutation({
          variables: { ...variables, totalAmount: calculatedTotal },
        });
        const order = (data as any)?.cpOrdersAdd;

        if (order?._id) {
          setActiveOrder({ ...order, totalAmount: calculatedTotal });
          setCartItems([]);
        }

        return {
          success: !!order?._id,
          order: { ...order, totalAmount: calculatedTotal },
        };
      } finally {
        setOrderLoading(false);
      }
    },
    [addMutation, setActiveOrder, setCartItems, setOrderLoading]
  );

  const removeOrder = useCallback(
    async (orderId: string) => {
      const { data } = await removeMutation({ variables: { _id: orderId } });
      return { success: !!(data as any)?.cpOrdersCancel };
    },
    [removeMutation]
  );

  return { createOrder, removeOrder, loading: addLoading || removeLoading };
}
