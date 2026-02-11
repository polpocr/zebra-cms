import type { Metadata } from "next"

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

export const metadata: Metadata = {
  title: "Portfolio - Nuestros Clientes",
  description:
    "Descubre los proyectos que hemos completado junto a nuestra manada. Más de 3000 proyectos que demuestran nuestra creatividad y ejecución.",
  alternates: {
    canonical: `${baseUrl}/portfolio`,
  },
  openGraph: {
    title: "Portfolio - Nuestros Clientes - Zebra Producciones",
    description:
      "Descubre los proyectos que hemos completado junto a nuestra manada. Más de 3000 proyectos que demuestran nuestra creatividad y ejecución.",
    url: `${baseUrl}/portfolio`,
    images: [
      {
        url: `${baseUrl}/images/portfolio-image.jpg`,
        width: 1200,
        height: 630,
        alt: "Portfolio - Zebra Producciones",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Portfolio - Nuestros Clientes - Zebra Producciones",
    description:
      "Descubre los proyectos que hemos completado junto a nuestra manada. Más de 3000 proyectos que demuestran nuestra creatividad y ejecución.",
    images: [`${baseUrl}/images/portfolio-image.jpg`],
  },
}

export default function PortfolioLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
