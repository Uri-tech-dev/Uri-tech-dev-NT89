"use client";

import React, { useState } from "react";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { getProductById } from "@/data/products";
import { Button } from "@/components/ui/button";
import {
  Heart,
  Minus,
  Plus,
  ArrowLeft,
  ShoppingCart,
  Package,
  Truck,
  Check,
} from "lucide-react";

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const [productId, setProductId] = useState<string>("");
  const [selectedVariant, setSelectedVariant] = useState<string>("");
  const [quantity, setQuantity] = useState(1);

  // Get product ID from params
  React.useEffect(() => {
    params.then((p) => {
      setProductId(p.id);
      const product = getProductById(p.id);
      if (product?.variants && product.variants.length > 0) {
        setSelectedVariant(product.variants[0].id);
      }
    });
  }, [params]);

  const product = getProductById(productId);
  const variant = product?.variants.find((v) => v.id === selectedVariant);

  if (!product) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p className="text-center text-muted-foreground">Бараа олдсонгүй</p>
      </div>
    );
  }

  const totalPrice = (variant?.price || product.price) * quantity;

  return (
    <div className="pb-24">
      {/* Header */}
      <div className="container mx-auto px-4 py-4">
        <Link
          href="/products"
          className="inline-flex items-center gap-2 text-muted-foreground hover:text-foreground"
        >
          <ArrowLeft className="h-4 w-4" />
          Буцах
        </Link>
      </div>

      {/* Product Image */}
      <div className="relative aspect-square bg-muted">
        <Image
          src={product.image}
          alt={product.name}
          fill
          className="object-cover"
          priority
        />
        {product.badge && (
          <span
            className={`absolute top-4 left-4 px-3 py-1.5 rounded-full text-sm font-medium ${
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
        <button className="absolute top-4 right-4 p-2 rounded-full bg-background/80 hover:bg-background transition-colors">
          <Heart className="h-5 w-5 text-muted-foreground" />
        </button>
      </div>

      {/* Product Info */}
      <div className="container mx-auto px-4 py-6">
        <div className="flex items-start justify-between gap-4">
          <div>
            <p className="text-sm text-muted-foreground">{product.brand}</p>
            <h1 className="text-2xl font-bold mt-1">{product.name}</h1>
          </div>
        </div>

        {/* Price */}
        <div className="flex items-baseline gap-3 mt-4">
          <p className="text-3xl font-bold text-primary">
            ₮{totalPrice.toLocaleString()}
          </p>
          {product.oldPrice && (
            <p className="text-lg text-muted-foreground line-through">
              ₮{(product.oldPrice * quantity).toLocaleString()}
            </p>
          )}
        </div>

        {/* Description */}
        {product.description && (
          <p className="text-muted-foreground mt-2">{product.description}</p>
        )}

        {/* Variant Selector */}
        <div className="mt-6">
          <p className="text-sm font-medium mb-3">Хэмжээ сонгох:</p>
          <div className="grid grid-cols-2 gap-2">
            {product.variants.map((v) => (
              <button
                key={v.id}
                onClick={() => {
                  setSelectedVariant(v.id);
                  setQuantity(1);
                }}
                className={`relative p-3 rounded-xl border text-left transition-colors ${
                  selectedVariant === v.id
                    ? "border-primary bg-primary/5"
                    : "border-border hover:border-primary/50"
                }`}
              >
                {selectedVariant === v.id && (
                  <div className="absolute top-2 right-2">
                    <Check className="h-4 w-4 text-primary" />
                  </div>
                )}
                <p className="font-medium">{v.name}</p>
                <p className="text-sm text-primary font-bold mt-1">
                  ₮{v.price.toLocaleString()}
                </p>
                {v.weight && (
                  <p className="text-xs text-muted-foreground">{v.weight} кг</p>
                )}
              </button>
            ))}
          </div>
        </div>

        {/* Quantity Selector */}
        <div className="mt-6">
          <p className="text-sm font-medium mb-3">Тоо хэмжээ:</p>
          <div className="flex items-center gap-4">
            <button
              onClick={() => setQuantity((q) => Math.max(1, q - 1))}
              className="h-12 w-12 rounded-xl border flex items-center justify-center hover:bg-muted transition-colors"
            >
              <Minus className="h-5 w-5" />
            </button>
            <span className="text-2xl font-bold w-16 text-center">
              {quantity}
            </span>
            <button
              onClick={() => setQuantity((q) => q + 1)}
              className="h-12 w-12 rounded-xl border flex items-center justify-center hover:bg-muted transition-colors"
            >
              <Plus className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Product Details */}
        <div className="mt-8 space-y-4">
          <div className="flex items-center gap-3 p-4 bg-muted rounded-xl">
            <Package className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-medium">Бренд</p>
              <p className="text-sm text-muted-foreground">{product.brand}</p>
            </div>
          </div>

          <div className="flex items-center gap-3 p-4 bg-muted rounded-xl">
            <Truck className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-medium">Нийлүүлэгч</p>
              <p className="text-sm text-muted-foreground">
                {product.supplier}
              </p>
            </div>
          </div>

          {product.origin && (
            <div className="flex items-center gap-3 p-4 bg-muted rounded-xl">
              <Check className="h-5 w-5 text-primary" />
              <div>
                <p className="text-sm font-medium">Гарал үүслийн газар</p>
                <p className="text-sm text-muted-foreground">
                  {product.origin}
                </p>
              </div>
            </div>
          )}

          <div className="flex items-center gap-3 p-4 bg-muted rounded-xl">
            <ShoppingCart className="h-5 w-5 text-primary" />
            <div>
              <p className="text-sm font-medium">Үлдэгдэл</p>
              <p className="text-sm text-muted-foreground">
                {product.stockQuantity
                  ? `${product.stockQuantity} ширхэг`
                  : "Боломжтой"}
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Actions */}
      <div className="fixed bottom-0 left-0 right-0 bg-background border-t p-4">
        <div className="container mx-auto flex items-center gap-4">
          <div className="flex-1">
            <p className="text-sm text-muted-foreground">Нийт дүн</p>
            <p className="text-xl font-bold">₮{totalPrice.toLocaleString()}</p>
          </div>
          <Button className="flex-1 h-12 text-base">
            <ShoppingCart className="h-5 w-5 mr-2" />
            Сагсанд нэмэх
          </Button>
        </div>
      </div>
    </div>
  );
}
