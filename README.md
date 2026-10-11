# ICEMAN

ICEMAN is a premium gym apparel and fitness supplements storefront with bilingual Swahili/English experience and a staff office POS & inventory workflow.

## Features

- Premium dark athletic storefront and category browsing
- Swahili/English interface toggle across storefront and staff tools
- Product grid with stock badges, search, and basket inquiry flow
- Auth page for staff sign-in and sign-up with pending approval logic
- Protected office POS with product listing, stock management, and ownership-only product management
- Supabase-ready schema with RLS and `adjust_stock()` audit logging

## Tech stack

- React 19 + Vite SPA
- Tailwind CSS
- Supabase JavaScript client
- PostgreSQL-compatible schema for Supabase

## Local setup

1. Install dependencies:

```bash
npm install
```

2. Copy `.env.example` to `.env` and add your Supabase values:

```bash
cp .env.example .env
```

3. Run the app:

```bash
npm run dev
```

4. Visit `http://localhost:5173`

## Supabase SQL

Use the schema file at `supabase/schema.sql` in the Supabase SQL editor to create the required tables, triggers, policies, and stock adjustment function.

## Notes

- The storefront includes a mock product catalog so the UI is usable before live data is connected.
- When Supabase environment values are configured, the app can be connected to real auth and database data.
- The `adjust_stock()` function is designed to log each inventory change in `stock_movements`.

## Deployment

This project is ready for Vite static hosting or a Supabase-powered deployment pattern. For production, connect the app to a real Supabase project and enable Auth, storage, and row-level security.
