"use client";

import { useState, useEffect, useCallback } from "react";
import { useAtom } from "jotai";
import { useRouter } from "@/i18n/routing";
import { activeOrderAtom } from "@/store/order.store";
import { selectedPaymentAtom, invoiceAtom } from "@/store/payment.store";
import { useAuth } from "@/lib/auth/AuthContext";
import {
  useCreateInvoice,
  useCheckInvoice,
  useAddPaymentTransaction,
} from "@/hooks/payment";
import { Button } from "@/components/ui/button";
import { formatPrice } from "@/lib/utils";
import { CheckCircle, Clock, Package } from "lucide-react";

export default function VerifyPage() {
  const router = useRouter();
  const { user } = useAuth();
  const [activeOrder] = useAtom(activeOrderAtom);
  const [selectedPayment] = useAtom(selectedPaymentAtom);
  const [invoice] = useAtom(invoiceAtom);

  const { createInvoice } = useCreateInvoice();
  const { checkInvoice } = useCheckInvoice();
  const { addTransaction } = useAddPaymentTransaction();

  const [qrData, setQrData] = useState("");
  const [createdInvoiceId, setCreatedInvoiceId] = useState("");
  const [checking, setChecking] = useState(false);
  const [status, setStatus] = useState("");
  const [paymentStatus, setPaymentStatus] = useState<
    "idle" | "creating" | "created" | "paid" | "error"
  >("idle");

  const pollPayment = useCallback(
    async (invoiceId: string) => {
      if (!invoiceId || paymentStatus === "paid") return;
      const result = await checkInvoice(invoiceId);
      if (result === "paid") {
        setPaymentStatus("paid");
        setStatus("Төлбөр амжилттай хийгдлээ! 🎉");
      }
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    []
  );

  useEffect(() => {
    const id = createdInvoiceId || invoice?._id;
    if (!id || paymentStatus === "paid") return;
    const interval = setInterval(() => pollPayment(id), 5000);
    return () => clearInterval(interval);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createdInvoiceId, invoice?._id]);

  const handleCreateInvoice = async () => {
    if (!activeOrder || !selectedPayment) return;
    setPaymentStatus("creating");

    const orderTotal =
      activeOrder.totalAmount && activeOrder.totalAmount > 0
        ? activeOrder.totalAmount
        : activeOrder.items?.reduce(
            (s: number, i: { unitPrice?: number; count?: number }) =>
              s + (i.unitPrice || 0) * (i.count || 1),
            0
          ) || 0;

    const result = await createInvoice({
      paymentIds: [selectedPayment._id],
      amount: orderTotal,
      description: `Захиалга #${activeOrder._id}`,
      contentType: "pos:orders",
      contentTypeId: activeOrder._id,
      customerId: user?._id || "empty",
      customerType: user?._id ? "customer" : "visitor",
    });

    if (result.invoice?._id) {
      setCreatedInvoiceId(result.invoice._id);
      setPaymentStatus("created");

      const txResult = await addTransaction({
        invoiceId: result.invoice._id,
        paymentId: selectedPayment._id,
        amount: orderTotal,
      });

      const qr =
        (txResult.transaction?.response as Record<string, unknown>)?.qrData ||
        (txResult.transaction?.details as Record<string, unknown>)?.qrData ||
        "";
      if (qr) setQrData(qr as string);
    } else {
      setPaymentStatus("error");
      setStatus("Төлбөр үүсгэхэд алдаа гарлаа");
    }

    if (result.invoice?.redirectUrl) {
      window.location.href = result.invoice.redirectUrl;
    }
  };

  const handleCheckStatus = async () => {
    const id = createdInvoiceId || invoice?._id;
    if (!id) {
      setStatus("Invoice олдсонгүй.");
      return;
    }
    setChecking(true);
    const result = await checkInvoice(id);
    if (result === "paid") {
      setPaymentStatus("paid");
      setStatus("Төлбөр амжилттай хийгдлээ! 🎉");
    } else if (result === "pending") {
      setStatus("Төлбөр хийгдээгүй байна. QR кодоор төлнө үү.");
    } else {
      setStatus("Мэдээлэл олдсонгүй");
    }
    setChecking(false);
  };

  const orderItems = activeOrder?.items || [];
  const orderTotal =
    activeOrder?.totalAmount && activeOrder.totalAmount > 0
      ? activeOrder.totalAmount
      : orderItems.reduce(
          (s, i) => s + (i.unitPrice || 0) * (i.count || 1),
          0
        );

  if (!activeOrder) {
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
        <h2 className="text-xl font-semibold">Идэвхтэй захиалга олдсонгүй</h2>
        <p className="mt-2 text-muted-foreground">
          Та эхлээд бараа сонгон захиалаарай
        </p>
        <Button onClick={() => router.push("/products")} className="mt-6">
          Бараа харах
        </Button>
      </div>
    );
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Төлбөр баталгаажуулах</h1>

      <div className="grid gap-8 lg:grid-cols-3">
        <div className="lg:col-span-2 space-y-6">
          <div className="rounded-xl border p-6">
            <div className="flex items-center justify-between mb-4">
              <div>
                <p className="text-sm text-muted-foreground">Захиалгын дугаар</p>
                <p className="text-lg font-bold">#{activeOrder._id}</p>
              </div>
              <span className="inline-flex items-center gap-1 rounded-full bg-warning/10 px-3 py-1 text-sm font-medium text-warning">
                <Clock className="h-4 w-4" />
                Хүлээгдэж байна
              </span>
            </div>

            <div className="space-y-3">
              {orderItems.map((item: any, idx: number) => (
                <div key={idx} className="flex items-center gap-4">
                  <div className="h-16 w-16 rounded-lg bg-muted flex items-center justify-center">
                    <span className="text-xl">📦</span>
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{item.productName || "Бараа"}</p>
                    <p className="text-sm text-muted-foreground">
                      {item.count} x {formatPrice(item.unitPrice || 0)}
                    </p>
                  </div>
                  <p className="font-semibold">
                    {formatPrice((item.unitPrice || 0) * (item.count || 1))}
                  </p>
                </div>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t">
              <div className="flex justify-between text-lg font-bold">
                <span>Нийт төлөх</span>
                <span className="text-primary">{formatPrice(orderTotal)}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-6">
          <div className="rounded-xl border p-6 sticky top-24">
            <h3 className="font-semibold">Төлбөр</h3>

            {paymentStatus === "paid" && (
              <div className="mt-4 rounded-xl bg-success/10 p-4 text-center">
                <CheckCircle className="h-12 w-12 mx-auto text-success mb-2" />
                <p className="font-semibold text-success">Төлбөр амжилттай!</p>
                <Button
                  onClick={() => router.push("/orders")}
                  className="mt-3 w-full"
                  variant="outline"
                >
                  Захиалгууд руу
                </Button>
              </div>
            )}

            {paymentStatus !== "paid" && (
              <>
                <div className="mt-4">
                  <p className="text-sm text-muted-foreground">Төлбөрийн хэрэгсэл</p>
                  <div className="mt-2 rounded-lg border bg-muted/30 p-3">
                    <p className="font-medium">{selectedPayment?.name || "Сонгоогүй"}</p>
                  </div>
                </div>

                <div className="mt-4">
                  <p className="text-sm text-muted-foreground">Төлөх дүн</p>
                  <p className="text-2xl font-bold text-primary">
                    {formatPrice(orderTotal)}
                  </p>
                </div>

                {qrData && (
                  <div className="mt-4 rounded-xl bg-white p-4 text-center">
                    <p className="mb-2 text-sm text-muted-foreground">QR кодоор төлнө үү</p>
                    <img
                      src={qrData}
                      alt="Payment QR"
                      className="mx-auto rounded-lg border"
                      style={{ maxWidth: 200 }}
                    />
                  </div>
                )}

                <div className="mt-6 space-y-3">
                  <Button
                    onClick={handleCreateInvoice}
                    disabled={paymentStatus === "creating" || !selectedPayment}
                    className="w-full"
                  >
                    {paymentStatus === "creating"
                      ? "Үүсгэж байна..."
                      : qrData
                      ? "QR код дахин авах"
                      : "Төлбөр төлөх"}
                  </Button>

                  <Button
                    variant="outline"
                    onClick={handleCheckStatus}
                    disabled={checking || !createdInvoiceId}
                    className="w-full"
                  >
                    {checking ? "Шалгаж байна..." : "Төлөв шалгах"}
                  </Button>
                </div>
              </>
            )}

            {status && paymentStatus !== "paid" && (
              <div className="mt-4 rounded-lg bg-muted p-3 text-center text-sm text-muted-foreground">
                {status}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
