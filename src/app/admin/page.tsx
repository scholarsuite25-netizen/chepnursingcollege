import { redirect } from "next/navigation";

// Security Deflection: The administrative portal has been moved to a custom secure route.
// Unauthorized visitors probing /admin are automatically redirected to the public home page.
export default function AdminRedirectPage() {
  redirect("/");
}
