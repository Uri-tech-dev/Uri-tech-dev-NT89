"use client";

import { useAtom } from "jotai";
import Image from "next/image";
import { useRouter } from "@/i18n/routing";
import { cartItemsAtom, cartTotalAtom } from "@/store/cart.store";
import { currentUserAtom } from "@/store/auth.store";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { Minus, Plus, Trash2, ShoppingBag } from "lucide-react";

export default function CartPage() {
  const [items, setItems] = useAtom(cartItemsAtom);
  const [total] = useAtom(cartTotalAtom);
  const [currentUser] = useAtom(currentUserAtom);
  const router = useRouter();

  const removeItem = (productId: string, variantId: string) =>
    setItems((prev) =>
      prev.filter(
        (item) => !(item.productId === productId && item.variantId === variantId)
      )
    );

  const updateQuantity = (productId: string, variantId: string, count: number) => {
    if (count <= 0) {
      removeItem(productId, variantId);
      return;
    }
    setItems((prev) =>
      prev.map((item) =>
        item.productId === productId && item.variantId === variantId
          ? { ...item, count }
          : item
      )
    );
  };

  const handleCheckout = () => {
    if (!currentUser) {
      sessionStorage.setItem("redirectAfterLogin", "/checkout");
      router.push("/login");
      return;
    }
    router.push("/checkout");
  };

  if (items.length === 0)
    return (
      <div className="container mx-auto px-4 py-16 pb-24">
        <div className="text-center">
          <ShoppingBag className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <h1 className="text-2xl font-bold mb-2">Сагс</h1>
          <p className="text-muted-foreground mb-6">Сагс хоосон байна</p>
          <Button onClick={() => router.push("/products")}>
            Бараа үзэх
          </Button>
        </div>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8 pb-24">
      <h1 className="text-2xl font-bold mb-6">Сагс ({items.length} бараа)</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-4">
          {items.map((item) => (
            <div
              key={`${item.productId}-${item.variantId}`}
              className="flex gap-4 rounded-xl border p-4"
            >
              <div className="h-24 w-24 rounded-lg bg-muted overflow-hidden shrink-0">
                {item.productImgUrl ? (
                  <Image
                    src={item.productImgUrl}
                    alt={item.productName || ""}
                    width={96}
                    height={96}
                    className="h-full w-full object-cover"
                  />
                ) : (
                  <div className="h-full w-full flex items-center justify-center">
                    <span className="text-2xl">📦</span>
                  </div>
                )}
              </div>

              <div className="flex-1">
                <p className="font-medium">{item.productName}</p>
                <p className="text-sm text-muted-foreground">{item.variantName}</p>
                <p className="text-primary font-semibold">
                  {formatPrice(item.unitPrice)}
                </p>

                <div className="flex items-center gap-2 mt-3">
                  <button
                    onClick={() =>
                      updateQuantity(item.productId, item.variantId, item.count - 1)
                    }
                    className="h-8 w-8 rounded-lg border flex items-center justify-center hover:bg-muted"
                  >
                    <Minus className="h-3 w-3" />
                  </button>
                  <span className="w-8 text-center">{item.count}</span>
                  <button
                    onClick={() =>
                      updateQuantity(item.productId, item.variantId, item.count + 1)
                    }
                    className="h-8 w-8 rounded-lg border flex items-center justify-center hover:bg-muted"
                  >
                    <Plus className="h-3 w-3" />
                  </button>

                  <button
                    onClick={() => removeItem(item.productId, item.variantId)}
                    className="ml-auto text-destructive hover:text-destructive/80"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>

        <div>
          <div className="rounded-xl border p-6 sticky top-24">
            <h2 className="font-semibold text-lg">Захиалгын хураангуй</h2>

            <div className="mt-4 space-y-2">
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">
                  Бараа ({items.reduce((sum, item) => sum + item.count, 0)} ширхэг)
                </span>
                <span>{formatPrice(total)}</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-muted-foreground">Хүргэлт</span>
                <span className="text-success">Үнэгүй</span>
              </div>
              <div className="border-t pt-2 flex justify-between font-semibold">
                <span>Нийт</span>
                <span className="text-primary">{formatPrice(total)}</span>
              </div>
            </div>

            <Button onClick={handleCheckout} className="mt-6 w-full">
              Захиалах
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
