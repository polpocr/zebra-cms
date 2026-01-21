import { ServicesSection } from "@/components/services-section"
import { Button } from "@/components/ui/button"
import Image from "next/image"
import Link from "next/link"

export default function ServiciosPage() {
  return (
    <>
      <section className="relative w-full min-h-screen">
        {/* Image - full width, partial height */}
        <div className="relative w-full h-[65vh]">
          <Image
            src="/images/service_image.jpg"
            alt="Nuestros servicios"
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
              SERVICIOS
            </h2>
          </div>
        </div>

        {/* White content section */}
        <div className="w-full px-4 md:px-8 mt-12">
          <div className="max-w-5xl ml-auto mr-auto">
            <p className="text-base md:text-lg text-foreground/80 mb-6 leading-relaxed">
              En Zebra desarrollamos soluciones integrales que transforman ideas en experiencias
              memorables.
            </p>
            <p className="text-base md:text-lg text-foreground/80 mb-12 leading-relaxed">
              Mirá lo que podemos hacer por vos y tu marca:
            </p>

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
