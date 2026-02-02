"use client"

import { Badge } from "@/components/ui/badge"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { Skeleton } from "@/components/ui/skeleton"
import { ConvexClientProvider } from "@/providers/convex-client-provider"
import { api } from "convex/_generated/api"
import { useQuery } from "convex/react"
import { Award, Briefcase, Building2, MessageSquare, Tag, Users } from "lucide-react"
import Link from "next/link"

const DASHBOARD_SKELETON_KEYS = ["sk-1", "sk-2", "sk-3", "sk-4", "sk-5"] as const

function DashboardContent() {
  const teamCount = useQuery(api.team.count)
  const servicesCount = useQuery(api.services.count)
  const clientsCount = useQuery(api.clients.count)
  const categoriesCount = useQuery(api.categories.count)
  const brandsCount = useQuery(api.brands.count)
  const leadsCount = useQuery(api.leads.count)
  const unreadLeadsCount = useQuery(api.leads.unreadCount)

  const kpis = [
    {
      title: "Equipo",
      value: teamCount ?? 0,
      icon: Users,
      href: "/admin/team",
      color: "text-blue-600",
      bgColor: "bg-blue-50",
    },
    {
      title: "Servicios",
      value: servicesCount ?? 0,
      icon: Briefcase,
      href: "/admin/services",
      color: "text-green-600",
      bgColor: "bg-green-50",
    },
    {
      title: "Clientes",
      value: clientsCount ?? 0,
      icon: Building2,
      href: "/admin/clients",
      color: "text-purple-600",
      bgColor: "bg-purple-50",
    },
    {
      title: "Categorías",
      value: categoriesCount ?? 0,
      icon: Tag,
      href: "/admin/categories",
      color: "text-orange-600",
      bgColor: "bg-orange-50",
    },
    {
      title: "Marcas",
      value: brandsCount ?? 0,
      icon: Award,
      href: "/admin/brands",
      color: "text-indigo-600",
      bgColor: "bg-indigo-50",
    },
    {
      title: "Leads",
      value: leadsCount ?? 0,
      icon: MessageSquare,
      href: "/admin/leads",
      color: "text-red-600",
      bgColor: "bg-red-50",
      badge: unreadLeadsCount && unreadLeadsCount > 0 ? unreadLeadsCount : undefined,
    },
  ]

  const isLoading =
    teamCount === undefined ||
    servicesCount === undefined ||
    clientsCount === undefined ||
    categoriesCount === undefined ||
    brandsCount === undefined ||
    leadsCount === undefined

  return (
    <div className="space-y-8">
      <div className="space-y-2">
        <h1 className="text-4xl font-bold tracking-tight">Dashboard</h1>
        <p className="text-muted-foreground text-lg">Resumen general del sistema</p>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {isLoading
          ? DASHBOARD_SKELETON_KEYS.map((key) => (
              <Card key={key} className="border-2">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                  <Skeleton className="h-5 w-24" />
                  <Skeleton className="h-10 w-10 rounded-lg" />
                </CardHeader>
                <CardContent>
                  <Skeleton className="h-9 w-16" />
                </CardContent>
              </Card>
            ))
          : kpis.map((kpi) => {
              const Icon = kpi.icon
              return (
                <Link key={kpi.title} href={kpi.href} className="group">
                  <Card className="relative overflow-hidden border-2 transition-all duration-300 hover:shadow-lg hover:border-primary/20 hover:-translate-y-1">
                    <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-4">
                      <CardTitle className="text-sm font-semibold text-muted-foreground">
                        {kpi.title}
                      </CardTitle>
                      <div
                        className={`${kpi.bgColor} ${kpi.color} p-3 rounded-xl transition-transform duration-300 group-hover:scale-110 group-hover:rotate-3`}
                      >
                        <Icon className="h-5 w-5" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-baseline justify-between">
                        <div className="text-4xl font-bold tracking-tight">{kpi.value}</div>
                        {kpi.badge !== undefined && (
                          <Badge
                            variant="default"
                            className="bg-primary text-primary-foreground font-semibold shadow-sm"
                          >
                            {kpi.badge} nuevo{kpi.badge > 1 ? "s" : ""}
                          </Badge>
                        )}
                      </div>
                    </CardContent>
                  </Card>
                </Link>
              )
            })}
      </div>
    </div>
  )
}

export default function AdminPage() {
  return (
    <ConvexClientProvider>
      <DashboardContent />
    </ConvexClientProvider>
  )
}
