"use client";

import { useEffect } from "react";
import { useRouter } from "@/i18n/routing";
import { useAuth } from "@/lib/auth/AuthContext";
import { Link } from "@/i18n/routing";
import {
  ShoppingBag,
  Heart,
  User,
  Settings,
  LogOut,
  ChevronRight,
  Award,
} from "lucide-react";

const menuItems = [
  { label: "Миний захиалгууд", href: "/orders", icon: ShoppingBag },
  { label: "Хүслийн жагсаалт", href: "/wishlist", icon: Heart },
  { label: "Хувийн мэдээлэл", href: "/profile", icon: User },
  { label: "Тохиргоо", href: "/settings", icon: Settings },
];

export default function ProfilePage() {
  const { user, loading, logout } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && !user) {
      router.push("/login");
    }
  }, [loading, user, router]);

  if (loading) {
    return (
      <div className="container mx-auto px-4 py-8">
        <div className="animate-pulse">
          <div className="h-32 bg-muted rounded-xl mb-4" />
        </div>
      </div>
    );
  }

  if (!user) return null;

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        {/* Profile Card */}
        <div className="rounded-xl border p-6 mb-6">
          <div className="flex items-center gap-4">
            <div className="h-20 w-20 rounded-full bg-primary/10 flex items-center justify-center">
              <User className="h-10 w-10 text-primary" />
            </div>
            <div>
              <h1 className="text-2xl font-bold">
                {user.firstName || user.email}
              </h1>
              <p className="text-muted-foreground">{user.email}</p>
            </div>
          </div>
        </div>

        {/* Loyalty Card */}
        <div className="rounded-xl bg-accent p-6 mb-6">
          <div className="flex items-center gap-3 mb-2">
            <Award className="h-6 w-6 text-accent-foreground" />
            <span className="font-semibold text-accent-foreground">
              Loyalty оноо
            </span>
          </div>
          <p className="text-3xl font-bold text-accent-foreground">1,250 оноо</p>
          <p className="text-sm text-accent-foreground/80">Gold түвшин</p>
        </div>

        {/* Menu */}
        <div className="space-y-2">
          {menuItems.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="flex items-center gap-4 p-4 rounded-xl border hover:bg-accent transition-colors"
            >
              <item.icon className="h-5 w-5 text-primary" />
              <span className="flex-1 font-medium">{item.label}</span>
              <ChevronRight className="h-5 w-5 text-muted-foreground" />
            </Link>
          ))}

          <button
            onClick={logout}
            className="w-full flex items-center gap-4 p-4 rounded-xl border hover:bg-destructive/5 transition-colors text-destructive"
          >
            <LogOut className="h-5 w-5" />
            <span className="flex-1 font-medium">Гарах</span>
            <ChevronRight className="h-5 w-5" />
          </button>
        </div>
      </div>
    </div>
  );
}
