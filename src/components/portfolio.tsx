"use client"

import { api } from "convex/_generated/api"
import { useQuery } from "convex/react"
import { ArrowRight } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "./ui/button"

export function Portfolio() {
  const clients = useQuery(api.clients.getLatest, { limit: 4 })

  if (!clients) {
    return (
      <section className="w-full py-8 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-8 md:mb-12 uppercase tracking-tight">
            PORTAFOLIO
          </h2>
          <div className="text-center">Cargando...</div>
        </div>
      </section>
    )
  }

  if (clients.length === 0) {
    return (
      <section className="w-full py-8 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl md:text-5xl font-bold text-center mb-8 md:mb-12 uppercase tracking-tight">
            PORTAFOLIO
          </h2>
          <div className="text-center text-muted-foreground">
            No hay clientes disponibles en este momento.
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="w-full py-8 md:py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl md:text-5xl font-bold text-center mb-8 md:mb-12 uppercase tracking-tight">
          PORTAFOLIO
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6 mb-6 md:mb-8">
          {clients.map((client) => (
            <Link
              key={client._id}
              href="/portfolio"
              className="group relative aspect-[4/3] overflow-hidden rounded-lg"
            >
              <div className="relative w-full h-full bg-white p-4 md:p-6">
                {client.imageUrl ? (
                  <Image
                    src={client.imageUrl}
                    alt={`Proyecto de ${client.name} - Portfolio Zebra Producciones`}
                    fill
                    className="object-contain transition-transform duration-300 group-hover:scale-105"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                ) : (
                  <div className="w-full h-full bg-gray-200 flex items-center justify-center">
                    <span className="text-gray-400 text-lg">{client.name}</span>
                  </div>
                )}
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
            className="bg-primary hover:bg-primary/90 text-white uppercase px-6 md:px-8 py-4 md:py-6 text-sm md:text-base font-medium"
          >
            <Link href="/portfolio">VER MÁS PROYECTOS</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
