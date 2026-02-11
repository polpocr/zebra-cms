"use client"

import { api } from "convex/_generated/api"
import type { Id } from "convex/_generated/dataModel"
import { useQuery } from "convex/react"
import Image from "next/image"
import { useState } from "react"

export default function ClientPortfolio() {
  const clients = useQuery(api.clients.list)
  const categories = useQuery(api.categories.list)
  const [selectedCategory, setSelectedCategory] = useState<Id<"clientCategories"> | "Todos">(
    "Todos"
  )

  if (!clients || !categories) {
    return (
      <div className="w-full py-8 md:py-12 lg:py-16 bg-white container mx-auto px-4">
        <div className="text-center">Cargando...</div>
      </div>
    )
  }

  const getCategoryName = (categoryId: Id<"clientCategories">) => {
    return categories.find((cat) => cat._id === categoryId)?.name || "Sin categoría"
  }

  const getCategoryColor = (categoryId: Id<"clientCategories">): string => {
    const category = categories.find((cat) => cat._id === categoryId)
    return category?.color || "#7660A0"
  }

  const filteredClients =
    selectedCategory === "Todos"
      ? clients
      : clients.filter((client) => client.categoryId === selectedCategory)

  if (clients.length === 0) {
    return (
      <div className="w-full py-8 md:py-12 lg:py-16 bg-white container mx-auto px-4">
        <div className="text-center text-muted-foreground">
          No hay clientes disponibles en este momento.
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Filter Bar */}
      <div className="w-full bg-black container mx-auto p-3 md:p-4 rounded-xl mx-4 md:mx-auto">
        <div className="w-full flex flex-wrap gap-2 md:gap-4 justify-center md:justify-around bg-black rounded-xl">
          <button
            type="button"
            onClick={() => setSelectedCategory("Todos")}
            className={`px-3 py-1.5 md:p-2 text-xs md:text-sm lg:text-base cursor-pointer font-medium transition-all duration-200 rounded-lg md:rounded-xl ${
              selectedCategory === "Todos"
                ? "bg-[#22B7E8] text-blue-950"
                : "text-white hover:text-white/80"
            }`}
          >
            Todos
          </button>
          {categories.map((category) => (
            <button
              key={category._id}
              type="button"
              onClick={() => setSelectedCategory(category._id)}
              className={`px-3 py-1.5 md:p-2 text-xs md:text-sm lg:text-base cursor-pointer font-medium transition-all duration-200 rounded-lg md:rounded-xl ${
                selectedCategory === category._id
                  ? "bg-[#22B7E8] text-blue-950"
                  : "text-white hover:text-white/80"
              }`}
            >
              {category.name}
            </button>
          ))}
        </div>
      </div>

      {/* Client Cards Grid */}
      <section className="w-full py-8 md:py-12 lg:py-16 bg-white container mx-auto px-4">
        <div className="w-full">
          {filteredClients.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              No hay clientes en esta categoría.
            </div>
          ) : (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6 lg:gap-8">
              {filteredClients.map((client) => (
                <div
                  key={client._id}
                  className="group relative bg-gray-100 rounded-lg md:rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
                >
                  <div className="relative aspect-square overflow-hidden bg-white p-4 md:p-6">
                    {client.imageUrl ? (
                      <Image
                        src={client.imageUrl}
                        alt={`Proyecto de ${client.name} - Portfolio Zebra Producciones`}
                        fill
                        className="object-contain transition-transform duration-500 group-hover:scale-110"
                        sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      />
                    ) : (
                      <div className="w-full h-full bg-gray-200" />
                    )}
                    <div
                      className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                      style={{
                        background:
                          "linear-gradient(to top, rgba(0, 0, 0, 0.6), transparent, transparent)",
                      }}
                    />
                  </div>
                  <div className="p-3 md:p-4 lg:p-6">
                    <p className="text-xs md:text-sm text-foreground/60 mb-1 md:mb-2">Cliente :</p>
                    <p className="text-sm md:text-base lg:text-lg font-semibold text-foreground mb-2 md:mb-3">
                      {client.name}
                    </p>
                    <div
                      className="inline-block px-2.5 py-1 md:px-3 md:py-1.5 rounded-lg md:rounded-xl text-xs md:text-sm font-medium text-white uppercase tracking-wide"
                      style={{ backgroundColor: getCategoryColor(client.categoryId) }}
                    >
                      {getCategoryName(client.categoryId)}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </section>
    </>
  )
}
