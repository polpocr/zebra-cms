"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";

const navItems = [
    { href: "/", label: "Inicio" },
    { href: "/acerca-de", label: "Acerca de" },
    { href: "/servicios", label: "Servicios" },
    { href: "/portfolio", label: "Portfolio" },
    { href: "/contacto", label: "Contácto" },
];

export function Navbar() {
    const pathname = usePathname();

    return (
        <nav className="border-b border-border bg-background">
            <div className="container mx-auto px-4">
                <div className="flex h-16 items-center justify-between">
                    <Link href="/" className="text-xl font-bold text-primary">
                        Zebra
                    </Link>
                    <div className="flex items-center gap-6">
                        {navItems.map((item) => {
                            const isActive = pathname === item.href;
                            return (
                                <Link
                                    key={item.href}
                                    href={item.href}
                                    className={cn(
                                        "text-sm font-medium transition-colors hover:text-primary",
                                        isActive ? "text-primary" : "text-foreground/70"
                                    )}
                                >
                                    {item.label}
                                </Link>
                            );
                        })}
                    </div>
                </div>
            </div>
        </nav>
    );
}
