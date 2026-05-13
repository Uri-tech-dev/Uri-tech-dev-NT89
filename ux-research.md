# UX Research Document — Narantuul Market B2B Platform

> **Version:** 1.0
> **Date:** 2025-05-13
> **Author:** UX Researcher (AI)
> **Based on:** business-requirements.md v1.0

---

## 1. Research Overview

### 1.1 Objectives
- Design a B2B e-commerce platform connecting Narantuul Market suppliers with rural businesses
- Optimize for mobile-first, low-bandwidth environments
- Streamline the ordering process for frequent repeat purchases
- Build trust through transparent pricing, stock, and delivery tracking

### 1.2 Methodology
- Document analysis (BRD)
- Stakeholder requirements extraction
- Competitive analysis (Instacart reference)

### 1.3 Scope
- Buyer user experience (primary focus)
- Supplier admin panel (secondary)
- Multi-language support (Mongolian primary, English secondary)
- Mobile-first responsive design

### 1.4 Key Findings Summary
1. **Mobile-First Necessity:** Users are rural shop owners accessing the platform via smartphones with limited connectivity. Heavy UI is not an option.
2. **Repeat Order Critical:** The core workflow is re-ordering previously purchased items, not browsing for new products.
3. **Trust Through Transparency:** Real-time (or near real-time) pricing and stock visibility is the primary value proposition.
4. **Offline Resilience:** Users may lose connectivity during the ordering process; the system must handle this gracefully.

---

## 2. User Personas

### Persona 1: Batbayar — Rural Grocery Shop Owner

#### Demographics & Context
- **Age Range:** 35-50
- **Location:** Rural soum center, 300km from Ulaanbaatar
- **Occupation:** Small grocery shop owner
- **Tech Proficiency:** Basic smartphone user (Facebook, WeChat)
- **Primary Device:** Budget Android smartphone (5-6 inch screen)

#### Behavioral Patterns
- **Usage Frequency:** 2-4 times per week (checking stock and placing orders)
- **Task Priorities:** 1) Check prices, 2) Re-order staple items, 3) Track deliveries
- **Decision Factors:** Price, reliability of supplier, delivery time
- **Pain Points:** Unreliable internet, unclear pricing, no order history, manual reordering
- **Motivations:** Save time and money, avoid traveling to Ulaanbaatar

#### Goals & Needs
- **Primary Goals:** Order groceries quickly, know exactly when items will arrive
- **Secondary Goals:** Compare prices across suppliers, build loyalty points
- **Success Criteria:** Order placed in under 3 minutes, delivery arrives on promised date

#### Context of Use
- **Environment:** Small shop, possibly sharing phone with family
- **Time Constraints:** Orders placed during quiet hours (evening)
- **Distractions:** Customers arriving, family interruptions

#### Quote
> "Би УБ руу явахгүйгээр л бараа захиалмаар байна. Интернет муу ч гэсэн ажиллах ёстой."
> ("I want to order goods without going to UB. It must work even with bad internet.")

### Persona 2: Oyunaa — Mini-Market Manager

#### Demographics & Context
- **Age Range:** 28-40
- **Location:** Provincial center (aimag capital)
- **Occupation:** Mini-market manager
- **Tech Proficiency:** Comfortable with mobile apps
- **Primary Device:** Mid-range smartphone

#### Behavioral Patterns
- **Usage Frequency:** Daily (monitoring stock levels)
- **Task Priorities:** 1) Multi-supplier orders, 2) Stock planning, 3) Re-order from history
- **Decision Factors:** Bulk pricing, order minimums, delivery reliability
- **Pain Points:** Managing multiple supplier relationships, stock discrepancies
- **Motivations:** Efficiency, cost reduction, professional growth

#### Goals & Needs
- **Primary Goals:** Place large multi-supplier orders efficiently
- **Secondary Goals:** Track order analytics, optimize inventory
- **Success Criteria:** All suppliers confirmed within 24 hours, consolidated delivery

#### Context of Use
- **Environment:** Store back office or home
- **Time Constraints:** Orders placed during business planning sessions
- **Distractions:** Staff questions, customer complaints

