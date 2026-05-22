# Supabase — Focus Structure Tool (marketing site)

**Project:** [xlgiwuqgjcefpamjulsp](https://supabase.com/dashboard/project/xlgiwuqgjcefpamjulsp)  
**API URL:** `https://xlgiwuqgjcefpamjulsp.supabase.co`

This repository connects the public Vue/Quasar site to Supabase using the **anon** key and **Row Level Security (RLS)**. There is no custom backend for form intake.

---

## Architecture

| UI entry point | Service module | Database table |
|----------------|----------------|----------------|
| Hero → Join waitlist | `src/services/hero-signups.js` | `waiters` |
| Hero → VIP | `src/services/hero-signups.js` | `vips` |
| Hero → Investor | `src/services/hero-signups.js` | `pot-investors` |
| Contact → message body | `src/services/contact-messages.js` | `contact_messages` |
| Contact → Waitlist checkbox | `src/services/audience-subscriptions.js` | `waitlist_subscriptions` |
| Contact → VIP checkbox | `src/services/audience-subscriptions.js` | `vip_subscription_requests` |
| Contact → Newsletter | `src/services/audience-subscriptions.js` | `newsletter_subscriptions` |
| Contact → Sponsor | `src/services/audience-subscriptions.js` | `sponsor_inquiries` |

Shared HTTP layer: `src/lib/supabase-client.js`  
Dev boot check: `src/boot/supabase.js`

---

## Security model (production standard)

| Layer | Rule |
|-------|------|
| Frontend | Only `VITE_SUPABASE_ANON_KEY` (public by design) |
| Never in git | `service_role`, database password, Resend API key |
| Database | RLS enabled on every intake table |
| `anon` role | `INSERT` only — no `SELECT` on public forms |
| Validation | Policies enforce name length + email format |

---

## One-time database setup

Run in [SQL Editor](https://supabase.com/dashboard/project/xlgiwuqgjcefpamjulsp/sql/new) **in order**:

1. `setup_all.sql` — contact + subscription tables  
2. `hero_signup_tables.sql` — hero CTA tables  

Verify in **Table Editor**: all 8 tables listed above exist.

### Reset test data (optional)

```sql
truncate table public.contact_messages;
truncate table public.waitlist_subscriptions;
truncate table public.vip_subscription_requests;
truncate table public.newsletter_subscriptions;
truncate table public.sponsor_inquiries;
truncate table public.waiters;
truncate table public.vips;
truncate table public."pot-investors";
```

---

## Local development

```bash
cp .env.example .env.local
```

Set in `.env.local`:

- `VITE_SUPABASE_URL` — Project Settings → API → Project URL  
- `VITE_SUPABASE_ANON_KEY` — Project Settings → API → `anon` `public`

```bash
npm install
npm run dev
```

Submit each form once and confirm a row appears in the matching table.

---

## Production (GitHub Pages)

Vite embeds `VITE_*` variables **at build time**. The live site does not read `.env.local`.

### Option A — CI (recommended)

1. GitHub repo → **Settings → Secrets and variables → Actions**  
2. Add secrets:
   - `VITE_SUPABASE_URL` = `https://xlgiwuqgjcefpamjulsp.supabase.co`
   - `VITE_SUPABASE_ANON_KEY` = your anon key  
3. Push to `main` — workflow `.github/workflows/deploy-pages.yml` runs `npm run build` and commits `docs/`.

### Option B — Manual build

```bash
# .env.local must exist with the same values
npm run build
git add docs/
git commit -m "chore: rebuild site with Supabase configuration"
git push origin main
```

---

## Email notifications (optional)

See [email_notifications_setup.md](./email_notifications_setup.md) for Edge Function + Resend.

Set `VITE_SUPABASE_SIGNUP_NOTIFICATION_FUNCTION=send-signup-notification` after deploy.

---

## Operations checklist

- [ ] All 8 tables exist with RLS policies  
- [ ] `.env.local` configured locally  
- [ ] GitHub Actions secrets set (if using CI)  
- [ ] Test hero waitlist → row in `waiters`  
- [ ] Test contact form → `contact_messages` + checkbox tables  
- [ ] Table Editor reviewed weekly (no `service_role` in frontend)  

---

## Troubleshooting

| Symptom | Fix |
|---------|-----|
| “Supabase is not configured yet” | Add `.env.local`, restart `npm run dev` |
| Works locally, not on focusstructure.com | Re-run `npm run build` with env vars, push `docs/` |
| HTTP 401 / 403 | Wrong anon key or missing `grant insert` / RLS policy |
| HTTP 409 on hero forms | Same email already registered (expected) |
| HTTP 400 on contact | Check required columns; `message` must be non-empty |

Dashboard: [Table Editor](https://supabase.com/dashboard/project/xlgiwuqgjcefpamjulsp/editor)
