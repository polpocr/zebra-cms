"use client";

import Image from "next/image";
import { useState } from "react";

interface Client {
  id: string;
  name: string;
  image: string;
  category: string;
}

const clients: Client[] = [
  {
    id: "1",
    name: "Nombre del Cliente",
    image: "https://images.unsplash.com/photo-1511578314322-379afb476865?w=800&h=600&fit=crop",
    category: "Eventos",
  },
  {
    id: "2",
    name: "Nombre del Cliente",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&h=600&fit=crop",
    category: "Eventos",
  },
  {
    id: "3",
    name: "Nombre del Cliente",
    image: "https://images.unsplash.com/photo-1470229722913-7c0e2dbbafd3?w=800&h=600&fit=crop",
    category: "Eventos",
  },
  {
    id: "4",
    name: "Nombre del Cliente",
    image: "https://images.unsplash.com/photo-1464366400600-7168b8af9bc3?w=800&h=600&fit=crop",
    category: "Activaciones",
  },
  {
    id: "5",
    name: "Nombre del Cliente",
    image: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?w=800&h=600&fit=crop",
    category: "Activaciones",
  },
  {
    id: "6",
    name: "Nombre del Cliente",
    image: "https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&h=600&fit=crop",
    category: "Desarrollo de Marca",
  },
  {
    id: "7",
    name: "Nombre del Cliente",
    image: "https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=800&h=600&fit=crop",
    category: "Promociones",
  },
  {
    id: "8",
    name: "Nombre del Cliente",
    image: "https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800&h=600&fit=crop",
    category: "Mobiliario publicitario",
  },
  {
    id: "9",
    name: "Nombre del Cliente",
    image: "https://images.unsplash.com/photo-1519167758481-83f550bb49b3?w=800&h=600&fit=crop",
    category: "Decoraciones",
  },
];

const categories = [
  "Todos",
  "Eventos",
  "Activaciones",
  "Desarrollo de Marca",
  "Promociones",
  "Mobiliario publicitario",
  "Decoraciones",
];

const getCategoryColor = (category: string): string => {
  switch (category) {
    case "Eventos":
      return "#FE3A8B";
    case "Activaciones":
      return "#37A150";
    case "Desarrollo de Marca":
      return "#5F26CD";
    case "Promociones":
      return "#FE3A8B";
    case "Mobiliario publicitario":
      return "#37A150";
    case "Decoraciones":
      return "#5F26CD";
    default:
      return "#7660A0";
  }
};

export default function ClientPortfolio() {
  const [selectedCategory, setSelectedCategory] = useState("Todos");

  const filteredClients =
    selectedCategory === "Todos"
      ? clients
      : clients.filter((client) => client.category === selectedCategory);

  return (
    <>
      {/* Filter Bar */}
      <div className="w-full bg-black container mx-auto p-4 rounded-xl">
        <div className="w-full flex flex-wrap gap-4 justify-around bg-black rounded-xl">
          {categories.map((category) => (
            <button
              key={category}
              type="button"
              onClick={() => setSelectedCategory(category)}
              className={`p-2 text-sm md:text-base cursor-pointer font-medium transition-all duration-200 rounded-xl ${selectedCategory === category
                ? "bg-[#22B7E8] text-blue-950"
                : "text-white hover:text-white/80"
                }`}
            >
              {category}
            </button>
          ))}
        </div>
      </div>

      {/* Client Cards Grid */}
      <section className="w-full py-12 md:py-16 bg-white container mx-auto">
        <div className="w-full">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredClients.map((client) => (
              <div
                key={client.id}
                className="group relative bg-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-lg transition-all duration-300"
              >
                <div className="relative aspect-square overflow-hidden">
                  <Image
                    src={client.image}
                    alt={client.name}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-110"
                    sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  />
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
                    style={{ backgroundColor: getCategoryColor(client.category) }}
                  >
                    {client.category}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
