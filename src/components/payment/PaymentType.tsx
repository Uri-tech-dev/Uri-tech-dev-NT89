"use client";

import { useAtom } from "jotai";
import { selectedPaymentAtom } from "@/store/payment.store";
import { IPayment } from "@/types/payment.types";
import { Check } from "lucide-react";

interface PaymentTypeProps {
  payments: IPayment[];
}

export function PaymentType({ payments }: PaymentTypeProps) {
  const [selected, setSelected] = useAtom(selectedPaymentAtom);

  return (
    <div className="space-y-3">
      <h3 className="font-medium">Төлбөрийн хэлбэр сонгох</h3>
      <div className="grid gap-3">
        {payments.map((payment) => (
          <button
            key={payment._id}
            onClick={() => setSelected(payment)}
            className={`flex items-center gap-3 rounded-lg border p-4 text-left transition-colors ${
              selected?._id === payment._id
                ? "border-primary bg-primary/5"
                : "hover:bg-accent"
            }`}
          >
            <div
              className={`h-5 w-5 rounded-full border flex items-center justify-center ${
                selected?._id === payment._id
                  ? "border-primary bg-primary"
                  : "border-muted-foreground"
              }`}
            >
              {selected?._id === payment._id && (
                <Check className="h-3 w-3 text-primary-foreground" />
              )}
            </div>
            <div>
              <p className="font-medium">{payment.name}</p>
              <p className="text-sm text-muted-foreground">{payment.kind}</p>
            </div>
          </button>
        ))}
      </div>
    </div>
  );
}
