import { Link } from "@/i18n/routing";
import { getTranslations } from "next-intl/server";

export default async function Footer() {
  const t = await getTranslations("nav");
  const footerT = await getTranslations("footer");

  return (
    <footer className="border-t bg-muted">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <span className="text-2xl">🌾</span>
              <span className="text-xl font-bold text-primary">НАРАНТУУЛ</span>
            </div>
            <p className="text-sm text-muted-foreground">
              Хүнсний бөөний худалдаа
            </p>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-semibold mb-4">Холбоосууд</h3>
            <nav className="flex flex-col gap-2">
              <Link href="/" className="text-sm text-muted-foreground hover:text-foreground">{t("home")}</Link>
              <Link href="/products" className="text-sm text-muted-foreground hover:text-foreground">{t("products")}</Link>
              <Link href="/about" className="text-sm text-muted-foreground hover:text-foreground">{t("about")}</Link>
            </nav>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-semibold mb-4">Холбоо барих</h3>
            <div className="flex flex-col gap-2 text-sm text-muted-foreground">
              <p>Утас: 7700-0000</p>
              <p>И-мэйл: info@narantuul.mn</p>
            </div>
          </div>
        </div>

        <div className="mt-8 pt-8 border-t text-center text-sm text-muted-foreground">
          © 2025 {footerT("rights")}
        </div>
      </div>
    </footer>
  );
}
