"use client"

import ClientPortfolio from "@/components/client-portfolio"
import Image from "next/image"

export default function PortfolioPage() {
  return (
    <>
      <section className="relative w-full min-h-screen">
        {/* Image - full width, partial height */}
        <div className="relative w-full h-[50vh] md:h-[65vh]">
          <Image
            src="/images/portfolio-image.jpg"
            alt="Portfolio - Nuestros Clientes - Zebra Producciones"
            fill
            className="object-cover"
            priority
          />
          {/* Black overlay - darker on mobile */}
          <div className="absolute inset-0 bg-black/70 md:bg-black/0" />
          {/* Header text - overlaid on image */}
          {/* Mobile: Horizontal centered */}
          <div className="absolute inset-0 flex flex-col items-center justify-center gap-2 lg:hidden">
            <h1 className="text-4xl font-bold leading-none tracking-tight text-white text-center">
              NUESTROS
            </h1>
            <h2 className="text-3xl font-bold leading-none tracking-tight text-white text-center">
              CLIENTES
            </h2>
          </div>
          {/* Desktop: Vertical, left side - visible only on LG */}
          <div className="hidden lg:flex absolute top-[20vh] left-4 md:left-8 lg:left-[10vw] h-full items-end gap-1 md:gap-2">
            <h1
              className="text-[32px] md:text-[42px] lg:text-[96px] font-bold leading-none [writing-mode:vertical-lr] rotate-180 tracking-tight text-white z-50 whitespace-nowrap"
              style={{
                textShadow:
                  "-2px -2px 0 black, 2px -2px 0 black, -2px 2px 0 black, 2px 2px 0 black, -2px 0 0 black, 2px 0 0 black, 0 -2px 0 black, 0 2px 0 black",
              }}
            >
              NUESTROS
            </h1>
            <h2
              className="text-[24px] md:text-[32px] lg:text-[72px] font-bold leading-none [writing-mode:vertical-lr] rotate-180 tracking-tight text-black z-50 whitespace-nowrap"
              style={{
                textShadow:
                  "-2px -2px 0 white, 2px -2px 0 white, -2px 2px 0 white, 2px 2px 0 white, -2px 0 0 white, 2px 0 0 white, 0 -2px 0 white, 0 2px 0 white",
              }}
            >
              CLIENTES
            </h2>
          </div>
        </div>

        {/* White content section */}
        <div className="w-full px-4 md:px-8 mt-8 md:mt-12">
          <div className="max-w-5xl ml-auto mr-auto">
            <div className="flex justify-end mb-8 md:mb-12">
              <div className="max-w-2xl">
                <p className="text-base md:text-lg text-foreground/80 mb-4 md:mb-6 leading-relaxed">
                  ¡Hemos hecho de todo y para todos!
                </p>
                <p className="text-base md:text-lg text-foreground/80 leading-relaxed">
                  Mirá lo que hemos logrado junto a nuestra manada y descubrí por qué tantas marcas
                  confían en nosotros para darle forma a sus ideas.
                </p>
              </div>
            </div>
            <div className="flex justify-center mt-4 md:mt-6">
              <div className="w-2 h-2 rounded-xl bg-[#7660A0]" />
            </div>
          </div>
        </div>
      </section>

      <ClientPortfolio />
    </>
  )
}
