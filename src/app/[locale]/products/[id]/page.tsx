"use client";

import { useState, useEffect } from "react";
import { useAtom } from "jotai";
import Image from "next/image";
import { Link, useRouter } from "@/i18n/routing";
import { useQuery, useMutation } from "@apollo/client/react";
import { cartItemsAtom } from "@/store/cart.store";
import { wishlistItemsAtom } from "@/store/wishlist.store";
import { currentUserAtom } from "@/store/auth.store";
import { useProductDetail } from "@/hooks/queries";
import { formatPrice, isValidUrl } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { CP_WISHLIST_ADD } from "@/graphql/ecommerce/mutations/wishlist";
import {
  CP_PRODUCT_REVIEW_ADD,
  PRODUCT_REVIEW_UPDATE,
  PRODUCT_REVIEW_REMOVE,
} from "@/graphql/ecommerce/mutations/productReview";
import { CP_PRODUCT_REVIEWS, CpProductReviewsData } from "@/graphql/ecommerce/queries/productReview";
import { Heart, Minus, Plus, Star, ArrowLeft } from "lucide-react";

function StarRating({
  rating,
  onRate,
  interactive = false,
  size = 20,
}: {
  rating: number;
  onRate?: (r: number) => void;
  interactive?: boolean;
  size?: number;
}) {
  const [hover, setHover] = useState(0);
  return (
    <div className="flex gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => {
        const filled = interactive ? star <= (hover || rating) : star <= rating;
        return (
          <button
            key={star}
            type="button"
            disabled={!interactive}
            onClick={() => onRate?.(star)}
            onMouseEnter={() => interactive && setHover(star)}
            onMouseLeave={() => interactive && setHover(0)}
          >
            <Star
              className={`h-${size >= 24 ? "6" : "4"} w-${size >= 24 ? "6" : "4"} ${
                filled ? "fill-yellow-400 text-yellow-400" : "text-gray-300"
              }`}
            />
          </button>
        );
      })}
    </div>
  );
}

