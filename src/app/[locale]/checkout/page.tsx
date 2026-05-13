"use client";

import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import { useRouter } from "@/i18n/routing";
import { cartItemsAtom, cartTotalAtom } from "@/store/cart.store";
import { currentUserAtom } from "@/store/auth.store";
import { useOrderCUD } from "@/hooks/order";
import { usePayments } from "@/hooks/payment";
import { PaymentType } from "@/components/payment/PaymentType";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { formatPrice } from "@/lib/utils";

export default function CheckoutPage() {
  const router = useRouter();
  const [items] = useAtom(cartItemsAtom);
  const [total] = useAtom(cartTotalAtom);
  const [currentUser] = useAtom(currentUserAtom);
  const { createOrder } = useOrderCUD();
  const { payments } = usePayments();

  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [description, setDescription] = useState("");
  const [isSubmitting, setIsSubmitting] = useState(false);

  useEffect(() => {
    if (currentUser) {
      if (currentUser.firstName) setFirstName(currentUser.firstName);
      if (currentUser.lastName) setLastName(currentUser.lastName);
      if (currentUser.email) setEmail(currentUser.email);
      if (currentUser.phone) setPhone(currentUser.phone);
    }
  }, [currentUser]);

  const handleSubmit = async () => {
    if (items.length === 0) return;
    setIsSubmitting(true);

    const calculatedTotal = items.reduce(
      (sum, item) => sum + item.unitPrice * item.count,
      0
    );

    const result = await createOrder({
      items: items.map((item) => ({
        productId: item.productId,
        count: item.count,
        unitPrice: item.unitPrice,
      })),
      totalAmount: calculatedTotal,
      type: "delivery",
      customerId: currentUser?._id,
      customerType: "customer",
      deliveryInfo: { firstName, lastName, email, address, phone, description },
    });

    if (result.success) {
      router.push("/verify");
    } else {
      setIsSubmitting(false);
    }
  };

  if (items.length === 0) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-muted-foreground">Сагс хоосон байна</p>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Захиалга</h1>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Left — delivery info + payment */}
        <div className="space-y-6">
          <div className="rounded-xl border p-6">
            <h2 className="font-semibold">Хүргэлтийн мэдээлэл</h2>
            <div className="mt-4 grid gap-4 sm:grid-cols-2">
              <div className="space-y-2">
                <Label>Нэр</Label>
                <Input
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="Нэр"
                />
              </div>
              <div className="space-y-2">
                <Label>Овог</Label>
                <Input
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="Овог"
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label>Имэйл</Label>
                <Input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="Имэйл хаяг"
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label>Утас</Label>
                <Input
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="Утасны дугаар"
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label>Хаяг</Label>
                <Input
                  value={address}
                  onChange={(e) => setAddress(e.target.value)}
                  placeholder="Хаягаа оруулна уу"
                />
              </div>
              <div className="space-y-2 sm:col-span-2">
                <Label>Нэмэлт тайлбар</Label>
                <textarea
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Нэмэлт мэдээлэл"
                  rows={3}
                  className="w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm"
                />
              </div>
            </div>
          </div>

          <div className="rounded-xl border p-6">
            <PaymentType payments={payments} />
          </div>
        </div>

        {/* Right — order summary */}
        <div className="space-y-6">
          <div className="rounded-xl border p-6 sticky top-24">
            <h2 className="font-semibold">Захиалгын хураангуй</h2>
            <div className="mt-4 space-y-2">
              {items.map((item) => (
                <div key={item.productId} className="flex justify-between text-sm">
                  <span>
                    {item.productName} x {item.count}
                  </span>
                  <span>{formatPrice(item.unitPrice * item.count)}</span>
                </div>
              ))}
              <div className="border-t pt-2">
                <div className="flex justify-between font-semibold">
                  <span>Нийт</span>
                  <span>{formatPrice(total)}</span>
                </div>
              </div>
            </div>
            <Button
              className="mt-6 w-full"
              onClick={handleSubmit}
              disabled={isSubmitting || !firstName || !phone || !address}
            >
              {isSubmitting ? "Ачааллаж байна..." : "Захиалга илгээх"}
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
}
