"use client"

import { BrandsSection } from "@/components/brands-section"
import { CentroAmericaSection } from "@/components/centro-america-section"
import { InstagramGallery } from "@/components/instagram-gallery"
import { Marquee } from "@/components/marquee"
import { Portfolio } from "@/components/portfolio"
import { Statistics } from "@/components/statistics"

export default function Home() {
  return (
    <>
      <section
        className="relative w-full h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/hero-image.jpg')",
        }}
      >
        <div className="absolute inset-0 bg-black/50" />
      </section>

      <section className="container mx-auto py-16 mt-16 flex flex-col gap-8">
        <Marquee text={"*PLANTEAMIENTO * ESTRATEGIA * EJECUCIÓN * RESULTADOS *"} />
        <p className="text-lg text-foreground/80 text-center">
          Zebra Producciones somos una agencia de marketing que nos integramos a tu equipo para
          crear soluciones efectivas, creativas y llenas de impacto. Construimos tus ideas,
          celebramos tus logros y solucionamos juntos los retos. No somos solo proveedores: somos
          parte de la manada.
        </p>

        <Portfolio />
      </section>

      <Statistics />

      <InstagramGallery />

      <CentroAmericaSection />

      <BrandsSection />
    </>
  )
}