#### Quote
> "Нэг дор олон нийлүүлэгчээс авахыг хүсэж байна. Бүгдийг нь нэг tracking дээр харах хэрэгтэй."
> ("I want to buy from multiple suppliers at once. I need to track everything in one place.")

---

## 3. Customer Journey Mapping

### Journey Overview
**Stages:** Discovery → Consideration → Conversion → Retention

### Stage 1: Discovery
- **Touchpoints:** Word of mouth, supplier recommendation, Facebook groups
- **User Actions:** Hears about platform, downloads app or visits website
- **Emotions:** Curious, skeptical ("Will this actually work?")
- **Pain Points:** Unclear how platform works, concern about trustworthiness
- **Opportunities:** Simple onboarding, clear value proposition, supplier verification badges

### Stage 2: Consideration
- **Touchpoints:** Homepage, category browsing, search results
- **User Actions:** Searches for staple items, checks prices and stock
- **Emotions:** Hopeful, comparing options
- **Pain Points:** Prices seem high, stock shows unavailable, can't compare suppliers easily
- **Opportunities:** Price comparison, stock alerts, supplier ratings

### Stage 3: Conversion
- **Touchpoints:** Cart, checkout, payment
- **User Actions:** Adds items to cart, selects payment method, confirms order
- **Emotions:** Nervous ("Will my order be correct?"), excited
- **Pain Points:** Complex checkout, unclear payment options, fear of order errors
- **Opportunities:** One-click reorder, saved payment methods, clear order summary

### Stage 4: Retention
- **Touchpoints:** Order tracking, delivery notifications, loyalty dashboard
- **User Actions:** Tracks delivery, receives items, checks loyalty points
- **Emotions:** Satisfied, loyal, trusting
- **Pain Points:** Delivery delays, no notification, points system unclear
- **Opportunities:** Proactive notifications, easy reorder, loyalty rewards visibility

---

## 4. Information Architecture & Sitemap

### 4.1 Content Hierarchy
```text
Homepage
├── Quick Re-order (Hero)
├── Categories
│   ├── Food & Beverages
│   ├── Household Items
│   ├── Personal Care
│   └── Seasonal Items
├── Popular Products
├── My Account
│   ├── Orders (History + Tracking)
│   ├── Favorites
│   ├── Loyalty Points
│   └── Profile
├── Search
└── Cart
```

### 4.2 Navigation Design
- **Primary Navigation:** Home, Categories, Search, Orders, Account
- **Secondary Navigation:** Filter by price, stock, supplier
- **Footer Navigation:** About, Contact, FAQ, Terms
- **Mobile Navigation:** Bottom tab bar (5 items) for thumb reachability

### 4.3 Content Organization Principles
- Re-order functionality is the primary CTA on homepage
- Categories must be scannable (large touch targets)
- Order history is equally important as browsing

### 4.4 Search & Filter Strategy
- **Search Scope:** Product name, category, supplier
- **Filter Categories:** Category, price range, stock availability, supplier, minimum order
- **Search Results Display:** Card grid with image, price, stock status, supplier

---

## 5. Wireframe Guidance

### 5.1 Global Layout Structure
- **Header:** Logo, search icon, notification bell, account icon (sticky)
- **Footer:** Minimal — language switcher, support link, version info
- **Content Width:** 100% fluid (mobile-first)
- **Grid System:** 2-column product grid on mobile, 3-4 on tablet/desktop

### 5.2 Section Layouts

#### Homepage
- **Layout Type:** Vertical stack
- **Content Priority:** 1) Quick reorder button, 2) Categories, 3) Popular items
- **Component Types:** Large CTA button, horizontal category scroll, product cards
- **White Space:** Moderate — must feel spacious even on small screens
- **Responsive Behavior:** Same layout scales up, sidebar appears on desktop

#### Product Catalog
- **Layout Type:** Filter + Grid
- **Content Priority:** 1) Filters, 2) Product cards
- **Component Types:** Collapsible filters, product cards with stock indicator
- **White Space:** Compact to show maximum items
- **Responsive Behavior:** Filters become sidebar on desktop

