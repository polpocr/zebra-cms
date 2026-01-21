"use client"

import ClientPortfolio from "@/components/client-portfolio"
import Image from "next/image"

export default function PortfolioPage() {
  return (
    <>
      <section className="relative w-full min-h-screen">
        {/* Image - full width, partial height */}
        <div className="relative w-full h-[65vh]">
          <Image
            src="/images/portfolio-image.jpg"
            alt="Nuestros Clientes"
            fill
            className="object-cover"
            priority
          />

          {/* Vertical text overlay - positioned absolutely from left edge */}
          <div className="absolute top-[20vh] left-4 md:left-8 lg:left-[10vw] h-full flex items-end gap-1 md:gap-2">
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
        <div className="w-full px-4 md:px-8 mt-12">
          <div className="max-w-5xl ml-auto mr-auto">
            <p className="text-base md:text-lg text-foreground/80 mb-6 leading-relaxed text-center">
              ¡Hemos hecho de todo y para todos!
            </p>
            <p className="text-base md:text-lg text-foreground/80 leading-relaxed text-center">
              Mirá lo que hemos logrado junto a nuestra manada y descubrí por qué tantas marcas
              confían en nosotros para darle forma a sus ideas.
            </p>
            <div className="flex justify-center mt-6">
              <div className="w-2 h-2 rounded-xl bg-[#7660A0]" />
            </div>
          </div>
        </div>
      </section>

      <ClientPortfolio />
    </>
  )
}
