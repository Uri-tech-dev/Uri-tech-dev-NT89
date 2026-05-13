# Design Handoff — Нарантуул Market B2B Ecommerce

## 0. Approval Record

- **Homepage options shown:** A (Swiss Precision), B (Data Dense), C (Balanced)
- **Selected option:** A + B hybrid (A colors + B layout)
- **Preview artifact file paths:**
  - `output/narantuul-market/designs/homepage-option-a.png`
  - `output/narantuul-market/designs/homepage-option-b.png`
  - `output/narantuul-market/designs/homepage-option-c.png`
- **Pencil project paths used:**
  - `output/narantuul-market/designs/homepage-directions.pen`
  - `output/narantuul-market/designs/design.pen`
- **Final design export:** `output/narantuul-market/designs/design.png`
- **Locked constraints:** Minimal white background, golden (#B8860B) primary, mobile-first, ton-based quantity

## 1. Frontend Build Map

### Pages

| Page | Route | Description |
|------|-------|-------------|
| Homepage | `/` | Hero, stats, categories, featured products |
| Products | `/products` | Product grid with search |
| Product Detail | `/products/[id]` | Image, info, ton selector, add to cart |
| Cart | `/cart` | Cart items, total, checkout CTA |
| Checkout | `/checkout` | Address, phone, payment, confirm |
| Orders | `/orders` | Order history list |
| Login | `/login` | Phone + password |
| Profile | `/profile` | User info, loyalty points, menu |

### Components

- **Header:** Logo, search, cart, profile icons
- **Hero:** Golden background, stats (2,500+ products, 150+ suppliers, 48h delivery)
- **Quick Actions:** My orders, Re-order, Track delivery
- **Category Grid:** 2-column cards with icon, name, count
- **Product List Item:** Image, name, price (₮), stock status
- **Cart Item:** Image, name, price, quantity (tn)
- **Order Card:** Order #, status, date, total
- **Loyalty Card:** Gold background, points, level

## 2. erxes CMS Field Map

### CMS Pages

| Slug | Content |
|------|---------|
| about | About Us page |
| contact | Contact page |
| faq | FAQ page |
| terms | Terms & Conditions |

### Menu Structure

**Header Navigation:**
- Home `/`
- Products `/products`
- Orders `/orders`
- Profile `/profile`

**Footer:**
- About `/about`
- Contact `/contact`
- FAQ `/faq`
- Terms `/terms`

## 3. Design Tokens

See: `output/narantuul-market/design-tokens.json`

## 4. UI Libraries

See: `output/narantuul-market/ui-libraries.json`

## 5. Key Design Decisions

- **Color:** Golden (#B8860B) primary on white background
- **Layout:** Mobile-first (375px base)
- **Typography:** Inter font family
- **Quantity:** All products measured in tons (тн)
- **Currency:** Mongolian Tugrik (₮)
- **Language:** Mongolian (mn) primary, English (en) secondary
- **Motion Level:** 2 (Alive) — smooth transitions

## 6. Ecommerce Features

- Product catalog with categories
- Cart management
- Checkout with address & payment
- Order history & tracking
- Loyalty points system
- Re-order functionality
- User authentication
