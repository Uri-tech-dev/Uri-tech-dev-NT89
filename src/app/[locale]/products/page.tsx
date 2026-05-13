"use client";

import { useState } from "react";
import { useProducts, useProductCategories } from "@/hooks/queries";
import { ProductCard } from "@/components/product/ProductCard";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Search } from "lucide-react";

export default function ProductsPage() {
  const [searchValue, setSearchValue] = useState("");
  const [selectedCategory, setSelectedCategory] = useState<string | undefined>(
    undefined
  );
  const [page, setPage] = useState(1);

  const { products, loading } = useProducts({
    categoryId: selectedCategory,
    page,
    perPage: 20,
    searchValue: searchValue || undefined,
  });
  const { categories } = useProductCategories();

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-2xl font-bold mb-6">Бараанууд</h1>

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
      <div className="flex gap-2 overflow-x-auto pb-4 mb-6">
        <Button
          variant={!selectedCategory ? "default" : "outline"}
          size="sm"
          onClick={() => setSelectedCategory(undefined)}
        >
          Бүгд
        </Button>
        {categories.map((cat: { _id: string; name?: string }) => (
          <Button
            key={cat._id}
            variant={selectedCategory === cat._id ? "default" : "outline"}
            size="sm"
            onClick={() => setSelectedCategory(cat._id)}
          >
            {cat.name}
          </Button>
        ))}
      </div>

      {/* Product grid */}
      {loading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {Array.from({ length: 8 }).map((_, i) => (
            <div
              key={i}
              className="rounded-xl border bg-card p-4 animate-pulse"
            >
              <div className="aspect-square bg-muted rounded-lg mb-4" />
              <div className="h-4 bg-muted rounded w-3/4 mb-2" />
              <div className="h-4 bg-muted rounded w-1/2" />
            </div>
          ))}
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product: any) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>

          {/* Pagination */}
          <div className="mt-8 flex justify-center gap-2">
            <Button
              variant="outline"
              onClick={() => setPage((p) => Math.max(1, p - 1))}
              disabled={page <= 1}
            >
              Өмнөх
            </Button>
            <span className="flex items-center px-4">{page} хуудас</span>
            <Button
              variant="outline"
              onClick={() => setPage((p) => p + 1)}
              disabled={products.length < 20}
            >
              Дараах
            </Button>
          </div>
        </>
      )}
    </div>
  );
}
