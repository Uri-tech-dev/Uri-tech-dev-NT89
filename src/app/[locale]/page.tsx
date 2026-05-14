import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { getServerApolloClient } from "@/lib/apollo/server-client";
import { POSC_PRODUCTS, POSC_PRODUCT_CATEGORIES } from "@/graphql/ecommerce/queries/product";
import { ProductCard } from "@/components/product/ProductCard";
import { 
  ShoppingCart, 
  Truck, 
  Package, 
  RotateCcw, 
  Clock,
  ChevronRight,
  MapPin,
  ChevronDown,
  Wheat
} from "lucide-react";

export default async function HomePage() {
  const t = await getTranslations();
  const client = await getServerApolloClient();

  // Fetch products and categories
  let products = [];
  let categories = [];
  
  try {
    const [productsRes, categoriesRes] = await Promise.all([
      client.query({
        query: POSC_PRODUCTS,
        variables: { page: 1, perPage: 8 },
      }),
      client.query({
        query: POSC_PRODUCT_CATEGORIES,
        variables: { page: 1, perPage: 10 },
      }),
    ]);
    
    products = (productsRes.data as any)?.poscProducts || [];
    categories = (categoriesRes.data as any)?.poscProductCategories || [];
  } catch (error) {
    console.error("Error fetching data:", error);
  }

  // Demo products if none from CMS
  const demoProducts = products.length > 0 ? products : [
    {
      _id: "1",
      name: "Алтан тариа 1р гурил 25кг",
      unitPrice: 75000,
      attachment: { url: "https://images.unsplash.com/photo-1737732137216-677b7252a7e3?w=400" },
      category: { name: "Гурил" },
      remainder: 100,
    },
    {
      _id: "2", 
      name: "Sunsea цагаан будаа 5кг",
      unitPrice: 52800,
      attachment: { url: "https://images.unsplash.com/photo-1562036409-9dcc48472e29?w=400" },
      category: { name: "Будаа" },
      remainder: 50,
    },
    {
      _id: "3",
      name: "Солонгос бор сахар 3кг", 
      unitPrice: 31700,
      attachment: { url: "https://images.unsplash.com/photo-1770452567852-787c3c712de1?w=400" },
      category: { name: "Сахар" },
      remainder: 75,
    },
    {
      _id: "4",
      name: "Лапша гоймон 3кг",
      unitPrice: 37000,
      attachment: { url: "https://images.unsplash.com/photo-1649214633931-6aed4d167767?w=400" },
      category: { name: "Гоймон" },
      remainder: 60,
    },
  ];

  const demoCategories = categories.length > 0 ? categories : [
    { _id: "1", name: "Гурил", attachment: { url: "" } },
    { _id: "2", name: "Будаа", attachment: { url: "" } },
    { _id: "3", name: "Сахар", attachment: { url: "" } },
    { _id: "4", name: "Тос", attachment: { url: "" } },
    { _id: "5", name: "Гоймон", attachment: { url: "" } },
    { _id: "6", name: "Давс", attachment: { url: "" } },
  ];

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
          <Link href="/orders" className="flex flex-col items-center gap-2 bg-muted rounded-xl p-4 hover:bg-muted/80 transition-colors">
            <Package className="h-7 w-7 text-primary" />
            <span className="text-xs font-semibold text-center">Миний захиалга</span>
          </Link>
          <Link href="/orders" className="flex flex-col items-center gap-2 bg-muted rounded-xl p-4 hover:bg-muted/80 transition-colors">
            <RotateCcw className="h-7 w-7 text-primary" />
            <span className="text-xs font-semibold text-center">Дахин захиалах</span>
          </Link>
          <Link href="/orders" className="flex flex-col items-center gap-2 bg-muted rounded-xl p-4 hover:bg-muted/80 transition-colors">
            <Truck className="h-7 w-7 text-primary" />
            <span className="text-xs font-semibold text-center">Хүргэлт хянах</span>
          </Link>
        </div>
      </section>

      {/* CTA Banner */}
      <section className="container mx-auto px-4 py-2">
        <Link 
          href="/products" 
          className="flex items-center justify-center gap-2 bg-accent rounded-xl py-4 hover:bg-accent/80 transition-colors"
        >
          <span className="text-accent-foreground font-bold">Бүх барааг үзэх</span>
          <ChevronRight className="h-5 w-5 text-accent-foreground" />
        </Link>
      </section>

      {/* Categories */}
      <section className="container mx-auto px-4 py-4">
        <div className="flex gap-3 overflow-x-auto pb-2 -mx-4 px-4 scrollbar-hide">
          {demoCategories.map((category: any) => (
            <Link
              key={category._id}
              href={`/products?category=${category._id}`}
              className="flex-shrink-0 flex flex-col items-center gap-2 bg-background border rounded-xl p-3 w-20 hover:border-primary transition-colors"
            >
              <div className="w-10 h-10 rounded-full bg-primary/10 flex items-center justify-center">
                <Wheat className="h-5 w-5 text-primary" />
              </div>
              <span className="text-xs font-medium text-center">{category.name}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Featured Products */}
      <section className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Онцлох бараа</h2>
          <Link href="/products" className="flex items-center gap-1 text-sm text-primary hover:underline">
            Бүгд <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {demoProducts.slice(0, 4).map((product: any) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>

      {/* Discounted Products */}
      <section className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between mb-4">
          <h2 className="text-xl font-bold">Хямдралтай</h2>
          <Link href="/products" className="flex items-center gap-1 text-sm text-primary hover:underline">
            Бүгд <ChevronRight className="h-4 w-4" />
          </Link>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {demoProducts.slice(0, 4).reverse().map((product: any) => (
            <ProductCard key={product._id} product={product} />
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section className="bg-primary text-primary-foreground mt-6">
        <div className="container mx-auto px-4 py-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="text-center">
              <Truck className="h-8 w-8 mx-auto mb-2 opacity-80" />
              <p className="text-2xl font-bold">2,500+</p>
              <p className="text-sm opacity-80">Бараа</p>
            </div>
            <div className="text-center">
              <Package className="h-8 w-8 mx-auto mb-2 opacity-80" />
              <p className="text-2xl font-bold">150+</p>
              <p className="text-sm opacity-80">Нийлүүлэгч</p>
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
