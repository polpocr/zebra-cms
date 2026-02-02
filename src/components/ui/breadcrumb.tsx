"use client"

import { cn } from "@/lib/utils"
import { ChevronRight, Home } from "lucide-react"
import Link from "next/link"
import { usePathname } from "next/navigation"

export function Breadcrumbs() {
  const pathname = usePathname()
  const segments = pathname.split("/").filter(Boolean)

  const breadcrumbMap: Record<string, string> = {
    admin: "Dashboard",
    team: "Equipo",
    services: "Servicios",
    clients: "Clientes",
    categories: "Categorías",
    leads: "Leads",
  }

  if (segments.length === 0 || (segments.length === 1 && segments[0] === "admin")) {
    return null
  }

  return (
    <nav className="flex items-center gap-2 text-sm text-muted-foreground">
      <Link
        href="/admin"
        className="flex items-center gap-1 hover:text-foreground transition-colors"
      >
        <Home className="h-4 w-4" />
        <span className="hidden sm:inline">Dashboard</span>
      </Link>
      {segments.slice(1).map((segment, index) => {
        const isLast = index === segments.slice(1).length - 1
        const pathSegments = segments.slice(0, index + 2)
        const href = `/${pathSegments.join("/")}`
        const label = breadcrumbMap[segment] || segment

        return (
          <div key={segment} className="flex items-center gap-2">
            <ChevronRight className="h-4 w-4" />
            {isLast ? (
              <span className="text-foreground font-medium">{label}</span>
            ) : (
              <Link href={href} className="hover:text-foreground transition-colors">
                {label}
              </Link>
            )}
          </div>
        )
      })}
    </nav>
  )
}
