"use client"

import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Breadcrumbs } from "@/components/ui/breadcrumb"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {
  Sidebar,
  SidebarContent,
  SidebarGroup,
  SidebarGroupContent,
  SidebarGroupLabel,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  SidebarProvider,
  SidebarTrigger,
} from "@/components/ui/sidebar"
import { useClerk, useUser } from "@clerk/nextjs"
import {
  Award,
  Briefcase,
  Building2,
  LayoutDashboard,
  LogOut,
  MessageSquare,
  Tag,
  User,
  Users,
} from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { useRouter } from "next/navigation"
import { usePathname } from "next/navigation"

const menuItems = [
  {
    title: "Dashboard",
    url: "/admin",
    icon: LayoutDashboard,
  },
  {
    title: "Equipo",
    url: "/admin/team",
    icon: Users,
  },
  {
    title: "Servicios",
    url: "/admin/services",
    icon: Briefcase,
  },
  {
    title: "Clientes",
    url: "/admin/clients",
    icon: Building2,
  },
  {
    title: "Categorías",
    url: "/admin/categories",
    icon: Tag,
  },
  {
    title: "Marcas",
    url: "/admin/brands",
    icon: Award,
  },
  {
    title: "Leads",
    url: "/admin/leads",
    icon: MessageSquare,
  },
]

export default function AdminLayout({
  children,
}: {
  children: React.ReactNode
}) {
  const { user, isLoaded } = useUser()
  const { openUserProfile, signOut } = useClerk()
  const pathname = usePathname()
  const router = useRouter()

  const handleSignOut = async () => {
    await signOut()
    router.push("/sign-in")
  }

  if (!isLoaded) {
    return (
      <div className="flex min-h-screen items-center justify-center">
        <div className="text-center">Cargando...</div>
      </div>
    )
  }

  if (!user) {
    router.push("/sign-in")
    return null
  }

  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <Sidebar>
          <SidebarHeader className="border-b">
            <Link
              href="/admin"
              className="flex items-center justify-center p-6 transition-opacity hover:opacity-80"
            >
              <Image
                src="/logo.svg"
                alt="Logo"
                width={200}
                height={66}
                className="h-auto w-full max-w-[200px]"
                priority
              />
            </Link>
          </SidebarHeader>
          <SidebarContent>
            <SidebarGroup>
              <SidebarGroupLabel className="px-3 text-xs font-semibold uppercase tracking-wider text-sidebar-foreground/60">
                Admin Panel
              </SidebarGroupLabel>
              <SidebarGroupContent>
                <SidebarMenu>
                  {menuItems.map((item) => {
                    const Icon = item.icon
                    const isActive =
                      pathname === item.url ||
                      (pathname.startsWith(`${item.url}/`) && item.url !== "/admin")
                    return (
                      <SidebarMenuItem key={item.url}>
                        <SidebarMenuButton
                          asChild
                          isActive={isActive}
                          className="transition-all duration-200"
                        >
                          <Link href={item.url}>
                            <Icon className="size-4" />
                            <span>{item.title}</span>
                          </Link>
                        </SidebarMenuButton>
                      </SidebarMenuItem>
                    )
                  })}
                </SidebarMenu>
              </SidebarGroupContent>
            </SidebarGroup>
          </SidebarContent>
        </Sidebar>
        <div className="flex flex-1 flex-col">
          <header className="sticky top-0 z-10 flex h-16 items-center justify-between border-b bg-background/95 backdrop-blur supports-backdrop-filter:bg-background/60 px-6 shadow-sm">
            <div className="flex items-center gap-4">
              <SidebarTrigger className="md:hidden" />
              <Breadcrumbs />
            </div>
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <button
                  type="button"
                  className="flex items-center gap-3 rounded-lg px-3 py-2 transition-all hover:bg-accent focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring hover:shadow-sm"
                >
                  <Avatar className="h-9 w-9 ring-2 ring-background ring-offset-2 ring-offset-background transition-all hover:ring-primary/50">
                    <AvatarImage src={user.imageUrl} alt={user.fullName || ""} />
                    <AvatarFallback className="text-xs font-semibold bg-primary text-primary-foreground">
                      {user.firstName?.[0] || ""}
                      {user.lastName?.[0] || ""}
                    </AvatarFallback>
                  </Avatar>
                  <div className="hidden md:flex flex-col items-start">
                    <span className="text-sm font-semibold text-foreground">
                      {user.fullName || "Usuario"}
                    </span>
                    <span className="text-xs text-muted-foreground">
                      {user.emailAddresses[0]?.emailAddress}
                    </span>
                  </div>
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-72 p-2 shadow-lg border-2">
                <div className="px-3 py-3 mb-2 rounded-lg bg-muted/50">
                  <div className="flex items-center gap-3">
                    <Avatar className="h-10 w-10 ring-2 ring-background">
                      <AvatarImage src={user.imageUrl} alt={user.fullName || ""} />
                      <AvatarFallback className="text-sm font-semibold bg-primary text-primary-foreground">
                        {user.firstName?.[0] || ""}
                        {user.lastName?.[0] || ""}
                      </AvatarFallback>
                    </Avatar>
                    <div className="flex flex-col min-w-0 flex-1">
                      <p className="text-sm font-semibold text-foreground truncate">
                        {user.fullName || "Usuario"}
                      </p>
                      <p className="text-xs text-muted-foreground truncate">
                        {user.emailAddresses[0]?.emailAddress}
                      </p>
                    </div>
                  </div>
                </div>
                <DropdownMenuSeparator className="my-2" />
                <DropdownMenuItem
                  onClick={() => openUserProfile()}
                  className="cursor-pointer rounded-md px-3 py-2.5 gap-3 transition-colors hover:bg-accent focus:bg-accent"
                >
                  <User className="h-4 w-4" />
                  <span>Mi Perfil</span>
                </DropdownMenuItem>
                <DropdownMenuSeparator className="my-2" />
                <DropdownMenuItem
                  onClick={handleSignOut}
                  className="cursor-pointer rounded-md px-3 py-2.5 gap-3 transition-colors text-red-600"
                >
                  <LogOut className="h-4 w-4 text-red-600" />
                  <span className="text-red-600">Cerrar Sesión</span>
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </header>
          <main className="flex-1 overflow-auto bg-muted/30 p-6">{children}</main>
        </div>
      </div>
    </SidebarProvider>
  )
}
