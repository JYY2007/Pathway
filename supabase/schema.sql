-- Optional future integration. This starter currently stores demo data in the browser.
-- Execute in Supabase SQL Editor after reviewing the policies.
create table if not exists public.profiles (
  user_id uuid primary key references auth.users(id) on delete cascade,
  display_name text not null default '',
  career_stage text,
  career_goal text,
  region text,
  updated_at timestamptz not null default now()
);
create table if not exists public.reflections (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  content text not null,
  created_at timestamptz not null default now()
);
create table if not exists public.learning_tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  details text,
  completed boolean not null default false,
  created_at timestamptz not null default now()
);
alter table public.profiles enable row level security;
alter table public.reflections enable row level security;
alter table public.learning_tasks enable row level security;
create policy "profile owner access" on public.profiles for all to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "reflection owner access" on public.reflections for all to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
create policy "task owner access" on public.learning_tasks for all to authenticated using ((select auth.uid()) = user_id) with check ((select auth.uid()) = user_id);
