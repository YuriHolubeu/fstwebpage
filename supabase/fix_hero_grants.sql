-- Run if hero VIP / Invest forms return errors (permission denied or RLS).
-- Safe to re-run: idempotent grants + policies for waiters, vips, pot-investors.

alter table public.waiters add column if not exists message text;
alter table public.waiters add column if not exists source_path text;
alter table public.vips add column if not exists message text;
alter table public.vips add column if not exists source_path text;
alter table public."pot-investors" add column if not exists message text;
alter table public."pot-investors" add column if not exists source_path text;

alter table public.waiters enable row level security;
alter table public.vips enable row level security;
alter table public."pot-investors" enable row level security;

grant insert on table public.waiters to anon;
grant insert on table public.vips to anon;
grant insert on table public."pot-investors" to anon;

drop policy if exists "Allow public waitlist signups" on public.waiters;
create policy "Allow public waitlist signups"
on public.waiters for insert to anon
with check (
  length(trim(name)) > 1
  and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
);

drop policy if exists "Allow public VIP signups" on public.vips;
create policy "Allow public VIP signups"
on public.vips for insert to anon
with check (
  length(trim(name)) > 1
  and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
);

drop policy if exists "Allow public investor signups" on public."pot-investors";
create policy "Allow public investor signups"
on public."pot-investors" for insert to anon
with check (
  length(trim(name)) > 1
  and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
);
