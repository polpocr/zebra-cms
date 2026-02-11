import type { Metadata } from "next"

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

export const metadata: Metadata = {
  title: "Contacto",
  description:
    "Hablemos, tomemos café, hagamos brainstorming. Ponte en contacto con Zebra Producciones y hagamos manada.",
  alternates: {
    canonical: `${baseUrl}/contacto`,
  },
  openGraph: {
    title: "Contacto - Zebra Producciones",
    description:
      "Hablemos, tomemos café, hagamos brainstorming. Ponte en contacto con Zebra Producciones y hagamos manada.",
    url: `${baseUrl}/contacto`,
    images: [
      {
        url: `${baseUrl}/images/contact-image.png`,
        width: 1200,
        height: 630,
        alt: "Contacto - Zebra Producciones",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Contacto - Zebra Producciones",
    description:
      "Hablemos, tomemos café, hagamos brainstorming. Ponte en contacto con Zebra Producciones y hagamos manada.",
    images: [`${baseUrl}/images/contact-image.png`],
  },
}

export default function ContactoLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return children
}
