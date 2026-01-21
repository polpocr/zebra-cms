"use client"

import { Footer } from "@/components/footer"
import { Navbar } from "@/components/navbar"
import { usePathname } from "next/navigation"

export function SiteLayout({ children }: { children: React.ReactNode }) {
  const pathname = usePathname()
  const isAdminRoute = pathname?.startsWith("/admin")
  const isAuthRoute = pathname?.startsWith("/sign-in") || pathname?.startsWith("/sign-up")

  if (isAdminRoute || isAuthRoute) {
    return <>{children}</>
  }

  return (
    <>
      <Navbar />
      {children}
      <Footer />
    </>
  )
}
