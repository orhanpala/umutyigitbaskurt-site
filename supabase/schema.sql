-- umutyigitbaskurt.com — Supabase şeması
-- Supabase Dashboard > SQL Editor içine yapıştırıp tek seferde çalıştırın.

create extension if not exists pgcrypto;

-- ---------------------------------------------------------------------
-- Tablolar
-- ---------------------------------------------------------------------

create table if not exists about (
  id smallint primary key default 1,
  eyebrow_tr text not null default '',
  eyebrow_en text not null default '',
  headline_tr text not null default '',
  headline_en text not null default '',
  lead_tr text not null default '',
  lead_en text not null default '',
  bio_tr text not null default '',
  bio_en text not null default '',
  photo_url text,
  cv_url text,
  contact_email text,
  linkedin_url text,
  stat_projects integer not null default 0,
  stat_certificates integer not null default 0,
  stat_internships integer not null default 0,
  stat_languages integer not null default 2,
  timeline jsonb not null default '[]'::jsonb,
  updated_at timestamptz not null default now(),
  constraint about_single_row check (id = 1)
);

create table if not exists projects (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  category_tr text not null default '',
  category_en text not null default '',
  title_tr text not null default '',
  title_en text not null default '',
  summary_tr text not null default '',
  summary_en text not null default '',
  content_tr text not null default '',
  content_en text not null default '',
  image_url text,
  published boolean not null default true,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists blog_posts (
  id uuid primary key default gen_random_uuid(),
  slug text not null unique,
  title_tr text not null default '',
  title_en text not null default '',
  excerpt_tr text not null default '',
  excerpt_en text not null default '',
  content_tr text not null default '',
  content_en text not null default '',
  cover_image_url text,
  published boolean not null default true,
  published_at timestamptz,
  created_at timestamptz not null default now()
);

create table if not exists certificates (
  id uuid primary key default gen_random_uuid(),
  title_tr text not null default '',
  title_en text not null default '',
  issuer text not null default '',
  issue_date date,
  image_url text,
  document_url text,
  sort_order integer not null default 0,
  created_at timestamptz not null default now()
);

create table if not exists messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  email text not null,
  subject text,
  message text not null,
  is_read boolean not null default false,
  created_at timestamptz not null default now()
);

-- Anasayfa/hakkımda içeriği için tek satırlık varsayılan kayıt.
insert into about (id) values (1) on conflict (id) do nothing;

-- ---------------------------------------------------------------------
-- Row Level Security
-- ---------------------------------------------------------------------

alter table about enable row level security;
alter table projects enable row level security;
alter table blog_posts enable row level security;
alter table certificates enable row level security;
alter table messages enable row level security;

-- about: herkes okuyabilir, sadece giriş yapan kullanıcı (Umut) güncelleyebilir.
create policy "about_public_read" on about for select using (true);
create policy "about_auth_update" on about for update using (auth.role() = 'authenticated');

-- projects: herkes yayınlanmışı okur, giriş yapan kullanıcı her şeyi okur/yazar/siler.
create policy "projects_public_read" on projects for select using (published = true or auth.role() = 'authenticated');
create policy "projects_auth_insert" on projects for insert with check (auth.role() = 'authenticated');
create policy "projects_auth_update" on projects for update using (auth.role() = 'authenticated');
create policy "projects_auth_delete" on projects for delete using (auth.role() = 'authenticated');

-- blog_posts: aynı desen.
create policy "blog_posts_public_read" on blog_posts for select using (published = true or auth.role() = 'authenticated');
create policy "blog_posts_auth_insert" on blog_posts for insert with check (auth.role() = 'authenticated');
create policy "blog_posts_auth_update" on blog_posts for update using (auth.role() = 'authenticated');
create policy "blog_posts_auth_delete" on blog_posts for delete using (auth.role() = 'authenticated');

-- certificates: herkes okuyabilir (yayın durumu yok), sadece admin yazar/siler.
create policy "certificates_public_read" on certificates for select using (true);
create policy "certificates_auth_insert" on certificates for insert with check (auth.role() = 'authenticated');
create policy "certificates_auth_update" on certificates for update using (auth.role() = 'authenticated');
create policy "certificates_auth_delete" on certificates for delete using (auth.role() = 'authenticated');

-- messages: herkes mesaj gönderebilir (insert), sadece admin okur/günceller/siler.
create policy "messages_public_insert" on messages for insert with check (true);
create policy "messages_auth_select" on messages for select using (auth.role() = 'authenticated');
create policy "messages_auth_update" on messages for update using (auth.role() = 'authenticated');
create policy "messages_auth_delete" on messages for delete using (auth.role() = 'authenticated');

-- ---------------------------------------------------------------------
-- Storage — görseller için "media" bucket'ı
-- ---------------------------------------------------------------------

insert into storage.buckets (id, name, public)
values ('media', 'media', true)
on conflict (id) do nothing;

create policy "media_public_read" on storage.objects for select using (bucket_id = 'media');
create policy "media_auth_insert" on storage.objects for insert with check (bucket_id = 'media' and auth.role() = 'authenticated');
create policy "media_auth_update" on storage.objects for update using (bucket_id = 'media' and auth.role() = 'authenticated');
create policy "media_auth_delete" on storage.objects for delete using (bucket_id = 'media' and auth.role() = 'authenticated');
