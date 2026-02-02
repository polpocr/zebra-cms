"use client"

import { api } from "convex/_generated/api"
import { useQuery } from "convex/react"
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
          <div className="flex items-center justify-center gap-4 md:gap-8 flex-wrap">
            {Array.from({ length: 5 }, (_, index) => `skeleton-brand-${index}`).map((key) => (
              <div key={key} className="shrink-0 w-32 md:w-48 text-center">
                <div className="mb-3 md:mb-4">
                  <div className="h-12 w-12 md:h-16 md:w-16 mx-auto bg-accent rounded-lg animate-pulse" />
                </div>
                <div className="h-5 md:h-6 w-20 md:w-24 mx-auto bg-accent rounded animate-pulse mb-1" />
                <div className="h-3 md:h-4 w-28 md:w-32 mx-auto bg-accent rounded animate-pulse" />
              </div>
            ))}
          </div>
        </div>
      </section>
    )
  }

  if (brands.length === 0) {
    return null
  }

  return (
    <section className="w-full bg-background py-8 md:py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-xl md:text-2xl lg:text-3xl font-bold text-center mb-8 md:mb-12 text-foreground uppercase px-4">
          MARCAS QUE SON PARTE DE NUESTRA MANADA
        </h2>

        <div className="flex items-center justify-center gap-4 md:gap-8 flex-wrap">
          {brands.map((brand) => (
            <div key={brand._id} className="shrink-0 w-32 md:w-48 text-center">
              <div className="mb-3 md:mb-4">
                {brand.logoUrl ? (
                  <div className="relative h-12 w-12 md:h-16 md:w-16 mx-auto">
                    <Image
                      src={brand.logoUrl}
                      alt={`Logo de ${brand.name}${brand.tagline ? ` - ${brand.tagline}` : ""}`}
                      fill
                      className="object-contain"
                    />
                  </div>
                ) : (
                  <div className="text-3xl md:text-4xl font-bold text-foreground/60 mb-2">
                    {getInitials(brand.name)}
                  </div>
                )}
              </div>
              <div className="text-base md:text-lg font-semibold text-foreground mb-1">
                {brand.name}
              </div>
              <div className="text-xs md:text-sm text-foreground/70">{brand.tagline}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
