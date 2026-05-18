-- Hero CTA tables: waiters, vips, pot-investors
-- Run in Supabase SQL Editor for project xlgiwuqgjcefpamjulsp

create table if not exists public.waiters (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text,
  source_path text,
  created_at timestamptz not null default now(),
  constraint waiters_email_key unique (email)
);

create table if not exists public.vips (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text,
  source_path text,
  created_at timestamptz not null default now(),
  constraint vips_email_key unique (email)
);

create table if not exists public."pot-investors" (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  message text,
  source_path text,
  created_at timestamptz not null default now(),
  constraint pot_investors_email_key unique (email)
);

alter table public.waiters add column if not exists message text;
alter table public.vips add column if not exists message text;
alter table public."pot-investors" add column if not exists message text;

alter table public.waiters enable row level security;
alter table public.vips enable row level security;
alter table public."pot-investors" enable row level security;

grant insert on table public.waiters to anon;
grant insert on table public.vips to anon;
grant insert on table public."pot-investors" to anon;

drop policy if exists "Allow public waitlist signups" on public.waiters;
create policy "Allow public waitlist signups"
on public.waiters
for insert
to anon
with check (
  length(trim(name)) > 1
  and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
);

drop policy if exists "Allow public VIP signups" on public.vips;
create policy "Allow public VIP signups"
on public.vips
for insert
to anon
with check (
  length(trim(name)) > 1
  and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
);

drop policy if exists "Allow public investor signups" on public."pot-investors";
create policy "Allow public investor signups"
on public."pot-investors"
for insert
to anon
with check (
  length(trim(name)) > 1
  and email ~* '^[^@\s]+@[^@\s]+\.[^@\s]+$'
);
