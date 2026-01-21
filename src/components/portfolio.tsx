"use client"

import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"

interface PortfolioItem {
  id: string
  image: string
  title: string
  link: string
}

const portfolioData: PortfolioItem[] = [
  {
    id: "1",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop",
    title: "Evento Corporativo",
    link: "/portfolio/evento-corporativo",
  },
  {
    id: "2",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&h=600&fit=crop",
    title: "Banquete Elegante",
    link: "/portfolio/banquete-elegante",
  },
  {
    id: "3",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=600&fit=crop",
    title: "Concierto en Vivo",
    link: "/portfolio/concierto-vivo",
  },
  {
    id: "4",
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&h=600&fit=crop",
    title: "Recepción Formal",
    link: "/portfolio/recepcion-formal",
  },
]

export function Portfolio() {
  return (
    <section className="w-full py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-5xl font-bold text-center mb-12 uppercase tracking-tight">
          PORTAFOLIO
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          {portfolioData.map((item) => (
            <Link
              key={item.id}
              href={item.link}
              className="group relative aspect-[4/3] overflow-hidden rounded-lg"
            >
              <div className="relative w-full h-full">
                <Image
                  src={item.image}
                  alt={item.title}
                  fill
                  className="object-cover transition-transform duration-300 group-hover:scale-105"
                  sizes="(max-width: 768px) 100vw, 50vw"
                />
                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
              </div>
              <div className="absolute bottom-4 right-4 w-10 h-10 rounded-full bg-white border border-black/10 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                <ArrowRight className="w-5 h-5 text-black" />
              </div>
            </Link>
          ))}
        </div>

        <div className="flex justify-center">
          <Button
            asChild
            className="bg-[#A28CBD] hover:bg-[#A28CBD]/90 text-white uppercase px-8 py-6 text-base font-medium"
          >
            <Link href="/portfolio">VER MÁS PROYECTOS</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
