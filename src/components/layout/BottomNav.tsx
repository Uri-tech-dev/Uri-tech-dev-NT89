"use client";

import { Link } from "@/i18n/routing";
import { usePathname } from "next/navigation";
import { Home, LayoutGrid, ShoppingCart, Package, User } from "lucide-react";

export default function BottomNav() {
  const pathname = usePathname();
  const locale = pathname.split("/")[1] || "mn";
  const path = pathname.split("/").slice(2).join("/") || "/";

  const tabs = [
    { href: "/", icon: Home, label: "Нүүр" },
    { href: "/products", icon: LayoutGrid, label: "Ангилал" },
    { href: "/cart", icon: ShoppingCart, label: "Сагс" },
    { href: "/orders", icon: Package, label: "Захиалга" },
    { href: "/profile", icon: User, label: "Профайл" },
  ];

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 bg-background border-t md:hidden">
      <div className="flex justify-around items-center h-16">
        {tabs.map((tab) => {
          const isActive = path === tab.href || (tab.href !== "/" && path.startsWith(tab.href));
          return (
            <Link
              key={tab.href}
              href={`/${locale}${tab.href}`}
              className={`flex flex-col items-center gap-1 py-2 px-3 ${
                isActive ? "text-primary" : "text-muted-foreground"
              }`}
            >
              <tab.icon className="h-5 w-5" />
              <span className="text-[11px] font-medium">{tab.label}</span>
            </Link>
          );
        })}
      </div>
    </nav>
  );
}
