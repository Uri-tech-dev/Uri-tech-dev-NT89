import { Link } from "@/i18n/routing";
import {
  products,
  categories,
  getFeaturedProducts,
  getDiscountedProducts,
} from "@/data/products";
import {
  ShoppingCart,
  Truck,
  Package,
  RotateCcw,
  Clock,
  ChevronRight,
  MapPin,
  ChevronDown,
  Wheat,
  Heart,
  Plus,
} from "lucide-react";
import Image from "next/image";

export default function HomePage() {
  const featuredProducts = getFeaturedProducts();
  const discountedProducts = getDiscountedProducts();

  return (
    <div className="flex flex-col pb-20">
      {/* Hero Section - Golden Background */}
      <section className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-6">
          {/* Delivery/Pickup Toggle */}
          <div className="flex justify-center mb-4">
            <div className="inline-flex bg-primary-foreground/20 rounded-full p-1">
              <button className="px-6 py-2 rounded-full bg-primary-foreground text-primary text-sm font-medium">
                Хүргэлт
              </button>
              <button className="px-6 py-2 rounded-full text-primary-foreground text-sm font-medium">
                Очиж авах
              </button>
            </div>
          </div>

          {/* Address Selector */}
          <div className="bg-background rounded-xl p-4 mb-4 flex items-center gap-3">
            <MapPin className="h-5 w-5 text-primary flex-shrink-0" />
            <span className="text-foreground text-sm flex-1 truncate">
              Улаанбаатар, Баянзүрх дүүрэг...
            </span>
            <ChevronDown className="h-4 w-4 text-muted-foreground" />
          </div>

          {/* Time Badge */}
          <div className="flex items-center justify-center gap-2 mb-2">
            <div className="inline-flex items-center gap-2 bg-primary-foreground/20 rounded-full px-4 py-2">
              <Clock className="h-4 w-4" />
              <span className="text-sm font-medium">Өнөөдөр, 14:00</span>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Actions */}
      <section className="container mx-auto px-4 py-4">
        <div className="grid grid-cols-3 gap-3">
          <Link
            href="/orders"
            className="flex flex-col items-center gap-2 bg-muted rounded-xl p-4 hover:bg-muted/80 transition-colors"
          >
            <Package className="h-7 w-7 text-primary" />
            <span className="text-xs font-semibold text-center">
              Миний захиалга
            </span>
          </Link>
          <Link
            href="/orders"
            className="flex flex-col items-center gap-2 bg-muted rounded-xl p-4 hover:bg-muted/80 transition-colors"
          >
            <RotateCcw className="h-7 w-7 text-primary" />
            <span className="text-xs font-semibold text-center">
              Дахин захиалах
            </span>
          </Link>
          <Link
            href="/orders"
            className="flex flex-col items-center gap-2 bg-muted rounded-xl p-4 hover:bg-muted/80 transition-colors"
          >
            <Truck className="h-7 w-7 text-primary" />
            <span className="text-xs font-semibold text-center">
              Хүргэлт хянах
            </span>
          </Link>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="container mx-auto px-4 py-2">
        <Link
          href="/products"
          className="flex items-center justify-center gap-2 bg-accent rounded-xl py-4 hover:bg-accent/80 transition-colors"
        >
          <span className="text-accent-foreground font-bold">
            Бүх барааг үзэх
          </span>
          <ChevronRight className="h-5 w-5 text-accent-foreground" />
        </Link>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-4">
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          {categories.map((category) => (
            <Link
              key={category.id}
              href={`/products?category=${category.id}`}
              className="flex-shrink-0 flex flex-col items-center gap-2 bg-background border rounded-xl p-3 w-20 hover:border-primary transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Wheat className="h-5 w-5 text-primary" />
              </div>
              <span className="text-xs font-medium text-center">
                {category.name}
              </span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Онцлох бараа</h2>
          <Link
            href="/products"
            className="flex items-center gap-1 text-sm text-primary hover:underline"
          >
            Бүгд <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {featuredProducts.slice(0, 4).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Discounted Products */}
      <section className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Хямдралтай</h2>
          <Link
            href="/products"
            className="flex items-center gap-1 text-sm text-primary hover:underline"
          >
            Бүгд <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {discountedProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* All Products Preview */}
      <section className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Бүх бараа</h2>
          <Link
            href="/products"
            className="flex items-center gap-1 text-sm text-primary hover:underline"
          >
            Бүгд <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {products.slice(0, 6).map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-primary text-primary-foreground mt-6">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <Truck className="h-8 w-8 mx-auto mb-2 opacity-80" />
              <p className="text-2xl font-bold">15+</p>
              <p className="text-sm opacity-80">Бараа</p>
            </div>
            <div className="text-center">
              <Package className="h-8 w-8 mx-auto mb-2 opacity-80" />
              <p className="text-2xl font-bold">5+</p>
              <p className="text-sm opacity-80">Бренд</p>
            </div>
            <div className="text-center">
              <Clock className="h-8 w-8 mx-auto mb-2 opacity-80" />
              <p className="text-2xl font-bold">48ц</p>
              <p className="text-sm opacity-80">Хүргэлт</p>
            </div>
            <div className="text-center">
              <ShoppingCart className="h-8 w-8 mx-auto mb-2 opacity-80" />
              <p className="text-2xl font-bold">50кг+</p>
              <p className="text-sm opacity-80">Бөөний</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}

// Product Card Component
function ProductCard({ product }: { product: (typeof products)[0] }) {
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
        <button className="mt-2 w-full inline-flex items-center justify-center gap-2 rounded-full bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90 transition-colors">
          <Plus className="h-4 w-4" />
          Сагсанд нэмэх
        </button>
      </div>
    </div>
  );
}