export default function ProductDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const router = useRouter();
  const [productId, setProductId] = useState<string>("");
  const [quantity, setQuantity] = useState(1);
  const [reviewRating, setReviewRating] = useState(0);
  const [reviewText, setReviewText] = useState("");
  const [editingReviewId, setEditingReviewId] = useState<string | null>(null);

  useEffect(() => {
    params.then((p) => setProductId(p.id));
  }, [params]);

  const { product, loading } = useProductDetail(productId);
  const [, setCartItems] = useAtom(cartItemsAtom);
  const [, setWishlistItems] = useAtom(wishlistItemsAtom);
  const [currentUser] = useAtom(currentUserAtom);

  const [addWishlistMutation] = useMutation(CP_WISHLIST_ADD);
  const [addReview] = useMutation(CP_PRODUCT_REVIEW_ADD);
  const [updateReview] = useMutation(PRODUCT_REVIEW_UPDATE);
  const [removeReview] = useMutation(PRODUCT_REVIEW_REMOVE);

  const { data: reviewsData, refetch: refetchReviews } =
    useQuery<CpProductReviewsData>(CP_PRODUCT_REVIEWS, {
      variables: {
        productIds: productId ? [productId] : [],
        page: 1,
        perPage: 50,
      },
      skip: !productId,
      fetchPolicy: "cache-and-network",
    });

  const reviews = reviewsData?.cpProductReviews || [];
  const myReview = currentUser
    ? reviews.find((r: any) => r.customerId === currentUser._id)
    : null;
  const avgRating =
    reviews.length > 0
      ? reviews.reduce((sum: number, r: any) => sum + (r.review || 0), 0) /
        reviews.length
      : 0;

  useEffect(() => {
    if (myReview) {
      setReviewRating(myReview.review || 0);
      setReviewText(myReview.description || "");
      setEditingReviewId(myReview._id);
    } else {
      setReviewRating(0);
      setReviewText("");
      setEditingReviewId(null);
    }
  }, [myReview]);

  const addToCart = () => {
    if (!product) return;
    setCartItems((prev) => {
      const existing = prev.find((i) => i.productId === product._id);
      if (existing)
        return prev.map((i) =>
          i.productId === product._id
            ? { ...i, count: i.count + quantity }
            : i
        );
      return [
        ...prev,
        {
          productId: product._id,
          count: quantity,
          unitPrice: product.unitPrice || 0,
          productName: product.name,
          productImgUrl: product.attachment?.url,
        },
      ];
    });
  };

  const addToWishlist = async () => {
    if (!product) return;
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

  const handleSubmitReview = async () => {
    if (!currentUser || !productId || reviewRating === 0) return;
    if (editingReviewId) {
      await updateReview({
        variables: {
          _id: editingReviewId,
          productId,
          customerId: currentUser._id,
          review: reviewRating,
          description: reviewText,
        },
      });
    } else {
      await addReview({
        variables: {
          productId,
          customerId: currentUser._id,
          review: reviewRating,
          description: reviewText,
        },
      });
    }
    await refetchReviews();
  };

  const handleDeleteReview = async (reviewId: string) => {
    if (!confirm("Сэтгэгдлийг устгах уу?")) return;
    await removeReview({ variables: { _id: reviewId } });
    await refetchReviews();
    setReviewRating(0);
    setReviewText("");
    setEditingReviewId(null);
  };

  if (loading || !productId)
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-96 bg-muted rounded-xl" />
        </div>
      </div>
    );

  if (!product)
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Бараа олдсонгүй</p>
        <Button onClick={() => router.push("/products")}>Бараа руу буцах</Button>
      </div>
    );

  return (
    <div className="container mx-auto px-4 py-8">
      <button
        onClick={() => router.back()}
        className="flex items-center gap-2 text-muted-foreground hover:text-foreground mb-6"
      >
        <ArrowLeft className="h-4 w-4" />
        Буцах
      </button>

      <div className="grid gap-8 lg:grid-cols-2">
        {/* Product image */}
        <div className="rounded-xl bg-muted overflow-hidden">
          {product.attachment?.url && isValidUrl(product.attachment.url) ? (
            <Image
              src={product.attachment.url}
              alt={product.name || ""}
              width={600}
              height={600}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="aspect-square flex items-center justify-center">
              <span className="text-6xl">📦</span>
            </div>
          )}
        </div>

        {/* Product info */}
        <div className="space-y-6">
          <h1 className="text-3xl font-bold">{product.name}</h1>

          <div className="flex items-center gap-3">
            <p className="text-3xl font-bold text-primary">
              {formatPrice(product.unitPrice || 0)}
            </p>
            <StarRating rating={Math.round(avgRating)} size={16} />
            <span className="text-muted-foreground">({reviews.length})</span>
          </div>

          {/* Quantity */}
          <div className="flex items-center gap-4">
            <span className="text-sm font-medium">Тоо хэмжээ:</span>
            <div className="flex items-center gap-2">
              <button
                onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                className="h-10 w-10 rounded-lg border flex items-center justify-center hover:bg-muted"
              >
                <Minus className="h-4 w-4" />
              </button>
              <span className="w-12 text-center font-medium">{quantity}</span>
              <button
                onClick={() => setQuantity((q) => q + 1)}
                className="h-10 w-10 rounded-lg border flex items-center justify-center hover:bg-muted"
              >
                <Plus className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="flex gap-3">
            <Button onClick={addToCart} className="flex-1">
              <span className="mr-2">🛒</span>
              Сагсанд нэмэх
            </Button>
            <Button variant="outline" onClick={addToWishlist}>
              <Heart className="h-5 w-5" />
            </Button>
          </div>

          {product.description && (
            <div className="prose prose-sm max-w-none">
              <h3 className="font-semibold mb-2">Тайлбар</h3>
              <p className="text-muted-foreground">{product.description}</p>
            </div>
          )}
        </div>
      </div>

      {/* Reviews */}
      <div className="mt-12 border-t pt-10">
        <h2 className="text-2xl font-bold mb-6">
          Сэтгэгдлүүд ({reviews.length})
        </h2>

        {currentUser ? (
          <div className="mb-8 p-6 rounded-xl border bg-card">
            <p className="font-medium mb-3">Сэтгэгдэл бичих</p>
            <StarRating
              rating={reviewRating}
              onRate={setReviewRating}
              interactive
              size={28}
            />
            <textarea
              value={reviewText}
              onChange={(e) => setReviewText(e.target.value)}
              placeholder="Таны сэтгэгдэл..."
              rows={3}
              className="mt-3 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm"
            />
            <div className="mt-3 flex gap-2">
              <Button
                onClick={handleSubmitReview}
                disabled={reviewRating === 0}
              >
                {editingReviewId ? "Шинэчлэх" : "Илгээх"}
              </Button>
              {editingReviewId && (
                <Button
                  variant="outline"
                  onClick={() => {
                    setReviewRating(0);
                    setReviewText("");
                    setEditingReviewId(null);
                  }}
                >
                  Цуцлах
                </Button>
              )}
            </div>
          </div>
        ) : (
          <p className="mb-6">
            Сэтгэгдэл бичихийн тулд{" "}
            <Link href="/login" className="text-primary hover:underline">
              нэвтэрнэ үү
            </Link>
          </p>
        )}

        <div className="space-y-4">
          {reviews.map((review: any) => (
            <div key={review._id} className="p-4 rounded-lg border">
              <div className="flex items-center justify-between mb-2">
                <StarRating rating={review.review || 0} size={14} />
                {review.customerId === currentUser?._id && (
                  <div className="flex gap-2">
                    <button
                      onClick={() => {
                        setReviewRating(review.review || 0);
                        setReviewText(review.description || "");
                        setEditingReviewId(review._id);
                      }}
                      className="text-sm text-primary hover:underline"
                    >
                      Засах
                    </button>
                    <button
                      onClick={() => handleDeleteReview(review._id)}
                      className="text-sm text-destructive hover:underline"
                    >
                      Устгах
                    </button>
                  </div>
                )}
              </div>
              {review.description && (
                <p className="text-muted-foreground">{review.description}</p>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
