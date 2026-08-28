-- Demo user for local/stakeholder testing only.
-- Email: admin.demo@euroland.com
-- Password: Phase2Demo123!
-- Do not use in production.

create extension if not exists pgcrypto;

insert into auth.users (
  id,
  instance_id,
  aud,
  role,
  email,
  encrypted_password,
  email_confirmed_at,
  raw_app_meta_data,
  raw_user_meta_data,
  created_at,
  updated_at,
  confirmation_token,
  email_change,
  email_change_token_new,
  recovery_token
) values (
  '11111111-1111-4111-8111-111111111111',
  '00000000-0000-0000-0000-000000000000',
  'authenticated',
  'authenticated',
  'admin.demo@euroland.com',
  crypt('Phase2Demo123!', gen_salt('bf')),
  current_timestamp,
  '{"provider":"email","providers":["email"]}',
  '{}',
  current_timestamp,
  current_timestamp,
  '',
  '',
  '',
  ''
)
on conflict (id) do nothing;

insert into auth.identities (
  id,
  user_id,
  identity_data,
  provider,
  provider_id,
  last_sign_in_at,
  created_at,
  updated_at
) values (
  '11111111-1111-4111-8111-111111111111',
  '11111111-1111-4111-8111-111111111111',
  '{"sub":"11111111-1111-4111-8111-111111111111","email":"admin.demo@euroland.com"}'::jsonb,
  'email',
  '11111111-1111-4111-8111-111111111111',
  current_timestamp,
  current_timestamp,
  current_timestamp
)
on conflict (id) do nothing;
