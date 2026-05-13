"use client";

import { useState } from "react";
import { Link } from "@/i18n/routing";
import { useAuth } from "@/lib/auth/AuthContext";
import { useTranslations } from "next-intl";
import { ShoppingCart, Menu, X, User, Heart } from "lucide-react";

export default function Header() {
  const t = useTranslations("nav");
  const { user, logout } = useAuth();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur">
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between">
          {/* Logo */}
          <Link href="/" className="flex items-center gap-2">
            <span className="text-2xl">🌾</span>
            <span className="text-xl font-bold text-primary">НАРАНТУУЛ</span>
          </Link>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex items-center gap-6">
            <Link href="/" className="text-sm font-medium hover:text-primary transition-colors">
              {t("home")}
            </Link>
            <Link href="/products" className="text-sm font-medium hover:text-primary transition-colors">
              {t("products")}
            </Link>
            <Link href="/about" className="text-sm font-medium hover:text-primary transition-colors">
              {t("about")}
            </Link>
          </nav>

          {/* Right Actions */}
          <div className="flex items-center gap-4">
            <Link href="/wishlist" className="hidden md:block">
              <Heart className="h-5 w-5" />
            </Link>
            <Link href="/cart" className="relative">
              <ShoppingCart className="h-5 w-5" />
            </Link>
            {user ? (
              <div className="hidden md:flex items-center gap-3">
                <Link href="/profile">
                  <User className="h-5 w-5" />
                </Link>
                <button
                  onClick={logout}
                  className="text-sm text-muted-foreground hover:text-foreground"
                >
                  {t("logout")}
                </button>
              </div>
            ) : (
              <Link
                href="/login"
                className="hidden md:inline-flex items-center rounded-lg bg-primary px-4 py-2 text-sm font-medium text-primary-foreground hover:bg-primary/90"
              >
                {t("login")}
              </Link>
            )}

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-t py-4">
            <nav className="flex flex-col gap-4">
              <Link href="/" className="text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                {t("home")}
              </Link>
              <Link href="/products" className="text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                {t("products")}
              </Link>
              <Link href="/about" className="text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                {t("about")}
              </Link>
              <Link href="/wishlist" className="text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                {t("wishlist")}
              </Link>
              <Link href="/orders" className="text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                {t("orders")}
              </Link>
              {user ? (
                <>
                  <Link href="/profile" className="text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                    {t("profile")}
                  </Link>
                  <button onClick={() => { logout(); setMobileMenuOpen(false); }} className="text-sm text-left">
                    {t("logout")}
                  </button>
                </>
              ) : (
                <Link href="/login" className="text-sm font-medium" onClick={() => setMobileMenuOpen(false)}>
                  {t("login")}
                </Link>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
}
