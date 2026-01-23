import type { Metadata } from "next"
import TeamSection from "@/components/team-section"
import ValoresSection from "@/components/valores-section"
import Image from "next/image"

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

export const metadata: Metadata = {
  title: "Acerca de Nosotros",
  description:
    "Somos tu equipo extendido. Con más de 3000 proyectos completados en 8 años, construimos estrategias y diseñamos experiencias que elevan tu marca.",
  openGraph: {
    title: "Acerca de Nosotros - Zebra Producciones",
    description:
      "Somos tu equipo extendido. Con más de 3000 proyectos completados en 8 años, construimos estrategias y diseñamos experiencias que elevan tu marca.",
    url: `${baseUrl}/acerca-de`,
    images: [
      {
        url: `${baseUrl}/images/about_image.jpg`,
        width: 1200,
        height: 630,
        alt: "Acerca de Zebra Producciones",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Acerca de Nosotros - Zebra Producciones",
    description:
      "Somos tu equipo extendido. Con más de 3000 proyectos completados en 8 años, construimos estrategias y diseñamos experiencias que elevan tu marca.",
    images: [`${baseUrl}/images/about_image.jpg`],
  },
}

export default function AcercaDePage() {
  return (
    <>
      <section className="relative w-full min-h-screen">
        {/* Image - full width, partial height */}
        <div className="relative w-full h-[50vh] md:h-[65vh]">
          <Image
            src="/images/about_image.jpg"
            alt="Acerca de nosotros"
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
              ACERCA DE
            </h1>
            <h2 className="text-3xl font-bold leading-none tracking-tight text-white text-center">
              NOSOTROS
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
              ACERCA DE
            </h1>
            <h2
              className="text-[24px] md:text-[32px] lg:text-[72px] font-bold leading-none [writing-mode:vertical-lr] rotate-180 tracking-tight text-black z-50 whitespace-nowrap"
              style={{
                textShadow:
                  "-2px -2px 0 white, 2px -2px 0 white, -2px 2px 0 white, 2px 2px 0 white, -2px 0 0 white, 2px 0 0 white, 0 -2px 0 white, 0 2px 0 white",
              }}
            >
              NOSOTROS
            </h2>
          </div>
        </div>

        {/* White content section */}
        <div className="w-full px-4 md:px-8 mt-8 md:mt-12">
          <div className="max-w-5xl ml-auto mr-auto">
            <div className="flex justify-end">
              <div className="max-w-2xl">
                <p className="text-base md:text-lg text-foreground/80 mb-4 md:mb-6 leading-relaxed">
                  Somos tu equipo extendido, listos para construir estrategias, diseñar experiencias y
                  materializar ideas que eleven tu marca.
                </p>
                <p className="text-base md:text-lg text-foreground/80 leading-relaxed">
                  Con más de 3000 proyectos completados en 8 años, sabemos que la clave del éxito está
                  en la mezcla de creatividad, ejecución impecable y la actitud para ir más allá.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      <ValoresSection />
      <TeamSection />
    </>
  )
}
