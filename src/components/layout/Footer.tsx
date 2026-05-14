import { getTranslations } from "next-intl/server";

export default async function Footer() {
  return (
    <footer className="bg-muted py-6">
      <div className="container mx-auto px-4">
        <p className="text-center text-sm text-muted-foreground">
          © 2025 NT89
        </p>
      </div>
    </footer>
  );
}
