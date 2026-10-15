-- ============================================================
-- SAIF TRADING CO — INSTANT ADMIN CREDENTIALS SETUP
-- Run this in Supabase SQL Editor:
-- https://supabase.com/dashboard/project/zafmpwmvcfrmaloscnkj/sql/new
--
-- Sets up working login credentials:
-- Email:    admin@saiftradingco.com
-- Password: SaifTrading2026!
--
-- Email 2:  saiftradingco@yahoo.com
-- Password: SaifTrading2026!
-- ============================================================

create extension if not exists pgcrypto;

do $$
declare
  v_user_id uuid;
  v_encrypted_pw text;
begin
  -- Generate standard bcrypt hash for password: SaifTrading2026!
  v_encrypted_pw := crypt('SaifTrading2026!', gen_salt('bf', 10));

  -------------------------------------------------------------
  -- 1. admin@saiftradingco.com
  -------------------------------------------------------------
  select id into v_user_id from auth.users where email = 'admin@saiftradingco.com';

  if v_user_id is null then
    v_user_id := gen_random_uuid();
    
    insert into auth.users (
      id,
      instance_id,
      email,
      encrypted_password,
      email_confirmed_at,
      raw_app_meta_data,
      raw_user_meta_data,
      aud,
      role,
      created_at,
      updated_at
    ) values (
      v_user_id,
      '00000000-0000-0000-0000-000000000000',
      'admin@saiftradingco.com',
      v_encrypted_pw,
      now(),
      '{"provider":"email","providers":["email"]}'::jsonb,
      '{"full_name":"Saif Admin"}'::jsonb,
      'authenticated',
      'authenticated',
      now(),
      now()
    );

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
      gen_random_uuid(),
      v_user_id,
      json_build_object('sub', v_user_id::text, 'email', 'admin@saiftradingco.com')::jsonb,
      'email',
      v_user_id::text,
      now(),
      now(),
      now()
    ) on conflict do nothing;
  else
    update auth.users
    set encrypted_password = v_encrypted_pw,
        email_confirmed_at = coalesce(email_confirmed_at, now()),
        updated_at = now()
    where id = v_user_id;
  end if;

  insert into public.profiles (id, email, role)
  values (v_user_id, 'admin@saiftradingco.com', 'admin')
  on conflict (id) do update set role = 'admin', email = 'admin@saiftradingco.com';

  insert into public.admin_roles (user_id, role)
  values (v_user_id, 'super_admin')
  on conflict (user_id) do nothing;

  -------------------------------------------------------------
  -- 2. saiftradingco@yahoo.com
  -------------------------------------------------------------
  select id into v_user_id from auth.users where email = 'saiftradingco@yahoo.com';

  if v_user_id is null then
    v_user_id := gen_random_uuid();
    
    insert into auth.users (
      id,
      instance_id,
      email,
      encrypted_password,
      email_confirmed_at,
      raw_app_meta_data,
      raw_user_meta_data,
      aud,
      role,
      created_at,
      updated_at
    ) values (
      v_user_id,
      '00000000-0000-0000-0000-000000000000',
      'saiftradingco@yahoo.com',
      v_encrypted_pw,
      now(),
      '{"provider":"email","providers":["email"]}'::jsonb,
      '{"full_name":"Saif Trading"}'::jsonb,
      'authenticated',
      'authenticated',
      now(),
      now()
    );

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
      gen_random_uuid(),
      v_user_id,
      json_build_object('sub', v_user_id::text, 'email', 'saiftradingco@yahoo.com')::jsonb,
      'email',
      v_user_id::text,
      now(),
      now(),
      now()
    ) on conflict do nothing;
  else
    update auth.users
    set encrypted_password = v_encrypted_pw,
        email_confirmed_at = coalesce(email_confirmed_at, now()),
        updated_at = now()
    where id = v_user_id;
  end if;

  insert into public.profiles (id, email, role)
  values (v_user_id, 'saiftradingco@yahoo.com', 'admin')
  on conflict (id) do update set role = 'admin', email = 'saiftradingco@yahoo.com';

  insert into public.admin_roles (user_id, role)
  values (v_user_id, 'super_admin')
  on conflict (user_id) do nothing;

end $$;
