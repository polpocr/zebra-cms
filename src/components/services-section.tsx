"use client"

import { api } from "convex/_generated/api"
import { useQuery } from "convex/react"
import Image from "next/image"

export function ServicesSection() {
  const services = useQuery(api.services.list)

  if (!services) {
    return (
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center">Cargando...</div>
      </div>
    )
  }

  if (services.length === 0) {
    return (
      <div className="container mx-auto px-4 md:px-8">
        <div className="text-center text-muted-foreground py-8">
          No hay servicios disponibles en este momento.
        </div>
      </div>
    )
  }

  return (
    <div className="container mx-auto px-4 md:px-6 lg:px-8">
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8 lg:gap-10">
        {services.map((service) => (
          <div
            key={service._id}
            className="group flex flex-col bg-white rounded-lg md:rounded-xl overflow-hidden shadow-md border border-gray-200/60 hover:shadow-xl hover:-translate-y-1 transition-all duration-300 ease-out cursor-pointer"
          >
            <div className="relative w-full aspect-square rounded-t-lg md:rounded-t-xl overflow-hidden bg-gray-100">
              {service.imageUrl ? (
                <Image
                  src={service.imageUrl}
                  alt={`${service.title} - ${service.description || "Servicio de Zebra Producciones"}`}
                  fill
                  className="object-cover transition-transform duration-500 group-hover:scale-110"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                />
              ) : (
                <div className="w-full h-full bg-gray-200" />
              )}
              <div className="absolute inset-0 bg-linear-to-t from-black/20 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </div>
            <div className="bg-linear-to-b from-gray-50 to-white px-5 md:px-6 py-6 md:py-7 lg:py-8 flex flex-col flex-1 border-t border-gray-100/50">
              <h3 className="text-lg md:text-xl lg:text-2xl font-bold uppercase text-center mb-3 md:mb-4 tracking-tight text-black group-hover:text-primary transition-colors duration-300">
                {service.title}
              </h3>
              <p className="text-sm md:text-base text-foreground/70 text-center leading-relaxed">
                {service.description}
              </p>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
