"use client"

import { cn } from "@/lib/utils"
import { Search } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useState } from "react"

const navItems = [
  { href: "/", label: "Inicio" },
  { href: "/acerca-de", label: "Acerca de" },
  { href: "/servicios", label: "Servicios" },
  { href: "/portfolio", label: "Portfolio" },
  { href: "/contacto", label: "Contácto" },
]

export function Navbar() {
  const pathname = usePathname()
  const [scrollY, setScrollY] = useState(0)
  const isRoot = pathname === "/"

  useEffect(() => {
    const handleScroll = () => {
      setScrollY(window.scrollY)
    }

    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  const isScrolled = scrollY > 64

  return (
    <nav
      className={cn(
        "fixed top-0 left-0 right-0 transition-all duration-300 z-999 py-2",
        isRoot ? (isScrolled ? "bg-black" : "bg-transparent") : "bg-black"
      )}
    >
      <div className="container mx-auto px-4">
        <div className="flex h-16 items-center justify-between gap-16">
          <Link href="/">
            <Image
              src="/logo-white.svg"
              alt="Zebra"
              width={120}
              height={40}
              className="w-auto h-auto"
            />
          </Link>
          <div className="flex items-center gap-16">
            {navItems.map((item) => {
              const isActive = pathname === item.href
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={cn(
                    "text-lg uppercase transition-colors hover:text-white",
                    isActive ? "text-white font-medium" : "text-white/70 font-light"
                  )}
                >
                  {item.label}
                </Link>
              )
            })}
            <button type="button">
              <Search className="w-6 h-6 text-white" />
            </button>
          </div>
        </div>
      </div>
    </nav>
  )
}
