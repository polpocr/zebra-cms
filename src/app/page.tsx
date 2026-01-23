import type { Metadata } from "next"
import { BrandsSection } from "@/components/brands-section"
import { CentroAmericaSection } from "@/components/centro-america-section"
import { InstagramGallery } from "@/components/instagram-gallery"
import { Marquee } from "@/components/marquee"
import { Portfolio } from "@/components/portfolio"
import { Statistics } from "@/components/statistics"
import { StructuredData } from "@/components/structured-data"

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

export const metadata: Metadata = {
  title: "Inicio",
  description:
    "Zebra Producciones somos una agencia de marketing que nos integramos a tu equipo para crear soluciones efectivas, creativas y llenas de impacto. Más de 3000 proyectos completados.",
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    title: "Zebra Producciones - Agencia de Marketing y Publicidad",
    description:
      "Agencia de marketing que se integra a tu equipo para crear soluciones efectivas, creativas y llenas de impacto. Más de 3000 proyectos completados.",
    url: baseUrl,
    images: [
      {
        url: "/images/hero-image.jpg",
        width: 1200,
        height: 630,
        alt: "Zebra Producciones - Agencia de Marketing y Publicidad",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Zebra Producciones - Agencia de Marketing y Publicidad",
    description:
      "Agencia de marketing que se integra a tu equipo para crear soluciones efectivas, creativas y llenas de impacto.",
    images: ["/images/hero-image.jpg"],
  },
}

export default function Home() {
  return (
    <>
      <section
        className="relative w-full min-h-[60vh] md:h-screen bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/hero-image.jpg')",
        }}
        aria-label="Hero section"
      >
        <div className="absolute inset-0 bg-black/50" />
      </section>

      <section className="container mx-auto px-4 py-12 md:py-20 lg:py-24 mt-12 md:mt-16 lg:mt-20 flex flex-col gap-8 md:gap-12">
        <Marquee text={"*PLANTEAMIENTO * ESTRATEGIA * EJECUCIÓN * RESULTADOS *"} />
        <p className="text-base md:text-lg lg:text-xl text-foreground/80 text-center px-4 md:px-8 leading-relaxed max-w-4xl mx-auto">
          Zebra Producciones somos una agencia de marketing que nos integramos a tu equipo para
          crear soluciones efectivas, creativas y llenas de impacto. Construimos tus ideas,
          celebramos tus logros y solucionamos juntos los retos. No somos solo proveedores: somos
          parte de la manada.
        </p>

        <Portfolio />
      </section>

      <StructuredData
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: "Zebra Producciones",
          url: baseUrl,
          description:
            "Agencia de marketing que se integra a tu equipo para crear soluciones efectivas, creativas y llenas de impacto.",
          potentialAction: {
            "@type": "SearchAction",
            target: {
              "@type": "EntryPoint",
              urlTemplate: `${baseUrl}/?s={search_term_string}`,
            },
            "query-input": "required name=search_term_string",
          },
        }}
      />

      <Statistics />

      <InstagramGallery />

      <CentroAmericaSection />

      <BrandsSection />
    </>
  )
}
