"use client"

import { api } from "convex/_generated/api"
import type { Id } from "convex/_generated/dataModel"
import { useQuery } from "convex/react"
import { ChevronLeft, ChevronRight, X } from "lucide-react"
import Image from "next/image"
import { useSearchParams } from "next/navigation"
import { useCallback, useEffect, useState } from "react"

interface ClientData {
  _id: Id<"clients">
  name: string
  imageUrl?: string
  imageUrls?: string[]
  categoryId: Id<"clientCategories">
}

function getClientImages(client: ClientData): string[] {
  if (client.imageUrls?.length) return client.imageUrls
  if (client.imageUrl) return [client.imageUrl]
  return []
}

function CarouselDialog({
  client,
  onClose,
}: {
  client: ClientData
  onClose: () => void
}) {
  const images = getClientImages(client)
  const [current, setCurrent] = useState(0)

  const prev = useCallback(
    () => setCurrent((c) => (c - 1 + images.length) % images.length),
    [images.length]
  )
  const next = useCallback(() => setCurrent((c) => (c + 1) % images.length), [images.length])

  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose()
      if (e.key === "ArrowLeft") prev()
      if (e.key === "ArrowRight") next()
    }
    window.addEventListener("keydown", onKey)
    return () => window.removeEventListener("keydown", onKey)
  }, [onClose, prev, next])

  return (
    <dialog
      open
      className="fixed inset-0 z-50 m-0 flex h-screen w-screen max-w-none max-h-none items-center justify-center border-none bg-black/70 p-0 backdrop-blur-sm"
      onClick={onClose}
      onKeyDown={(e) => {
        if (e.key === "Escape") onClose()
      }}
      aria-label={`Galería de ${client.name}`}
    >
      <div
        className="relative w-[90vw] max-w-3xl overflow-hidden rounded-xl bg-white shadow-2xl"
        onClick={(e) => e.stopPropagation()}
        onKeyDown={(e) => e.stopPropagation()}
      >
        <button
          type="button"
          onClick={onClose}
          className="absolute right-3 top-3 z-20 flex h-8 w-8 items-center justify-center rounded-full bg-black/60 text-white transition-colors hover:bg-black/80"
          aria-label="Cerrar galería"
        >
          <X className="h-4 w-4" />
        </button>

        <div className="relative aspect-4/3 bg-white">
          {images.length > 0 ? (
            images.map((url, i) => (
              <div
                key={url}
                className={`absolute inset-0 p-6 transition-opacity duration-300 ${i === current ? "opacity-100" : "opacity-0 pointer-events-none"}`}
              >
                <Image
                  src={url}
                  alt={`${client.name} - imagen ${i + 1}`}
                  fill
                  className="object-contain"
                  sizes="90vw"
                />
              </div>
            ))
          ) : (
            <div className="flex h-full w-full items-center justify-center text-gray-400">
              Sin imágenes
            </div>
          )}

          {images.length > 1 && (
            <>
              <button
                type="button"
                onClick={prev}
                className="absolute left-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
                aria-label="Imagen anterior"
              >
                <ChevronLeft className="h-5 w-5" />
              </button>
              <button
                type="button"
                onClick={next}
                className="absolute right-3 top-1/2 z-10 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full bg-black/50 text-white transition-colors hover:bg-black/70"
                aria-label="Imagen siguiente"
              >
                <ChevronRight className="h-5 w-5" />
              </button>
            </>
          )}
        </div>

        <div className="p-4 md:p-6">
          <p className="text-lg font-semibold">{client.name}</p>
          {images.length > 1 && (
            <div className="mt-3 flex gap-1.5">
              {images.map((_, i) => (
                <button
                  key={`dot-${
                    // biome-ignore lint/suspicious/noArrayIndexKey: positional dots
                    i
                  }`}
                  type="button"
                  onClick={() => setCurrent(i)}
                  className={`h-2 w-2 rounded-full transition-colors ${i === current ? "bg-black" : "bg-black/25"}`}
                  aria-label={`Ir a imagen ${i + 1}`}
                />
              ))}
            </div>
          )}
        </div>
      </div>
    </dialog>
  )
}

