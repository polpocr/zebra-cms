"use client"

import { api } from "convex/_generated/api"
import { useQuery } from "convex/react"
import { motion } from "motion/react"
import Image from "next/image"

function getInitials(name: string) {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2)
}

export function BrandsSection() {
  const brands = useQuery(api.brands.list)

  if (brands === undefined) {
    return (
      <section className="w-full bg-background py-8 md:py-16">
        <div className="container mx-auto px-4">
          <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-center mb-8 md:mb-12 text-foreground uppercase px-4">
            MARCAS QUE SON PARTE DE NUESTRA MANADA
          </h2>
          <div className="overflow-hidden">
            <div className="flex items-center gap-8 md:gap-12">
              {Array.from({ length: 5 }, (_, index) => `skeleton-brand-${index}`).map((key) => (
                <div key={key} className="shrink-0">
                  <div className="h-32 w-32 md:h-40 md:w-40 bg-accent rounded-lg animate-pulse" />
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    )
  }

  if (brands.length === 0) {
    return null
  }

  // Duplicar los logos para el efecto infinito
  const duplicatedBrands = [...brands, ...brands]

  return (
    <section className="w-full bg-background py-8 md:py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-center mb-8 md:mb-12 text-foreground uppercase px-4">
          MARCAS QUE SON PARTE DE NUESTRA MANADA
        </h2>

        <div className="overflow-hidden">
          <motion.div
            className="flex items-center gap-8 md:gap-12"
            animate={{
              x: ["0%", "-50%"],
            }}
            transition={{
              x: {
                repeat: Number.POSITIVE_INFINITY,
                repeatType: "loop",
                duration: 30,
                ease: "linear",
              },
            }}
          >
            {duplicatedBrands.map((brand, index) => (
              <div key={`${brand._id}-${index}`} className="shrink-0">
                {brand.logoUrl ? (
                  <div className="relative h-32 w-32 md:h-40 md:w-40">
                    <Image
                      src={brand.logoUrl}
                      alt={`Logo de ${brand.name}${brand.tagline ? ` - ${brand.tagline}` : ""}`}
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <div className="h-32 w-32 md:h-40 md:w-40 flex items-center justify-center text-4xl md:text-5xl font-bold text-foreground/60">
                    {getInitials(brand.name)}
                  </div>
                )}
              </div>
            ))}
          </motion.div>
        </div>
      </div>
    </section>
  )
}
