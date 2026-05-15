"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";
import { useAtom } from "jotai";
import { cartCountAtom } from "@/store/cart.store";
import { ShoppingCart, Search, Wheat } from "lucide-react";

export default function Header() {
  const [searchQuery, setSearchQuery] = useState("");
  const [cartCount] = useAtom(cartCountAtom);

  return (
    <header className="sticky top-0 z-50 w-full bg-background border-b">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center gap-3">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2 flex-shrink-0">
            <Wheat className="h-6 w-6 text-primary" />
            <span className="text-lg font-extrabold text-primary">NT89</span>
          </Link>

          {/* Search Bar */}
          <div className="flex-1 max-w-[200px]">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <input
                type="text"
                placeholder="Бараа хайх..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="w-full pl-9 pr-4 py-2 bg-muted rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-primary"
              />
            </div>
          </div>

          <div className="flex items-center gap-2">
            {/* Free Delivery Badge */}
            <span className="hidden sm:inline text-xs text-success font-medium">
              Хүргэлт үнэгүй
            </span>

            {/* Cart Button */}
            <Link
              href="/cart"
              className="relative flex items-center gap-2 bg-primary text-primary-foreground rounded-full px-4 py-2 hover:bg-primary/90 transition-colors"
            >
              <ShoppingCart className="h-4 w-4" />
              <span className="text-sm font-medium">
                {cartCount > 0 ? cartCount : 0}
              </span>
              {cartCount > 0 && (
                <span className="absolute -top-1 -right-1 h-5 w-5 bg-red-500 rounded-full flex items-center justify-center text-xs">
                  {cartCount}
                </span>
              )}
            </Link>
          </div>
        </div>
      </div>
    </header>
  );
}
