create table if not exists public.waitlist_subscriptions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text,
  source_path text,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  constraint waitlist_subscriptions_email_key unique (email),
  constraint waitlist_subscriptions_status_check check (status in ('active', 'unsubscribed'))
);

alter table public.waitlist_subscriptions
add column if not exists message text;

create table if not exists public.vip_subscription_requests (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text,
  source_path text,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  constraint vip_subscription_requests_email_key unique (email),
  constraint vip_subscription_requests_status_check check (status in ('active', 'contacted', 'converted', 'declined'))
);

create table if not exists public.newsletter_subscriptions (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text,
  source_path text,
  status text not null default 'active',
  created_at timestamptz not null default now(),
  constraint newsletter_subscriptions_email_key unique (email),
  constraint newsletter_subscriptions_status_check check (status in ('active', 'unsubscribed'))
);

alter table public.waitlist_subscriptions enable row level security;
alter table public.vip_subscription_requests enable row level security;
alter table public.newsletter_subscriptions enable row level security;

grant insert on table public.waitlist_subscriptions to anon;
grant insert on table public.vip_subscription_requests to anon;
grant insert on table public.newsletter_subscriptions to anon;

drop policy if exists "Allow public waitlist signups" on public.waitlist_subscriptions;
create policy "Allow public waitlist signups"
on public.waitlist_subscriptions
for insert
to anon
with check (
  status = 'active'
  and length(trim(name)) > 1
  and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
);

drop policy if exists "Allow public VIP signups" on public.vip_subscription_requests;
create policy "Allow public VIP signups"
on public.vip_subscription_requests
for insert
to anon
with check (
  status = 'active'
  and length(trim(name)) > 1
  and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
);

drop policy if exists "Allow public newsletter signups" on public.newsletter_subscriptions;
create policy "Allow public newsletter signups"
on public.newsletter_subscriptions
for insert
to anon
with check (
  status = 'active'
  and length(trim(name)) > 1
  and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
);
