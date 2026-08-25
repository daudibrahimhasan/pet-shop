# DHALI's Unique Collection

Production-ready Next.js storefront and admin panel for DHALI's Unique Collection in Gulshan-2, Dhaka.

## Included

- Responsive storefront, category pages, search, sorting, product pages and persistent cart
- Cash on Delivery checkout with trusted server-side pricing and atomic stock updates
- Supabase PostgreSQL catalogue and order storage
- Supabase Auth protected admin panel
- Product upload with image preview, validation and Supabase Storage
- Product catalogue, inventory overview and order status management
- SEO metadata, product structured data, sitemap, robots and security headers
- Original DHALI hero, cat and dog collection imagery
- Vercel configuration using the Singapore region

No bKash, Nagad, card or other online payment gateway is included. Payment is Cash on Delivery only.

## Local setup

1. Install Node.js 20 or newer.
2. Run `npm ci`.
3. Copy `.env.example` to `.env.local`. The local admin password defaults to `admin123`.
4. For Supabase-backed production data, create a Supabase project and run `supabase/migrations/001_initial.sql` in its SQL editor.
5. Add the Supabase project URL and publishable key to `.env.local`.
6. Create the owner in Supabase Authentication, copy its UUID, then run:

```sql
insert into public.admin_users(user_id) values('AUTH_USER_UUID');
```

7. Run `npm run dev`.

Storefront: `http://localhost:3000`

Admin: `http://localhost:3000/admin/login`

Without Supabase environment variables, development mode uses the bundled local catalogue, local orders, and the password-protected local admin. Set `ADMIN_PASSWORD` and a long random `ADMIN_SESSION_SECRET`; never keep `admin123` on a public deployment.

## Production checks

```bash
npm run typecheck
npm run lint
npm run build
npm audit --audit-level=high
```

## Deploy to Vercel

1. Import this repository into Vercel.
2. Add `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_SUPABASE_URL` and `NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY` to Production and Preview environments.
3. Set `ADMIN_PASSWORD` to a strong password and `ADMIN_SESSION_SECRET` to a long random value.
4. Set the Supabase Auth Site URL to the production Vercel domain.
5. Add the production and preview domains to Supabase Auth redirect URLs.
6. Deploy. Vercel uses `npm ci` and `npm run build` automatically.

Product images are public. Product, inventory, order and Storage mutations are restricted by Supabase Row Level Security and the `admin_users` table. Never expose a Supabase service-role key to the browser.
