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
import { Heart, ShoppingCart } from "lucide-react";

interface ProductCardProps {
  product: Product;
}

export function ProductCard({ product }: ProductCardProps) {
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

  return (
    <div className="group rounded-xl border bg-card overflow-hidden">
      <div className="relative">
        <Link href={`/products/${product._id}`} className="block">
          <div className="aspect-square bg-muted flex items-center justify-center">
            {product.attachment?.url && isValidUrl(product.attachment.url) ? (
              <Image
                src={product.attachment.url}
                alt={product.name || ""}
                width={400}
                height={400}
                className="h-full w-full object-cover"
              />
            ) : (
              <span className="text-4xl">📦</span>
            )}
          </div>
        </Link>
        <button
          onClick={toggleWishlist}
          className="absolute top-3 right-3 p-2 rounded-full bg-background/80 hover:bg-background transition-colors"
          aria-label={isWishlisted ? "Remove" : "Save"}
        >
          <Heart
            className={`h-5 w-5 ${
              isWishlisted ? "fill-red-500 text-red-500" : "text-muted-foreground"
            }`}
          />
        </button>
      </div>
      <div className="p-4">
        <Link href={`/products/${product._id}`}>
          <h3 className="font-medium text-foreground truncate">{product.name || "Бараа"}</h3>
        </Link>
        <p className="mt-1 text-lg font-bold text-primary">
          {formatPrice(product.unitPrice || 0)}
        </p>
        <button
          onClick={addToCart}
          className="mt-3 w-full inline-flex items-center justify-center gap-2 rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors"
        >
          <ShoppingCart className="h-4 w-4" />
          Сагсанд нэмэх
        </button>
      </div>
    </div>
  );
}
