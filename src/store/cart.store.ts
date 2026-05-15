import { atom } from "jotai";

export interface CartItem {
  productId: string;
  variantId: string;
  productName: string;
  variantName: string;
  unitPrice: number;
  count: number;
  productImgUrl?: string;
  weight?: number;
}

export const cartItemsAtom = atom<CartItem[]>([]);

export const cartTotalAtom = atom((get) => {
  const items = get(cartItemsAtom);
  return items.reduce((sum, item) => sum + item.unitPrice * item.count, 0);
});

export const cartCountAtom = atom((get) => {
  const items = get(cartItemsAtom);
  return items.reduce((sum, item) => sum + item.count, 0);
});
