import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/routing";
import { getApolloClient } from "@/lib/apollo/client";
import { POSC_PRODUCTS } from "@/graphql/ecommerce/queries/product";
import { ProductCard } from "@/components/product/ProductCard";
import { ShoppingCart, Truck, Clock, Award } from "lucide-react";

export default async function HomePage() {
  const t = await getTranslations();
  const client = getApolloClient();

  const { data } = await client.query({
    query: POSC_PRODUCTS,
    variables: { page: 1, perPage: 8 },
  });

  const products = (data as any)?.poscProducts || [];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="bg-primary text-primary-foreground">
        <div className="container mx-auto px-4 py-16 md:py-24">
          <div className="grid md:grid-cols-2 gap-8 items-center">
            <div className="space-y-6">
              <h1 className="text-4xl md:text-6xl font-bold leading-tight">
                Таны бизнесийн
                <br />
                хүнсний нийлүүлэлт
              </h1>
              <p className="text-lg md:text-xl text-primary-foreground/90">
                Хөдөө орон нутаг руу 48 цагт хүргэнэ
              </p>
              <div className="flex flex-wrap gap-4">
                <Link
                  href="/products"
                  className="inline-flex items-center gap-2 rounded-lg bg-background px-6 py-3 text-sm font-medium text-foreground hover:bg-background/90"
                >
                  <ShoppingCart className="h-4 w-4" />
                  Бараа үзэх
                </Link>
              </div>
            </div>
            <div className="hidden md:block">
              <div className="aspect-square rounded-2xl bg-primary-foreground/10 flex items-center justify-center">
                <span className="text-8xl">🌾</span>
              </div>
            </div>
          </div>

          {/* Stats */}
          <div className="mt-12 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div className="rounded-xl bg-primary-foreground/10 p-4">
              <Truck className="h-6 w-6 mb-2" />
              <p className="text-2xl font-bold">2,500+</p>
              <p className="text-sm opacity-80">Бараа</p>
            </div>
            <div className="rounded-xl bg-primary-foreground/10 p-4">
              <Award className="h-6 w-6 mb-2" />
              <p className="text-2xl font-bold">150+</p>
              <p className="text-sm opacity-80">Нийлүүлэгч</p>
            </div>
            <div className="rounded-xl bg-primary-foreground/10 p-4">
              <Clock className="h-6 w-6 mb-2" />
              <p className="text-2xl font-bold">48ц</p>
              <p className="text-sm opacity-80">Хүргэлт</p>
            </div>
            <div className="rounded-xl bg-primary-foreground/10 p-4">
              <ShoppingCart className="h-6 w-6 mb-2" />
              <p className="text-2xl font-bold">50кг+</p>
              <p className="text-sm opacity-80">Бөөний</p>
            </div>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section className="py-12 md:py-16">
        <div className="container mx-auto px-4">
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-2xl md:text-3xl font-bold">Онцлох бараа</h2>
            <Link
              href="/products"
              className="text-sm font-medium text-primary hover:underline"
            >
              {t("common.viewAll")} →
            </Link>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {products.map((product: any) => (
              <ProductCard key={product._id} product={product} />
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
