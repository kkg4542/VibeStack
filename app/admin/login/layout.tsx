import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { ADMIN_COOKIE_NAME, isValidAdminToken } from "@/lib/admin-token";

// A signed-in admin has no reason to see the sign-in form; send them to the
// dashboard. Signed-out visitors fall through to the form (the parent admin
// layout renders no chrome for them).
export default async function AdminLoginLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  if (await isValidAdminToken((await cookies()).get(ADMIN_COOKIE_NAME)?.value)) {
    redirect("/admin");
  }
  return <>{children}</>;
}
