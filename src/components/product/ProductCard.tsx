"use client";

import { useAtom } from "jotai";
import Image from "next/image";
import Link from "next/link";
import { cartItemsAtom } from "@/store/cart.store";
import { Product } from "@/data/products";
import { Heart, Plus, Check } from "lucide-react";
import { useState } from "react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
  const [cartItems, setCartItems] = useAtom(cartItemsAtom);
  const [added, setAdded] = useState(false);

  const addToCart = () => {
    const defaultVariant = product.variants[0];
    if (!defaultVariant) return;

    setCartItems((prev) => {
      const existing = prev.find(
        (item) => item.productId === product.id && item.variantId === defaultVariant.id
      );

      if (existing) {
        return prev.map((item) =>
          item.productId === product.id && item.variantId === defaultVariant.id
            ? { ...item, count: item.count + 1 }
            : item
        );
      }

      return [
        ...prev,
        {
          productId: product.id,
          variantId: defaultVariant.id,
          productName: product.name,
          variantName: defaultVariant.name,
          unitPrice: defaultVariant.price,
          count: 1,
          productImgUrl: product.image,
          weight: defaultVariant.weight,
        },
      ];
    });

    setAdded(true);
    setTimeout(() => setAdded(false), 1500);
  };

  const isInCart = cartItems.some((item) => item.productId === product.id);

  return (
    <div className="group rounded-xl border bg-card overflow-hidden">
      <div className="relative">
        <Link href={`/products/${product.id}`} className="block">
          <div className="aspect-square bg-muted flex items-center justify-center relative">
            <Image
              src={product.image}
              alt={product.name}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 50vw, 25vw"
            />
          </div>
        </Link>
        {product.badge && (
          <span
            className={`absolute top-2 left-2 px-2 py-1 rounded-full text-xs font-medium ${
              product.badge === "Хямдралтай"
                ? "bg-red-500 text-white"
                : product.badge === "Онцлох"
                ? "bg-primary text-primary-foreground"
                : "bg-green-500 text-white"
            }`}
          >
            {product.badge}
          </span>
        )}
        <button
          className="absolute top-2 right-2 p-1.5 rounded-full bg-background/80 hover:bg-background transition-colors"
          aria-label="Хадгалах"
        >
          <Heart className="h-4 w-4 text-muted-foreground" />
        </button>
      </div>
      <div className="p-3">
        <Link href={`/products/${product.id}`}>
          <h3 className="font-medium text-sm text-foreground line-clamp-2 h-10">
            {product.name}
          </h3>
        </Link>
        <p className="text-xs text-muted-foreground mt-1">{product.brand}</p>
        <div className="flex items-center gap-2 mt-2">
          <p className="text-lg font-bold text-primary">
            ₮{product.price.toLocaleString()}
          </p>
          {product.oldPrice && (
            <p className="text-sm text-muted-foreground line-through">
              ₮{product.oldPrice.toLocaleString()}
            </p>
          )}
        </div>
        <button
          onClick={addToCart}
          className={`mt-2 w-full inline-flex items-center justify-center gap-2 rounded-full px-4 py-2 text-sm font-medium transition-colors ${
            added
              ? "bg-green-500 text-white"
              : "bg-primary text-primary-foreground hover:bg-primary/90"
          }`}
        >
          {added ? (
            <>
              <Check className="h-4 w-4" />
              Нэмэгдлээ
            </>
          ) : (
            <>
              <Plus className="h-4 w-4" />
              {isInCart ? "Дахин нэмэх" : "Сагсанд нэмэх"}
            </>
          )}
        </button>
      </div>
    </div>
  );
}
