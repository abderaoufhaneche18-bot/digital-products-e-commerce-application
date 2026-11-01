# DigiStore — Digital Products E-commerce

A modern digital-products storefront with a complete shopping experience and an admin dashboard. Built with **React 19**, **TypeScript**, **Tailwind CSS** and **Zustand**.

**Live demo:** https://digital-products-e-commerce-applica-omega.vercel.app

---

## Overview

DigiStore is a front-end e-commerce application for selling digital products such as eBooks, design templates and online courses. It includes a customer-facing store and a protected admin area for managing the catalog and orders.

## Features

### Storefront

- Landing page with featured products and categories
- Product catalog with search, category, price and rating filters
- Sorting by newest, price and rating
- Product detail pages with descriptions, feature lists and reviews
- Shopping cart with quantity controls and live totals
- Wishlist
- Checkout flow and order confirmation page
- Light and dark theme
- State persisted in the browser via `localStorage`

### Admin dashboard

- Password-protected admin area (`#/admin`)
- Store overview with key metrics
- Product management: create, edit, delete and publish/draft
- Order management
- Review moderation
- Product catalog statistics

> **Demo access:** open `#/admin` and use the password `admin123`. This is a client-side demo login and is not intended for production use.

## Tech stack

| Area | Technology |
| --- | --- |
| Framework | React 19 |
| Language | TypeScript 5.9 |
| Build tool | Vite 7 |
| Styling | Tailwind CSS 4 |
| State management | Zustand 5 |
| Icons | Custom SVG icon set |
| Data | Mock data + `localStorage` |

## Getting started

### Prerequisites

- Node.js 18 or newer
- npm

### Installation

```bash
git clone https://github.com/abderaoufhaneche18-bot/digital-products-e-commerce-application.git
cd digital-products-e-commerce-application
npm install
npm run dev
```

The development server runs on the URL printed by Vite (usually `http://localhost:5173`).

### Production build

```bash
npm run build
npm run preview
```

## Views

| View | Access |
| --- | --- |
| Home | Default |
| Products | From the navigation bar |
| Product details | Select any product |
| Cart | From the navigation bar |
| Checkout | From the cart |
| Order confirmation | After checkout |
| Wishlist | From the navigation bar |
| Admin dashboard | `#/admin` |

## Project structure

```text
src/
├── components/       # Navbar, product card, rating, icons
├── data/             # Mock products, reviews and orders
├── pages/            # Storefront pages
│   └── admin/        # Admin dashboard, products, orders, reviews
├── store/            # Zustand store with localStorage persistence
├── types/            # Shared TypeScript types
└── utils/            # Utility helpers
```

## Notes and limitations

This project is a **front-end showcase**. Product data, orders and reviews are mocked and persisted locally in the browser. There is no backend, real authentication service or payment gateway. For a production deployment, the next steps would be:

- Connect a backend or BaaS (Node/Express, Supabase or Firebase)
- Add real authentication and role-based access for the admin area
- Integrate a payment provider
- Store product media in object storage

## Author

**Abderaouf Haneche** — Front-end developer & designer, Tizi Ouzou, Algeria.

- Email: abderaoufhaneche18@gmail.com
- LinkedIn: https://www.linkedin.com/in/abderaouf-haneche-718332380
- Portfolio: http://abderaoufhaneche.shop/
