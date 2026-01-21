"use client"

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card"
import { ConvexClientProvider } from "@/providers/convex-client-provider"
import { api } from "convex/_generated/api"
import { useQuery } from "convex/react"
import { Briefcase, Building2, MessageSquare, Tag, Users } from "lucide-react"
import Link from "next/link"

function DashboardContent() {
  const teamCount = useQuery(api.team.count)
  const servicesCount = useQuery(api.services.count)
  const clientsCount = useQuery(api.clients.count)
  const categoriesCount = useQuery(api.categories.count)
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
      title: "Leads",
      value: leadsCount ?? 0,
      icon: MessageSquare,
      href: "/admin/leads",
      color: "text-red-600",
      bgColor: "bg-red-50",
      badge: unreadLeadsCount && unreadLeadsCount > 0 ? unreadLeadsCount : undefined,
    },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold">Dashboard</h1>
        <p className="text-muted-foreground mt-2">Resumen general del sistema</p>
      </div>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {kpis.map((kpi) => {
          const Icon = kpi.icon
          return (
            <Link key={kpi.title} href={kpi.href}>
              <Card className="hover:shadow-md transition-shadow cursor-pointer">
                <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                  <CardTitle className="text-sm font-medium">{kpi.title}</CardTitle>
                  <div className={`${kpi.bgColor} ${kpi.color} p-2 rounded-lg`}>
                    <Icon className="h-5 w-5" />
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline justify-between">
                    <div className="text-3xl font-bold">{kpi.value}</div>
                    {kpi.badge !== undefined && (
                      <div className="text-sm text-muted-foreground">
                        {kpi.badge} sin leer
                      </div>
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
