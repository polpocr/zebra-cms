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
      <div className="w-full py-12 md:py-16 bg-white container mx-auto">
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
      <div className="w-full py-12 md:py-16 bg-white container mx-auto">
        <div className="text-center text-muted-foreground">
          No hay clientes disponibles en este momento.
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Filter Bar */}
      <div className="w-full bg-black container mx-auto p-4 rounded-xl">
        <div className="w-full flex flex-wrap gap-4 justify-around bg-black rounded-xl">
          <button
            type="button"
            onClick={() => setSelectedCategory("Todos")}
            className={`p-2 text-sm md:text-base cursor-pointer font-medium transition-all duration-200 rounded-xl ${
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
              className={`p-2 text-sm md:text-base cursor-pointer font-medium transition-all duration-200 rounded-xl ${
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
      <section className="w-full py-12 md:py-16 bg-white container mx-auto">
        <div className="w-full">
          {filteredClients.length === 0 ? (
            <div className="text-center text-muted-foreground py-8">
              No hay clientes en esta categoría.
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
              {filteredClients.map((client) => (
              <div
                key={client._id}
                className="group relative bg-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="relative aspect-square overflow-hidden">
                  {client.imageUrl ? (
                    <Image
                      src={client.imageUrl}
                      alt={client.name}
                      fill
                      className="object-cover transition-transform duration-500 group-hover:scale-110"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
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
                <div className="p-4 md:p-6">
                  <p className="text-sm text-foreground/60 mb-2">Cliente :</p>
                  <p className="text-base md:text-lg font-semibold text-foreground mb-3">
                    {client.name}
                  </p>
                  <div
                    className="inline-block px-3 py-1.5 rounded-xl text-xs md:text-sm font-medium text-white uppercase tracking-wide"
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
