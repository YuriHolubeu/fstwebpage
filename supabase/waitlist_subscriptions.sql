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

alter table public.waitlist_subscriptions enable row level security;

grant insert on table public.waitlist_subscriptions to anon;

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
