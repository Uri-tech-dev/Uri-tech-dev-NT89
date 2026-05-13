import { atom } from "jotai";
import { IOrder, IDeliveryInfo } from "@/types/order.types";

export const activeOrderAtom = atom<IOrder | null>(null);
export const orderLoadingAtom = atom(false);
export const deliveryInfoAtom = atom<IDeliveryInfo>({
  address: "",
  phone: "",
  description: "",
});

export const orderTotalAtom = atom((get) => {
  const order = get(activeOrderAtom);
  return order?.totalAmount || 0;
});