export default function ClientPortfolio() {
  const clients = useQuery(api.clients.list)
  const categories = useQuery(api.categories.list)
  const searchParams = useSearchParams()
  const [selectedCategory, setSelectedCategory] = useState<Id<"clientCategories"> | "Todos">(
    "Todos"
  )

  // Pre-select category from query param once categories load
  useEffect(() => {
    const param = searchParams.get("categoria")
    if (!param || !categories) return
    const match = categories.find(
      (cat) => cat.name.toLowerCase() === decodeURIComponent(param).toLowerCase()
    )
    if (match) setSelectedCategory(match._id)
  }, [categories, searchParams])
  const [selectedClient, setSelectedClient] = useState<ClientData | null>(null)

  if (!clients || !categories) {
    return (
      <div className="container mx-auto w-full px-4 py-8 md:py-12 lg:py-16">
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
      <div className="container mx-auto w-full px-4 py-8 md:py-12 lg:py-16">
        <div className="text-center text-muted-foreground">
          No hay clientes disponibles en este momento.
        </div>
      </div>
    )
  }

  return (
    <>
      {/* Filter Bar */}
      <div className="container mx-auto w-full rounded-xl bg-black p-3 md:p-4">
        <div className="flex w-full flex-wrap justify-center gap-2 rounded-xl bg-black md:justify-around md:gap-4">
          <button
            type="button"
            onClick={() => setSelectedCategory("Todos")}
            className={`cursor-pointer rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200 md:rounded-xl md:p-2 md:text-sm lg:text-base ${
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
              className={`cursor-pointer rounded-lg px-3 py-1.5 text-xs font-medium transition-all duration-200 md:rounded-xl md:p-2 md:text-sm lg:text-base ${
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
      <section className="container mx-auto w-full bg-white px-4 py-8 md:py-12 lg:py-16">
        <div className="w-full">
          {filteredClients.length === 0 ? (
            <div className="py-8 text-center text-muted-foreground">
              No hay clientes en esta categoría.
            </div>
          ) : (
            <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-6 lg:grid-cols-3 lg:gap-8">
              {filteredClients.map((client) => {
                const images = getClientImages(client)
                const thumb = images[0]

                return (
                  <button
                    key={client._id}
                    type="button"
                    onClick={() => setSelectedClient(client)}
                    className="group relative cursor-pointer overflow-hidden rounded-lg bg-gray-100 text-left shadow-sm transition-all duration-300 hover:shadow-lg md:rounded-xl"
                  >
                    <div className="relative aspect-square overflow-hidden bg-white p-4 md:p-6">
                      {thumb ? (
                        <Image
                          src={thumb}
                          alt={`Proyecto de ${client.name} - Portfolio Zebra Producciones`}
                          fill
                          className="object-contain transition-transform duration-500 group-hover:scale-110"
                          sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                        />
                      ) : (
                        <div className="h-full w-full bg-gray-200" />
                      )}
                      <div
                        className="pointer-events-none absolute inset-0 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
                        style={{
                          background:
                            "linear-gradient(to top, rgba(0,0,0,0.6), transparent, transparent)",
                        }}
                      />
                    </div>
                    <div className="p-3 md:p-4 lg:p-6">
                      <p className="mb-1 text-xs text-foreground/60 md:mb-2 md:text-sm">
                        Cliente :
                      </p>
                      <p className="mb-2 text-sm font-semibold text-foreground md:mb-3 md:text-base lg:text-lg">
                        {client.name}
                      </p>
                      <div
                        className="inline-block rounded-lg px-2.5 py-1 text-xs font-medium uppercase tracking-wide text-white md:rounded-xl md:px-3 md:py-1.5 md:text-sm"
                        style={{ backgroundColor: getCategoryColor(client.categoryId) }}
                      >
                        {getCategoryName(client.categoryId)}
                      </div>
                    </div>
                  </button>
                )
              })}
            </div>
          )}
        </div>
      </section>

      {selectedClient && (
        <CarouselDialog client={selectedClient} onClose={() => setSelectedClient(null)} />
      )}
    </>
  )
}
