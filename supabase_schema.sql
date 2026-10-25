-- ===========================================================================
-- CHEP COLLEGE OF NURSING SCIENCES - CORE DATABASE SCHEMA
-- ===========================================================================

-- 1. Applications Table (Admissions Queue)
create table if not exists public.applications (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null,
  email text not null,
  phone text not null,
  program text not null,
  olevel_exam text default 'WAEC',
  exam_year text,
  credits_count text,
  jamb_score text,
  status text not null default 'pending', -- 'pending', 'screened', 'admitted', 'rejected'
  rrr_number text default concat('RRR-', floor(random() * 9000000000 + 1000000000)::text),
  payment_status text not null default 'unpaid', -- 'unpaid', 'paid'
  batch text default 'Batch A-01'
);

-- 2. News & Institutional Dispatches Table
create table if not exists public.news_dispatches (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  title text not null,
  category text not null,
  summary text,
  content text,
  author text default 'Academic Affairs Registry',
  read_time text default '4 min read',
  image_url text,
  published boolean default true
);

-- 3. Students Table (Matriculated Cohort)
create table if not exists public.students (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  matric_number text unique not null,
  full_name text not null,
  email text,
  program text not null,
  level text default 'Year 1',
  nmcn_index text,
  clinical_hours_logged integer default 0
);

-- 4. Clinical Logs Table
create table if not exists public.clinical_logs (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  student_id uuid references public.students(id) on delete cascade,
  hospital_unit text not null,
  shift_date date default current_date,
  hours integer not null default 8,
  procedure_notes text,
  preceptor_signed boolean default false
);

-- Enable Row Level Security (RLS)
alter table public.applications enable row level security;
alter table public.news_dispatches enable row level security;
alter table public.students enable row level security;
alter table public.clinical_logs enable row level security;

-- Policies:
-- Allow anyone to insert into applications (public admission form)
create policy "Allow public admission application" on public.applications
  for insert with check (true);

-- Allow public to read news dispatches
create policy "Allow public to read news" on public.news_dispatches
  for select using (published = true);

-- Strictly restrict administrative access to service_role (backend server actions)
create policy "Service role full access applications" on public.applications
  to service_role using (true) with check (true);

create policy "Service role full access news" on public.news_dispatches
  to service_role using (true) with check (true);

create policy "Service role full access students" on public.students
  to service_role using (true) with check (true);

create policy "Service role full access clinical" on public.clinical_logs
  to service_role using (true) with check (true);

-- Seed initial default news dispatch
insert into public.news_dispatches (title, category, summary, content, author, read_time, image_url)
values 
  ('2026/2027 Professional Basic Nursing Screening Dates Announced by NMCN Accredited Board', 'Admissions 2026/2027', 'Physical computer-based screening and credentials verification scheduled at Ota Main Campus.', 'The Management of CHEP College of Nursing Sciences notifies all verified candidates...', 'Dr. R. A. Adeyemi', '5 min read', '/images/chep/safety_exercise.png'),
  ('Community Health Nursing: Bridging the Gap Between Healthcare and Society', 'Community Health', 'Preventative epidemiology and primary health posts form Nigerias frontline defense.', 'Analysis of CHEPs rural immersion cohorts in Agbebi Central...', 'Nurse T. K. Balogun', '4 min read', '/images/chep/blog_community_health.jpg')
on conflict do nothing;

-- 5. WordPress-Style CMS Users Table
create table if not exists public.site_users (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  full_name text not null,
  email text unique not null,
  role text not null default 'Editor', -- 'Super Admin', 'Editor', 'Lecturer / Faculty', 'Bursar', 'Clinical Preceptor'
  department text default 'Academic Registry',
  status text not null default 'active', -- 'active', 'suspended'
  avatar_url text
);

-- 6. Media & Photograph Gallery Table
create table if not exists public.media_gallery (
  id uuid primary key default gen_random_uuid(),
  created_at timestamptz not null default now(),
  title text not null,
  category text not null default 'campus', -- 'simulation', 'ict', 'matriculation', 'hostel', 'outreach', 'faculty', 'campus'
  image_url text not null,
  caption text,
  uploaded_by text default 'Admin'
);

-- 7. Site Settings & Global Announcements Table
create table if not exists public.site_settings (
  key text primary key,
  updated_at timestamptz not null default now(),
  value text not null
);

-- Enable RLS
alter table public.site_users enable row level security;
alter table public.media_gallery enable row level security;
alter table public.site_settings enable row level security;

create policy "Service role full access site_users" on public.site_users
  to service_role using (true) with check (true);

create policy "Service role full access media_gallery" on public.media_gallery
  to service_role using (true) with check (true);

create policy "Service role full access site_settings" on public.site_settings
  to service_role using (true) with check (true);

create policy "Public read media_gallery" on public.media_gallery
  for select using (true);

create policy "Public read site_settings" on public.site_settings
  for select using (true);

-- Seed initial users
insert into public.site_users (full_name, email, role, department, status, avatar_url)
values
  ('Prof. Stella O. Ayowole', 'provost@chepnursingcollege.org', 'Super Admin', 'Office of the Provost', 'active', '/images/chep/provost.png'),
  ('Akinkuebi Olawunmi Esther', 'akinkuebi.o@chepnursingcollege.org', 'Lecturer / Faculty', 'Nursing Sciences', 'active', '/images/chep/lecturer_akinkuebi.png'),
  ('Jojolade Adeboye Ismail', 'jojolade.a@chepnursingcollege.org', 'Lecturer / Faculty', 'Clinical Preceptorship', 'active', '/images/chep/lecturer_jojolade.png'),
  ('Mr. Samuel E. Akinro', 'registrar@chepnursingcollege.org', 'Editor', 'Academic Affairs Registry', 'active', null)
on conflict do nothing;

