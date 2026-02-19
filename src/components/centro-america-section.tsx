"use client"

import { Button } from "@/components/ui/button"
import Link from "next/link"

export function CentroAmericaSection() {
  return (
    <section className="w-full bg-muted mt-8 md:mt-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div className="flex justify-center md:justify-start relative group cursor-pointer">
            <div className="relative w-full max-w-xl aspect-[621.56/500]">
              {/* Mapa B/N - visible por defecto */}
              <img
                src="/images/BN%20mapa.svg"
                alt=""
                className="absolute inset-0 w-full h-full object-contain transition-opacity duration-500 ease-in-out group-hover:opacity-0"
                aria-hidden
              />
              {/* Mapa colores - visible al hacer hover */}
              <img
                src="/images/Colores%20mapa%201.svg"
                alt="Mapa de Centroamérica - Zebra Producciones es una agencia regional"
                className="absolute inset-0 w-full h-full object-contain opacity-0 transition-opacity duration-500 ease-in-out group-hover:opacity-100"
              />
            </div>
          </div>
          <div className="flex flex-col gap-4 md:gap-6">
            <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-foreground">
              Somos regionales
            </h2>
            <p className="text-base md:text-lg text-foreground/80 leading-relaxed">
              Zebra nació en Costa Rica, pero nuestra manada es internacional. Nos movemos con
              agilidad por Centroamérica y el Caribe, con aliados estratégicos y equipos en cada
              país para llevar tus ideas más allá.
            </p>
            <Link href="/contacto">
              <Button size="lg" className="w-full md:w-fit">
                Contáctenos
              </Button>
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
