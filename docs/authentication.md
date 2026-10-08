# Saif Trading Co — Authentication & Admin Security Architecture

This document specifies the authentication system, session lifecycle, role-based authorization model, and administrative provisioning procedures for **Saif Trading Co**.

---

## 1. Architectural Philosophy

### 1.1 Authentication vs. Authorization
- **Authentication ("Who is this user?"):** Handled exclusively by **Supabase Auth** via email and password credentials.
- **Authorization ("Can this user access the administration portal?"):** Handled by the database-backed `public.profiles` table and `public.is_admin()` PostgreSQL security function.

> **Zero Trust Rule:** An authenticated user is **never** assumed to be an administrator (`authenticated !== admin`). Ordinary authenticated accounts have zero access to administrative routes, catalogues, or inquiries.

### 1.2 No Public Registration
- There is **no public registration route** (`/admin/register` does not exist).
- Admin accounts are strictly provisioned server-side by the project owner.

---

## 2. Technology Stack & Protocol

- **Engine:** Supabase Auth (GoTrue) + PostgreSQL 15+.
- **Framework:** Next.js App Router (React Server Components + Server Actions).
- **Session Layer:** `@supabase/ssr` with HttpOnly, Secure, SameSite cookies.
- **Credential Storage:** Delegated entirely to Supabase Auth's bcrypt/argon2 hashing. Passwords are never stored or handled in application database tables.

---

## 3. Database Authorization Model

### 3.1 `profiles` Table
```sql
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  role text not null default 'admin' check (role in ('admin', 'super_admin')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);
```

### 3.2 Security Protections
1. **No Client Role Manipulation:** Ordinary users cannot update the `role` column. RLS policy `Admins can manage profiles` restricts INSERT/UPDATE/DELETE strictly to verified administrators.
2. **Zero Reliance on `user_metadata`:** User metadata is editable by clients in standard Supabase setups and is **never** used for authorization.
3. **`public.is_admin()` Security Function:**
   ```sql
   create or replace function public.is_admin()
   returns boolean
   language sql
   security definer
   set search_path = public
   stable
   as $$
     select exists (
       select 1 from public.profiles
       where id = auth.uid() and role in ('admin', 'super_admin')
     ) or exists (
       select 1 from public.admin_roles
       where user_id = auth.uid() and role in ('admin', 'super_admin')
     );
   $$;
   ```

---

## 4. Route Protection & Interception

### 4.1 Next.js Middleware (`middleware.ts`)
- Intercepts requests to `/admin/*` (excluding public `/admin/login` and `/admin/unauthorized`).
- Refreshes auth session cookies via `@supabase/ssr`.
- If unauthenticated: Redirects to `/admin/login?next=[safe-internal-path]`.
- Performance: Does **not** execute database queries on public routes.

### 4.2 Server-Side Guard (`requireAdmin()`)
Route protection in middleware is paired with strict server-side checks in Server Components and Server Actions:
```ts
import { requireAdmin } from "@/lib/auth/server";

export default async function AdminPage() {
  const admin = await requireAdmin(); // Throws redirect if not admin
  // ... render admin content safely
}
```

- **Unauthenticated visitor:** Redirected to `/admin/login`.
- **Authenticated non-admin user:** Redirected to `/admin/unauthorized`.
- **Verified administrator:** Returns `AdminUserContext` (`{ id, email, role, user }`).

---

## 5. Admin Provisioning Procedure

To establish the initial administrator account securely:

### Step 1: Create the User in Supabase Auth
In the **Supabase Dashboard** under **Authentication > Users**:
1. Click **Add User** > **Create User**.
2. Enter the administrator's email address (e.g., `admin@saiftradingco.com`) and a strong temporary password.
3. Confirm email verification is marked as complete.
4. Copy the generated User UUID (e.g., `11111111-2222-3333-4444-555555555555`).

### Step 2: Assign the Admin Role via SQL Editor
Run the following SQL statement in the Supabase **SQL Editor**:
```sql
insert into public.profiles (id, email, role)
values (
  '11111111-2222-3333-4444-555555555555', -- Paste User UUID here
  'admin@saiftradingco.com',
  'admin'
)
on conflict (id) do update set
  role = 'admin',
  updated_at = now();
```

### Step 3: Verify Administrative Sign-In
1. Navigate to `/admin/login`.
2. Enter the administrator credentials.
3. The server will authenticate the session, verify the `admin` role in `profiles`, and redirect to `/admin/dashboard`.

---

## 6. Open Redirect Protection

Untrusted redirect parameters (`?next=...`) are sanitized using `getSafeRedirectPath`:
- External URLs (e.g., `https://evil.com`, `//evil.com`) are rejected.
- Protocol escapes (e.g., `javascript:`, `data:`) are rejected.
- Windows backslash escapes (e.g., `/\evil.com`) are rejected.
- Unsafe values safely fallback to `/admin/dashboard`.

---

## 7. Sign In & Sign Out Flow

- **Sign In (`signInAction`):**
  - Accepts email and password.
  - Returns generic message `"Unable to sign in. Please check your email and password and try again."` upon failure (prevents user enumeration).
  - Verifies admin role immediately on the server.
- **Sign Out (`signOutAction`):**
  - Invalidates the Supabase session via `supabase.auth.signOut()`.
  - Clears all session cookies.
  - Redirects user to `/admin/login`.

---

## 8. Password Recovery Status

- In V1, password recovery via email is disabled to avoid unverified email relay dependencies and enumeration vectors.
- Password updates are managed directly by project administrators via the Supabase Dashboard.
