import type { Metadata } from "next"
import { ServicesSection } from "@/components/services-section"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

export const metadata: Metadata = {
  title: "Nuestros Servicios",
  description:
    "Soluciones integrales que transforman ideas en experiencias memorables. Descubre lo que podemos hacer por tu marca.",
  openGraph: {
    title: "Nuestros Servicios - Zebra Producciones",
    description:
      "Soluciones integrales que transforman ideas en experiencias memorables. Descubre lo que podemos hacer por tu marca.",
    url: `${baseUrl}/servicios`,
    images: [
      {
        url: `${baseUrl}/images/service_image.jpg`,
        width: 1200,
        height: 630,
        alt: "Nuestros Servicios - Zebra Producciones",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Nuestros Servicios - Zebra Producciones",
    description:
      "Soluciones integrales que transforman ideas en experiencias memorables. Descubre lo que podemos hacer por tu marca.",
    images: [`${baseUrl}/images/service_image.jpg`],
  },
}

export default function ServiciosPage() {
  return (
    <>
      <section className="relative w-full min-h-screen">
        {/* Image - full width, partial height */}
        <div className="relative w-full h-[50vh] md:h-[65vh]">
          <Image
            src="/images/service_image.jpg"
            alt="Nuestros servicios"
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
              SERVICIOS
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
              SERVICIOS
            </h2>
          </div>
        </div>

        {/* White content section */}
        <div className="w-full px-4 md:px-8 mt-8 md:mt-12">
          <div className="max-w-5xl ml-auto mr-auto">
            <div className="flex justify-end mb-8 md:mb-12">
              <div className="max-w-2xl">
                <p className="text-base md:text-lg text-foreground/80 mb-4 md:mb-6 leading-relaxed">
                  En Zebra desarrollamos soluciones integrales que transforman ideas en experiencias
                  memorables.
                </p>
                <p className="text-base md:text-lg text-foreground/80 leading-relaxed">
                  Mirá lo que podemos hacer por vos y tu marca:
                </p>
              </div>
            </div>

            <ServicesSection />

            <div className="flex justify-center my-12">
              <Button
                asChild
                className="bg-[#A28CBD] hover:bg-[#A28CBD]/90 text-white uppercase px-8 py-6 text-base font-medium"
              >
                <Link href="/portfolio">VER MÁS PROYECTOS</Link>
              </Button>
            </div>
          </div>
        </div>
      </section>
    </>
  )
}
