"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export function CentroAmericaSection() {
  const [isHovered, setIsHovered] = useState(false)

  return (
    <section className="w-full bg-muted mt-8 md:mt-12">
      <div className="container mx-auto px-4">
        <div className="grid md:grid-cols-2 gap-8 md:gap-12 items-center">
          <div
            className="flex justify-center md:justify-start relative"
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            <div className="relative w-full max-w-lg">
              <Image
                src="/images/centro-america.png"
                alt="Mapa de Centroamérica - Zebra Producciones es una agencia regional"
                width={600}
                height={400}
                className="w-full h-auto transition-opacity duration-500 ease-in-out"
                style={{ opacity: isHovered ? 0 : 1 }}
              />
              <Image
                src="/images/centroamerica-color.png"
                alt="Mapa de Centroamérica - Zebra Producciones es una agencia regional"
                width={600}
                height={400}
                className="absolute top-0 left-0 w-full h-auto transition-opacity duration-500 ease-in-out"
                style={{ opacity: isHovered ? 1 : 0 }}
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
