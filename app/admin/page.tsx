import { redirect } from "next/navigation"

export default function AdminRootPage() {
  // Redirect to the main admin dashboard
  redirect("/admin/dashboard")

  // This return is technically unreachable due to the redirect,
  // but Next.js requires a component to be exported.
  return null
}