#### Order History
- **Layout Type:** Timeline list
- **Content Priority:** 1) Re-order button, 2) Order status, 3) Item list
- **Component Types:** Order cards with status badges, expand for details
- **White Space:** Comfortable for readability
- **Responsive Behavior:** Table view on desktop

#### Cart
- **Layout Type:** List + Summary
- **Content Priority:** 1) Item list, 2) Total, 3) Checkout button
- **Component Types:** Quantity stepper, remove button, supplier grouping
- **White Space:** Clear separation between suppliers
- **Responsive Behavior:** Same layout, wider on desktop

### 5.3 Content Priority
1. **Homepage:** Quick Re-order > Categories > Popular Products > Promotions

### 5.4 Component Patterns
- **Cards:** Large touch targets (min 80px height), clear image, price prominent
- **Lists:** Re-order history as timeline, newest first
- **Forms:** Minimal typing — use steppers, selects, toggles
- **Media:** Optimized images (WebP), lazy loading, placeholder skeletons

---

## 6. Accessibility Requirements

### 6.1 WCAG 2.1 Level AA Compliance

| Requirement | Implementation | Priority |
|-------------|---------------|----------|
| Keyboard Navigation | All interactive elements accessible via keyboard | High |
| Screen Reader Support | ARIA labels, landmarks, skip links | High |
| Color Contrast | 4.5:1 for normal text, 3:1 for large text | High |
| Focus Indicators | Visible focus states on all interactive elements | High |
| Alt Text | Descriptive alt text for all images | High |
| Form Labels | All form inputs have associated labels | High |
| Text Resizing | Support 200% zoom without loss of function | Medium |
| Motion Sensitivity | Respect `prefers-reduced-motion` | Medium |

### 6.2 Multi-language Accessibility
- Mongolian text expansion allowance (30% longer than English)
- Currency formatting: MNT with comma separators
- Cyrillic font rendering optimization

### 6.3 Mobile Accessibility
- Touch targets at least 44x44px (preferably 48x48px)
- Swipe gestures for order history
- Allow pinch-to-zoom on product images

---

## 7. Responsive Design Strategy

### 7.1 Breakpoints

| Breakpoint | Width | Target Devices | Layout Changes |
|-----------|-------|---------------|----------------|
| Mobile | 375px | Budget smartphones | Single column, bottom nav |
| Tablet | 768px | Tablets, large phones | Two columns, sidebar filters |
| Desktop | 1280px | Laptops, desktops | Three columns, full sidebar |

### 7.2 Mobile-first Approach
- Design for 375px first
- Progressive enhancement for larger screens
- Touch-optimized interactions as default

### 7.3 Content Adaptation
- Images: srcset with multiple resolutions
- Product grid: 2 cols mobile → 3 cols tablet → 4 cols desktop
- Navigation: Bottom tabs mobile → Top bar desktop

### 7.4 Performance Budget
- Mobile: < 500KB initial load, < 3s load time on 3G
- Desktop: < 1MB initial load, < 2s load time
- Critical: App shell must load instantly

---

## 8. Interaction & Motion Design

### 8.1 Animation Principles
- Minimal, purposeful animations only
- Respect `prefers-reduced-motion`
- Use CSS transitions (no heavy JS animation libraries)

### 8.2 Micro-interactions

| Element | Trigger | Animation | Duration |
|---------|---------|-----------|----------|
| Buttons | Tap | Scale 0.98, darken | 100ms |
| Cards | Tap | Highlight border | 150ms |
| Cart Badge | Update | Bounce + number change | 300ms |
| Pull to Refresh | Pull | Rotate spinner | Continuous |
| Stock Alert | Appear | Slide down + fade | 250ms |
| Order Status | Change | Color transition | 300ms |

### 8.3 Page Transitions
- None (instant navigation for speed)
- Skeleton screens for loading states

### 8.4 Scroll Behaviors
- Sticky header after 100px scroll
- Infinite scroll for product lists
- Pull-to-refresh on order history

