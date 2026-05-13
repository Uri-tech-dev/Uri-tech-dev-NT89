"use client";

import { useState } from "react";
import { useMutation, useQuery } from "@apollo/client/react";
import { Link } from "@/i18n/routing";
import Image from "next/image";
import { useAuth } from "@/lib/auth/AuthContext";
import { CP_WISHLIST } from "@/graphql/ecommerce/queries/wishlist";
import { CP_WISHLIST_REMOVE } from "@/graphql/ecommerce/mutations/wishlist";
import { Button } from "@/components/ui/button";
import { formatPrice, isValidUrl } from "@/lib/utils";
import { Heart, Trash2 } from "lucide-react";

export default function WishlistPage() {
  const { user } = useAuth();
  const [removingId, setRemovingId] = useState("");

  const { data, loading, refetch } = useQuery(CP_WISHLIST, {
    variables: { customerId: user?._id || "" },
    skip: !user?._id,
    fetchPolicy: "network-only",
  });

  const [removeMutation] = useMutation(CP_WISHLIST_REMOVE);
  const wishlist = (data as any)?.cpWishlist || [];

  const handleRemove = async (_id: string) => {
    setRemovingId(_id);
    try {
      await removeMutation({ variables: { _id } });
      refetch();
    } finally {
      setRemovingId("");
    }
  };

  if (!user)
    return (
      <div className="container mx-auto px-4 py-16 text-center">
        <Heart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
        <h1 className="text-2xl font-bold mb-2">Хадгалсан бараа</h1>
        <p className="text-muted-foreground mb-6">Харахын тулд нэвтэрнэ үү</p>
        <Link href="/login">
          <Button>Нэвтрэх</Button>
        </Link>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">
        Хадгалсан бараа{" "}
        <span className="text-muted-foreground">({wishlist.length})</span>
      </h1>

      {wishlist.length === 0 ? (
        <div className="text-center py-16">
          <Heart className="h-16 w-16 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground mb-6">Хадгалсан бараа байхгүй</p>
          <Link href="/products">
            <Button variant="outline">Бараа үзэх</Button>
          </Link>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {wishlist.map((item: any) => (
            <div key={item._id} className="rounded-xl border overflow-hidden">
              <Link href={`/products/${item.productId}`}>
                <div className="aspect-square bg-muted">
                  {item.product?.attachment?.url &&
                  isValidUrl(item.product.attachment.url) ? (
                    <Image
                      src={item.product.attachment.url}
                      alt={item.product?.name || ""}
                      width={400}
                      height={400}
                      className="h-full w-full object-cover"
                    />
                  ) : (
                    <div className="h-full w-full flex items-center justify-center">
                      <span className="text-4xl">📦</span>
                    </div>
                  )}
                </div>
              </Link>
              <div className="p-4">
                <h3>{item.product?.name || "Бараа"}</h3>
                <p className="text-primary font-semibold">
                  {formatPrice(item.product?.unitPrice || 0)}
                </p>
                <div className="flex gap-2 mt-4">
                  <Link href={`/products/${item.productId}`} className="flex-1">
                    <Button variant="outline" className="w-full" size="sm">
                      Дэлгэрэнгүй
                    </Button>
                  </Link>
                  <Button
                    variant="outline"
                    size="sm"
                    className="border-destructive text-destructive"
                    onClick={() => handleRemove(item._id)}
                    disabled={removingId === item._id}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}
