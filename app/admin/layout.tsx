import React from "react";
import type { Metadata } from "next";
import { getAuthenticatedUser, checkUserIsAdmin } from "@/lib/auth/server";
import { AdminLayoutShell } from "@/components/admin/AdminLayoutShell";

export const metadata: Metadata = {
  robots: {
    index: false,
    follow: false,
  },
};

export default async function AdminLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const user = await getAuthenticatedUser();

  // If not logged in, render child route (e.g. /admin/login) directly without shell
  if (!user) {
    return <>{children}</>;
  }

  // Check admin authorization
  const { isAdmin, role } = await checkUserIsAdmin(user.id);

  // If authenticated but unauthorized, render child route (e.g. /admin/unauthorized) without shell
  if (!isAdmin) {
    return <>{children}</>;
  }

  // Authorized administrator -> render dedicated administrative shell
  return (
    <AdminLayoutShell userEmail={user.email} role={role || "admin"}>
      {children}
    </AdminLayoutShell>
  );
}
