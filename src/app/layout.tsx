import type { Metadata } from "next"
import { Inter } from "next/font/google"
import Script from "next/script"
import "./globals.css"
import { SiteLayout } from "@/components/site-layout"
import { Toaster } from "@/components/ui/sonner"
import { esES } from "@clerk/localizations"
import { ClerkProvider } from "@clerk/nextjs"
import { ConvexClientProvider } from "../providers/convex-client-provider"

const interSans = Inter({
  variable: "--font-inter-sans",
  subsets: ["latin"],
})

const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

export const metadata: Metadata = {
  metadataBase: new URL(baseUrl),
  title: {
    default: "Zebra Producciones - Agencia de Marketing y Publicidad",
    template: "%s | Zebra Producciones",
  },
  description:
    "Agencia de marketing que se integra a tu equipo para crear soluciones efectivas, creativas y llenas de impacto. Más de 3000 proyectos completados.",
  keywords: [
    "agencia de marketing",
    "publicidad",
    "marketing digital",
    "diseño gráfico",
    "branding",
    "estrategia de marketing",
    "Zebra Producciones",
    "agencia de publicidad",
    "marketing en Centroamérica",
    "diseño de marca",
    "estrategia digital",
  ],
  authors: [{ name: "Zebra Producciones" }],
  creator: "Zebra Producciones",
  publisher: "Zebra Producciones",
  alternates: {
    canonical: baseUrl,
  },
  openGraph: {
    type: "website",
    locale: "es_ES",
    url: baseUrl,
    siteName: "Zebra Producciones",
    title: "Zebra Producciones - Agencia de Marketing y Publicidad",
    description:
      "Agencia de marketing que se integra a tu equipo para crear soluciones efectivas, creativas y llenas de impacto. Más de 3000 proyectos completados.",
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
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  verification: {
    // Agregar cuando tengas Google Search Console
    // google: "verification-code",
  },
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode
}>) {
  const baseUrl = process.env.NEXT_PUBLIC_SITE_URL || "http://localhost:3000"

  const organizationSchema = {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "Zebra Producciones",
    url: baseUrl,
    logo: `${baseUrl}/logo.svg`,
    description:
      "Agencia de marketing que se integra a tu equipo para crear soluciones efectivas, creativas y llenas de impacto.",
    sameAs: [
      // Agregar redes sociales cuando estén disponibles
      // "https://www.facebook.com/zebraproducciones",
      // "https://www.instagram.com/zebraproducciones",
    ],
    contactPoint: {
      "@type": "ContactPoint",
      contactType: "customer service",
      availableLanguage: ["Spanish"],
    },
  }

  return (
    <ClerkProvider localization={esES}>
      <html lang="es">
        <head>
          <link rel="manifest" href="/manifest.json" />
          <link rel="icon" href="/favicon.ico" />
          <meta name="theme-color" content="#7660A0" />
          <meta name="viewport" content="width=device-width, initial-scale=1, maximum-scale=5" />
        </head>
        <body className={`${interSans.variable} antialiased`} suppressHydrationWarning>
          {/* JSON-LD Structured Data */}
          <Script id="organization-schema" type="application/ld+json" strategy="beforeInteractive">
            {JSON.stringify(organizationSchema)}
          </Script>

          {/* Disable Service Worker */}
          <Script id="disable-service-worker" strategy="beforeInteractive">
            {`
              if ('serviceWorker' in navigator) {
                navigator.serviceWorker.getRegistrations().then(function(registrations) {
                  for(let registration of registrations) {
                    registration.unregister();
                  }
                });
              }
            `}
          </Script>

          <ConvexClientProvider>
            <SiteLayout>{children}</SiteLayout>
            <Toaster />
          </ConvexClientProvider>
        </body>
      </html>
    </ClerkProvider>
  )
}
