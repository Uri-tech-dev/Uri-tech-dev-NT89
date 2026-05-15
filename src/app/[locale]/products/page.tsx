"use client";

import { useState, useMemo } from "react";
import { products, categories, searchProducts } from "@/data/products";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search, SlidersHorizontal } from "lucide-react";
import Image from "next/image";
import Link from "next/link";

export default function ProductsPage() {
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<
    string | undefined
  >(undefined);

  const filteredProducts = useMemo(() => {
    let result = products;

    if (selectedCategory) {
      result = result.filter((p) => p.category === selectedCategory);
    }

    if (searchValue) {
      result = searchProducts(searchValue);
    }

    return result;
  }, [selectedCategory, searchValue]);

  return (
    <div className="container mx-auto px-4 py-6 pb-24">
      <div className="flex items-center justify-between mb-6">
        <h1 className="text-2xl font-bold">Бараанууд</h1>
        <Button variant="outline" size="icon">
          <SlidersHorizontal className="h-4 w-4" />
        </Button>
      </div>

      {/* Search */}
      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          placeholder="Бараа хайх..."
          value={searchValue}
          onChange={(e) => setSearchValue(e.target.value)}
          className="pl-10"
        />
      </div>

      {/* Category filter */}
      <div className="flex gap-2 overflow-x-auto pb-4 mb-6 -mx-4 px-4 scrollbar-hide">
        <Button
          variant={!selectedCategory ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedCategory(undefined)}
          className="flex-shrink-0"
        >
          Бүгд
        </Button>
        {categories.map((cat) => (
          <Button
            key={cat.id}
            variant={selectedCategory === cat.id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(cat.id)}
            className="flex-shrink-0"
          >
            {cat.name}
          </Button>
        ))}
      </div>

      {/* Results count */}
      <p className="text-sm text-muted-foreground mb-4">
        {filteredProducts.length} бараа олдлоо
      </p>

      {/* Product grid */}
      <div className="grid grid-cols-2 gap-4">
        {filteredProducts.map((product) => (
          <Link
            key={product.id}
            href={`/products/${product.id}`}
            className="group rounded-xl border bg-card overflow-hidden"
          >
            <div className="relative">
              <div className="aspect-square bg-muted flex items-center justify-center relative">
                <Image
                  src={product.image}
                  alt={product.name}
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 50vw, 25vw"
                />
              </div>
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
            </div>
            <div className="p-3">
              <h3 className="font-medium text-sm text-foreground line-clamp-2 h-10">
                {product.name}
              </h3>
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
            </div>
          </Link>
        ))}
      </div>

      {filteredProducts.length === 0 && (
        <div className="text-center py-12">
          <p className="text-muted-foreground">Бараа олдсонгүй</p>
        </div>
      )}
    </div>
  );
}
