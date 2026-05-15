export interface ProductVariant {
  id: string;
  name: string; // "1 кг", "5 кг", "25 кг", "1 ширхэг", "1 шуудай", "1 тонн"
  unit: string; // "кг", "ширхэг", "шуудай", "тонн"
  price: number;
  weight?: number; // weight in kg per unit
  minOrder?: number;
  sku?: string;
}

export interface Product {
  id: string;
  name: string;
  description?: string;
  category: string;
  subcategory?: string;
  brand: string;
  image: string;
  images?: string[];
  price: number; // base price for display
  unit: string; // base unit
  variants: ProductVariant[];
  inStock: boolean;
  stockQuantity?: number;
  badge?: string; // "Хямдралтай", "Шинэ", "Онцлох"
  oldPrice?: number;
  supplier: string;
  origin?: string;
  tags?: string[];
}

export const categories = [
  { id: "guril", name: "Гурил", icon: "Wheat" },
  { id: "budaa", name: "Будаа", icon: "Wheat" },
  { id: "sahar", name: "Сахар", icon: "Wheat" },
  { id: "goimon", name: "Гоймон", icon: "Wheat" },
  { id: "tus", name: "Тусгай", icon: "Wheat" },
];

export const products: Product[] = [
  // ========== ГУРИЛ ==========
  {
    id: "altan-taria-1r-1kg",
    name: "Алтан тариа 1р гурил",
    category: "guril",
    brand: "Алтан тариа",
    image: "/images/products/altan-taria-1r-1kg.jpg",
    price: 3600,
    unit: "кг",
    supplier: "Барс зах",
    variants: [
      { id: "v1", name: "1 кг", unit: "ширхэг", price: 3600, weight: 1, sku: "AT1R-1KG" },
      { id: "v2", name: "5 ширхэг (5кг)", unit: "шуудай", price: 18000, weight: 5, sku: "AT1R-5KG-PACK" },
      { id: "v3", name: "25 кг", unit: "шуудай", price: 75000, weight: 25, sku: "AT1R-25KG" },
      { id: "v4", name: "1 тонн (40 шуудай)", unit: "тонн", price: 3000000, weight: 1000, minOrder: 1, sku: "AT1R-1T" },
    ],
    inStock: true,
    stockQuantity: 999,
    badge: "Онцлох",
  },
  {
    id: "altan-taria-1r-5kg",
    name: "Алтан тариа 1р гурил 5кг",
    category: "guril",
    brand: "Алтан тариа",
    image: "/images/products/altan-taria-1r-5kg.jpg",
    price: 18000,
    unit: "шуудай",
    supplier: "Барс зах",
    variants: [
      { id: "v1", name: "1 шуудай (5кг)", unit: "шуудай", price: 18000, weight: 5, sku: "AT1R-5KG" },
      { id: "v2", name: "5 шуудай (25кг)", unit: "шуудай", price: 90000, weight: 25, sku: "AT1R-5x5KG" },
      { id: "v3", name: "1 тонн (200 шуудай)", unit: "тонн", price: 3600000, weight: 1000, minOrder: 1, sku: "AT1R-5KG-1T" },
    ],
    inStock: true,
    stockQuantity: 500,
  },
  {
    id: "altan-taria-1r-25kg",
    name: "Алтан тариа 1р гурил 25кг",
    category: "guril",
    brand: "Алтан тариа",
    image: "/images/products/altan-taria-1r-25kg.jpg",
    price: 75000,
    unit: "шуудай",
    supplier: "Барс зах",
    variants: [
      { id: "v1", name: "1 шуудай (25кг)", unit: "шуудай", price: 75000, weight: 25, sku: "AT1R-25KG" },
      { id: "v2", name: "2 шуудай (50кг)", unit: "шуудай", price: 150000, weight: 50, sku: "AT1R-25KG-x2" },
      { id: "v3", name: "1 тонн (40 шуудай)", unit: "тонн", price: 3000000, weight: 1000, minOrder: 1, sku: "AT1R-25KG-1T" },
    ],
    inStock: true,
    stockQuantity: 200,
    badge: "Онцлох",
  },
  {
    id: "altan-taria-deed-1kg",
    name: "Алтан тариа дээд гурил 1кг",
    category: "guril",
    brand: "Алтан тариа",
    image: "/images/products/altan-taria-deed-1kg.jpg",
    price: 4800,
    unit: "ширхэг",
    description: "Пакет 10 ширхэг",
    supplier: "Барс зах",
    variants: [
      { id: "v1", name: "1 ширхэг (1кг)", unit: "ширхэг", price: 4800, weight: 1, sku: "AT-D-1KG" },
      { id: "v2", name: "10 ширхэг (10кг)", unit: "шуудай", price: 48000, weight: 10, sku: "AT-D-10KG-PACK" },
      { id: "v3", name: "1 тонн (1000 ширхэг)", unit: "тонн", price: 4800000, weight: 1000, minOrder: 1, sku: "AT-D-1T" },
    ],
    inStock: true,
    stockQuantity: 999,
  },
  {
    id: "altan-taria-deed-5kg",
    name: "Алтан тариа дээд гурил 5кг",
    category: "guril",
    brand: "Алтан тариа",
    image: "/images/products/altan-taria-deed-5kg.jpg",
    price: 24000,
    unit: "шуудай",
    description: "Шуудайгаараа 10 ширхэг",
    supplier: "Барс зах",
    variants: [
      { id: "v1", name: "1 шуудай (5кг)", unit: "шуудай", price: 24000, weight: 5, sku: "AT-D-5KG" },
      { id: "v2", name: "10 шуудай (50кг)", unit: "шуудай", price: 240000, weight: 50, sku: "AT-D-50KG" },
      { id: "v3", name: "1 тонн (200 шуудай)", unit: "тонн", price: 4800000, weight: 1000, minOrder: 1, sku: "AT-D-5KG-1T" },
    ],
    inStock: true,
    stockQuantity: 300,
    badge: "Онцлох",
  },
  {
    id: "ulaanbaatar-1r-25kg",
    name: "Улаанбаатар 1р гурил 25кг",
    category: "guril",
    brand: "Улаанбаатар",
    image: "/images/products/ulaanbaatar-1r-25kg.jpg",
    price: 79300,
    unit: "шуудай",
    supplier: "Улаанбаатар Шилмж ХХК",
    variants: [
      { id: "v1", name: "1 шуудай (25кг)", unit: "шуудай", price: 79300, weight: 25, sku: "UB-1R-25KG" },
      { id: "v2", name: "2 шуудай (50кг)", unit: "шуудай", price: 158600, weight: 50, sku: "UB-1R-50KG" },
      { id: "v3", name: "1 тонн (40 шуудай)", unit: "тонн", price: 3172000, weight: 1000, minOrder: 1, sku: "UB-1R-1T" },
    ],
    inStock: true,
    stockQuantity: 150,
  },

  // ========== БУДАА ==========
  {
    id: "anshan-5kg",
    name: "Anshan будаа 5кг",
    category: "budaa",
    brand: "Anshan",
    image: "/images/products/anshan-5kg.jpg",
    price: 52800,
    unit: "шуудай",
    supplier: "Барс зах",
    origin: "Солонгос",
    variants: [
      { id: "v1", name: "1 шуудай (5кг)", unit: "шуудай", price: 52800, weight: 5, sku: "AN-5KG" },
      { id: "v2", name: "5 шуудай (25кг)", unit: "шуудай", price: 264000, weight: 25, sku: "AN-25KG" },
      { id: "v3", name: "1 тонн (200 шуудай)", unit: "тонн", price: 10560000, weight: 1000, minOrder: 1, sku: "AN-1T" },
    ],
    inStock: true,
    stockQuantity: 400,
    badge: "Онцлох",
  },
  {
    id: "eco-rice-5kg",
    name: "Eco rice 5кг",
    category: "budaa",
    brand: "Eco Rice",
    image: "/images/products/eco-rice-5kg.jpg",
    price: 39600,
    unit: "шуудай",
    supplier: "Барс зах",
    origin: "Солонгос",
    variants: [
      { id: "v1", name: "1 шуудай (5кг)", unit: "шуудай", price: 39600, weight: 5, sku: "ECO-5KG" },
      { id: "v2", name: "5 шуудай (25кг)", unit: "шуудай", price: 198000, weight: 25, sku: "ECO-25KG" },
      { id: "v3", name: "1 тонн (200 шуудай)", unit: "тонн", price: 7920000, weight: 1000, minOrder: 1, sku: "ECO-1T" },
    ],
    inStock: true,
    stockQuantity: 350,
    badge: "Хямдралтай",
    oldPrice: 45000,
  },
  {
    id: "sunsea-5kg",
    name: "Sunsea цагаан будаа 5кг",
    category: "budaa",
    brand: "Sunsea",
    image: "/images/products/sunsea-5kg.jpg",
    price: 52800,
    unit: "шуудай",
    supplier: "Барс зах",
    origin: "Вьетнам",
    variants: [
      { id: "v1", name: "1 шуудай (5кг)", unit: "шуудай", price: 52800, weight: 5, sku: "SS-5KG" },
      { id: "v2", name: "5 шуудай (25кг)", unit: "шуудай", price: 264000, weight: 25, sku: "SS-25KG" },
      { id: "v3", name: "1 тонн (200 шуудай)", unit: "тонн", price: 10560000, weight: 1000, minOrder: 1, sku: "SS-1T" },
    ],
    inStock: true,
    stockQuantity: 500,
    badge: "Онцлох",
  },
  {
    id: "sakura-5kg",
    name: "Сакура цагаан будаа 5кг",
    category: "budaa",
    brand: "Сакура",
    image: "/images/products/sakura-5kg.jpg",
    price: 58100,
    unit: "шуудай",
    supplier: "Барс зах",
    origin: "Япон",
    variants: [
      { id: "v1", name: "1 шуудай (5кг)", unit: "шуудай", price: 58100, weight: 5, sku: "SK-5KG" },
      { id: "v2", name: "5 шуудай (25кг)", unit: "шуудай", price: 290500, weight: 25, sku: "SK-25KG" },
      { id: "v3", name: "1 тонн (200 шуудай)", unit: "тонн", price: 11620000, weight: 1000, minOrder: 1, sku: "SK-1T" },
    ],
    inStock: true,
    stockQuantity: 250,
  },
  {
    id: "slava-gurvaljin-1kg",
    name: "Слава гурвалжин будаа 1кг",
    category: "budaa",
    brand: "Слава",
    image: "/images/products/slava-1kg.jpg",
    price: 12600,
    unit: "ширхэг",
    supplier: "Барс зах",
    origin: "Орос",
    variants: [
      { id: "v1", name: "1 ширхэг (1кг)", unit: "ширхэг", price: 12600, weight: 1, sku: "SL-G-1KG" },
      { id: "v2", name: "10 ширхэг (10кг)", unit: "шуудай", price: 126000, weight: 10, sku: "SL-G-10KG" },
      { id: "v3", name: "1 тонн (1000 ширхэг)", unit: "тонн", price: 12600000, weight: 1000, minOrder: 1, sku: "SL-G-1T" },
    ],
    inStock: true,
    stockQuantity: 600,
  },
  {
    id: "slava-tsagaan-5kg",
    name: "Слава цагаан будаа 5кг",
    category: "budaa",
    brand: "Слава",
    image: "/images/products/slava-1kg.jpg",
    price: 50200,
    unit: "шуудай",
    supplier: "Барс зах",
    origin: "Орос",
    variants: [
      { id: "v1", name: "1 шуудай (5кг)", unit: "шуудай", price: 50200, weight: 5, sku: "SL-T-5KG" },
      { id: "v2", name: "5 шуудай (25кг)", unit: "шуудай", price: 251000, weight: 25, sku: "SL-T-25KG" },
      { id: "v3", name: "1 тонн (200 шуудай)", unit: "тонн", price: 10040000, weight: 1000, minOrder: 1, sku: "SL-T-1T" },
    ],
    inStock: true,
    stockQuantity: 300,
  },
  {
    id: "slava-shar-1kg",
    name: "Слава шар будаа 1кг",
    category: "budaa",
    brand: "Слава",
    image: "/images/products/slava-1kg.jpg",
    price: 8600,
    unit: "ширхэг",
    supplier: "Барс зах",
    origin: "Орос",
    variants: [
      { id: "v1", name: "1 ширхэг (1кг)", unit: "ширхэг", price: 8600, weight: 1, sku: "SL-S-1KG" },
      { id: "v2", name: "10 ширхэг (10кг)", unit: "шуудай", price: 86000, weight: 10, sku: "SL-S-10KG" },
      { id: "v3", name: "1 тонн (1000 ширхэг)", unit: "тонн", price: 8600000, weight: 1000, minOrder: 1, sku: "SL-S-1T" },
    ],
    inStock: true,
    stockQuantity: 800,
    badge: "Хямдралтай",
    oldPrice: 10000,
  },

  // ========== САХАР ==========
  {
    id: "solongos-sugar-3kg",
    name: "Солонгос бор сахар 3кг",
    category: "sahar",
    brand: "Beksul",
    image: "/images/products/solongos-sugar-3kg.jpg",
    price: 31700,
    unit: "шуудай",
    supplier: "Солонгос импорт",
    origin: "Солонгос",
    variants: [
      { id: "v1", name: "1 шуудай (3кг)", unit: "шуудай", price: 31700, weight: 3, sku: "SG-S-3KG" },
      { id: "v2", name: "5 шуудай (15кг)", unit: "шуудай", price: 158500, weight: 15, sku: "SG-S-15KG" },
      { id: "v3", name: "1 тонн (333 шуудай)", unit: "тонн", price: 10556100, weight: 1000, minOrder: 1, sku: "SG-S-1T" },
    ],
    inStock: true,
    stockQuantity: 450,
    badge: "Онцлох",
  },

  // ========== ГОЙМОН ==========
  {
    id: "lapsha-3kg",
    name: "Лапша энгийн гоймон 3кг",
    category: "goimon",
    brand: "Лапша",
    image: "/images/products/lapsha-3kg.jpg",
    price: 37000,
    unit: "шуудай",
    description: "5 ширхэг",
    supplier: "Барс зах",
    origin: "Орос",
    variants: [
      { id: "v1", name: "1 шуудай (3кг, 5ш)", unit: "шуудай", price: 37000, weight: 3, sku: "LP-3KG" },
      { id: "v2", name: "5 шуудай (15кг)", unit: "шуудай", price: 185000, weight: 15, sku: "LP-15KG" },
      { id: "v3", name: "1 тонн (333 шуудай)", unit: "тонн", price: 12321000, weight: 1000, minOrder: 1, sku: "LP-1T" },
    ],
    inStock: true,
    stockQuantity: 350,
  },
];

export function getProductById(id: string): Product | undefined {
  return products.find((p) => p.id === id);
}

export function getProductsByCategory(categoryId: string): Product[] {
  return products.filter((p) => p.category === categoryId);
}

export function getFeaturedProducts(): Product[] {
  return products.filter((p) => p.badge === "Онцлох");
}

export function getDiscountedProducts(): Product[] {
  return products.filter((p) => p.badge === "Хямдралтай");
}

export function getNewProducts(): Product[] {
  return products.filter((p) => p.badge === "Шинэ");
}

export function searchProducts(query: string): Product[] {
  const lowerQuery = query.toLowerCase();
  return products.filter(
    (p) =>
      p.name.toLowerCase().includes(lowerQuery) ||
      p.brand.toLowerCase().includes(lowerQuery) ||
      p.category.toLowerCase().includes(lowerQuery)
  );
}