---

## 9. Content Strategy & UX Writing

### 9.1 Tone of Voice
- Direct, practical, respectful
- No marketing fluff — users are busy business owners
- Action-oriented language

### 9.2 Terminology

| Term | Usage | Avoid |
|------|-------|-------|
| Захиалга (Order) | Purchase transaction | Худалдан авалт (too formal) |
| Сагс (Cart) | Shopping cart | Бүтээгдэхүүн жагсаалт (too long) |
| Оноо (Points) | Loyalty points | Лояалти оноо (foreign word) |
| Хүргэлт (Delivery) | Shipping/delivery | Тээвэрлэлт (too technical) |
| Үлдэгдэл (Stock) | Available quantity | Агуулах (warehouse, wrong meaning) |

### 9.3 CTA Copy Guidelines
- Use verbs: "Захиалах" (Order), "Дахин захиалах" (Re-order)
- Be specific: "Сагсанд нэмэх" (Add to cart)
- Avoid: "Submit", "Click here", "OK"

### 9.4 Multi-language UX Writing
- Primary: Mongolian (all labels, buttons, navigation)
- Secondary: English (product names may remain in English if supplier-provided)
- Currency: Always MNT, with comma separators (e.g., 25,000₮)

### 9.5 Error Messages
- Be specific: "Интернет холболтоо шалгана уу" (Check your internet)
- Offer solutions: "Дахин оролдох" (Retry)
- No blame: Use "бид" (we) not "та" (you) for system errors

---

## 10. Usability Testing Plan

### 10.1 Test Scenarios
1. First-time user places an order in under 5 minutes
2. Returning user re-orders previous items in under 2 minutes
3. User tracks an active order
4. User checks loyalty points balance

### 10.2 Testing Methods
- Remote unmoderated testing (UserTesting.com or similar)
- In-person testing with actual rural shop owners
- A/B testing for homepage layouts

### 10.3 Success Metrics
- Task completion rate > 85%
- Time on task < 3 minutes for re-order
- Error rate < 5%
- System Usability Scale (SUS) > 70

---

## 11. Competitive UX Analysis

| Competitor | Strengths | Weaknesses | Opportunities |
|-----------|-----------|------------|---------------|
| Instacart | Clean UI, fast search | Consumer-focused, no B2B features | B2B-specific features (bulk, multi-supplier) |
| Local Facebook Groups | Trusted, familiar | Disorganized, no tracking | Organize the chaos into structured platform |
| Phone/WeChat Orders | Personal relationship | No record, errors, no tracking | Digital record-keeping, transparency |
| Alibaba | Massive catalog | Overwhelming, not localized | Localized, curated supplier list |

---

## 12. Success Metrics & KPIs

### 12.1 UX Metrics
- Time to complete first order
- Re-order frequency
- Cart abandonment rate
- Search success rate

### 12.2 Business Metrics
- Monthly active users
- Order conversion rate
- Average order value
- Supplier onboarding count

### 12.3 Technical Metrics
- Page load time (target < 3s on 3G)
- App crash rate
- Offline functionality usage

---

## 13. Design Agent Collaboration

- Specialized mobile UI expertise needed for low-bandwidth optimization
- Consider PWA (Progressive Web App) for offline capabilities
- SMS notification integration design required

---

## 14. Assumptions & Constraints

### Assumptions
- Users have basic smartphone literacy
- Suppliers will adopt the digital platform with training
- Internet connectivity is intermittent but available
- Users prefer Mongolian language interface

### Constraints
- Must work on Android 7+ and iOS 12+
- Must function with 2G/3G connectivity
- Image assets must be < 100KB each
- No heavy JavaScript frameworks (keep bundle small)

---

## 15. Next Steps

1. Create low-fidelity wireframes for key screens (homepage, catalog, cart, orders)
2. Design high-fidelity mockups with Mongolian content
3. Prototype the re-order flow for usability testing
4. Develop component library with mobile-first patterns

**UX Research Document complete. Ready for design phase.**
