import { atom } from "jotai";
import { ICartItem } from "@/types/order.types";

export const cartItemsAtom = atom<ICartItem[]>([]);

export const cartTotalAtom = atom((get) => {
  const items = get(cartItemsAtom);
  return items.reduce((sum, item) => sum + item.unitPrice * item.count, 0);
});

export const cartCountAtom = atom((get) => {
  const items = get(cartItemsAtom);
  return items.reduce((sum, item) => sum + item.count, 0);
});
