"use client";

import { useEffect } from "react";
import { useRouter, Link } from "@/i18n/routing";
import { useAuth } from "@/lib/auth/AuthContext";
import { useOrders } from "@/hooks/order";
import { formatPrice } from "@/lib/utils";
import { Package, Clock, CheckCircle, XCircle } from "lucide-react";

const statusConfig: Record<
  string,
  { label: string; icon: typeof Package; color: string }
> = {
  pending: { label: "Хүлээгдэж байна", icon: Clock, color: "text-warning" },
  confirmed: {
    label: "Баталгаажсан",
    icon: CheckCircle,
    color: "text-success",
  },
  paid: { label: "Төлөгдсөн", icon: CheckCircle, color: "text-success" },
  cancelled: { label: "Цуцлагдсан", icon: XCircle, color: "text-destructive" },
};

export default function OrdersPage() {
  const { user, loading: authLoading } = useAuth();
  const router = useRouter();
  const { orders, loading } = useOrders(user?._id);

  useEffect(() => {
    if (!authLoading && !user) {
      router.push("/login");
    }
  }, [authLoading, user, router]);

  if (authLoading || loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="space-y-4">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-24 animate-pulse rounded-xl bg-muted" />
          ))}
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Захиалгууд</h1>

      {orders.length === 0 ? (
        <div className="text-center py-16">
          <Package className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">Захиалга байхгүй байна</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map((order: any) => {
            const status = statusConfig[order.status] || statusConfig.pending;
            const StatusIcon = status.icon;

            return (
              <Link
                key={order._id}
                href={`/orders/${order._id}`}
                className="block rounded-xl border p-4 hover:bg-accent transition-colors"
              >
                <div className="flex items-center justify-between">
                  <div>
                    <div className="flex items-center gap-2">
                      <p className="font-medium">
                        Захиалга #{order._id.slice(-6)}
                      </p>
                      <span className={`flex items-center gap-1 text-sm ${status.color}`}>
                        <StatusIcon className="h-4 w-4" />
                        {status.label}
                      </span>
                    </div>
                    <p className="text-sm text-muted-foreground">
                      {new Date(order.createdAt).toLocaleDateString("mn-MN")}
                    </p>
                  </div>
                  <div className="text-right">
                    <p className="font-semibold">
                      {formatPrice(order.totalAmount)}
                    </p>
                    <p className="text-sm text-muted-foreground">
                      {order.items?.length || 0} бараа
                    </p>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      )}
    </div>
  );
}
