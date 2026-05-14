"use client";

import { useAtom } from "jotai";
import Image from "next/image";
import { Link } from "@/i18n/routing";
import { useMutation } from "@apollo/client/react";
import { cartItemsAtom } from "@/store/cart.store";
import { currentUserAtom } from "@/store/auth.store";
import { wishlistItemsAtom } from "@/store/wishlist.store";
import { formatPrice, isValidUrl } from "@/lib/utils";
import { Product } from "@/graphql/ecommerce/queries/product";
import { CP_WISHLIST_ADD } from "@/graphql/ecommerce/mutations/wishlist";
import { Heart, ShoppingCart, Plus } from "lucide-react";

interface ProductCardProps {
  product: Product;
  showOldPrice?: boolean;
}

export function ProductCard({ product, showOldPrice = false }: ProductCardProps) {
  const [, setCartItems] = useAtom(cartItemsAtom);
  const [currentUser] = useAtom(currentUserAtom);
  const [wishlistItems, setWishlistItems] = useAtom(wishlistItemsAtom);
  const [addWishlistMutation] = useMutation(CP_WISHLIST_ADD);

  const addToCart = () => {
    setCartItems((prev) => {
      const existing = prev.find((item) => item.productId === product._id);
      if (existing)
        return prev.map((item) =>
          item.productId === product._id
            ? { ...item, count: item.count + 1 }
            : item
        );
      return [
        ...prev,
        {
          productId: product._id,
          count: 1,
          unitPrice: product.unitPrice || 0,
          productName: product.name,
          productImgUrl: product.attachment?.url,
        },
      ];
    });
  };

  const isWishlisted = wishlistItems.some(
    (item) => item.productId === product._id
  );

  const toggleWishlist = async (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (isWishlisted) {
      setWishlistItems((prev) =>
        prev.filter((item) => item.productId !== product._id)
      );
      return;
    }
    if (currentUser?._id)
      await addWishlistMutation({
        variables: { productId: product._id, customerId: currentUser._id },
      });
    setWishlistItems((prev) => {
      if (prev.find((item) => item.productId === product._id)) return prev;
      return [
        ...prev,
        {
          productId: product._id,
          productName: product.name,
          unitPrice: product.unitPrice,
          productImgUrl: product.attachment?.url,
        },
      ];
    });
  };

  const oldPrice = showOldPrice && product.unitPrice 
    ? Math.round(product.unitPrice * 1.3) 
    : null;

  return (
    <div className="group rounded-xl border bg-card overflow-hidden">
      <div className="relative">
        <Link href={`/products/${product._id}`} className="block">
          <div className="aspect-square bg-muted flex items-center justify-center relative">
            {product.attachment?.url && isValidUrl(product.attachment.url) ? (
              <Image
                src={product.attachment.url}
                alt={product.name || ""}
                fill
                className="object-cover"
                sizes="(max-width: 768px) 50vw, 25vw"
              />
            ) : (
              <span className="text-4xl">📦</span>
            )}
          </div>
        </Link>
        <button
          onClick={toggleWishlist}
          className="absolute top-2 right-2 p-1.5 rounded-full bg-background/80 hover:bg-background transition-colors"
          aria-label={isWishlisted ? "Remove" : "Save"}
        >
          <Heart
            className={`h-4 w-4 ${
              isWishlisted ? "fill-red-500 text-red-500" : "text-muted-foreground"
            }`}
          />
        </button>
      </div>
      <div className="p-3">
        <Link href={`/products/${product._id}`}>
          <h3 className="font-medium text-sm text-foreground line-clamp-2 h-10">{product.name || "Бараа"}</h3>
        </Link>
        <p className="text-xs text-muted-foreground mt-1">{product.category?.name || "Бараа"}</p>
        <div className="flex items-center gap-2 mt-2">
          <p className="text-lg font-bold text-primary">
            {formatPrice(product.unitPrice || 0)}
          </p>
          {oldPrice && (
            <p className="text-sm text-muted-foreground line-through">
              {formatPrice(oldPrice)}
            </p>
          )}
        </div>
        <button
          onClick={addToCart}
          className="mt-2 w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <Plus className="h-4 w-4" />
          Сагсанд нэмэх
        </button>
      </div>
    </div>
  );
}
